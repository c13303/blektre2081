process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Eglise",
    folder: "01_periph/05_eglise",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;

        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "fuming_de_rael"
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {
                game.gC.setInPlace("Eglise", perso);
                var text = "Vous êtes dans le lieu de culte. <Le Râhel/La Râhelle/Lae Rähelles/RAEL>, <affairé/affairée/affairés/RAEL> dans le bénitier, s'interrompt pour vous accueillir.\n\
- Bienvenue à toi, petite brebis mal garée. Que pouvons-nous faire pour toi ? ";

                var RAEL = game.getPersoByRole("RAEL");
                perso.adversaire = RAEL.nom;

                var choices = [

                    ["J'en ai marre de la vie", folder, "suicide"],
                    ["J'ai besoin d'argent", folder, "argent"],
                    ["Je <le/la/lae/RAEL> fume", "00/fume", "fume"],
                    ["Je me tire", "01_periph/04_ivry", "ivry__right"]
                ];





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




                return {
                    
                    text: text,
                    choices: choices,
                    phaserscene: "Eglise",
                    phaseranimation: pa
                };
            } //endscene()---------------------------------------------------------------------------








            , "suicide": function () {
                var text = "- J'en ai marre de la vie.\n\
     <Le Râhel/La Râhelle/Lae Rähelles/RAEL> sourit. \n\
- Tu tombes bien, nous avons un programme parfait pour mourir en toute sérénité.";

                var choices = [
                    ["Ho", folder, "suicideX2"]
                ];
                return {
                    
                    text: text,
                    choices: choices

                };
            } //endscene()---------------------------------------------------------------------------


            , "suicideX2": function () {

                var text = "- Le processus est très simple : il suffit de donner tout ton argent.";

                var choices = [
                    ["C'est une arnaque ?", folder, "suicideX3"]
                ];
                return {
                    
                    text: text,
                    choices: choices

                };
            } //endscene()---------------------------------------------------------------------------




            , "suicideX3": function () {
                var text = "- Non, ce n'est pas une arnaque, si vous vous venez me réclamer votre argent dans une prochaine vie, je vous le rendrais intégralement. Vous me faites confiance, désormais, n'est-ce-pas ? ";

                var choices = [
                    ["J'accepte", folder, "suicideaction"],
                    ["Je suis venu pour récupérer l'argent d'une personnée suicidée", folder, "argent"],
                    ["Je n'ai plus envie de mourir", "01_periph/04_ivry", "intro"],
                    ["Je <le/la/lae/RAEL> fume", "00/fume", "fume"]
                ];
                return {
                    
                    text: text,
                    choices: choices

                };
            } //endscene()---------------------------------------------------------------------------



            , "suicideaction": function () {
                var text = "- Très bien, fermez les yeux ...\n\
<Le Râhel/La Râhelle/Lae Rähelles/RAEL> marmonne quelque chose. Vous sentez une petite piqûre, et vous ne vous rappellez plus très bien de la suite ...";
                perso.updateLife(-1000);
                perso.log('Vous vous suicidez à l\'église');
                game.gC.suicides[perso.nom] = perso.money;

                var choices = [
                    ["Wow ...", "00/death", "intro"]
                ];
                return {
                    
                    text: text,
                    choices: choices

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
                    
                    text: text,
                    choices: choices,

                };
            } //endscene()---------------------------------------------------------------------------


            , "argent2": function () {
                game.gC.setInPlace("Eglise", perso);
                var text = "Ce nom ne me dit rien. Vous êtes sûr de vous etre suicidé à l'église ? ";

                var choices = [
                    ["Je recommence", folder, "argent"],
                    ["Je laisse tomber", "01_periph/04_ivry", "intro"],
                ];
                return {
                    
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

                    ["Je suis riche", "01_periph/04_ivry", "intro"],
                ];
                return {
                    
                    text: text,
                    choices: choices,

                };
            } //endscene()---------------------------------------------------------------------------

            , "fuming_de_rael": function () {

                var text = "Vous quittez l'église.";

                var choices = [
                    ["Vroum", "01_periph/04_ivry", "ivry__right"]
                ];
                return {
                    
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

