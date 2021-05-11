/* file created by charles.torris@gmail.com */

var params = require('./../params.js');
var tools = require('./../server/tools.js');
var gC = require('./../game/gameContainer.js');

var wss = tools.wss;
var devOptions = {
    trackOurs: null
}














/* =================================================================== */


var consoleTools = {
    flush: function (arg = null) {
        tools.flush();
    },
    list: function (arg = null) {
        console.log(tools.wss.clients.size + ' clients');
    },
    ws: function (arg = null) {
        if (!arg) {
            console.log("Please arg with player name");
            return null;
        }
        tools.wss.clients.forEach(function each(client) {
            if (client.data && client.name === arg)
                console.log(client.data);
        });
    },

    mem: function () {
        const used = process.memoryUsage();
        for (let key in used) {
            console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
        }
        console.log(Object.keys(gC.world.indexItems).length + ' items in world');
    },
    save: function (arg = null) {
        tools.wss.masssave();

    },
    quit: function (arg = null) {
        tools.wss.masssave(process.exit);
    },

    persos: function (arg = null) {
        console.log(gC.persos);
    },
    places: function (arg = null) {
        console.log(gC.places);
    },
    phaser: function (arg = null, arg2 = null, arg3 = null) {
        for (const[key, value] of Object.entries(gC.WSPersos)) {
            var ws = gC.WSPersos[key];
            ws.send(JSON.stringify({"phasercommand": {
                    arg1: arg,
                    arg2: arg2,
                    arg3: arg3
                }
            }));
        }
        return null;
    }


};


module.exports = {
    tools: consoleTools,

}

/* COMMANDS LISTENER */
var stdin = process.openStdin();
stdin.addListener("data", function (d) {
    try {
        var cde = d.toString().trim();
        var com = cde.split(" ");
        var cde = com[0];
        var arg = com[1];
        var arg2 = com[2];
        var arg3 = com[3];
        if (cde)
            //  console.log("cd received: [" + cde + "]");
            if (arg) {
                //   console.log("arg : [" + arg + ']');
            }

        if (consoleTools[cde]) {
            consoleTools[cde](arg, arg2, arg3);
        }



    } catch (e) {
        tools.report(e);
    }
});
process.on('SIGINT', function () {

    tools.wss.masssave(process.exit);
    tools.report("Caught interrupt signal");
});
/* helpers */
function fatal(e, f) {
    tools.fatal(e, f);
}





/* mysql */

var mysql = require('mysql');
var db_config = {
    host: params.host,
    user: params.user,
    password: params.password,
    database: params.database
};
/* HANDLE SQL DISCONNECT */


function handleDisconnect() {
    connection = mysql.createConnection(db_config);
    connection.connect(function (err) { // The server is either down
        if (err) { // or restarting (takes a while sometimes).
            tools.report('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } else {
            tools.connection = connection;
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        tools.report('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            throw err; // server variable configures this)
        }
    });
}
handleDisconnect();






