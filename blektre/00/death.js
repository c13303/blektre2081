process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Death",
    folder: "00/death",
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


                var text = "Vous êtes mort.";
                var choices = [
                    //  ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"],
                    ["J'envoie de l'argent sur Paypal pour ressuciter", folder, "resurrect"]
                ];
                //pa = phaseranimation

                var pa = [[1, perso.nom, "lay"]];
                //exit

                return {
                    
                    text: text,
                    choices: choices,
                    phaseranimation: pa,
                    phaserscene: "Duel"
                };
            } //endscene()---------------------------------------------------------------------------



           





            , "resurrect": function () {

                perso.updateStat("life", "resussitation");

                perso.updateLife(100, true);



                var text = "Envoyez une donation sur le Paypal erreure@gmail.com s'il vous plaît.";
                var choices = [
                    //  ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"],
                    ["C'est fait", "01_home/00_home", "intro"]
                ];




                return {
                    
                    text: text,
                    choices: choices,
                };
            } //endscene()---------------------------------------------------------------------------



            , "outfumed": function () {


                var text = "Ainsi va la vie";
                var choices = [
                    ["OK", folder, "intro"],
                ];
                return {
                    noflush: 1,
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

