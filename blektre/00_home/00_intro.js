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

                var text = "Bienvenue dans Blektre 2081, simulateur de vie du futur. En continuant, vous acceptez la collecte (...) de (...) données.";

                var choices = [
                    ["ok", nameChapitre, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            /* PAGE */
            "intro": function () {
                var text = "Vous êtes chez vous. Vous n'avez pas de meubles. Dehors il pleut. ";
                if (perso.job === "technicien de surface") {
                    text = "Vous êtes chez vous, vêtu de votre habit tâché de technicien de surface. Une odeur nauséabonde plane autour de vous."
                }
                var choices = [
                    ["J'allume mon téléphone malin", nameChapitre, "telephone"],
                    ["Je sors", "map"]
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

        }


        return chapitre[page]();



    }
}