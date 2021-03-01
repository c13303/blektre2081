process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/03_btc",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;


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