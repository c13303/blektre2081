process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Defense",
    folder: "01_defense",
    chapitre: "/00_intro",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {
                delete perso.adversaire;

                var choices = [
                    ["Je prends le métro", "map"],
                ];
                perso.globalEndChoice = ["D'accord", ppath, "intro"];

                var text = "Vous arrivez à la Défense. Les immeubles designés par Marc Poulet dessinent une ligne de ciel futuriste.";

                var people = game.gC.getOtherPeopleHere("Defense", perso);
                if (people[0]) {
                    text += '<br/>' + people[0].nom + ' est là et vous regarde d\'un air méprisant.';
                    choices.push(["Je demande à " + people[0].nom + " quel est son problème", "00_global/embrouille", "embrouille"]);
                    perso.adversaire = people[0].nom;
                }

                if (perso.job === "technicien de surface") {
                    choices.push(["Je vais travailler comme technicien·ne", ppath, "jobing"]);
                }

                if (perso.traits.romancier) {
                    var editrice = game.gC.roles.editrice;
                    choices.push(["Je vais aux éditions " + editrice, "01_defense/01_editions", "intro"]);
                }



                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "jobing": function () {

                var choices = [
                    ["Super, j'adore", ppath, "intro"],
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