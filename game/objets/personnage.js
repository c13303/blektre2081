/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const tools = require('../../server/tools.js');
var game = require('./../game.js');
var gC = require('./../gameContainer.js');




process.chdir("/home/blektre2081/blektre2081/");
class perso {
    constructor(nom = null, type = null, bio = null, gender = 'nb') {
        if (nom)
            this.nom = this.slugify(nom); // slug
        this.bnom = "<span class='perso_' data-n='" + this.nom + "'>" + nom + "</span>";
        this.type = type;
        this.bio = bio;
        this.chapitre = '00_home/00_street';        this.scene = 'intro';
       // this.chapitre = '00_home/01_defense';        this.scene = 'intro';
        this.place = 'uterus';
        this.page = "disclaimer";
        this.gender = gender;
        this.traits = {};
        this.life = 100;
        this.karma = 0;
        this.sex = 0;
        this.moral = 0;
        this.sanity = 0;
        this.money = 12;
        this.reac = 0;
        this.place = null; // current place
        this.places = [["Zonmai", "00_home/00_street"]]; /// les places unlocked dans la map
        this.disclaimer = false;
        this.loglines = []; // les petites notifs type "vous avez .."
        this.popups = []; // les popups notifs (plutot pour le farming / incremental)
        this.interruptions = []; // bolossages 
        this.step = 0;
        this.inventaire = {};
        this.toInsertDB = true;
        this.place = null;
        this.day = 0;
        this.horsjeu = false;
        this.cools = {};
        this.relationships = {
            "jacques_mimol": 0,
        };
        this.rdvblackbar = {};
        this.sensibilite = null;
        this.salaires = {};
        this.steps = {};
        this.milestones = {};
    }
    slugify(str) {

        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/-,:;";
        var to = "aaaaeeeeiiiioooouuuunc______";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '_') // collapse whitespace and replace by -
                .replace(/-+/g, '_'); // collapse dashes

        return str;

    }
    reload(persodata) {

        for (const [key, value] of Object.entries(persodata)) {
            this[key] = value;
        }
        console.log('Reloaded data for ' + this.nom);
    }

    update() {
        var data = {
            "mychar": this
        }
        gC.persos[this.nom] = this;
        var ws = gC.WSPersos[this.nom];
        if (ws) {
            try {
                ws.send(JSON.stringify(data));
                this.loglines = [];
            } catch (e) {
                console.log('erreur at update CHAR ' + this.nom);
                console.log(e);
            }
        } else {
            delete gC.WSPersos[this.nom];
        }
    }

    addPlace(label, path) {
        // place etant un array

        var placeValue = [label, path];


        for (var i = 0; i < this.places.length; i++) {

            if (this.places[i][0] === label) {
                return null;
            }
        }
        this.places.push(placeValue);
        this.log('Vous découvrez -' + label + '-');
        //console.log(this.places);
    }

    popup(txt) {

        var popObject = {title: txt};
        // check if online = send , otherwise : stock
        if (gC.WSPersos[this.nom]) {
            var ws = gC.WSPersos[this.nom];
            try {
                ws.send(JSON.stringify({
                    popups: [popObject]
                }));
                this.popups = [];
            } catch (e) {
                /// popup failed bc client disconnected
                console.log('closing ws for ' + ws.nom + ' (popup)');
                ws.close();
                delete gC.WSPersos[this.nom];
            }
        } else {
            this.popups.push(popObject);
        }

    }

    log(notif) {
        this.loglines.push(gC.date + ':' + notif);
    }
    interrupt(chapitre, page, adversaire, statnotif, data = null) {

        this.interruptions.push({
            chapitre: chapitre,
            page: page,
            adversaire: adversaire.nom,
            statnotif: statnotif,
            data: data
        }

        );

    }
    checkInterrupt(ws, chapitre, page) {

        if (this.interruptions[0]) {
            this.returnAfterInterrupt = {
                chapitre: chapitre,
                page: page
            };
            this.adversaire = this.interruptions[0].adversaire;
            this.lastInterruptData = this.interruptions[0];
            console.log('interrupt triggered for ' + ws.current_perso.nom);
            return [ws, this.interruptions[0].chapitre, this.interruptions[0].page]; // for stop loading current page
        }
        return false;
    }
    getChoiceEndInterrupt(returnlabel) {
        var returnChoice = [returnlabel, this.returnAfterInterrupt.chapitre, this.returnAfterInterrupt.page];
        this.interruptions.splice(0, 1);
        delete this.returnAfterInterrupt;
        return returnChoice;
    }

    updateTrait(trait, value, notif) {
        if (value)
            this.traits[trait] = value;

        if (this.traits[trait] && !value) {
            delete this.traits[trait];
        }
        // this.log(notif);
        return '<div class="updatetrait intxt">' + notif + '</div>';
    }

    getTrait(trait) {
        if (this.traits[trait]) {
            return this.traits[trait];
        } else {
            return null;
        }
    }

    updateStat(stat, value) {
        console.log('Update STAT de ' + this.nom + ' ' + stat + ' ' + value);


        var newstat = this[stat] + value;



        if (newstat > this[stat]) {
            var texte = "Vous gagnez " + value + " de " + stat;
        } else {
            var texte = "Vous perdez " + (value * -1) + " de " + stat;
        }

        this[stat] = newstat;
        //  this.loglines.push(texte);

        return "<div class='updatestat intxt'>" + texte + "</div>";
    }

    // ajoute 1 au day time et reset au max
    upDaytime() {
        console.log('Update heure ' + this.nom);
        if (this.daytime === 2) {
            /* end of day */
            this.daytime = 0;
            this.day++;
            this.loyer.days--;
            if (this.loyer.days === 0) {
                this.loyer.days = 28;
                console.log('LOYER TIME FOR ' + this.nom);
                var loyer = this.loyer.amount;
                var diff = this.money - loyer;
                if (diff > 0) {
                    this.money -= loyer;
                    this.log("Vous payer votre loyer");
                } else {
                    this.money = 0;
                    this.log("Vous échouez à payer votre loyer");
                }
            }

        } else {
            this.daytime++;
        }
    }

    cool(label, time, expire_message) {
        this.cools[label] = {
            time: time,
            expire_message: expire_message
        };
        console.log('ADDING Coooooool');
        console.log(this.cools);

    }

    cooldownsTick() {
        //console.log(this.nom + ' cooltick');
        //  console.log(this.cools);      

        for (const [key, dacool] of Object.entries(this.cools)) {
            if (dacool.time > 0) {
                dacool.time--;
                if (dacool.time <= 0) {
                    this.popup(this.cools[key].expire_message);
                    delete this.cools[key];
                }
            }

        }
    }

    iscooling(label) {

        if (!this.cools[label])
            return false;


        if (this.cools[label].time > 0) {
            return this.cools[label].time;
        } else {
            return false;
        }
    }

    getRelationship(adversaireName) {
        if (!this.relationships[adversaireName] || this.relationships[adversaireName] === 0) {
            return 0;
        } else {
            return this.relationships[adversaireName];
        }
    }

    updateRelationship(adversaire, qt) {
        if (!this.relationships[adversaire.nom]) {
            this.relationships[adversaire.nom] = qt;
        } else {
            this.relationships[adversaire.nom] += qt;
        }
        this.log('Votre relation avec ' + adversaire.bnom + ' évolue (' + qt + ')');


        if (!adversaire.relationships[this.nom]) {
            adversaire.relationships[this.nom] = qt;
        } else {
            adversaire.relationships[this.nom] += qt;
        }
        adversaire.log('Votre relation avec ' + this.bnom + ' évolue (' + qt + ')');

        if (qt > 0)
            return "<div class='updatestat intxt'>Votre relation avec " + adversaire.bnom + " s'ameillore</div>";
        else
            return "<div class='updatestat intxt'>Votre relation avec " + adversaire.bnom + " se dégrade</div>";

    }

    addSalaire(label, stats, daily_text) {
        console.log('adding salaire for ' + this.nom);
        this.salaires[label] = {
            label: label,
            stats: stats,
            daily_text: daily_text
        }
    }

    mySalaires() {
        /// les salaires des roles
        for (const [label, salaireObj] of Object.entries(this.salaires)) {

            var days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
            var day = days[gC.tick];
            var popuped = day + ": " + salaireObj.daily_text;
            var haspopuped = null;
            if (gC.tick > days.length)
                gC.tick = 0;


            if (salaireObj.stats) {
                for (const [statkey, statval] of Object.entries(salaireObj.stats)) {
                    popuped += this.updateStat(statkey, statval);
                }
                haspopuped = true;
            }

            if (haspopuped)
                return (popuped);
            else
                return null;
        }
    }

    hasInventaire(key, qt = 1) {
        if (this.inventaire[key].qt >= qt) {
            return this.inventaire[key].qt;
        } else {
            return null;
        }
        return null;
    }

    addInventaire(key, qt = 1, stats = {}) {

        if (qt > this.inventaire[key]) {
            tools.report('ERROR ADDINVETAIRE NOT ENOUGHT POUR BOULE G');
            return null;
        }

        if (this.inventaire[key]) {
            this.inventaire[key].qt += qt;


        } else {
            this.inventaire[key] = {
                qt: qt,
                stats: stats
            }
        }
        return true;
    }

    removeInventaire(key, qt = 1) {
        if (this.inventaire[key].qt >= qt) {
            this.inventaire[key].qt -= qt;
            if (!this.inventaire[key].qt) {
                delete this.inventaire[key];
                return 0;
            }
            return this.inventaire[key].qt;
        } else {
            return null;
    }
    }
}

module.exports = perso;