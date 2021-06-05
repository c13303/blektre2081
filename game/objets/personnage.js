/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var game = require('./../game.js');
var gC = require('./../gameContainer.js');
process.chdir("/home/blektre2081/blektre2081/");
class perso {
    constructor(nom = null, type = null, bio = null) {
        this.nom = nom;
        this.type = type;
        this.bio = bio;
        this.chapitre = '00_home/00_intro';
        this.page = "disclaimer";
        this.traits = {};
        this.life = 100;
        this.karma = 0;
        this.sex = 0;
        this.moral = 0;
        this.sanity = 0;
        this.money = 12;
        this.place = null; // current place
        this.places = [["Maison", "00_home/00_intro"]]; /// les places unlocked dans la map
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
    }
    reload(persodata) {

        for (const[key, value] of Object.entries(persodata)) {
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
    interrupt(chapitre, page, adversaire, statnotif) {
        this.interruptions.push({
            chapitre: chapitre,
            page: page,
            adversaire: adversaire.nom,
            statnotif: statnotif}
        );

    }
    checkInterrupt(ws, chapitre, page) {

        if (this.interruptions[0]) {
            this.returnAfterInterrupt = {
                chapitre: chapitre,
                page: page
            };
            this.adversaire = this.interruptions[0].adversaire;
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
        this.log(notif);
    }

    updateStat(stat, value) {
        console.log('Update STAT de ' + this.nom + ' ' + stat + ' ' + value);
        var texte = "!" + stat + "!" + value + "";
        this.loglines.push(texte);
        this[stat] += value;
        return texte;
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
        // console.log(this.nom + ' cooltick');
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

    iscooled(label) {
        if (this[label.time] > 0) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = perso;