process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Metro",
    folder: "00_global/metro",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;
        /* CHAPITRE */
        var chapitre = {
            intro: function () {

                if (!perso.station) {
                    console.log('PERSO.STATION IS MISSING !!!!!!!!!!!!! ERRROOOOOOOOOOOR');
                }

                perso.choiceExit.folder = folder;
                perso.choiceExit.page = "intro";


                var text = "Vous êtes dans les couloirs du métro, à la station <b>" + perso.station + '</b>';
                var choices = [];

                delete perso.adversaire;
                delete perso.adversaire_replace_mendiant_opportunity;

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
                            persoMendiant.log('[' + mendiant.nom + '] lâche 1€ dans votre chapeau');
                            persoMendiant.popup('[' + mendiant.nom + '] lâche 1€ dans votre chapeau');


                        } else {
                            text += '<br/><br/>Vous résistez et ignorez la créature suppliante.';
                            perso.updateStat('karma', -1);
                        }
                        perso.adversaire = mendiant.nom;
                        perso.adversaire_replace_mendiant_opportunity = mendiant.nom;
                        choices.push([game.emojis.agression + " J'agresse [" + mendiant.nom + "]", "00_global/embrouille", "embrouille_karma"]);
                    }
                }


                /* people check */
                if (!perso.adversaire) {
                    var people = game.gC.getOtherPeopleHere("Metro", perso);
                    for (var i = 0; i < people.length; i++) {
                        if (mendiant && people[i].nom !== mendiant.nom)
                            continue;
                        if (people[i] && !people[i].horsjeu && people[i].station === perso.station) {
                            text += "<br/><br/>[" + people[i].nom + '] est là et vous regarde d\'un air arrogant. ';
                            choices.push([game.emojis.aborde + "J'aborde " + people[i].nom + "", "00_global/embrouille", "contact"]);
                            perso.adversaire = people[i].nom;
                            break;
                        }
                    }
                }





                choices.push([">> " + game.emojis.world_map + " Je prends le métro", "map"]);
                choices.push([" " + game.emojis.street + "<< Je sors (" + perso.station + ") ", perso.metroExit.folder, perso.metroExit.page]);

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
                //  perso.choiceExit = ["D'accord", folder, "metro_arrivee"];




                var dest = require('../' + perso.dest + '.js');
                var text = "Le métro arrive à la station " + dest.name + ". Vous descendez de la rame. Que faites-vous ? ";


                perso.metroExit.folder = perso.dest;
                perso.metroExit.page = "intro";



                perso.station = dest.station;
                delete perso.dest;

                choices.push([">> " + game.emojis.metro_couloirs + " J'ère dans la station", "00_global/metro", "intro"]);
                choices.push([">> " + game.emojis.street + "  Je sors dans la rue de " + dest.name + " ", perso.metroExit.folder, perso.metroExit.page]);
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