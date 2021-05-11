process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Street",
    folder: "00_home/street",
    station: "Rue Street",

    getPage: function (ws, page = "intro") {

        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            intro: function () {

                var text = "";
                if (perso.daytime === 0)
                    text += "C'est <b>le matin</b>.";
                if (perso.daytime === 1)
                    text += "C'est <b>l'après-midi</b>.";
                if (perso.daytime === 2)
                    text += "C'est <b>la nuit</b>.";


                text += "\n\Vous êtes dans la rue, en bas de votre immeuble.";



                perso.globalEndChoice = {
                    folder: folder,
                    page: "intro"
                }


                var choices = [
                    ["Je rentre à la maison", "00_home/00_intro", "intro"],
                    ["Je prends le métro", "00_global/metro", "intro"]
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

