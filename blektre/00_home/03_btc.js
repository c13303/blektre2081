process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    getPage: function (ws, page = "intro") {

        /* HERE IS THE PLACE */

        ws.current_perso.place = "Home";
        var folder = "00_home";
        /* DEFAULT CHOICE */
        var perso = ws.current_perso;
        var nameChapitre = folder + "/03_btc";


        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var text = "Vous aimeriez miner de la cryptomonnaie, mais vous n'avez ni compétences, ni matériel.";
                var choices = [
                    ["J'investis", nameChapitre, "investir"],
                    ["Je range le téléphone", folder + "/00_intro", "intro"],
                ];


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