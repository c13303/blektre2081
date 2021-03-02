process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/01_tinder",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
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
                 //   flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "swipe": function () {
                var people = game.gC.people;
                var browsing = [];
                for (const[key, value] in Object.entries(game.gC.persos)) {
                    browsing.push(key);
                }
                perso.browsing = 0;

                var text = "S'affiche sur l'écran le profil de " + perso;
                var choices = [

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