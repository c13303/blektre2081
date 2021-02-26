/* file created by charles.torris@gmail.com */
var tools = require('./../server/tools.js');
module.exports = {
    gS: require('../game/gameSettings.js'),
    date: 0,
    heure: 0,
    persos: {},
    onlinePersos: {},
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
    updatePlace(place) {
        /// update clients from a place when someone is leaving / entering a place
        for (const [key, value] of Object.entries(this.places[place])) {
            var perso = value;
            if (this.onlinePersos[key]) {
                var ws = this.onlinePersos[key];
                ws.send(JSON.stringify({persos: this.places[place]}));
            }
        }
    },
    setInPlace: function (place, perso) {

        if (!place) {
            console.log('ok gros');
            console.log(perso);
            tools.fatal('ERREUR SETINPLACE NO PLACE ' + place);
        }

        if (!this.places[place])
            this.places[place] = {};

        this.places[place][perso.nom] = perso;

        this.updatePlace(place);
        console.log('updated places');
        // console.log(this.places);
    },
    setOutPlace: function (place, perso) {

        if (!place) {
            return null;
        }

        if (!this.places[place])
            this.places[place] = {};

        if (!this.places[place][perso.nom]) {
            tools.report('SetOutPlace error ' + perso.nom + ' is not in ' + place);
            return null;
        }
        this.updatePlace(place);
        delete this.places[place][perso.nom];
    },
    getOtherPeopleHere: function (place, perso) {

        if (!place)
            tools.fatal('getOtherPeopleHere() MISSING PLACE');
        if (!perso)
            tools.fatal('getOtherPeopleHere() MISSING PERSO');

        if (!this.places[place])
            this.places[place] = {};

        var tablo = [];
        var limit = 3;
        for (const [key, value] of Object.entries(this.places[place])) {
            if (value.nom !== perso.nom) {
                limit--;
                tablo.push(value);
            }

            if (limit === 0) {
                return tablo;
            }
        }
        return tablo;
    }
};