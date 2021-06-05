/* file created by charles.torris@gmail.com */
var tools = require('./../server/tools.js');
module.exports = {
    gS: require('../game/gameSettings.js'),
    date: 0,
    tick: 0,
    persos: {},
    WSPersos: {}, /// les clients WS en stock
    places: {},
    roles: {
        "default": {
            "nom": "Jacques Mimol",
            "earn": 0,
            "earnTick": 0,
        },
        "manche_Rue des Peupliers": {
            nom: 'Jacques Mimol',
            earn: 4,
            earnTick: 1,
            label: 'mendiant à la station <Rue des Peupliers>'
        }
        /// lots of manche roles
    },
    races: {
        1: "reptilienne",
        2: "marbreuse",
        3: "végétale",
        4: "tête large"
    },
    rules: {
        oppressed: 4,
    },
    recoverPlayersFromDB: function (connection) {
        var that = this;
        connection.query('SELECT * FROM players', function (err, rows, fields) {
            for (var i = 0; i < rows.length; i++) {
                var data = JSON.parse(rows[i].data);
                if (data.char_inventory) {
                    for (var j = 0; j < data.char_inventory.length; j++) {
                        var perso = data.char_inventory[j];
                        that.persos[perso.nom] = perso;
                        if (perso.place) {
                            that.setInPlace(perso.place, perso);
                        }
                    }
                }
            }

            console.log(Object.keys(that.persos).length + ' personnages loaded');
        });
    },
    getPackedPerso: function (perso) {
        var packed = {
            nom: perso.nom,
            type: perso.type,
            //bio: perso.bio,
            traits: perso.traits,
            life: perso.life,
            karma: perso.karma,
            sex: perso.sex,
            sanity: perso.sanity,
            money: perso.money,
            place: perso.place
        };
        return packed;
    },
    getAllPackedPersos: function () {
        var packedPersos = {};
        for (const [key, value] of Object.entries(this.persos)) {
            if (!value.horsjeu)
                packedPersos[key] = this.getPackedPerso(value);
        }
        return packedPersos;
    },

    /* change a perso de place and notify EVERYBOY */
    setInPlace: function (place, perso, old_place_check = true) {

        // place = new placed :(
        perso.oldplace = perso.place;
        //  console.log('[setInPlace] Moving ' + perso.nom + ' to ' + place);
        // creation list des places si nexiste pas
        if (!this.places[place])
            this.places[place] = {}; // contient les persos

        if (!place)
            tools.fatal("set in place no place ? FUCK YOU");


        // RESTER AU MEME ENDROIT
        if (place === perso.oldplace && this.places[place][perso.nom] === perso) {
            return null;
        }



        /* remove old place from index */

        if (perso.oldplace && old_place_check) {
            if (!this.places[perso.oldplace] || !this.places[perso.oldplace][perso.nom]) {
                tools.report('SetOutPlace error ' + perso.nom + ' was not in ' + perso.oldplace);
            } else {
                //   console.log('Deleted ' + perso.nom + ' from ' + perso.oldplace);
                delete this.places[perso.oldplace][perso.nom];
                delete perso.oldplace;
            }
        }


        // set in places index
        this.places[place][perso.nom] = perso;
        perso.place = place;


        // make a pack with all packed persos //
        var packedPersos = this.getAllPackedPersos();

        /// update all clients 
        for (const [key, value] of Object.entries(this.persos)) {
            if (this.WSPersos[key]) {
                var ws = this.WSPersos[key];
                try {
                    ws.send(JSON.stringify({persos: packedPersos}));
                } catch (e) {
                    tools.report('Erreur setInPlace WS');
                    tools.report(e);
                }

            }
    }






    //  console.log(perso.nom + ' has moved, --updated places');
    },
    getOtherPeopleHere: function (place, perso) {

        if (!place)
            tools.fatal('getOtherPeopleHere() MISSING PLACE');
        if (!perso)
            tools.fatal('getOtherPeopleHere() MISSING PERSO');
        if (!this.places[place])
            this.places[place] = {};
        var tablo = [];
        for (const [key, value] of Object.entries(this.places[place])) {
            if (value.nom !== perso.nom) {
                tablo.push(value);
            }
        }
        console.log('check people in ' + place + ' = ' + tablo.length);



        return tablo;
    }
};