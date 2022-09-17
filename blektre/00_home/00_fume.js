process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Blektre_is_not_UNIX",
    folder: "00_home/00_street",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "fume": function () {

                if (!perso.adversaire) {
                    console.log(perso.nom + 'MAINFUME ERROR NO ADVERSAIRE');
                }

                if (!perso.choiceExit) {
                    console.log(perso.nom + " MAINFUME ERROR NO CHOICEEXIT");
                }


                if (perso.karma > perso.adversaire.karma) {
                    var text = "Vous approchez de <~ADVERSAIRE> et lui adressez un prompt coup de boule sur le nez. <Il/Elle/Elles/~ADVERSAIRE> s'écroule sur le sol, en sang.\n\
<Il/Elle/Elles/~ADVERSAIRE> en aura pour 10 tours d'ITT. \n\
";

                    perso.updateStat('karma', -10);
                    perso.adversaire.updateStat('karma', +5);
                    perso.log("Vous adressez un prompt coup de boule à " + perso.adversaire.bnom);
                    perso.adversaire.log(perso.bnom + " vous adresse un prompt coup de boule");
                    perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");

                    var choices = [
                        ["Ca lui apprendra", perso.choiceExit.folder, perso.choiceExit.page]
                    ];

                    // perso interruption
                } else {
                    var text = "Vous approchez de <~ADVERSAIRE> et tentez de <le/la/lae/~ADVERSAIRE> frapper, mais <Il/Elle/Elles/~ADVERSAIRE> esquive tel le pigeon dans l'enfer des villes; en retour, <Il/Elle/Elles/~ADVERSAIRE> vous adresse un prompt coup de boule sur le nez. \n\
Vous vous écroulez sur le sol, en sang. <~ADVERSAIRE> vous urine dessus en riant, avant de s'éloigner.";

                    perso.updateStat('karma', +5);
                    perso.updateStat('life', -25);
                    perso.adversaire.log("Vous adressez un prompt coup de boule à " + perso.adversaire.bnom);
                    perso.log(perso.bnom + " vous adresse un prompt coup de boule");
                    // perso interruption

                    var choices = [
                        ["Je ramasse mes dents", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }





                if (perso.choiceExit.coolDownLabel) {
                    perso.cool(perso.choiceExit.coolDownLabel, perso.choiceExit.coolDownTime);
                }

                delete perso.choiceExit;

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

