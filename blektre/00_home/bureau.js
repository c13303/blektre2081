process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_home/bureau",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;


        /* CHAPITRE */
        var chapitre = {

            intro: function () {
                return this.bureau();
            },
            bureau: function () {
                var text = "Vous êtes à votre bureau, constitué d'un vieux Maque et de piles de papiers de différentes tailles. Vous allumez le Maque."
                var choices = [
                    ["J'écris un roman", folder, "roman"],
                    //   ["Je consulte mes comptes bancaires", folder, "banque"],
                    ['Je regarde des vidéos sur internet', folder, "youtube"],
                    ["J'éteinds le Maque ", "00_home/00_intro", "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            roman: function () {

                if (perso.traits.romancier && perso.traits.romancier.title) {
                    var text = "Vous, Romancier niveau " + perso.traits.romancier.level + ", avez déjà un roman en cours de publication, titré <i>" + perso.traits.romancier.title + "</i>";
                    var choices = [
                        ["Je le froisse pour en écrire un autre", folder, "froisse"],
                        ["Je le garde pour le faire lire ", folder, "intro"],
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
                    ["... puisez votre inspiration dans la sensibilité de vos expériences", folder, "roman_sensibilite"],
                    /*   ["... dessinez un organe génital", folder, "roman_physique"],*/
                    ["... laissez tomber toute cette merde, bordel ", folder, "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    text2: text2,
                    choices: choices,
                    textarea: 1
                }
            },
            froisse: function () {
                var text = "Vous froissez le manuscrit.";
                delete perso.traits.romancier.title;
                itemTools.removeItem(perso, "roman");
                return {
                    text: text,
                    choices: [['OK', folder, "roman"]]
                }
            },
            roman_sensibilite: function () {

                if (!perso.traits.romancier) {
                    /* level romancier */
                    perso.updateTrait( "romancier", {
                        title: perso.textarea,
                        level: 1
                    }, "Vous écrivez un roman titré " + perso.textarea);
                    perso.addPlace("La Défense", "01_defense/00_intro");

                }



                if (perso.traits.romancier.level < 3) {
                    /* item roman */
                    itemTools.addItem(perso, "roman", 1, {
                        title: perso.textarea,
                        desc: "roman à chier",
                        value: 1
                    });
                    var text = "En tant que Romancier niveau " + perso.traits.romancier.level + ", vous sentez que votre roman, même s'il pourrait déjà être apporté à votre éditrice, est assez vide. Peut-être que si vous pouviez vivre des expériences émotionnelles intenses, vous pourriez y puiser votre inspiration.";

                } else {

                    /* item roman */
                    itemTools.addItem(perso, "roman", 1, {
                        title: perso.textarea,
                        desc: "roman moyen",
                        value: 2
                    });
                    var text = "";
                }





                var choices = [
                    ["Qui peut tester mon art ? ", folder, "intro"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            youtube: function () {
                perso.upDaytime();
                var text = "Vous passez une demi journée à regarder des vidéos de chatons et autres séquences d'ASMR.";
                perso.log( "Vous regardez Youtube pendant des heures");
                perso.updateStat("sanity", 1);
                var choices = [
                    ["Je me sens détendu et accompli", "00_home/00_intro", "intro"],
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