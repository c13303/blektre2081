process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/00_intro",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            "disclaimer": function () {

                var text = "Bienvenue dans Blektre 2081, simulateur de vie du futur. En continuant, vous acceptez la collecte (...) de (...) données, et respectez les règles de la netiquette.";

                var choices = [
                    ["J'accepte tout et je respecte la netiquette", nameChapitre, "intro"],
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
                    ["J'allume mon téléphone malin", nameChapitre, "telephone"],
                    ["J'écris un roman", nameChapitre, "roman"],
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

                if (game.hasTrait(perso, "romancier")) {
                    var text = "Vous avez déjà un roman en cours de publication, titré <i>" + game.hasTrait(perso, "romancier") + "</i>";
                    var choices = [
                        ["Qui peut tester mon art ? ", nameChapitre, "intro"],
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
                    ["... puisez votre inspiration dans la sensibilité de vos expériences", nameChapitre, "roman_sensibilite"],
                    ["... dessinez un organe génital", nameChapitre, "roman_physique"],
                    ["... laissez tomber toute cette merde, bordel ", nameChapitre, "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    text2: text2,
                    choices: choices,
                    textarea: 1
                }
            }

            , roman_sensibilite: function () {
                var text = "Vos expériences émotives sont assez plates depuis que vous avez vécu une romance avec un extra-terrestre d'une dimension parallèle dans simulation VR sous drogues psychédéliques. Il vous faudrait probablement expérimenter de nouvelles choses.\n\
 En attendant, la nouvelle que vous avez pondu paraît fade et impersonnelle. \n\
Vous songer nonobstant à l'apporter à devant votre éditrice, sur un malentendu, vous pourriez la faire publier, et ainsi gagner quelques deniers.";

                /* level romancier */
                game.updateTrait(perso, "romancier", perso.textarea, "Vous écrivez un roman titré " + perso.textarea);

                /* item roman */
                itemTools.addItem(perso, "roman mauvais", 1, {
                    title: perso.textarea
                });



                var choices = [
                    ["Qui peut tester mon art ? ", nameChapitre, "intro"],
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

