const server = require('ws').Server;
var tools = require('./../server/tools.js');



class wssx extends server {
    subinit() {
        // console.log('WSS class extender wssx.js');
    }

    verify(info, callback, connection, userRequestMap) {
        console.log('Verifiying ');
        var Filter = require('bad-words');
        var myFilter = new Filter({
            placeHolder: 'x'
        });
        var sha256 = require('js-sha256');
        var urlinfo = info.req.url;
        const ip = info.req.connection.remoteAddress;
        urlinfo = urlinfo.replace('/', '');
        urlinfo = urlinfo.split('-');
        if (!Array.isArray(urlinfo)) {
            callback(false);
        }
        var regex = /^([a-zA-Z0-9_-]+)$/;
        var name = urlinfo[1].toLowerCase();
        var token = urlinfo[0];

        if (name.length > 10) {
            callback(false);
        }

        if (name !== myFilter.clean(name)) {
            callback(false);
        }
        if (!regex.test(name)) {
            callback(false);
        }
        if (!regex.test(token)) {
            callback(false);
        }
        if (!name || !token || !urlinfo[1] || !urlinfo[0]) {
            callback(false);
        }
        if (urlinfo[1].toLowerCase() !== name || urlinfo[0] !== token) {
            console.log('illegal name');
            callback(false);
        }
        this.clients.forEach(function each(client) {
            if (client.name === name) {
                /* IS ALREADY LOGGED */
            //    callback(false);
            }
        });
        var token = sha256(token);
        connection.query('SELECT id,name,password FROM players WHERE name=?', [name], function (err, rows, fields) {
            if (rows[0] && rows[0].id) {
                if (rows[0].password === token) {
                    //  console.log(name + ' granted');
                    userRequestMap.set(info.req, rows[0]);
                    callback(true);
                } else {
                    tools.report(name + ' rejected ' + token);
                    callback(false);
                }
            } else {

                var data = JSON.stringify({'newborn': 1});
                connection.query('INSERT INTO players(name,password,data) VALUES (?,?,?)', [name, token, data], function (err) {
                    if (err)
                        console.log(err);
                    else {
                        tools.report(' - New PLayer Creation : ' + name);
                        var uzar = {
                            'name': name,
                            'password': token,
                            'id': 'new'
                        };
                        userRequestMap.set(info.req, uzar);
                        callback(true);
                    }
                });
            }
        });
    }

    broadcast(msg) {
        var msg = JSON.stringify(msg);
        try {
            this.clients.forEach(function each(client) {
                client.send(msg);
            });
        } catch (e) {
            /*
             console.log('websocket closed for ' + client.data.name);
             client.terminate();
             */
            console.log(e);
        }
    }
    broadcastToLevel(msg, z) {
        var msg = JSON.stringify(msg);
        try {
            this.clients.forEach(function each(client) {
                if (client.data && client.data.z === z) {
                    client.send(msg);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    masssave(callback = null) {
        var itemsProcessed = 0;
        tools.report('mass saving ...');
        var that = this;
        if (!this.clients.size && callback) {
            setTimeout(callback, 100);
        }

        this.clients.forEach(function each(client) {
            itemsProcessed++;
            client.save();
            tools.report(itemsProcessed + ' on ' + that.clients.size);
            if (itemsProcessed === that.clients.size && callback) {
                tools.report('mass saving complete, callback');
                setTimeout(callback, 100);
            }
        });
    }
    ;
            getClientFromId(id) {
        var that = null;
        for (let daCli of this.clients) {
            if (daCli.id === id) {
                that = daCli;
            }
        }
        if (!that)
            console.log(id + ' didnt found in ' + this.clients.size + ' clients ');
        return that;
    }

}

module.exports = wssx;