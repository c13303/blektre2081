process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    getPage: function (ws, page = "intro") {

        /* HERE IS THE PLACE */
        ws.current_perso.place = "Home";
        var nameChapitre = "00_home/00_intro";

        /* DEFAULT CHOICE */
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            "disclaimer": function () {

                var text = "Bienvenue dans Blektre, simulateur de vie du futur.";

                var choices = [
                    ["ok", nameChapitre, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            /* PAGE */
            "intro": function () {
                var text = "Vous êtes chez vous.";
                var choices = [
                    ["Je vais sur Tinder", "00_home/01_tinder", "intro"],
                    ["Je vais sur LinkedIn", nameChapitre, "linkedin"],
                ];

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