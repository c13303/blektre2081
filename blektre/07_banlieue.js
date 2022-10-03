process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../game/game.js');
var itemTools = require('./../game/objets/itemsTools.js');
module.exports = {
    name: "Periph Ext",
    folder: "06_periphext",
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


                var text = "Periph ext";

                perso.choiceExit = {
                    folder: folder,
                    page: "periph",
                    coolDownLabel: "periph_fuming",
                    coolDownTime: 1
                };

                var choices = [

                    ["Je vais à l'église Psycho", "05_eglise", "intro"],
                    ["Je retourne vers la Defense", "01_defense", "intro"],
                    ["Je m'enfonce dans la banlieue", "01_defense", "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------





            , "suicide": function () {
                game.gC.setInPlace("Eglise", perso);
                var text = "- J'en ai marre de la vie.\n\
     Le Râhel sourit. \n\
- Tu tombes bien, nous avons un programme parfait pour mourir en toute sérénité. \n\
__PAUSE__\n\
- Le processus est très simple : il suffit de donner tout ton argent.\n\
Vous avez l'impression que c'est une arnaque. \n\
__PAUSE__\n\
Cependant, le Rahelle ajoute quelque chose : \n\
- Ce n'est pas une arnaque, si vous vous venez me réclamer votre argent dans une prochaine vie, je vous le rendrais intégralement. Vous me faites confiance, désormais, n'est-ce-pas ? ";

                var choices = [

                    ["J'accepte", folder, "suicide"],
                    ["Je suis venu chercher l'argent d'une personnée décédée", folder, "argent"],
                    ["Je refuse poliment et je m'en vais", "06_periphext", "intro"],
                    ["Je <le/la/lae/RAEL> fume", "00_fume", "fume"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,

                };
            } //endscene()---------------------------------------------------------------------------


            , "argent": function () {
                game.gC.setInPlace("Eglise", perso);
                var text = "- De qui êtes-vous venu chercher l'argent ? \n\
            INPUT \n\
";

                var choices = [

                    ["J'accepte", folder, "argent2"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,

                };
            } //endscene()---------------------------------------------------------------------------


            , "argent2": function () {
                game.gC.setInPlace("Eglise", perso);
                var text = "Ce nom ne me dit rien. Vous êtes sûr de vous etre suicidé à l'église ? ";

                var choices = [
                    ["Je recommence", folder, "argent"],
                    ["Je laisse tomber", "06_periphext", "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,

                };
            } //endscene()---------------------------------------------------------------------------

            , "argent3": function () {
                var defunt = "[defuntwip]";
                game.gC.setInPlace("Eglise", perso);
                var text = "- C'est vous ? Hahaha, j'en étais sûr ! Voilà votre argent, au centime près !\n\
Le Rahel vous remet l'intégratité de l'argent que " + defunt + " a laissé en mourrant.";

                var choices = [

                    ["Je suis riche", "06_periphext", "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,

                };
            } //endscene()---------------------------------------------------------------------------

            , "fuming_de_rael": function () {

                var text = "Vous quittez l'église.";

                var choices = [

                    ["Je suis riche", "06_periphext", "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,

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
