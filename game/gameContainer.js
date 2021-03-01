/* file created by charles.torris@gmail.com */
var tools = require('./../server/tools.js');
module.exports = {
    gS: require('../game/gameSettings.js'),
    date: 0,
    heure: 0,
    persos: {},
    onlinePersos: {}, /// les clients WS en stock
    places: {},
    roles: {
        dj: null,
        tube: "Double arc en ciel",
        filosof: null,
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
    setInPlace: function (place, perso) {

        // place = new placed :(
        perso.oldplace = perso.place;
        //  console.log('[setInPlace] Moving ' + perso.nom + ' to ' + place);
        // creation list des places si nexiste pas
        if (!this.places[place])
            this.places[place] = {}; // contient les persos

        if (!place)
            tools.fatal("set in place no place ? FUCK YOU");
        if (place === perso.oldplace && this.places[place][perso.nom] === perso) {
            // normal quand on reste dans la même pièce
            return null;
        }



        /* remove old place from index */
        if (perso.oldplace) {
            if (!this.places[perso.oldplace][perso.nom]) {
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
        /// update clients 
        for (const [key, value] of Object.entries(this.places[place])) {
            var perso = value;
            if (this.onlinePersos[key]) {
                try {
                    var ws = this.onlinePersos[key];
                    ws.send(JSON.stringify({persos: this.places[place]}));
                } catch (e) {
                    delete this.onlinePersos[key]
                    console.log('missing ws client update palce -> deleting from index');
                }
                //  console.log(perso.nom + ' updated place client');
            }
        }

        console.log(perso.nom + ' has moved, --updated places');
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
        console.log('people in ' + place);
        console.log(tablo);
        console.log(this.places[place]);
        return tablo;
    }
};