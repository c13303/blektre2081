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
            manche: function () {
                var mendiant = game.getRole(perso, 'manche_' + perso.station, true);
                if (mendiant) {
                    if (mendiant.nom !== perso.nom) {
                        //// MANCHE NOT YOU
                        return {
                            flush: 0,
                            text: "[" + mendiant.nom + '] fait déjà la manche ici.',
                            choices: [["baise", "00_global/metro", "intro"]]
                        }
                    } else {
                        /// MANCHE MANAGEMENT VIDAGE DE CHAPEAU
                        var amount = mendiant.earn;
                        perso.updateStat("money", amount);
                        game.gC.roles['manche_' + perso.station].earn = 0;
                        perso.log( "Vous récupérez " + amount + "€ dans votre chapeau de mendiant à la station " + perso.station);
                        return {
                            flush: 1,
                            text: "Vous videz les " + amount + "€ contenus dans votre chapeau.",
                            choices: [["byzance", "00_global/metro", "intro"]]
                        }
                    }
                } else {
                    // become the mendiant
                    var text = "Vous décidez de faire la manche dans cette station. Vous posez votre chapeau par terre et tentez d'accrocher le regard des gens, avec un air tantôt misérable, tantôt agressif.";
                    game.setRole(perso, 'manche_' + perso.station);

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