process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_global/embrouille",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {
                return this.embrouille();

            },

            "embrouille": function () {


                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = '[' + adversaire.nom + '] vous toise des pieds à la tête. El vous crache au visage.';
                text += '<br>-Pardon, maugrée-t-el.';


                choices.push(["Pas de raison de faire une embrouille, el s'est excusé·e ...", folder, "embrouille_echec"]);
                choices.push(["Je me mets en PLS", folder, "embrouille_sanity"]);
                choices.push(["Je gifle [" + adversaire.nom + "]", folder, "embrouille_karma"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"

                }
            },
            "embrouille_karma": function () {
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                if (!adversaire)
                    game.tools.fatal("EMBROUILLE KARMA NO ADVERSAIRE " + JSON.stringify(perso.adversaire));

                if (adversaire.karma >= perso.karma) {
                    /* LOSE */
                    var text = "Vous tentez de gifler [" + adversaire.nom + "] mais el esquive et vous vous étalez sur le sol, sans grâce.\n\
\n\
Vous décampez rapidement.";
                    perso.log("Vous avez été humilié·e par [" + adversaire.nom + "] ");
                    perso.updateStat("karma", 1);
                    var statnotif = adversaire.updateStat("karma", -1);
                    adversaire.interrupt("00_global/embrouille", "embrouille_passive_win", perso, statnotif);



                    choices.push(["Quelle humiliation", perso.choiceExit.folder, perso.choiceExit.page]);



                } else {
                    /* WIN */
                    var text = "Vous adressez une gifle franche sur la joue de [" + adversaire.nom + "], qui se met à pleurer.";
                    perso.log("Vous humiliez " + adversaire.nom + " ");

                    var statnotif = adversaire.updateStat("karma", 1);

                    perso.updateStat("karma", -1);

                    adversaire.interrupt("00_global/embrouille", "embrouille_passive_lose", perso, statnotif);
                    choices.push(["El l'a bien mérité.", perso.choiceExit.folder, perso.choiceExit.page]);


                }









                adversaire.horsjeu = true;


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"

                }
            },
            "embrouille_sanity": function () {
                var choices = [];

                var adversaire = game.gC.persos[perso.adversaire];
                var text = "Vous prenez la position latérale de sécurité que vous avez appris à l'école.";

                if (perso.karma > adversaire.karma) {
                    text += '\n\
[' + adversaire.nom + '] éclate en sanglots.';
                    perso.updateStat("sex", +5);
                    perso.updateStat("karma", -5);
                } else {
                    perso.updateStat("sex", -5);
                    text += '\n\
[' + adversaire.nom + '] éclate de rire.';
                }

                if (perso.traits.romancier) {
                    perso.traits.romancier.level++;
                    text += "<i>\n\
Vous êtes ému et vous sentez que vos talents de romancier s'aimeillorent ! Vous voilà Romancier niveau " + perso.traits.romancier.level + "</i>\n\
";
                }

                adversaire.horsjeu = true;
                delete perso.adversaire;


                choices.push(["Je sors", perso.choiceExit.folder, perso.choiceExit.page]);

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial",

                }
            },

            "embrouille_passive_win": function () {


                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Soudainement, vous croisez [' + adversaire.nom + '], qui essaie de vous gifler pour une raison mystérieuse. \n\
\n\
El rate et tombe lamentablement sur le sol.';
                choices.push(perso.getChoiceEndInterrupt("Pitoyable ... "));


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            },
            "embrouille_passive_lose": function () {


                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Soudainement, vous croisez [' + adversaire.nom + ']. El vous gifle. ';




                choices.push(perso.getChoiceEndInterrupt(":'("));


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            }

        }


        return chapitre[page]();



    }
}