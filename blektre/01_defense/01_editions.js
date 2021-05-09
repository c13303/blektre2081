process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Editions POT",
    folder: "01_defense/01_editions",

    getPage: function (ws, page = "intro") {



        var editrice = game.gC.roles.editrice;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

            }


        }


        return chapitre[page]();



    }
}