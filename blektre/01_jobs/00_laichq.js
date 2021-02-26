process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    getPage: function (ws, page = "intro") {

        /* HERE IS THE PLACE */
        ws.current_perso.place = "Laich&Q Centrale";
        var folder = "01_jobs";

        var nameChapitre = folder + "/00_laichq";

        /* DEFAULT CHOICE */
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var choices = [
                    ["Je me casse", "map"],
                ];

                var text = "Vous arrivez devant la centrale de Laich&Q, la fameuse multinationale de nettoyage.";
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