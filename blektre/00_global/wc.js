process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_global/wc",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var text = "Vous voilà confortablement installé dans les cabinets.";
                var choices = [
                    ['Je regarde mon iPhune', folder, 'phone'],

                    [game.emojis.exit + " Je sors des WC", perso.choiceExit.folder, perso.choiceExit.page]

                ];

                return {
                    nointerrupt: true,
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }

            },
            "phone": function () {
                return {
                    flush: null,
                    text: "Quelle application allez vous faire de votre téléphone malin ?",
                    choices: [

                        [game.emojis.relationship + " Je vais sur Tinder", folder + "/01_tinder", "intro"],
                        [game.emojis.relationship + " Je regarde mon répertoire pour appeller quelqu'un", folder, "call"],
                        [game.emojis.exit + " J'éteinds le téléphone", perso.choiceExit.folder, perso.choiceExit.page]
                    ]
                }

            },
            "call": function () {


                var choices = [];
                for (const[name, value] of Object.entries(perso.relationships)) {
                    //   dynamic_selection.push();
                    choices.push([name, folder, "calling__" + value]);
                }
                choices.push([game.emojis.exit + "En fait, non", perso.choiceExit.folder, perso.choiceExit.page]);

                return {

                    flush: 1,
                    text: "Qui appellez-vous ?",
                    choices: choices
                }
            }

        }


        return chapitre[page]();
    }
}