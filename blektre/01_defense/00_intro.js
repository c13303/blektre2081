process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Defense",
    folder: "01_defense",
    chapitre: "/00_intro",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var choices = [
                    ["Je me casse", "map"],
                ];

                var text = "Vous arrivez à la Défense. Les immeubles designés par Marc Poulet dessinent une ligne de ciel futuriste.";

                var people = game.gC.getOtherPeopleHere("Defense", perso);
                if (people[0]) {
                    text += '<br/>' + people[0].nom + ' est là et vous regarde d\'un air méprisant.';
                    choices.push(["Je demande à " + people[0].nom + " quel est son problème", nameChapitre, "embrouille"]);
                    perso.adversaire = people[0].nom;
                }

                if (perso.job === "technicien de surface") {
                    choices.push(["Je me mets au travail", nameChapitre, "jobing"]);
                }
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "jobing": function () {

                var choices = [
                    ["Super, j'adore", "map"],
                ];

                var text = "Vous enfilez la tenue règlementaire. Vous allez ramasser des détritus à partir de maintenant.";

                perso.jobing = {
                    money: 1,
                    karma: 1,
                    sex: -1
                }

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