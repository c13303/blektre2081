process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Defense",
    folder: "01_defense/00_intro",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {
                delete perso.adversaire;

                var choices = [
                    ["Je prends le métro", "map"],
                ];
                // perso.globalEndChoice = ["D'accord", folder, "intro"];
                perso.globalEndChoice = {
                    folder: folder,
                    page: "intro"
                }

                var text = "Vous arrivez à la Défense. Les immeubles dessinés par Marc Poulet dessinent une ligne de ciel futuriste.";

                var people = game.gC.getOtherPeopleHere("Defense", perso);
                if (people[0]) {
                    text += '<br/>' + people[0].nom + ' est là et vous regarde d\'un air méprisant.';
                    choices.push(["Je demande à " + people[0].nom + " quel est son problème", "00_global/embrouille", "embrouille"]);
                    perso.adversaire = people[0].nom;
                }



                if (perso.traits.romancier) {
                    var editrice = game.gC.roles.editrice;
                    choices.push(["Je me rends aux aux éditions " + editrice, "01_defense/01_editions", "intro"]);
                }



                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            }

        }


        return chapitre[page]();



    }
}