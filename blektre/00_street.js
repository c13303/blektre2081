process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../game/game.js');
var itemTools = require('./../game/objets/itemsTools.js');

/*
 * 
 *  Minimaliste version
 */

module.exports = {

    folder: "00_street",

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

            intro: function () {
                game.gC.setInPlace("Zonmai", perso);


                if (!perso.milestones.number_of_times_I_went_home) {
                    perso.milestones.number_of_times_I_went_home = 0;
                }
                perso.milestones.number_of_times_I_went_home++;
                var text = "Vous êtes dans votre nouvel appartement. \n\
Vous contemplez par la fenêtre le périphérique interieur aérien supérieur, et son balet de voitures.\n\
Si vous ne vous dépêchez pas, vous serez en retard au travail.";
                var choices = [
                    ["Je vérifie mes likes sur Instagram", folder, "instagram"],
                    //    ["Je décroche le téléphone", folder, "tel_permis"],
                    ["Je m'habille  et j'y vais", folder, "TheSquare"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Home",
                    phaseranimation: [[1, perso.nom, "lay", [0, 0]]]

                };
            }//endscene()---------------------------------------------------------------------------

            , intro2: function () {
                game.gC.setInPlace("Zonmai", perso);

                perso.milestones.number_of_times_I_went_home++;
                if (perso.milestones.number_of_times_I_went_home === 3) {

                }
                var text = " Vous êtes dans votre salon. Ca sent très fort le biodiesel. <~DJ_tube>, le dernier tube de <~DJ>, se fait entendre par la fenêtre. ";

                var choices = [
                    ["Je me couche", folder, "dodo"],
                    ["Je vérifie mes likes sur Instagram", folder, "instagram"],
                    //   ["Je décroche le téléphone", folder, "tel_permis"],
                    ["Je sors de chez moi", folder, "TheSquare"]
                ];

                var phaserAnimation = [
                    [1, perso.nom, "idle", [0, 0]]
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Home",
                    phaseranimation: phaserAnimation
                };
            }//endscene()---------------------------------------------------------------------------








            , "TheSquare": function () {
                var place = "Square Manuel Valls";
                game.gC.setInPlace(place, perso);
                perso.choiceExit = {
                    folder: "00_street",
                    page: "TheSquare"
                };




                perso.updateStat('life', -1);


                var random = game.gC.getSomeoneRandom(perso);

                var text = "Square Manuel Valls. Dehors, le bruit des voitures rend la communication avec les autres assez difficile.\n\
Où allez-vous ?";

                var choices = [
                    ["Je monte sur le périph", "01_periphint", "intro"],
                    ["Je rentre à la zonmai", folder, "intro2"]
                ];

                var phaserAnimation = [
                    [1, perso.nom, "walk", [0, 0]]
                ];
                if (random && random.nom) {
                    perso.adversaire = random.nom;
                    phaserAnimation.push([2, random.nom, "walk", [0, 0]]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00_fume", "embrouille"]);
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Square",
                    phaseranimation: phaserAnimation

                };

            } //endscene()---------------------------------------------------------------------------









            , "tel": function () {
                var text = "L'écran de votre Iphone TDC 455 s'illumine. En fond d'écran, une photo de vous de quand vous aviez encore des cheveux. ";

                var choices = [

                    ["Je poste un selfie", folder, "selfie"],
                    ["Je range ce maudit téléphone", folder, "intro2"]

                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "tel",
                };

            }//endscene()---------------------------------------------------------------------------
            , "instagram": function () {
                var text = "Vous avez un like. <Un/Une/Uns/INFLUENCE> <certain/certaine/certaines/INFLUENCE> <~INFLUENCE>";

                var choices = [
                    ["Je visite son profil", folder, "instacontact"],
                    ["Je poste un selfie", folder, "selfie"],
                    ["Je range ce maudit téléphone", folder, "intro2"]

                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "tel",
                };

            }//endscene()---------------------------------------------------------------------------

            , "instacontact": function () {
                var text = "Vous parcourez rapidement son flux de photos, habilement habillé de selfies dans lesquelles <~INFLUENCE> se met en valeur dans des poses suggestives.  \n\
Soudain, votre pouce dérape et vous likez une photo sans faire exprès. ";

                var choices = [
                    ["Je retire le like", folder, "instacontact2__retire"],
                    ["Je laisse le like", folder, "instacontact2__like"],
                    ["Je lui envoie un message privé", folder, "instacontact2__pm"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "tel",
                };

            } //endscene()---------------------------------------------------------------------------

            , "selfie": function () {
                if (perso.iscooling('selfie')) {
                    var text = "Votre selfie précédent est encore en story. Il n'y a pas de nouveaux like. C'est la preuve concrète que personne ne pense à vous.";
                    var choices = [
                        ["J'aime", folder, "tel"],
                    ];
                    return {
                        flush: 1,
                        text: text,
                        choices: choices,
                        phaserscene: "tel",
                    };
                }



                var text = "Vous posez dans la salle de bain, en petite tenue, avec un pied posé sur le rebord de la cuvette des WC. Vous orientez votre bassin vers l'arrière, plissez vos lèvres et tenez la pose tandis que votre pouce déclenche la prise de cliché. Vous contemplez le résultat : en appliquant quelques filtres, tel que le lissage de peau deux point zéro, virtual botox, et auto-jouvence de Givenchie, vous dissimulez vos imperfections et votre début de dermite.";
                if (perso.karma > 0) {
                    text += "\n\
Le résultat est impeccable. Il n'y a plus qu'à attendre les like. ";
                    perso.updateStat("sex", 10);
                    perso.log('Vous prenez un selfie');
                } else {
                    text += "\n\
Le résultat est abominable.  ";
                    perso.updateStat("sex", -10);
                    perso.log('Vous prenez un selfie raté');
                }

                perso.cool("selfie", 1);


                var choices = [
                    ["J'aime", folder, "tel"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "tel",
                };

            } //endscene()---------------------------------------------------------------------------







            , "instacontact2": function (param) {

                if (param === 'retire') {
                    var text = "Vous ôtez le like. Mais vous songez au fait qu'<il/elle/ielle/INFLUENCE> aurait pu vu la notification malgré tout. ";
                }
                if (param === 'like') {
                    var text = "Vous laissez le like, tel un signe du destin.";
                }
                if (param === 'pm') {
                    var text = "- Yop.\n\
Le message passe immédiatement en vu.";

                }



                var choices = [
                    ["OK ...", folder, "intro2"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "tel",
                };

            }//endscene()---------------------------------------------------------------------------







            , "dodo": function () {

                if (perso.life < 0) {
                    var text = "Vous êtes mort, du coup vous n'arrivez pas à dormir.";
                    var choices = [
                        ["OK ...", folder, "intro2"]
                    ];
                    return {
                        flush: 1,
                        text: text,
                        choices: choices,
                        phaserscene: "tel"
                    };
                } else {

                    var text = "Vous dormez.";

                    perso.updateStat("life", +50);
                    perso.updateStat("sex", +10);
                    perso.updateStat("karma", +10);
                    perso.updateStat("sanity", +10);
                    perso.updateStat("jour", +1);

                    perso.log('Vous dormez');

                    var choices = [
                        ["OK ...", folder, "intro2"]
                    ];


                    return {
                        flush: 1,
                        text: text,
                        choices: choices,
                        phaserscene: "Nuit",
                        phaseranimation: [[1, perso.nom, "lay", [0, 0]]]};
                }





            }//endscene()---------------------------------------------------------------------------

















        };//endchap ============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================


        return chapitre[page](param);


    }//endpage
};//end module

