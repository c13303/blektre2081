process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Pharmacie",
    folder: "01_periph/08_pharmacie",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;


        var medocslabels = {
            karma: "Homeopathie",
            sex: "Vasodilatateur",
            sanity: "Antidépresseurs"
        };
        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "outfumed",
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
                    ["Je voudrais des pilules", folder, "heal"],
                    ["Je voudrais tuer quelqu'un", folder, "boloss"],
                    //  ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"],
                    ["Je sors", "01_periph/04_ivry", "ivry__right"]
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



            , "heal": function (param = null) {


                var text = "<Il/Elle/Ielle/PHARMACIEN> s'absente un instant et revient poser des pilules de toutes les couleurs sur le comptoir.\n\
Lesquelles prenez-vous ?";
                if (param === 'back') {
                    var text = "- Lesquelles ?";
                }


                var choices = [
                    ["Homeopathie", folder, "healchoice__karma"],
                    ["Vasodilatateur", folder, "healchoice__sex"],
                    ["Antidépresseurs", folder, "healchoice__sanity"],
                    ["J'ai changé d'avis", folder, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "healchoice": function (param) {
                if (!param) {
                    console.log('ERROR : NO PARAM HEALCHOICE');
                    perso.send({erreur: "ERROR : NO PARAM HEALCHOICE"});
                    return this.intro();
                }

                var text = "Jai pas compris lol.";

                perso.aboutToBuy = param;
                perso.price = 10;
                if (param === 'karma') {
                    var text = "- Avec ça, vous aurez bonne conscience. A prendre n'importe quand, sans trop de risque ...";
                }

                if (param === 'sex') {
                    var text = "- Ah, ceux là, pour vos histoires intimes. Attention ! Pas plus de 3 par jour, sinon ... ";
                }

                if (param === 'sanity') {
                    var text = "-  Je me disais bien que vous aviez une tête de merde en entrant. Attention, ce médicament doit être pris tous les jours pour être efficace. Autrement ... ?";
                }



                text += "\
\n\
C'est " + perso.price + "€ pièce. Combien en voulez-vous ?\n\
";




                var choices = [
                    ['Je tape mon code de CB', folder, "healchoice2"],
                    ["J'ai changé d'avis", folder, "intro"],
                ];



                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    inputnb: 1,
                    text2: "\
\n\
<~PHARMACIEN> vous tend l'appareil à carte bleue."
                };

            } //endscene()---------------------------------------------------------------------------



            , "healchoice2": function () {

                /* valid nb */
                var qt = perso.textarea;
                if (!qt || isNaN(qt)) {
                    perso.send({erreur: "invalid Qt NaN"});
                    return this.intro();
                }

                /* qt negative */
                if (qt < 0) {
                    var text = "- <monsieur/madame/mademonsieur/SELF> est un petit malin, n'est-ce pas ?";
                    var choices = [
                        ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"],
                    ];
                    return {
                        flush: 1,
                        text: text,
                        choices: choices
                    };
                }

                /* price me */
                var price = 10 * qt;


                /* no money */
                if (price > perso.money) {
                    var text = "- Vous n'avez pas les " + price + "€ nécéssaires.\n\
<~PHARMACIEN> vous regarde avec mépris.";
                    var choices = [
                        ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"]
                    ];
                    return {
                        flush: 1,
                        text: text,
                        choices: choices
                    };
                }

                /* pay cash */
                var price = price * -1;
                perso.updateStat('money', price);
                perso.log('Vous achetez ' + qt + ' cachets de ' + medocslabels[perso.aboutToBuy]);


                /* end of transaction */

                var text = "- Deal. Autre chose ? ";

                var choices = [
                    ["Des pilules", folder, "heal__back"],
                    ["Autre chose", folder, "intro"],
                    ["Plus rien, je me casse", "01_periph/04_ivry", "ivry"],
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


                var text = "- Tirez-vous avant que j'appelle la police.";



                var choices = [
                    ["OK", "01_periph/04_ivry", "ivry__right"],
                    ["Je <le/la/lae/PHARMACIEN> fume", "00/fume", "fume"]
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

