process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
module.exports = {
    name: "Periph",
    folder: "01_periph/01_peripherique",
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
                var place = "Periph Intérieur";
                game.gC.setInPlace(place, perso);
                perso.choiceExit = {
                    folder: "01_home/00_home",
                    page: "periph"
                };

                var text = "Periphérique intérieur.";
                var choices = [
                    ["Sortie la Défense", folder, "porteladefense__left"],
                    ["Sortie Porte d'Ivry", "01_periph/04_ivry", "intro"],
                    ["Je continue sur la Rocade", "02_rocade/01_rocade", "intro"],
                    ["Je retourne vers la zonmai", "01_home/00_square", "intro__right"]
                ];
                var phaserAnimation = [
                    [1, perso.nom, "head"]
                ];


                /* the random encounter */
                /*
                 var random = game.gC.getSomeoneRandom(perso);
                 if (random && random.nom) {
                 perso.adversaire = random.nom;
                 phaserAnimation.push([2, random.nom, "head"]);
                 choices.push(["J'embrouille  <~ADVERSAIRE>", "00/fume", "embrouille"]);
                 }
                 */

                /* random version full embrouille */
                var random = game.gC.getSomeoneRandom(perso);
                if (random && random.nom) {
                    var de = getRandomInt(0, 6);
                    if (de > 1) {
                        return this.randomEmbrouille();
                    }
                }



                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "PeriphInterieur",
                    phaseranimation: phaserAnimation

                };
            } //endscene()---------------------------------------------------------------------------







            , "randomEmbrouille": function () {

                var text = "Vous roulez sur le périphérique quand soudain la bagnole de <~ADVERSAIRE> vous rentre dedans !\n\
C'est sans appel, il a bugné votre caisse.";
                var choices = [
                    ["Je le fume", "00/fume", "fume"]
                ];




                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Bugne",
                    phaseranimation: phaserAnimation

                };
            } //endscene()---------------------------------------------------------------------------





















            , "porteladefense": function () {

                var text = "Porte de la Défense. Du talon, le soleil écrase le goudron";

                /* new place */
                var place = "Porte la Défense";
                game.gC.setInPlace(place, perso);


                /* default exit */
                perso.choiceExit.page = "porteladefense";


                /* choices base */
                var choices = [
                    //  ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"],
                    ["Je descends sur le parvis", "01_periph/02_parvis", "intro__left"],
                    ["Je remonte sur le peripherique", folder, "intro__right"]
                ];

                /* pa phaseranimation base  */
                var pa = [[1, perso.nom, "idle"]];
                if (param === 'left') {
                    var pa = [[1, perso.nom, "walk", {startX: 30, endX: 75}]];
                }
                if (param === 'right') {
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];
                }




                /* the random encounter */
                var random = game.gC.getSomeoneRandom(perso);
                if (random && random.nom) {
                    perso.adversaire = random.nom;
                    text += "\n\
<~ADVERSAIRE> passe par là et vous ignore avec dédain.";
                    pa.push([2, random.nom, "idle"]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00/fume", "embrouille"]);
                }


                //exit
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Porteladefense",
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

