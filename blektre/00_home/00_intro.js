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
                perso.loyer = {
                    amount: 100,
                    days: 28,
                }
                perso.daytime = 0;

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
                var text = "";
                if (perso.daytime === 0)
                    text += "C'est le matin.";
                if (perso.daytime === 1)
                    text += "C'est l'après-midi.";
                if (perso.daytime === 2)
                    text += "C'est la nuit.";


                text += "\n\Vous êtes chez vous, dans la grande tour d'habitation du Blektre.";


                // loyer
                var restant = perso.loyer.amount - perso.money;
                
                if (restant > 0)
                    text += "\n\Il vous reste " + perso.loyer.days + " jours pour trouver les " + restant + "€ qui manquent pour payer votre loyer. ";


                text += "\n\Que faire ?";

                if (perso.job === "technicien de surface") {
                    text = "Vous êtes chez vous, vêtu de votre habit tâché de technicien de surface. Une odeur nauséabonde plane autour de vous."
                }


                perso.globalEndChoice = ["Je sors des WC", ppath, "intro"];
                
                var choices = [
                    ['Je me change', ppath, "change"],
                    ["Je vais aux WC", "00_global/wc", "intro"],
                    ["J'écris un roman", ppath, "roman"],
                    ["Je prends le métro au rez-de-chaussée", "map"]
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
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
                    choices: choices
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
                    /*   ["... dessinez un organe génital", ppath, "roman_physique"],*/
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
                itemTools.removeItem(perso, "roman");
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
                    game.addPlace(perso, "La Défense", "01_defense/00_intro");

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

