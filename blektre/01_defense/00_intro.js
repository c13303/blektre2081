process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Defense",
    folder: "01_defense/00_intro",
    station: "La Defense",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                /* Clear stuff */
                delete perso.adversaire;
                var text = "Vous arrivez à la Défense. Les immeubles dessinés par Marc Poulet dessinent une ligne de ciel futuriste.";

                if (perso.currentRDV) {
                    var rdv = game.gC.persos[perso.currentRDV];
                    var text = "Vous êtes sur le parvis de la Défense et méditez sur ce qui fut votre rendez-vous avec " + rdv.bnom;
                    delete perso.currentRDV;
                }




                var choices = [

                ];
                // perso.choiceExit = ["D'accord", folder, "intro"];
                perso.choiceExit = {
                    folder: folder,
                    page: "intro"
                }


                var people = game.gC.getOtherPeopleHere("Defense", perso);
                if (people[0]) {
                    text += '__' + people[0].nom + ' est là et vous regarde d\'un air méprisant.';
                    choices.push(["J'aborde " + people[i].nom + "", "00_global/embrouille", "contact"]);
                    perso.adversaire = people[0].nom;
                }



                if (perso.traits.romancier) {
                    var editrice = game.gC.roles.editrice;
                    choices.push(["Je me rends aux aux éditions " + editrice, "01_defense/01_editions", "intro"]);
                }


                choices.push(["Je vais au Black Bar", "01_defense/blackbar", "intro"]);
                choices.push([">> " + game.emojis.metro_couloirs + " Je descends dans le métro", "00_global/metro", "intro"]);



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