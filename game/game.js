/* file created by charles.torris@gmail.com */
//var Ours = require('./GameObject_ours.js');

var params = require('./../params.js');
var tools = require('./../server/tools.js');
var monitor = require('./../server/console.js');
var gC = require('./../game/gameContainer.js');
var itemTools = require('./../game/objets/itemsTools.js');



eval(tools.toolbox);

module.exports = {
    gC: gC,
    timerLast: Date.now(),
    age: 0,
    gameInit: function (ws, connection) {
        tools.clearLog();

        if (!ws.char_inventory) {
            ws.char_inventory = [];
        }

        // load my characters




        connection.query('SELECT data FROM persos WHERE player_id=?', [ws.id], function (err, rows, fields) {
            if (rows)
                for (var i = 0; i < rows.length; i++) {
                    ws.char_inventory.push(JSON.parse(rows[i].data));
                }

            console.log(ws.char_inventory);

            ws.send(JSON.stringify({
                'character_menu': 1,
                'char_inventory': ws.char_inventory
            }));
            return null;
        });

    },

    onPlayerConnect: function (ws) {
        tools.report(ws.name + ' is connected ');

    },
    onPlayerLeave: function (ws) {
        if (ws.isOnline) {
            ws.isOnline = false;
            tools.report(ws.name + ' LEFT THE GAME : ' + ws.id);

        }
    }, onPlayerCommand: function (ws, msg) {
        tools.report(ws.name + ' client msg recvd : ' + JSON.stringify(msg));

        /* Load un chapitre page après un choice */
        if (msg.choice) {
            this.loadPage(ws, msg.choice, msg.page);
        }

        /* CREATION DE PERSONNAGE */
        if (msg.create_char) {
            var perso = msg.create_char;
            perso.chapitre = '00_home/00_intro';
            perso.page = "disclaimer";

            perso.traits = {};
            perso.physique = 100;
            perso.mental = 100;
            perso.money = 12;
            perso.social = 0; /// autiste <-> sociable
            perso.love = 0; /// sexuel <-> amical
            perso.crea = 0; /// serenité <-> creativité
            perso.conso = 0; /// ecolo <-> consumériste
            perso.gouv = 0; /// autoritaire <-> libertaire
            perso.ideal = 0; /// communiste <-> liberal

            perso.disclaimer = true;


            perso.notifications = [];
            perso.step = 0;
            perso.inventaire = {};
            perso.toInsertDB = true;

            itemTools.addItem(perso, "joint", 1);
            itemTools.addItem(perso, "vodka", 1);

            ws.char_inventory.push(perso);
            ws.save();
            ws.send(JSON.stringify({
                'character_menu': 1,
                'char_inventory': ws.char_inventory
            }));


        }


        /* DEMARRAGE PARTIE */
        if (msg.go) {
            //console.log(ws.name + ' start game with ' + ws.char_inventory[msg.char].nom);
            var perso = ws.char_inventory[msg.char];
            ws.current_perso = perso;
            gC.persos[perso.nom] = perso;
            gC.onlinePersos[perso.nom] = true;
            //  console.log(ws.name + ' starts the game');
            // console.log(ws.current_perso);

            if (perso.disclaimer)
                var pagedepart = "disclaimer";
            else
                pagedepart = "intro";

            this.loadPage(ws, ws.current_perso.chapitre, pagedepart);
            this.updateMyChar(ws);
        }
    },

    loadPage: function (ws, chapitre, page) {
        // console.log('LoadPage() ' + chapitre + ' page ' + JSON.stringify(page));


        try {
            gC.setOutPlace(ws.current_perso.place, ws.current_perso);
            var pageO = require('./../blektre/' + chapitre + '.js');
            var pageObject = pageO.getPage(ws, page);
            // console.log(pageObject);

            if (!pageObject) {
                tools.report('pageOjbect is missing at ' + chapitre + ' ' + page);
                return null;
            }


            ws.current_perso.chapitre = chapitre;
            ws.current_perso.page = page;
            ws.current_perso.step++;

            gC.setInPlace(ws.current_perso.place, ws.current_perso);
            this.updateMyChar(ws);
            ws.send(JSON.stringify(pageObject));
            gC.persos[ws.current_perso.nom] = ws.current_perso;
            this.updatePersos(ws);


        } catch (e) {
            tools.report('!!!! ERROR PAGE Missing !!!!' + chapitre + ' page ' + page);
            console.log(e);
        }
        return null;
    },
    updateMyChar: function (ws) {
        var data = {
            "mychar": ws.current_perso
        }

        ws.send(JSON.stringify(data));
        ws.current_perso.notifications = [];

    },

    notif: function (perso, notif) {
        perso.notifications.push(notif);
    },

    updateTrait: function (perso, trait, value, notif) {
        if (value)
            perso.traits[trait] = value;

        if (perso.traits[trait] && !value) {
            delete perso.traits[trait];
        }
        this.notif(perso, notif);
    },
    getTrait: function (perso, trait) {

        if (!perso.traits[trait])
            return null;

        return perso.traits[trait];
    }

    , hasTrait: function (perso, trait) {
        if (perso.traits[trait])
            return perso.traits[trait];
        else
            return false;
    }

    , updateStat: function (perso, stat, value) {
        console.log('Update STAT de ' + perso.nom + ' ' + stat + ' ' + value);
        perso.notifications.push("(" + stat + " " + value + ")");
        perso[stat] = +value;
    }

    , updatePersos: function (ws, place = null) {
        if (!place) {
            var data = {
                persos: gC.persos
            }

            ws.send(JSON.stringify(data));
        }
        return null;
    }
    , getRole: function (role) {
        if (gC.roles[role]) {
            return gC.roles[role];
        } else {
            return "Jacques Mimol";
        }
    }

}



