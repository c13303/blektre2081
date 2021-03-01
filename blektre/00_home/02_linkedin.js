process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/02_linkedin",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;

        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                if (!perso.job) {
                    var text = "Vous êtes sur Linkedin.";
                    var choices = [
                        ["Je consulte les offres d'emploi", nameChapitre, "jobs"],
                        ["Je consulte les profils des chercheurs d'emploi", nameChapitre, "hire"],
                        ["Je quitte", folder + "/00_intro", "intro"],
                    ];
                } else {
                    var text = "Vous êtes sur Linkedin, sur lequel il est inscrit que vous avez déjà un job de " + perso.job;
                    var choices = [
                        ["Je quitte mon job de " + perso.job, nameChapitre, "quit"],
                        ["Je consulte les profils des chercheurs d'emploi", nameChapitre, "hire"],
                        ["Je quitte", folder + "/00_intro", "intro"],
                    ];
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "jobs": function () {
                var text = "Les offres d'emploi sont actualisées régulièrement.";
                var choices = [
                    ["Technicien de surface chez Laich&Q", nameChapitre, "technicien"],
                    ["Je retourne à l'accueil", nameChapitre, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "technicien": function () {
                var text = "Ce travail est payé 1$ de l'heure.";
                var choices = [
                    ["Je postule", nameChapitre, "technicien_ok"],
                    ["Je retourne à l'accueil", nameChapitre, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "technicien_ok": function () {
                var text = "Vous voilà officiellement embauché chez Laich&Q, la boîte de nettoyage urbain. Vous devez vous rendre au siège.";

                perso.places.push(["Laich&Q", "01_jobs/00_laichq"]);
                perso.job = "technicien de surface";
                game.notif(perso, "Vous devenez technicien de surface");

                game.updateChar(perso);

                var choices = [
                    ["Je sors de chez moi", "map", null],
                    ["Je retourne à l'accueil", nameChapitre, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

        }


        return chapitre[page]();



    }
}