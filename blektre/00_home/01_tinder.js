process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    getPage: function (ws, page = "intro") {

        /* HERE IS THE PLACE */
        ws.current_perso.place = "Home";
        var nameChapitre = "00_home/01_tinder";

        /* DEFAULT CHOICE */
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var text = "Vous êtes sur Tinder. Votre photo arbore ce visage qui jadis de l'ange l'antique beauté avait. Ce n'est plus le cas aujourd'hui.";
                var choices = [
                    ["Je consulte les profils", "00_home/01_tinder", "swipe"],
                    ["Je quitte", nameChapitre, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "swipe": function () {
                var text = "OUIN";
                var choices = [
                    ["Je consulte les profils", "00_home/01_tinder", "swipe"],
                    ["Je quitte", nameChapitre, "intro"],
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