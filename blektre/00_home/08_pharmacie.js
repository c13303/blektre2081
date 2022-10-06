process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Pharmacie",
    folder: "00_home/08_pharmacie",
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


                var text = "La pharmacie est tenue par <~PHARMACIEN>. Vous avez l'air de le déranger. \n\
- Que puis-je pour vous ?";

                var PHARMACIEN = game.getPersoByRole("PHARMACIEN");
                perso.adversaire = PHARMACIEN.nom;


                var choices = [
                    ["J'ai mal au mike", folder, "heal"],
                    ["J'ai la jeu-ra ", folder, "boloss"],
                    //  ["Je <le/la/lae/PHARMACIEN> fume", "00_home/00_fume", "fume"],
                    ["Je sors", "00_home/06_ivry", "ivry__right"]
                ];

                //pa = phaseranimation

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
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Pharmacie",
                    phaseranimation: pa
                };

            } //endscene()---------------------------------------------------------------------------



            , "heal": function (param) {


                var text = "- Hm j'ai bien quelques pilules pour ça.\n\
Ielle s'absente un instant et revient poser des cachets de toutes les couleurs sur le comptoir.\n\
Lesquels prenez-vous ?";
                if (param === 'back') {
                    var text = "- Lesquelles ?";
                }


                var choices = [
                    ["Homeopathie", folder, "healchoice__blanches"],
                    ["Vasodilatateur", folder, "healchoice__rouges"],
                    ["Antidépresseurs", folder, "healchoice__vertes"],
                    ["J'ai changé d'avis", folder, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "healchoice": function (param) {


                var text = "- C'est 10€ pièce. Combien en voulez-vous ?";

                var choices = [
                    ['OK', folder, "healchoice2"],
                    ["J'ai changé d'avis", folder, "intro"],
                ];



                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    inputnb: 1,
                    text2: "\
<~PHARMACIEN> vous tend l'appareil à carte bleue."
                };

            } //endscene()---------------------------------------------------------------------------



            , "healchoice2": function (param) {

                var price = 10 * param;

                if (price > perso.money) {
                    var text = "- Vous n'avez pas les " + price + "€ nécéssaires.\n\
<~PHARMACIEN> vous regarde avec mépris.";
                    var choices = [
                        ["Je <le/la/lae/PHARMACIEN> fume", "00_home/00_fume", "fume"]
                    ];
                    return {
                        flush: 0,
                        text: text,
                        choices: choices
                    };
                }


                perso.us('money', price * -1);


                var text = "- Deal. Autre chose ? ";

                var choices = [
                    ["Des pilules", folder, "heal__back"],
                    ["Autre chose", folder, "intro"],
                    ["Plus rien, je me casse", "06_ivry", "ivry"],
                ];

                var choices = [
                    ["Deal", folder, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------













            , "boloss": function () {


                var text = "- ???";



                var choices = [
                    ["OK", folder, "intro"],
                ];

                return {
                    flush: 0,
                    text: text,
                    choices: choices
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

