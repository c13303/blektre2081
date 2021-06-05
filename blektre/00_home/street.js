process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Street",
    folder: "00_home/street",
    station: "Rue des Peupliers",

    getPage: function (ws, page = "intro") {

        var perso = ws.current_perso;
        var folder = this.folder;
        var namePlace = this.name;

        perso.choiceExit = {
            folder: folder,
            page: "intro"
        }

        perso.metroExit = {
            folder: folder,
            page: "intro"
        }


        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            intro: function () {

                var text = "";
                delete perso.adversaire;
                var choices = [];


                if (perso.daytime === 0)
                    text += "C'est <b>le matin</b>.";
                if (perso.daytime === 1)
                    text += "C'est <b>l'après-midi</b>.";
                if (perso.daytime === 2)
                    text += "C'est <b>la nuit</b>.";


                text += "\n\Vous êtes dans la rue, en bas de votre immeuble.";

                /* people check */
                if (!perso.adversaire) {
                    var people = game.gC.getOtherPeopleHere(namePlace, perso);
                    for (var i = 0; i < people.length; i++) {
                        if (people[i] && !people[i].horsjeu) {
                            text += "<br/><br/>[" + people[i].nom + '] est là et vous regarde d\'un air arrogant. ';
                            choices.push(["Je demande à " + people[i].nom + " quel est son problème", "00_global/embrouille", "embrouille"]);
                            perso.adversaire = people[i].nom;
                            break;
                        }
                    }
                }




                choices.push(["<< Je rentre à la maison", "00_home/00_intro", "intro"]);
                choices.push([">> Je descends dans les couloirs du métro", "00_global/metro", "intro"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

        }


        return chapitre[page]();



    }
}

