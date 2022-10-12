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


                if (perso.isDailyTafDone) {
                    return this.dailyTafDone();
                }





                perso.updateStat('life', -1);
                game.gC.setInPlace("Bureau", perso);
                var text = "- Bonjour, vous avez rendez-vous ? \n\
La question vous stresse, et vous suez abondamment.";
                perso.log('Vous suez au travail');
                perso.updateStat('sanity', -2);

                var SECRETAIRE = game.getPersoByRole("SECRETAIRE");
                perso.adversaire = SECRETAIRE.nom;
                SECRETAIRE.updateStat('sex', +1);

                perso.choiceExit = {
                    folder: folder,
                    page: "reunionkicked"
                };

                var choices = [

                    ["Je fonce en réunion", folder, "reunion"],
                    //       ["J'embrouille <le/la/lae/SECRETAIRE> secrétaire", "00/fume", "embrouille"],
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

            , dailyTafDone: function () {
                var text = "<~SELF>, la réunion du jour a déjà eu lieu, dit <~DIRECTOR>. Reviens demain. ";


                var DIRECTOR = game.getPersoByRole("DIRECTOR");
                perso.adversaire = DIRECTOR.nom;

                var choices = [
                    ["Oh", "01_periph/02_parvis", "intro"]
                ];

                var pa = [
                    [1, perso.nom, "idle"],
                    [2, perso.adversaire, "idle"]
                ];

                //exit

                var choices = [

                    ["Je me tire", "01_periph/02_parvis", "intro"]
                ];

                var pa = [
                    [1, perso.nom, "idle"],
                    [2, perso.adversaire, "idle"],
                ];
                if (param === 'left') {
                    pa[0] = [1, perso.nom, "walk", {startX: 1, endX: 20}];
                }

                return {

                    text: text,
                    choices: choices,
                    phaserscene: "Reunion",
                    phaseranimation: pa
                };

            } //endscene()---------------------------------------------------------------------------


            , "reunion": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "La réunion se passe à fond. <~DIRECTOR> vous donne une tape dans le dos.\n\
- Allez va, t'as bien bossé.";
                perso.makeStep("allerAuTaf");
                perso.updateLife(-20);
                perso.updateSanity(-20);
                perso.updateMoney(7);
                perso.isDailyTafDone = 1;

                var directeur = game.getPersoByRole("DIRECTOR");
                perso.adversaire = directeur.nom;


                perso.choiceExit = {
                    folder: folder,
                    page: "reunionkicked"
                };

                var choices = [
                    ["Je <le/la/lae/DIRECTOR> fume", "00/fume", "fume"],
                    ["Je me tire", "01_periph/02_parvis", "intro"]
                ];

                var pa = [
                    [1, perso.nom, "idle"],
                    [2, perso.adversaire, "idle"],
                ];
                if (param === 'left') {
                    pa[0] = [1, perso.nom, "walk", {startX: 1, endX: 20}];
                }

                return {

                    text: text,
                    choices: choices,
                    phaserscene: "Reunion",
                    phaseranimation: pa
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

