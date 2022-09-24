/* file created by charles.torris@gmail.com */
//var Ours = require('./GameObject_ours.js');

var params = require('./../params.js');
var tools = require('./../server/tools.js');
var monitor = require('./../server/console.js');
var gC = require('./../game/gameContainer.js');
var itemTools = require('./../game/objets/itemsTools.js');
var Perso = require('./../game/objets/personnage.js');


eval(tools.toolbox);

module.exports = {
    gC: gC,
    timerLast: Date.now(),
    age: 0,
    tools: tools,
    emojis: {
        world_map: "&#128506;&#65039;",
        metro_couloirs: "&#128647;",
        maison: "&#127962;&#65039;",
        agression: "&#128695;",
        street: "",
        aborde: "",
        money: "&#128178;",
        karma: "&#127808;",
        sex: "&#127799;",
        sanity: "&#128030;",
        relationship: "&#128151;",
        relationship_negative: "&#128148;",
        exit: "&#128682;",
    },
    gameInit: function (ws, connection) {
        /* INIT GAME FOR A CLIENT */

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
            delete gC.WSPersos[ws.name];
            tools.report(ws.name + ' LEFT THE GAME : ' + ws.id);
        }
    },
    createCharacter: function (nom, type, bio, gender = 'nb', startplace = "Home") {
        //var perso = msg.create_char;


        if (gC.persos[nom]) {
            console.log('name taken ' + nom);
            return null;
        }


        var perso = new Perso(nom, type, bio, gender);
        /*
         for (const [key, value] of Object.entries(msg.create_char)) {
         perso[key] = value;
         }
         */
        // itemTools.addItem(perso, "joint", 1);
        //  itemTools.addItem(perso, "vodka", 1);
        perso.addInventaire("carte bleue");
        perso.addInventaire("test");
        perso.removeInventaire("test");
        perso.addInventaire("Slip", 1, {
            "sex": 1
        });

        gC.persos[perso.nom] = perso;
        gC.setInPlace(startplace, perso);
        perso.loyer = {
            amount: 880,
            days: 28,
        };
        perso.daytime = 0;
        // game.addPlace(perso, "La Défense", "01_defense/00_intro");
        //  game.addPlace(perso, "Parc", "00_home/parc");
        // perso.addPlace("La Défense", "01_defense/00_in\n\tro");
        //  perso.addPlace("Parc", "00_home/parc");
        perso.update();
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
            var perso = this.createCharacter(msg.create_char.nom, msg.create_char.type, msg.create_char.bio);
            //var perso = new Perso(msg.create_char.nom, msg.create_char.type, msg.create_char.bio);
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
            var nom = ws.char_inventory[msg.char].nom;
            console.log(ws.name + ' CHARACTEUR ONLINE  : ' + nom);
            /*
             var persodata = ws.char_inventory[msg.char];
             var perso = new Perso();
             perso.reload(persodata);
             */
            var perso = gC.persos[nom];
            ws.current_perso = perso;
            gC.WSPersos[perso.nom] = ws;
            //  console.log(ws.name + ' starts the game');
            // console.log(ws.current_perso);

            var scene = 'intro';
            if (perso.scene) {
                scene = perso.scene;
            }
            this.loadPage(ws, perso.chapitre, scene);
            perso.scene = null;


            // forcer update place if not moved
            // 
            // make a pack with all packed persos //
            var packedPersos = gC.getAllPackedPersos();
            ws.send(JSON.stringify({persos: packedPersos}));
            //  game.updateChar(perso);
            perso.update();
        }
    },
    // not sure i want to use real time ?
    /* REAL TIME NOT COOL */



    tick: function () {
        console.log(this.gC.tick);
        this.gC.tick++;
        /// ticks personnels
        for (const [key, persal] of Object.entries(gC.persos)) {
            persal.cooldownsTick();
        }
        var that = this;
        setTimeout(function () {
            gC.date++;
            that.tick();
        }, 60000);
    },

    loadPage: function (ws, chapitre, page, dest = null, param = null) {


        console.log('LoadPage() ' + chapitre + ' page ' + JSON.stringify(page));
        console.log(page.indexOf('__'));
        // PAGE WITH PARAMETER /// 
        if (page.indexOf('__') !== -1) {   // separator = __    example : calling__1  
            var paramArray = page.split('__');
            var param = paramArray[1];
            page = paramArray[0];
            console.log('Param called for ' + page + ' : ' + param);
        }


        try {

            var perso = ws.current_perso;
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
           // console.log(param);
            var pageObject = chapitreO.getPage(ws, page, param);
            if (!pageObject) {
                tools.report('pageOjbect is missing at ' + chapitre + ' ' + page);
                return null;
            }

            pageObject.text = this.filterText(pageObject.text, perso);
            for (var i = 0; i < pageObject.choices.length; i++) {
                if (pageObject.choices[i])
                    pageObject.choices[i][0] = this.filterText(pageObject.choices[i][0], perso);
            }


            // INTRO SPECIAL LIKE ... IS THERE ANY INTERRUPT SIR ? 
            if (page === "intro") {
                if (!pageObject.nointerrupt) {
                    var interruptArrayLoad = perso.checkInterrupt(ws, chapitre, page);
                    if (interruptArrayLoad) {
                        this.loadPage(interruptArrayLoad[0], interruptArrayLoad[1], interruptArrayLoad[2]);
                        return null;
                    }
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

            //  game.updateChar(perso);
            perso.update();
            // send data to client
            var data = (pageObject);
            if (chapitreO.name)
                data.scene = chapitreO.name;
            ws.send(JSON.stringify(data));
        } catch (e) {
            tools.report('!!!! ERROR LOADPAGE :  ' + chapitre + ' -> ' + page);
            console.log(e);
        }
        return null;
    },
    // return un nom
    getRole: function (role) {
        //console.log('getRole ' + role);
        if (gC.roles[role] && gC.roles[role].nom) {
            return gC.roles[role];
        } else {
            console.log('ERROR GET ROLE : NOT FOUND : ' + role);
        }
    },
    getPersoByRole: function (role) {
        console.log('getting role ' + role);
        return this.gC.persos[this.gC.roles[role].nom];
    },
    setRole: function (perso, role) {
        this.gC.roles[role] = {
            nom: perso.nom
        }
        return null;
    },
    txt: function (text) {
        return null;
    },

    filterText: function (text, perso) { //// GENDERIZE DA TEXT

        var arrStr = text.split(/[<>]/);
        try {
          //  console.log(arrStr.length + " codes found in this page");

            for (var i = 0; i < arrStr.length; i++) {



                var daCode = arrStr[i];

                if (daCode.indexOf('~') !== -1 && daCode.indexOf('/') === -1) {
                    var attr = null;
                    if (daCode.indexOf('_') !== -1) {
                        var roleArray = daCode.split('_');
                        var attr = roleArray[1];
                        var role = roleArray[0];
                    } else {
                        var role = daCode;
                    }

                    role = role.replace('~', '');


                    if (role === 'SELF')
                        var daPerso = perso;

                    if (role === 'ADVERSAIRE')
                        var daPerso = perso.adversaire;

                    if (!daPerso)
                        var daPerso = this.getPersoByRole(role);


                    var display = daPerso.bnom;
                    if (attr) {
                        var daRole = this.getRole(role);
                        var display = daRole[attr];
                    }
                    text = text.replace("<" + daCode + ">", display);
                }

                if (daCode.indexOf('/') !== -1) {

                    var genderArray = daCode.split('/');
                    var daGender;
                    if (!genderArray[3]) {
                        console.log('ErEROr GneRARDayRARRA3 mISSinG');
                        console.log(genderArray);
                    }

                    if (genderArray[3] === 'SELF')
                        var daPerso = perso;

                    if (genderArray[3] === 'ADVERSAIRE') {
                        console.log('Filtering with adversaire');
                        var daPerso = perso.adversaire;
                    }

                    if (!daPerso) {
                        if (genderArray[3].indexOf('~') !== -1) {
                            var daName = genderArray[3].replace('~', '');
                            var daPerso = this.gC.persos[daName];
                        } else
                            var daPerso = this.getPersoByRole(genderArray[3]);
                    }
                    
                    if (!daPerso) {
                        console.log('FILTER ERROR PERSO NOT FOUND');
                        console.log(genderArray);
                    }
                    if (!daPerso || !daPerso.gender) {
                        console.log('FILTER ERROR daPerso.gender is missing');
                        console.log(daPerso);
                    }
                    if (daPerso.gender === 'h') {
                        daGender = genderArray[0];
                    }
                    if (daPerso.gender === 'f') {
                        daGender = genderArray[1];
                    }
                    if (daPerso.gender === 'nb') {
                        daGender = genderArray[2];
                    }

                    text = text.replace("<" + daCode + ">", "<span class='gendered'>" + daGender + "</span>");

                }
            }
            return text;
        } catch (e) {
            console.log('ERROR IN FILTER');
            console.log(e);
            console.log('ERROR IN FILTER--->text : ');
            console.log(text);

        }
    }

}



