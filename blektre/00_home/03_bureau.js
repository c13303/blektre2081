process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Bureau",
    folder: "00_home/03_bureau",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;







        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {
            "intro": function () {
                this.bureau();
            },
            
            
            
            
            
            
            "bureau": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "- Bonjour, vous avez rendez-vous ? \n\
La question vous stressez, et vous suez abondamment.";
                perso.log('Vous suez au travail');
                perso.updateStat('sanity', -2);

                perso.adversaire = game.getPersoByRole('SECRETAIRE');

                perso.choiceExit = {
                    folder: folder,
                    page: "reunionkicked",
                    coolDownLabel: "fuming_de_secretaire",
                    coolDownTime: 1
                };

                var choices = [
                    ["Je <le/la/lae/SECRETAIRE> fume", "00_home/00_fume", "fume"],
                    ["Je fonce en réunion", folder, "reunion"],
                    //   ["Je vais à la machine à café", folder, "cafe"],

                    ["Je me tire", "00_home/01_defense", "intro"]
                ];

                if (perso.iscooling(perso.choiceExit.coolDownLabel)) {
                    choices[2] = ["(" + perso.iscooling(perso.choiceExit.coolDownLabel) + "m)", folder, "disabled"];
                }

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Bureau",
                    phaseranimation: [
                        [1, perso.nom, "idle", [0, 0]],
                        [2, perso.adversaire.nom, "idle", [0, 0]],
                    ]
                };

            } //endscene()---------------------------------------------------------------------------



            , "reunion": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "Vous débarquez, suant, en salle de réunion. <~DIRECTOR> vous regarde à peine.\n\
- Ca suffit, <~SELF>, ce n'est plus la peine de revenir.";

                perso.choiceExit = {
                    folder: folder,
                    page: "reunionkicked",
                    coolDownLabel: "fuming_de_patron",
                    coolDownTime: 1
                };

                var choices = [
                    ["Je ris", folder, "reunionkicked__sanity"],
                    ["Je pleure", folder, "reunionkicked__karma"],
                    ["Je <le/la/lae/DIRECTOR> fume", "00_home/00_fume", "fume"],
                ];



                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "reunionkicked": function () {

                var text = "Vous êtes viré.";

                perso.log('Vous vous êtes fait virer');

                var choices = [
                    ["Bye", "00_home/01_defense", "intro"]
                ];



                return {
                    flush: 1,
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

