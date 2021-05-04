process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Editions POT",
    folder: "01_defense",
    chapitre: "/01_editions",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;

        var editrice = game.gC.roles.editrice;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var choices = [
                    ["Je me casse", "map"],
                ];

                var text = "Vous entrez dans le hall de l'immeuble des éditions " + editrice.nom + "\n\
El vous regarde depuis son bureau.\n\
- Ah, " + perso.nom + ". Vous m'apportez quelque chose ? ";

                if (game.hasItem(perso, "roman")) {
                    var roman = perso.inventaire.roman;
                }


                choices.push(["Je me mets au travail", ppath, "jobing"]);

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