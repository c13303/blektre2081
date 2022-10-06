process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Periph",
    folder: "00_home/01_periphint",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;

        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "outfumed"
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {
                var place = "Periph Intérieur";
                game.gC.setInPlace(place, perso);
                perso.choiceExit = {
                    folder: "00_home/00_street",
                    page: "periph"
                };







                var random = game.gC.getSomeoneRandom(perso);

                var text = "Periphérique intérieur.";

                var choices = [
                    ["Sortie la Défense", "00_home/01_defense", "intro__left"],
                    ["Sortie Porte d'Ivry", "00_home/06_ivry", "intro"],
                    ["Je retourne vers la zonmai", "00_home/00_street", "TheSquare__right"]
                ];

                var phaserAnimation = [
                    [1, perso.nom, "head"]
                ];
                if (random && random.nom) {
                    perso.adversaire = random.nom;
                    phaserAnimation.push([2, random.nom, "head"]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00_home/00_fume", "embrouille"]);
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "PeriphInterieur",
                    phaseranimation: phaserAnimation

                };

            } //endscene()---------------------------------------------------------------------------



















            , "outfumed": function () {


                var text = "Ainsi va la vie";



                var choices = [
                    ["OK", folder, "intro"],
                ];

                return {
                    flush: 0,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------










        }; //endchap ============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================


        return chapitre[page](param);
    }//endpage
}; //end module

