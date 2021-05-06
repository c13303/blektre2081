process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_global",
    chapitre: "/wc",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var text = "Une fois bien enfermé dans les toilettes, vous contemplez votre téléphone.";
                var choices = [
                    ['Je me change', ppath, "change"],
                    ["Je vais sur Tinder", folder + "/01_tinder", "intro"],
                    ["Je vais sur LinkedIn", folder + "/02_linkedin", "intro"],
                ];


                choices.push(perso.globalEndChoice);
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }

            },
            "change": function () {
                var text = "Que voulez-vous porter ?";
                var choices = [
                    ["Des vêtements normaux", ppath, "change_normal"],
                    ["Des vêtements ridicules", ppath, "change_ridicule"],
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
                game.updateTrait(perso, "ridicule", null, "Vous vous habillez normalement.");

                var choices = [
                    ["La vie est une plage", ppath, "intro"],
                ];
                return {
                    flush: null,
                    text: text,
                    choices: choices
                }
            },
            "change_ridicule": function () {
                var text = "Vous décidez, subitement, de porter un de ces horribles bonnet que portent les jeunes gens aisés de la cité. C'est généralement une bonne garantie pour s'attirer des ennuis.";
                game.updateTrait(perso, "ridicule", 1, "Vous vous habillez avec ridicule.");
                var choices = [
                    ["Il n'auront pas ma liberté de penser", ppath, "intro"],
                ];
                return {
                    flush: null,
                    text: text,
                    choices: choices
                }
            },
        }


        return chapitre[page]();



    }
}