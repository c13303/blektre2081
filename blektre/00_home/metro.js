process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Metro",
    folder: "00_home",
    chapitre: "/metro",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;
        var dest = require('../' + perso.dest + '.js');


        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var choices = [];



                var text = "Vous êtes dans le métro, en direction de " + dest.name + ". ";

                var people = game.gC.getOtherPeopleHere("Metro", perso);

                if (people[0]) {
                    text += people[0].nom + ' est là et vous regarde d\'un air arrogant.';
                    choices.push(["Je demande à " + people[0].nom + " quel est son problème", nameChapitre, "embrouille"]);
                    perso.adversaire = people[0].nom;
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
                var text = adversaire.nom + ' vous toise des pieds à la tête. Il vous crache au visage.';
                text += '<br>-Pardon, maugrée-t-il.';




                choices.push(["Pas de raison de faire une embrouille, il s'est excusé ...", nameChapitre, "embrouille_echec"]);
                choices.push(["Je lui fais la morale", nameChapitre, "embrouille_sanity"]);
                choices.push(["Je lui éclate sa tronche", nameChapitre, "embrouille_physique"]);


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
                var text = "Vous vous éloignez, penaud, tandis que " + adversaire.nom + " vous prend en photo avec son iPhone en rigolant";
                game.notif(perso, adversaire.nom + " vous méprise dans le métro");
                game.updateStat(perso, "sex", -50);

                choices.push(["Je sors du métro à destination", perso.dest, "intro"]);






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