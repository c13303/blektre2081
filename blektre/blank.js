
process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');


/*
 *  DOOR : &#128663;
 *  CAR : &#128663;
 *  BUILDING : &#127961;&#65039;
 */

module.exports = {
    getPage: function (ws, page = "intro") {

        /* HERE IS THE PLACE */
        ws.current_perso.targetplace = "la defense";
        var nameChapitre = "02_ladefense/01_intro_defense";

        /* DEFAULT CHOICE */
        var perso = ws.current_perso;


        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var text = "Vous êtes dans le quartier de la Défense, qui consiste en un labyrinthe de béton dans lequel se croisent les âmes damnées de la finance.";


                var choices = [
                    [
                        "Je retourne à la ma voiture",
                        nameChapitre, "voiture"
                    ],
                    [
                        "Je vais au boulot",
                        nameChapitre, "boulot"
                    ],
                ];




                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            /* PAGE */
            "voiture": function () {
                var text = "Vous êtes dans votre Skoda.";
                var choices = [
                    ["Je sors de la voiture", nameChapitre, "intro"],
                    ["Je rentre à la maison", "00_home/00_intro", "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            /* PAGE */
            "voiture": function () {
                var text = "Vous êtes dans votre Skoda.";
                var choices = [
                    ["Je sors de la voiture", nameChapitre, "intro"],
                    ["Je rentre à la maison", "00_home/00_intro", "intro"],
                ];

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