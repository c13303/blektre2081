/* file created by charles.torris@gmail.com */

process.chdir("/home/blektre2081/blektre2081/");


module.exports = {
    params: null,
    gS: null,
    fs: null,
    connection: null,
    scriptsData: {},
    wss: null,
    matrix: function (rows, cols, defaultValue = null, nullvalue = false) {
        var arr = [];
        for (var matrixi = 0; matrixi < rows; matrixi++) {
            arr.push([]);
            arr[matrixi].push(new Array(cols));
            for (var matrixj = 0; matrixj < cols; matrixj++) {
                if (!defaultValue) {
                    daval = null;
                } else {
                    daval = defaultValue;
                    if (defaultValue === "random") {
                        daval = getRandomInt(3);
                    }
                }
                if (nullvalue)
                    daval = 0;
                arr[matrixi][matrixj] = daval;
            }
        }
        return arr;
    },

    fatal: function (msg, dump = null, fatal = true) {


        this.report(msg, dump, false);
        //   process.exit();
        //  this.wss.masssave();


    },
    setup: function () {
        this.params = require('../params.js');

        this.fs = require('fs');
        this.toolbox = this.fs.readFileSync('./web/js/toolbox.js') + '';
    },
    saveFile(filename, data, callback = null) {
        this.fs.writeFile(this.params.datapath + filename, data, (err) => {
            if (err)
                this.report(err);
            else {
                console.log(filename + ' written');
                if (callback)
                    callback();
            }
        });
    },
    loadFile(fnam, key, callback = null) {
        //console.log('Loading file : ' + this.params.datapath + fnam);
        this.fs.readFile(this.params.datapath + fnam, (err, data) => {
            if (err)
                this.report(err);

            this.scriptsData[key] = JSON.parse(data);

            if (callback)
                callback(this.scriptsData);
        });

    },
    report: function (e, isOjb = false, isFatal = false) {


        if (e.stack) {
            console.log('\nStacktrace:')
            console.log('====================')
            console.log(e.stack);
        }

        var currentdate = new Date();

        var datetime = currentdate.getDate() + "/" +
                (currentdate.getMonth() + 1) + "/" +
                currentdate.getFullYear() + " @ " +
                currentdate.getHours() + ":" +
                currentdate.getMinutes() + ":" +
                currentdate.getSeconds();


        if (!isOjb)
            var note = datetime + ' : ' + e;
        else {
            var note = this.dump(e);
        }

        var that = this;
        this.fs.appendFile(this.params.logpath + this.getLogVersion(), note + "\n", function (err) {
            if (err) {
                console.log(err);
            }
            if (isFatal) {
                console.log("Fatal Error " + note + ', see ' + that.params.logpath + that.getLogVersion());
                process.exit();
            }


        });


        if (1) {
            console.log(note);
            if (isOjb) {
                console.log('----vvvvvvvovvvvvvv-------');
                console.log(e);
                console.log('---------------------------');
            }
        }
        return null;

    },
    dump(obj) {
        var out = '';
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
        return (out);
    },
    getLogVersion() {

        return "dev.log";
    },
    clearLog() {
        this.fs.unlink(this.params.logpath + this.getLogVersion(), function (err) {
            if (err) {
                throw err
            } else {
                // console.log("Successfully cleared the logfile.")
            }
        })
    },
    flush: function (callback = false) {
        var that = this;
        var data_example = {};
        var wss = this.wss;
        var flushsessionquery = "UPDATE players SET data = ? ";
        if (wss && wss.clients) {
            wss.clients.forEach(function each(client) {
                client.data = data_example;
            });
        }
        empty = JSON.stringify(data_example);
        connection.query(flushsessionquery, [empty], function (err, rows, fields) {
            that.report('sessions FLUSHED!');
            if (err) {
                console.log(err);
            }
            connection.query("DELETE FROM persos", function () {
                that.report('persos FLUSHED!');
                
                if (callback) {
                    callback();
                }
            });

        });


    },

    getDist(x1, x2, y1, y2) {
        return (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
    },

}