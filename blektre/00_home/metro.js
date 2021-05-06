process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Metro",
    folder: "00_home",
    chapitre: "/metro",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;
        var dest = require('../' + perso.dest + '.js');


        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                game.upDaytime(perso);
                var choices = [];
                /* le chemin de retour après la global phase */
                perso.globalEndChoice = ["D'accord", ppath, "fin_embrouille"];

                var text = "Vous êtes dans le métro, en direction de " + dest.name + ". ";
                var people = game.gC.getOtherPeopleHere("Metro", perso);

                for (var i = 0; i < people.length; i++) {
                    if (people[i] && !people[i].horsjeu) {
                        text += "[" + people[i].nom + '] est là et vous regarde d\'un air arrogant. ';
                        choices.push(["Je demande à " + people[i].nom + " quel est son problème", "00_global/embrouille", "embrouille"]);
                        perso.adversaire = people[i].nom;
                        break;
                    }
                }


                choices.push(["Je sors du métro", perso.dest, "intro"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "fin_embrouille": function () {
                var choices = [];
                var text = "Le metro arrive à destination";

                choices.push(["Je sors du métro", perso.dest, "intro"]);
                return {
                    text: text,
                    choices: choices
                }
            }

        }


        return chapitre[page]();



    }
}