process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Pharmacie",
    folder: "00_home/08_pharmacie",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;

        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "outfumed",
            coolDownLabel: this.name + "choiceExit",
            coolDownTime: 1
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {


                var text = "La pharmacie est tenue par PHARMACIEN.";

                var PHARMACIEN = game.getPersoByRole("PHARMACIEN");
                perso.adversaire = PHARMACIEN.nom;


                var choices = [

                    ["Je <le/la/lae/PHARMACIEN> fume", "00_home/00_fume", "fume"],
                    ["Je sors", "00_home/06_ivry", "ivry__right"]
                ];

                var pa = [
                    [1, perso.nom, "idle"],
                    [2, perso.adversaire, "idle"]
                ];

                if (param === 'left') {
                    pa[0] = [1, perso.nom, "walk", {startX: 1, endX: 50}];
                }

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Pharmacie",
                    phaseranimation: pa
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

