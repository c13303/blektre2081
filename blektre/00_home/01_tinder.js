process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    getPage: function (ws, page = "intro") {

        /* HERE IS THE PLACE */
        ws.current_perso.place = "Home";
        var folder = "00_home";
        var nameChapitre = folder + "/01_tinder";


        /* DEFAULT CHOICE */
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var text = "Vous êtes sur Tinder. La photo de votre profil, qui de l'ange l'antique beauté a, n'est pas représentative de la réalité.";
                var choices = [
                    ["Je consulte les profils", "00_home/01_tinder", "swipe"],
                    ["Je quitte", folder + "/00_intro", "intro"],
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
                    ["Je quitte", folder + "/00_intro", "intro"],
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