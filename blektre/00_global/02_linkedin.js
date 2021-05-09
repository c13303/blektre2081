process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "",
    folder: "00_home/02_linkedin",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                if (!perso.job) {
                    var text = "La page d'accueil de Linkedin apparaît dans un beau cadre bleu <i>corporate</i>.";
                    var choices = [
                        ["Je consulte les offres d'emploi", folder, "jobs"],
                        ["Je consulte les profils des chercheurs d'emploi", folder, "hire"],
                        ["Je quitte", folder, "intro"],
                    ];
                } else {
                    var text = "Vous êtes sur Linkedin, sur lequel il est inscrit que vous avez déjà un job de " + perso.job;
                    var choices = [
                        ["Je quitte mon job de " + perso.job, folder, "quit"],
                        ["Je consulte les profils des chercheurs d'emploi", folder, "hire"],
                        ["J'éteins le tel", this.folder + "/00_intro", "intro"],
                    ];
                }


                return {
                    // flush: 1,
                    nointerrupt: true,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },
            "jobs": function () {
                var text = "Les offres d'emploi sont actualisées régulièrement.";
                var choices = [
                    ["Technicien de surface à la Défense", folder, "technicien"],
                    ["J'éteins le tel", this.folder + "/00_intro", "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },
            "technicien": function () {
                var text = "Ce travail consiste à se promener affublé d'un costume ridicule en ramassant les saletés des gens. C'est payé 1€ de l'heure.";
                var choices = [
                    ["Je postule", folder, "technicien_ok"],
                    ["J'éteins le tel", "00_home/00_intro", "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },
            "technicien_ok": function () {
                var text = "Vous voilà officiellement technicien de surface pour la ville. Vous devez vous rendre à la Défense pour prendre votre balayette et votre costume ridicule.";
                game.addPlace(perso, "La Défense", "01_defense/00_intro");

                perso.job = "technicien de surface";
                game.log(perso, "Vous devenez technicien de surface");

                game.updateChar(perso);

                var choices = [
                    ["J'éteins le tel", "00_home/00_intro", "intro"],
                    ["Je prends le métro", "map", null],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },

        }


        return chapitre[page]();



    }
}