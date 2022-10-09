process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Pharmacie",
    folder: "01_periph/08_pharmacie",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;

        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "outfumed",
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {


                var text = "La pharmacie est tenue par <~PHARMACIEN>. Vous avez l'air de le déranger. \n\
- Que puis-je pour vous ?";

                var PHARMACIEN = game.getPersoByRole("PHARMACIEN");
                perso.adversaire = PHARMACIEN.nom;


                var choices = [
                    //  ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"],
                    ["Je sors", "01_periph/04_ivry", "ivry__right"]
                ];


                //pa = phaseranimation

                var pa = [[1, perso.nom, "idle"]];
                if (param === 'left') {
                    var pa = [[1, perso.nom, "walk", {startX: 1, endX: 60}]];
                }
                if (param === 'right') {
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];
                }
                if (perso.adversaire) {
                    pa.push([2, perso.adversaire, "idle"]);
                }

                //exit

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

