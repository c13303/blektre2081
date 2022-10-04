process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Defense",
    folder: "00_home/01_defense",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;


        perso.choiceExit = {
            folder: folder,
            page: "intro"
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function (param) {


                var text = "Les Quatre Temps est tenue par <~BEZOS>.";

                var ADV = game.getPersoByRole("BEZOS");
                perso.adversaire = ADV.nom;


                var choices = [

                    ["Je <le/la/lae/PHARMACIEN> fume", "00_home/00_fume", "fume"],
                    ["Je sors", "00_home/01_defense", "intro__right"]
                ];

                var pa = [];
               
                if (param === 'left') {
                    var pa = [[1, perso.nom, "walk", {startX: 1, endX: 60}]];
                }
                if (param === 'right') {
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];
                }

                if (perso.adversaire) {
                    pa.push([2, perso.adversaire, "idle"]);
                }

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Quatre",
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








        };//endchap ============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================


        return chapitre[page](param);


    }//endpage
};//end module

