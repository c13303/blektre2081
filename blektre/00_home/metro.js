process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Metro",
    folder: "00_home",
    chapitre: "/metro",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;
        var dest = require('../' + perso.dest + '.js');


        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var choices = [];



                var text = "Vous êtes dans le métro, en direction de " + dest.name + ". ";

                var people = game.gC.getOtherPeopleHere("Metro", perso);

                for (var i = 0; i < people.length; i++) {
                    if (people[i] && !people[i].horsjeu) {
                        text += people[i].nom + ' est là et vous regarde d\'un air arrogant. ';
                        choices.push(["Je demande à " + people[i].nom + " quel est son problème", ppath, "embrouille"]);
                        perso.adversaire = people[i].nom;
                        break;
                    }
                }


                choices.push(["Je sors du métro à destination", perso.dest, "intro"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "embrouille": function () {
                var choices = [];

                var adversaire = game.gC.persos[perso.adversaire];
                var text = adversaire.nom + ' vous toise des pieds à la tête. El vous crache au visage.';
                text += '<br>-Pardon, maugrée-t-el.';


                choices.push(["Pas de raison de faire une embrouille, el s'est excusé·e ...", ppath, "embrouille_echec"]);
                choices.push(["Je me mets en PLS", ppath, "embrouille_sanity"]);
                choices.push(["Je lui éclate sa tronche", ppath, "embrouille_physique"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            }
            ,
            "embrouille_echec": function () {
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = "Vous vous éloignez, penaud, tandis que " + adversaire.nom + " vous prend en photo avec son iPhone en rigolant.";



                text += '<br/>Le métro arrive à votre destination';
                game.notif(perso, adversaire.nom + " vous méprise dans le métro");
                game.updateStat(perso, "sex", -1);

                choices.push(["Je sors du métro", perso.dest, "intro"]);

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            "embrouille_sanity": function () {
                var choices = [];

                var adversaire = game.gC.persos[perso.adversaire];
                var text = "Vous prenez la position latérale de sécurité que vous avez appris à l'école.";

                if (perso.karma > adversaire.karma) {
                    text += '\n\
' + adversaire.nom + ' éclate en sanglots.';
                    game.updateStat(perso, "sex", +5);
                    game.updateStat(perso, "karma", -5);
                } else {
                    game.updateStat(perso, "sex", -5);
                    text += '\n\
' + adversaire.nom + ' éclate de rire.';
                }

                if (perso.traits.romancier) {
                    perso.traits.romancier.level++;
                    text += "<i>\n\
Vous êtes ému et vous sentez que vos talents de romancier s'aimeillorent ! Vous voilà Romancier niveau " + perso.traits.romancier.level + "</i>\n\
";
                }




                adversaire.horsjeu = true;
                delete perso.adversaire;

                text += '<br/>Le métro arrive à votre destination';

                choices.push(["Je sors du métro", perso.dest, "intro"]);

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