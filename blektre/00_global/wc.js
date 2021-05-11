process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_global/wc",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var text = "Vous voilà confortablement installé dans les cabinets.";
                var choices = [
                    ['Je me change', folder, "change"],
                    ['Je regarde mon iPhune', folder, 'phone'],
                    ["Je procède à un moment d'introspection", folder, "introspection"],
                    ["Je sors des WC", perso.globalEndChoice.folder, perso.globalEndChoice.page]

                ];

                return {
                    nointerrupt: true,
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }

            },
            "change": function () {
                var text = "Que voulez-vous porter ?";
                var choices = [
                    ["Des vêtements normaux", folder, "change_normal"],
                    ["Des vêtements ridicules", folder, "change_ridicule"],
                ];
                return {
                    flush: null,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },

            "change_normal": function () {
                var text = "Vous mettez ces habits tristement banals, que vous mettez depuis toujours.";
                perso.updateTrait("ridicule", null, "Vous vous habillez normalement.");

                var choices = [
                    ["La vie est une plage", folder, "intro"],
                ];
                return {
                    flush: null,
                    text: text,
                    choices: choices
                }
            },
            "change_ridicule": function () {
                var text = "Vous décidez, subitement, de porter un de ces horribles bonnet que portent les jeunes gens aisés de la cité. C'est généralement une bonne garantie pour s'attirer des ennuis.";
                perso.updateTrait("ridicule", 1, "Vous vous habillez avec ridicule.");
                var choices = [
                    ["Il n'auront pas ma liberté de penser", folder, "intro"],
                ];

            },
            "phone": function () {
                return {
                    flush: null,
                    text: "Quelle application allez vous faire de votre téléphone malin ?",
                    choices: [

                        ["Je vais sur Tinder", folder + "/01_tinder", "intro"],
                        //   ["Je vais sur LinkedIn", folder + "/02_linkedin", "intro"],
                        ["J'appelle quelqu'un", folder, "call"],
                        ["J'éteinds le téléphone", perso.globalEndChoice.folder, perso.globalEndChoice.page]
                    ]
                }

            },
            "introspection": function () {
                return {
                    flush: null,
                    text: "Quelle application allez vous faire de votre téléphone malin ?",
                    choices: [["J'éteinds le téléphone", perso.globalEndChoice.folder, perso.globalEndChoice.page]]
                }
            }

        }


        return chapitre[page]();



    }
}