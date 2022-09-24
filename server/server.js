process.chdir("/home/blektre2081/blektre2081/");


var params = require('./../params.js');
var tools = require('./../server/tools.js');
var WebSocketServer = require('./../server/wssx.js');
var wss = tools.wss;
var port = params.port_prod;
var express = require('express');
var app = express();
var fs = require('fs');
var monitor = require('./../server/console.js');
var game = require('./../game/game.js');
var gC = require('./../game/gameContainer.js');

var serveur = {};



/* RESIZE THE PNGS to avoid pixel bleeding */
const sharp = require('sharp');


/* ARGS  */
var flushAtStart = null;
process.argv.forEach(function (val, index, array) {
    if (val === '-flush') {
        flushAtStart = true;
    }

    if (val === '-dev') {
        params.dev = true;
        port = params.port_dev;
    }
});



/* HTTPS (OR NOT) */
if (params.httpsenabled) {
    const https = require("https");
    const options = {
        key: fs.readFileSync(params.key),
        cert: fs.readFileSync(params.cert)
    };
    var credentials = {
        key: options.key,
        cert: options.cert
    };
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port);
} else {
    http = require('http');
    var httpsServer = http.createServer();
    httpsServer.listen(port);
}

function heartbeat() {
    this.isAlive = true;
}



serveur.startServer = function () {

    const userRequestMap = new WeakMap();

    if (flushAtStart) {
        tools.report('Flush at Start');
        tools.flush(websocketStart);
    } else {
        //tools.report('[no flush]');
        websocketStart();
    }

    function websocketStart() {
        tools.report('- - - - Lancement Websocket Serveur port ' + port);

        /* SERVER START */
        wss = new WebSocketServer({
            server: httpsServer,
            verifyClient: function (info, callback) {
                wss.verify(info, callback, connection, userRequestMap);
            }
        });
        wss.subinit();
        tools.wss = wss;
        gC.recoverPlayersFromDB(connection);
        var bot1 = game.createCharacter("Selbst", 1, "IA", "h", "Zonmai");
        var bot2 = game.createCharacter("Titebulle", 2, "IA", "f", "Zonmai");
        var bot3 = game.createCharacter("Mux", 3, "IA", "nb", "Zonmai");



        // var bot2 = game.createCharacter("Félicien Robot", 3, "IA", "Metro");

        game.tick();

        /* ADD IA PLAYER */



        /* ON CLIENT CONNECTION */
        wss.on('connection', function myconnection(ws, request) {

            try {

                /* recognize authentified player */
                var userinfo = userRequestMap.get(request);
                var name = userinfo.name.replace(/\W/g, '');
                var token = userinfo.password.replace(/\W/g, '');
                var id = userinfo.id;

                connection.query('SELECT id,name,data FROM players WHERE name=? AND password=?', [name, token], function (err, rows, fields) {
                    if (err)
                        tools.report(err);
                    var data = JSON.parse(rows[0].data);
                    if (!data)
                        data = {};
                    ws.name = name;
                    ws.id = rows[0].id;
                    ws.data = data;
                    ws.data.name = name;
                    ws.data.id = rows[0].id;
                    ws.isOnline = true;
                    ws.dataPile = [];
                    tools.report(name + ' connected with id ' + ws.id);
                    ws.isAlive = true;
                    ws.on('pong', heartbeat);

                    ws.send(JSON.stringify({
                        "connected": 1,
                        "mydata": ws.data
                    }));
                    game.gameInit(ws, connection);


                });
            } catch (e) {
                tools.report(e);
            }




            ws.save = function save(callback) {
                try {

                    connection.query('UPDATE players SET data=? WHERE name= ?', [JSON.stringify(ws.data), ws.name], function (err, rows, fields) {
                        if (err)
                            tools.report(err);

                        tools.report('Saved : ' + ws.name);

                        for (var i = 0; i < ws.char_inventory.length; i++) {

                            var perso = gC.persos[ws.char_inventory[i].nom];
                            if (!perso) {
                                tools.report('ERROR AT SAVE THE CHARACTER ' + ws.char_inventory[i].nom + 'IS NOT STORED IN GC.PERSOS');
                                tools.report("GC.PERSOS " + JSON.stringify(gC.persos));
                                tools.report("CHAR INVENTORY " + JSON.stringify(ws.char_inventory));
                                continue;
                            }
                            if (perso.toInsertDB) {
                                perso.toInsertDB = null;
                                var data = JSON.stringify(perso);
                                connection.query('INSERT INTO persos(nom,data,player_id) VALUES (?,?,?)', [perso.nom, data, ws.id], function (err) {
                                    console.log('perso BDD INSERTSAVED ' + perso.nom);
                                });
                            } else {
                                var data = JSON.stringify(perso);
                                connection.query('UPDATE persos SET data=? WHERE nom= ?', [data, perso.nom], function (err) {
                                    console.log('perso BDD UPDATESAVED ' + perso.nom);
                                    console.log(data);
                                });
                            }
                        }


                        if (callback) {
                            callback();
                        }
                    });
                } catch (e) {
                    tools.report(e);
                }
            };

            ws.errorme = function (msg) {
                if (!msg)
                    return null;

                ws.send(JSON.stringify({error: msg}));
            }



            /*read messages from the client */
            ws.on('message', function incoming(message) {
                // console.log(message);
                var cmd = JSON.parse(message);
                game.onPlayerCommand(ws, cmd);
            });

            ws.on('close', function (message) {
                game.onPlayerLeave(ws);
                tools.report(ws.name + ' is closing');
                wss.broadcast({'gone': ws.name});
                ws.save(null);
                wss.clients.delete(ws);
            });
        });
    }







    /* kill not responding clients */
    function noop() { }
    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) {
                game.onPlayerLeave(ws);
                return ws.terminate();
            }

            ws.isAlive = false;
            ws.ping(noop);
        });
    }, 30000);




} /* eof start server */

module.exports = serveur;
