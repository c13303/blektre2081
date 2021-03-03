process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/00_intro",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            "disclaimer": function () {

                var text = "Bienvenue dans Blektre 2081, simulateur de vie du futur. En continuant, vous acceptez la collecte (...) de (...) données, et respectez les règles de la netiquette.";

                var choices = [
                    ["J'accepte tout et je respecte la netiquette", ppath, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            /* PAGE */
            "intro": function () {
                var text = "Nous sommes le 2 mars 2081, il est 8 heures du matin. Vous êtes chez vous, dans la grande tour d'habitation du Blektre. Vous n'avez pas de meubles. Dehors il pleut. Vous ne le savez pas mais vous avez sûrement une maladie grave quelque part. \n\
Enfin, il faudrait faire quelque chose de votre existence. Mais quoi ? ";

                if (perso.job === "technicien de surface") {
                    text = "Vous êtes chez vous, vêtu de votre habit tâché de technicien de surface. Une odeur nauséabonde plane autour de vous."
                }

                var choices = [
                    ["J'allume mon téléphone malin", ppath, "telephone"],
                    ["J'écris un roman", ppath, "roman"],
                    ["Je prends le métro au rez-de-chaussée", "map"]
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            "telephone": function () {

                var text = "Vous effectuez le geste de déverouillage de l'écran de votre iPhone dernier cri";
                var choices = [
                    ["Je vais sur Tinder", folder + "/01_tinder", "intro"],
                    ["Je vais sur LinkedIn", folder + "/02_linkedin", "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }

            }




            , roman: function () {

                if (perso.traits.romancier && perso.traits.romancier.title) {
                    var text = "Vous, Romancier niveau " + perso.traits.romancier.level + ", avez déjà un roman en cours de publication, titré <i>" + perso.traits.romancier.title + "</i>";
                    var choices = [
                        ["Je le froisse pour en écrire un autre", ppath, "froisse"],
                        ["Je le garde pour le faire lire ", ppath, "intro"],
                    ];
                    return {
                        text: text,
                        choices: choices
                    }
                }

                var text = "Vous prenez votre plus belle plume dans Photoshop et commencez à écrire.<br/>\n\
Comment nommez-vous votre roman ?";
                var text2 = "<br/>Fort de ce titre, vous ....";
                var choices = [
                    ["... puisez votre inspiration dans la sensibilité de vos expériences", ppath, "roman_sensibilite"],
                    ["... dessinez un organe génital", ppath, "roman_physique"],
                    ["... laissez tomber toute cette merde, bordel ", ppath, "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    text2: text2,
                    choices: choices,
                    textarea: 1
                }
            }
            , froisse: function () {
                var text = "Vous froissez le manuscrit.";
                delete perso.traits.romancier.title;
                return {
                    text: text,
                    choices: [['OK', ppath, "roman"]]
                }
            }

            , roman_sensibilite: function () {

                if (!perso.traits.romancier) {
                    /* level romancier */
                    game.updateTrait(perso, "romancier", {
                        title: perso.textarea,
                        level: 1
                    }, "Vous écrivez un roman titré " + perso.textarea);
                }



                if (perso.traits.romancier.level < 3) {
                    /* item roman */
                    itemTools.addItem(perso, "roman", 1, {
                        title: perso.textarea,
                        desc: "roman à chier",
                        value: 1
                    });
                    var text = "En tant que Romancier niveau " + perso.traits.romancier.level + ", vos expériences émotives sont assez plates depuis que vous avez vécu une romance avec un extra-terrestre d'une dimension parallèle dans simulation VR sous drogues psychédéliques, mais si vous pouviez vivre de <i>vraies</i> choses, vous pourriez retrouver l'émotion romantique qui vous caractérise. \n\
 En attendant, vous avez écrit une histoire fade et impersonnelle. \n\
Vous songer nonobstant à l'apporter à devant votre éditrice, sur un malentendu, vous pourriez la faire publier, et ainsi gagner quelques deniers.";

                } else {

                    /* item roman */
                    itemTools.addItem(perso, "roman", 1, {
                        title: perso.textarea,
                        desc: "roman moyen",
                        value: 2
                    });
                    var text = "En tant que Romancier niveau " + perso.traits.romancier.level + ", vous avez vécu des douleurs incomensurables lors de votre piteuse existence. Cet terreau noir nourrit votre plume, et vous redigez un roman enflammé, dans lequel une personne " + game.gC.races[perso.type] + " comme vous se prend de passion pour une personne  " + game.gC.races[game.gC.rules.oppressed] + " racisée et opprimée, avant d'être obligé de l'abandonner dans son pays en guerre pour devenir trader à New York.";
                }





                var choices = [
                    ["Qui peut tester mon art ? ", ppath, "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            }

        }


        return chapitre[page]();



    }
}

