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
        /* INIT GAME FOR A CLIENT */

        tools.clearLog();

        if (!ws.char_inventory) {
            ws.char_inventory = [];
        }

        this.tick();
        // load my characters




        connection.query('SELECT data FROM persos WHERE player_id=?', [ws.id], function (err, rows, fields) {
            if (rows)
                for (var i = 0; i < rows.length; i++) {
                    ws.char_inventory.push(JSON.parse(rows[i].data));
                }

            // console.log(ws.char_inventory);

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
            delete gC.onlinePersos[ws.name];
            tools.report(ws.name + ' LEFT THE GAME : ' + ws.id);

        }
    },
    createCharacter: function (nom, type, bio, startplace = "Home") {
//var perso = msg.create_char;


        if (gC.persos[nom]) {
            console.log('name taken ' + nom);
            return null;
        }

        var persoTool = require('./../game/objets/personnage.js');
        var perso = persoTool.create(nom, type, bio);
        
        
        /*
         for (const [key, value] of Object.entries(msg.create_char)) {
         perso[key] = value;
         }
         */
        itemTools.addItem(perso, "joint", 1);
        itemTools.addItem(perso, "vodka", 1);
        gC.persos[perso.nom] = perso;
        gC.setInPlace(startplace, perso);
        return (perso);
    },

    onPlayerCommand: function (ws, msg) {
        // tools.report('' + ws.name + ' clijson: ' + JSON.stringify(msg));

        /* Load un chapitre page après un choice */

        if (msg.textarea) {
            console.log('Recu Textarea' + msg.textarea);
            ws.current_perso.textarea = msg.textarea;
        }

        if (msg.choice) {
            this.loadPage(ws, msg.choice, msg.page, msg.dest);
            /* clear textarea */
            delete ws.current_perso.textarea;
        }


        /* CREATION DE PERSONNAGE */
        if (msg.create_char) {
            var perso = this.createCharacter(msg.create_char.nom, msg.create_char.type, msg.create_char.bio)
            if (!perso) {
                ws.errorme("Nom de personnage déjà pris");
                return null;
            }


            ws.char_inventory.push(perso);
            ws.save();
            ws.send(JSON.stringify({
                'character_menu': 1,
                'char_inventory': ws.char_inventory
            }));
        }


        /* DEMARRAGE PARTIE */
        if (msg.go) {
            console.log(ws.name + ' CHARACTEUR ONLINE  : ' + ws.char_inventory[msg.char].nom);
            var perso = ws.char_inventory[msg.char];
            ws.current_perso = perso;

            gC.onlinePersos[perso.nom] = ws;

            //  console.log(ws.name + ' starts the game');
            // console.log(ws.current_perso);

            if (perso.disclaimer) {
                var pagedepart = "disclaimer";
                delete perso.disclaimer;
            } else
                pagedepart = "intro";

            this.loadPage(ws, ws.current_perso.chapitre, pagedepart);
            // forcer update place if not moved
            // 
            // make a pack with all packed persos //
            var packedPersos = gC.getAllPackedPersos();
            ws.send(JSON.stringify({persos: packedPersos}));

            this.updateChar(perso);
        }
    },

    // not sure i want to use real time ?
    tick: function () {
        var that = this;
        for (const [key, value] of Object.entries(gC.persos)) {


        }
        setTimeout(function () {
            gC.date++;
            that.tick();
        }, 60000);

    },

    loadPage: function (ws, chapitre, page, dest = null) {
        // console.log('LoadPage() ' + chapitre + ' page ' + JSON.stringify(page));


        try {

            var perso = ws.current_perso;
            var folder = this.folder;
            delete perso.horsjeu;


            // delete perso.adversaire; // dont do that 



            /// dest is the metro final destination i guess
            if (dest)
                perso.dest = dest;





            /* load CHAPITRE */
            var chapitreO = require('./../blektre/' + chapitre + '.js');
            if (!chapitreO) {
                tools.fatal('Fatal Page O pisssmigpoon');
            }

            /* load PAGE */
            var pageObject = chapitreO.getPage(ws, page);
            if (!pageObject) {
                tools.report('pageOjbect is missing at ' + chapitre + ' ' + page);
                return null;
            }

            // INTRO SPECIAL LIKE ... IS THERE ANY INTERRUPT SIR ? 
            if (page === "intro") {
                if (!pageObject.nointerrupt) {
                    if (this.checkInterrupt(ws, chapitre, page))
                        return null;
                }

                // if intro & station 
                if (chapitreO.station) {
                    perso.station = chapitreO.station;
                }
            }

            // LET'S GO, THEN

            perso.chapitre = chapitre;
            perso.page = page;
            perso.step++;

            // set presence into the chapitre place 
            if (chapitreO.name)
                gC.setInPlace(chapitreO.name, perso);

            this.updateChar(perso);

            // send data to client
            var data = (pageObject);
            if (chapitreO.name)
                data.scene = chapitreO.name;

            ws.send(JSON.stringify(data));

        } catch (e) {
            tools.report('!!!! ERROR at loading page : ' + chapitre + ' page ' + page);
            console.log(e);
        }
        return null;
    },

    /* UPDATE MY OWN CHAR */
    updateChar: function (perso) {
        var data = {
            "mychar": perso
        }
        var ws = gC.onlinePersos[perso.nom];
        if (ws) {
            try {
                ws.send(JSON.stringify(data));
                ws.current_perso.loglines = [];
            } catch (e) {
                console.log('erreur at update CHAR ' + perso.nom);
                console.log(e);
            }
        } else {
            delete gC.onlinePersos[perso.nom];
        }

    },

    popup: function (perso, title, popup, adversaire, notif) {

        var popObject = {title: title, adversaire: gC.getPackedPerso(adversaire), stats: notif};
        // check if online = send , otherwise : stock
        if (gC.onlinePersos[perso.nom]) {
            ws = gC.onlinePersos[perso.nom];
            ws.send(JSON.stringify({
                popups: [popObject]
            }));
        } else {
            perso.popups.push(popObject);
        }

    },

    log: function (perso, notif) {
        perso.loglines.push(gC.date + ':' + notif);
    },
    interrupt: function (perso, chapitre, page, adversaire, statnotif) {
        perso.interruptions.push({
            chapitre: chapitre,
            page: page,
            adversaire: adversaire.nom,
            statnotif: statnotif}
        );

    },
    checkInterrupt: function (ws, chapitre, page) {
        var perso = ws.current_perso;
        var folder = this.folder;

        if (perso.interruptions[0]) {
            perso.returnAfterInterrupt = {
                chapitre: chapitre,
                page: page
            };
            perso.adversaire = perso.interruptions[0].adversaire;

            this.loadPage(ws, perso.interruptions[0].chapitre, perso.interruptions[0].page);

            return true; // for stop loading current page
        }
    },
    endInterrupt: function (perso, returnlabel) {
        var returnChoice = [returnlabel, perso.returnAfterInterrupt.chapitre, perso.returnAfterInterrupt.page];
        perso.interruptions.splice(0, 1);
        delete perso.returnAfterInterrupt;
        return returnChoice;
    },

    updateTrait: function (perso, trait, value, notif) {
        if (value)
            perso.traits[trait] = value;

        if (perso.traits[trait] && !value) {
            delete perso.traits[trait];
        }
        this.log(perso, notif);
    }
    ,
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
        var texte = "!" + stat + "!" + value + "";
        perso.loglines.push(texte);
        perso[stat] += value;
        return texte;
    },

    // ajoute 1 au day time et reset au max
    upDaytime: function (perso) {
        console.log('Update heure ' + perso.nom);
        if (perso.daytime === 2) {
            /* end of day */
            perso.daytime = 0;
            perso.day++;
            perso.loyer.days--;
            if (perso.loyer.days === 0) {
                perso.loyer.days = 28;
                console.log('LOYER TIME FOR ' + perso.nom);
                var loyer = perso.loyer.amount;
                var diff = perso.money - loyer;
                if (diff > 0) {
                    perso.money -= loyer;
                    this.log(perso, "Vous payer votre loyer");
                } else {
                    perso.money = 0;
                    this.log(perso, "Vous échouez à payer votre loyer");
                }
            }

        } else {
            perso.daytime++;
        }



    },

    // return un nom
    getRole: function (perso, role, isBlankAllowed = false) {
        console.log('getRole ' + role);
        if (gC.roles[role] && gC.roles[role].nom) {
            return gC.roles[role];
        } else {
            if (!isBlankAllowed)
                return gC.roles.default;
            else
                return null;
        }
        return null;
    },
    setRole: function (perso, role, extradata = null) {
        this.gC.roles[role] = {
            nom: perso.nom,
            earn: 0,
            extradata: extradata
        }
        return null;
    },

    addPlace: function (perso, label, path) {
        // place etant un array
        for (var i = 0; i < perso.places.length; i++) {
            if (perso.places[i] === [label, path]) {
                return null;
            }
        }
        perso.places.push([label, path]);
    }

}



