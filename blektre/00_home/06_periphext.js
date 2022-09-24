process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Periph",
    folder: "00_home/06_periphext",
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
                var phaseranimation = [[1, perso.nom, "walk", [0, 0]]];
                perso.updateStat('life', -1);

                var text = "Vous êtes sur le périphérique extérieur. Ici les gaz d'échappements s'intensifient.";


                var choices = [

                    ["Je vais à l'église psychédélislaïque", "00_home/05_eglise", "intro"],
                    ["Je vais à la pharmacie", "00_home/08_pharmacie", "intro"],
                    ["Je retourne vers la Defense", "00_home/01_defense", "intro"],
                    ["Je m'enfonce dans la banlieue", "00_home/07_banlieue", "intro"],
                ];


                var random = game.gC.getSomeoneRandom(perso);
                if (random && random.nom) {
                    text += "\n\
" + random.bnom + " vous double en klaxonnant";
                    perso.adversaire = random;
                    phaseranimation.push([2,  perso.adversaire, "walk", [0, 0]]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00_home/00_fume", "embrouille"]);
                }
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Periph",
                    phaseranimation: phaseranimation
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

