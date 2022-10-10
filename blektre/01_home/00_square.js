process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

/*
 * 
 *  Minimaliste version
 */

module.exports = {

    folder: "01_home/00_home",

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

            "intro": function (param = null) {
                var place = "Square Manuel Valls";
                game.gC.setInPlace(place, perso);
                perso.choiceExit = {
                    folder: "01_home/00_square",
                    page: "intro"
                };




                perso.updateStat('life', -1);



                var text = "Square Manuel Valls. Dehors, le bruit des voitures rend la communication avec les autres assez difficile.\n\
Où allez-vous ?";

                var choices = [
                    ["Je monte sur le périph", "01_periph/01_peripherique", "intro"],
                    ["Je rentre à la zonmai", folder, "intro2__right"]
                ];

                var phaserAnimation = [
                    [1, perso.nom, "walk", {endX: 60}]
                ];

                if (param === 'right') {
                    var phaserAnimation = [
                        [1, perso.nom, "walk", {startX: 138, startY: 60, endX: 113, flipX: true}]
                    ];

                }

                /* the random encounter */
                var random = game.gC.getSomeoneRandom(perso);
                if (random && random.nom) {
                    perso.adversaire = random.nom;
                    text += "\n\
<~ADVERSAIRE> passe par là et vous ignore avec dédain.";
                    phaserAnimation.push([2, random.nom, "idle"]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00/fume", "embrouille"]);
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Square",
                    phaseranimation: phaserAnimation

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

