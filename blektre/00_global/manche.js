process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_home/manche",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;


        /* CHAPITRE */
        var chapitre = {

            intro: function () {
                return this.manche();
            },
            replace_mendiant: function () {



                var nom_mendiant = game.gC.roles['manche_' + perso.station].nom;
                if (perso.adversaire_replace_mendiant_opportunity !== nom_mendiant) {
                    return {
                        flush: 1,
                        text: "Quelqu'un a été plus rapide que vous ! [" + nom_mendiant + "] a pris la place de [" + perso.adversaire_replace_mendiant_opportunity + "] pendant que vous lui administriez une rouste. ",
                        choices: [
                            ["Tant pis", "00_global/metro", "intro"],
                        ],
                        phaserscene: "Dial"
                    }
                }
                var adversaire = game.gC.persos[nom_mendiant];
                adversaire.interrupt("00_global/manche", "mendiant_being_replaced", perso, null, {"station": "votre place de mendiant à la station " + perso.station});
                game.gC.roles['manche_' + perso.station].nom = null;
                return this.manche();
            },
            mendiant_being_replaced: function () {
                /* il est normal pour les interruption davoir un adversaire */
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var data = perso.lastInterruptData.data;
                var text = 'Après vous avoir agressé·e pendant que vous faisiez la manche, [' + adversaire.nom + '] vous fait décamper et prend ' + data.station;
                //  delete perso.lastInterruptData;
                choices.push(perso.getChoiceEndInterrupt(":'("));

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            },
            manche: function () {
                var mendiant = game.getRole(perso, 'manche_' + perso.station, true);
                if (mendiant) {
                    if (mendiant.nom !== perso.nom) {
                        //// MANCHE NOT YOU
                        return {
                            flush: 0,
                            text: "[" + mendiant.nom + '] fait déjà la manche ici.',
                            choices: [
                                ["Tant pis", "00_global/metro", "intro"],
                            ]
                        }
                    } else {
                        /// MANCHE MANAGEMENT VIDAGE DE CHAPEAU
                        var amount = mendiant.earn;
                        text+= perso.updateStat("money", amount);
                        game.gC.roles['manche_' + perso.station].earn = 0;
                        perso.log("Vous récupérez " + amount + "€ dans votre chapeau de mendiant à la station " + perso.station);
                        return {
                            flush: 1,
                            text: "Vous videz les " + amount + "€ contenus dans votre chapeau.",
                            choices: [["byzance", "00_global/metro", "intro"]]
                        }
                    }
                } else {
                    // become the mendiant
                    var text = "Vous décidez de faire la manche dans la station <" + perso.station + ">. Vous posez votre chapeau par terre et tentez d'accrocher le regard des gens, avec un air tantôt misérable, tantôt agressif.\n\
\n\
Vous pourrez régulièrement venir ici pour récupérer le contenu de votre chapeau.";
                    game.setRole(perso, 'manche_' + perso.station, 0, 1, "dans le chapeau de mendiant à la station <" + perso.station + ">");

                    var choices = [
                        ["byzance", "00_global/metro", "intro"]
                    ];
                    return {
                        flush: 1,
                        text: text,
                        choices: choices
                    }
                }






            }


        }


        return chapitre[page]();



    }
}