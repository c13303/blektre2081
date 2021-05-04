process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/02_linkedin",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;

        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                if (!perso.job) {
                    var text = "La page d'accueil de Linkedin apparaît dans un beau cadre bleu <i>corporate</i>.";
                    var choices = [
                        ["Je consulte les offres d'emploi", ppath, "jobs"],
                        ["Je consulte les profils des chercheurs d'emploi", ppath, "hire"],
                        ["Je quitte", folder + "/00_intro", "intro"],
                    ];
                } else {
                    var text = "Vous êtes sur Linkedin, sur lequel il est inscrit que vous avez déjà un job de " + perso.job;
                    var choices = [
                        ["Je quitte mon job de " + perso.job, ppath, "quit"],
                        ["Je consulte les profils des chercheurs d'emploi", ppath, "hire"],
                        ["J'éteins le tel", folder + "/00_intro", "intro"],
                    ];
                }


                return {
                    // flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },
            "jobs": function () {
                var text = "Les offres d'emploi sont actualisées régulièrement.";
                var choices = [
                    ["Technicien de surface à la Défense", ppath, "technicien"],
                    ["J'éteins le tel", folder + "/00_intro", "intro"],
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
                    ["Je postule", ppath, "technicien_ok"],
                    ["J'éteins le tel", folder + "/00_intro", "intro"],
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
                game.notif(perso, "Vous devenez technicien de surface");

                game.updateChar(perso);

                var choices = [
                    ["J'éteins le tel", folder + "/00_intro", "intro"],
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