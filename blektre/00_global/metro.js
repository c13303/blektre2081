process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Metro",
    folder: "00_home/metro",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;
        /* CHAPITRE */
        var chapitre = {
            intro: function () {
                var text = "Vous pénétrez les couloirs du métro, à la station <b>" + perso.station + '</b>';
                var choices = [];


                /* manche check */
                var mendiant = game.getRole(perso, 'manche_' + perso.station, true);
                if (!mendiant) {
                    choices.push(["Je fais la manche", "00_global/manche", "manche"]);
                } else {
                    if (mendiant.nom === perso.nom) {
                        text += '<br/><br/>Vous faites dans la manche dans cette station de métro. Il y a ' + mendiant.earn + '€ dans votre chapeau\n\
\n\
';
                        choices.push(["Je vide mon chapeau", "00_global/manche", "manche"]);
                    } else {
                        text += '<br/><br/>[' + mendiant.nom + '] fait la manche ici. En passant devant lui, vous sentez son regard culpabilisant se poser sur vous.';
                        var persoMendiant = game.gC.persos[mendiant.nom];

                        if (persoMendiant.karma > perso.karma) {
                            text += '<br/><br/>Vous cédez et lâchez 1€ dans son chapeau. El regarde la pièce avec un peu de dédain, et se met à ignorer votre présence.';
                            perso.updateStat('karma', 1);
                            perso.updateStat('money', -1);
                            mendiant.earn++;
                            perso.log('Vous lâchez 1€ à [' + mendiant.nom + ']');
                            persoMendiant.log('[' + mendiant.nom + '] vous lâche 1€');
                        } else {
                            text += '<br/><br/>Vous résistez et ignorez la créature suppliante.';
                            perso.updateStat('karma', -1);
                        }
                        choices.push(["J'agresse [" + mendiant.nom + "]", "00_global/embrouille", "embrouille_karma"]);
                    }
                }


                /* people check */
                var people = game.gC.getOtherPeopleHere("Metro", perso);
                for (var i = 0; i < people.length; i++) {
                    if (people[i] && !people[i].horsjeu) {
                        text += "<br/><br/>[" + people[i].nom + '] est là et vous regarde d\'un air arrogant. ';
                        choices.push(["Je demande à " + people[i].nom + " quel est son problème", "00_global/embrouille", "embrouille"]);
                        perso.adversaire = people[i].nom;
                        break;
                    }
                }



                choices.push(["Je monte dans la rame de métro", "map"]);
                choices.push(["Je sors (" + perso.station + ") ", perso.globalEndChoice.folder, perso.globalEndChoice.page]);

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "moving": function () {
                perso.upDaytime();
                var choices = [];
                /* le chemin de retour après la global phase */
                //  perso.globalEndChoice = ["D'accord", folder, "metro_arrivee"];

                perso.globalEndChoice = {
                    folder: folder,
                    page: "metro_arrivee"
                }



                var dest = require('../' + perso.dest + '.js');
                var text = "Le métro arrive à la station " + dest.name + ". Vous descendez de la rame. Que faites-vous ? ";

                perso.globalEndChoice.folder = perso.dest;
                perso.globalEndChoice.page = "intro";

                perso.station = dest.station;
                delete perso.dest;

                choices.push(["J'ère dans la station", "00_global/metro", "intro"]);
                choices.push(["Je sors (" + dest.name + ")", perso.globalEndChoice.folder, perso.globalEndChoice.page]);
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