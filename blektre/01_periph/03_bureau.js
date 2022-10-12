process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Bureau",
    folder: "01_periph/03_bureau",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;







        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {
            "intro": function (param = null) {
                return this.bureau(param);
            },

            "bureau": function (param = null) {




                if (perso.fired) {
                    var text = "Vous avez été viré. Vous n'avez rien à faire ici.";

                    var choices = [
                        ["Bye", "01_periph/02_parvis", "intro"]
                    ];

                    //pa = phaseranimation
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 75, endX: -50}]];

                    //exit

                    return {
                        
                        text: text,
                        choices: choices,
                        phaserscene: "Fired",
                        phaseranimation: pa
                    };
                }






                perso.updateStat('life', -1);
                game.gC.setInPlace("Bureau", perso);
                var text = "- Bonjour, vous avez rendez-vous ? \n\
La question vous stresse, et vous suez abondamment.";
                perso.log('Vous suez au travail');
                perso.updateStat('sanity', -2);

                var SECRETAIRE = game.getPersoByRole("SECRETAIRE");
                perso.adversaire = SECRETAIRE.nom;

                perso.choiceExit = {
                    folder: folder,
                    page: "reunionkicked"
                };

                var choices = [
                    ["Je <le/la/lae/SECRETAIRE> fume", "00/fume", "fume"],
                    ["Je fonce en réunion", folder, "reunion"],
                    //   ["Je vais à la machine à café", folder, "cafe"],

                    ["Je me tire", "01_periph/02_parvis", "intro"]
                ];

                if (perso.iscooling(perso.choiceExit.coolDownLabel)) {
                    choices[2] = ["(" + perso.iscooling(perso.choiceExit.coolDownLabel) + "m)", folder, "disabled"];
                }

                var adversaire = perso.getAdversaire();


                var pa = [
                    [1, perso.nom, "idle"],
                    [2, adversaire.nom, "idle"],
                ];
                if (param === 'left') {
                    pa[0] = [1, perso.nom, "walk", {startX: 1, endX: 60}];
                }

                return {
                    
                    text: text,
                    choices: choices,
                    phaserscene: "Bureau",
                    phaseranimation: pa
                };

            } //endscene()---------------------------------------------------------------------------



            , "reunion": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "Vous débarquez, suant, en salle de réunion. <~DIRECTOR> vous regarde à peine.\n\
- Ca suffit, <~SELF>, ce n'est plus la peine de revenir.";

                perso.choiceExit = {
                    folder: folder,
                    page: "reunionkicked"
                };

                var choices = [
                    ["Je ris", folder, "reunionkicked__sanity"],
                    ["Je pleure", folder, "reunionkicked__karma"],
                    ["Je <le/la/lae/DIRECTOR> fume", "00/fume", "fume"],
                ];



                return {
                    
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "reunionkicked": function () {

                var text = "Vous êtes viré.";

                perso.log('Vous vous êtes fait virer');
                perso.fired = 1;

                var choices = [
                    ["Bye", "01_periph/02_parvis", "intro"]
                ];



                //pa = phaseranimation

                var pa = [[1, perso.nom, "walk", {flipX: true, startX: 75, endX: -50}]];

                //exit

                return {
                    
                    text: text,
                    choices: choices,
                    phaserscene: "Fired",
                    phaseranimation: pa
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

