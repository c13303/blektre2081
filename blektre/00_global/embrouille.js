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
            "contact": function () {
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Vous approchez de [' + adversaire.nom + ']. Son allure est arrogante et réveille le complexe d\'inférioté que vous traînez depuis la fois où votre mère vous a oublié sur le parking du super U.';
                //text += '<br>-Pardon, maugrée-t-el.';


                choices.push(["Je fais une remarque désobligeante", folder, "embrouille"]);
                choices.push(["Je lui fais un compliment", folder, "compliment"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"

                }
            },

            "embrouille": function () {


                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = '[' + adversaire.nom + '] vous toise des pieds à la tête. Il vous crache au visage.';
                text += '<br>-Oops, pardon, dit-il.';


                choices.push(["Pas de raison de faire une embrouille, il s'est excusé ...", folder, "embrouille_echec"]);
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
                    var text = "Vous tentez de gifler [" + adversaire.nom + "], mais el intercepte votre geste, et en profite pour vous botter le derrière.";
                    perso.log("Vous avez été humilié·e par [" + adversaire.nom + "] ");
                    text+= perso.updateStat("karma", 1);
                    var statnotif = adversaire.updateStat("karma", -1);
                    adversaire.interrupt("00_global/interruptions", "embrouille_passive_win", perso, statnotif);
                    choices.push(["Quelle humiliation", perso.choiceExit.folder, perso.choiceExit.page]);



                } else {
                    /* WIN */
                    var text = "Vous adressez une gifle franche sur la joue de [" + adversaire.nom + "], qui se met à pleurer.";
                    perso.log("Vous humiliez " + adversaire.nom + " ");

                    var statnotif = adversaire.updateStat("karma", 1);

                    text+= perso.updateStat("karma", -1);

                    adversaire.interrupt("00_global/interruptions", "embrouille_passive_lose", perso, statnotif);



                    choices.push(["C'est bien mérité.", perso.choiceExit.folder, perso.choiceExit.page]);

                    if (perso.adversaire_replace_mendiant_opportunity === adversaire.nom) {


                        choices.push(["Je prends sa place de mendiant", "00_global/manche", "replace_mendiant"]);
                    }

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
                    text+= perso.updateStat("sex", +5);
                    text+= perso.updateStat("karma", -5);
                } else {
                    text+= perso.updateStat("sex", -5);
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
            "embrouille_echec": function () {
                var choices = [];

                var adversaire = game.gC.persos[perso.adversaire];
                var text = "Vous essuyez le glaviot de votre veston, en bredouillant quelque chose autour du fait que c'est un accident, que ça arrivez, puis vous saluez poliment [" + adversaire.nom + "] avant de vous éloigner.";


                choices.push(["Je sors", perso.choiceExit.folder, perso.choiceExit.page]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            }


            , "compliment": function () {
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Vous souriez à [' + adversaire.nom + '], et le recoiffez négligemment. \n\
\n\
';
                if (perso.relationships[adversaire.nom] && perso.relationships[adversaire.nom] < 0) {
                    perso.log("[" + adversaire.nom + "] vous déteste !");
                    adversaire.interrupt("00_global/interruptions", "seduce_passive_lose", perso);

                    return this.embrouille();
                }

                if (perso.sex >= adversaire.sex) {
                    text += "Il soupire, puis vous donne son 06.";
                    text += "<br/><br/>- Appelle-moi bientôt, dit-il d'un air blasé.";
                    adversaire.interrupt("00_global/interruptions", "seduce_passive_win", perso);
                    adversaire.log("Vous lâchez votre 06 à [" + adversaire.nom + "]");
                    perso.updateRelationship(adversaire, 1);
                    choices.push(["On dirait bien que je vais pécho", perso.choiceExit.folder, perso.choiceExit.page]);
                    return {
                        flush: 1,
                        text: text,
                        choices: choices,
                        phaserscene: "Dial"
                    }
                } else {
                    perso.log("Vous échouez à séduire [" + adversaire.nom + "]");
                    adversaire.interrupt("00_global/interruptions", "seduce_passive_lose", perso);

                    return this.embrouille();
                }




            }

        }


        return chapitre[page]();



    }
}