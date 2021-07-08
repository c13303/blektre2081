process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Parc",
    folder: "00_home/parc",
    station: "Parc",

    getPage: function (ws, page = "intro") {

        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            intro: function () {

                var text = "";
                if (perso.daytime === 0)
                    text += "C'est <b>le matin</b>.";
                if (perso.daytime === 1)
                    text += "C'est <b>l'après-midi</b>.";
                if (perso.daytime === 2)
                    text += "C'est <b>la nuit</b>.";


                text += "\n\Vous êtes au parc.";



                perso.choiceExit = {
                    folder: folder,
                    page: "intro"
                };


                var choices = [
                    ["Je procède à un moment d'instrospection", folder, "introspection"],
                    ["J'entre dans la station de métro", "00_global/metro", "intro"]
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            introspection: function () {
                if (perso.iscooled("introspection_au_parc")) {
                    var text = "Vous réalisez qu'il ne vous reste que X années à vivre et que vous n'avez rien accompli de grand. Il serait temps de faire quelque chose, comme devenir riche, ou trouver l'amour.";
                    text+= perso.updateStat("karma", 1);
                    perso.log("Vous procédez à un moment d'introspection positif");
                    perso.cool('introspection_au_parc', 50, "Vous songez au parc");
                    var choices = [
                        ["J'ai trop raison, je crois en moi", folder, "intro"],
                    ];
                } else {
                    var text = "Vous marchez dans une crotte de chien et un pigeon vous chie dessus en même temps.";
                    text+= perso.updateStat("karma", 1);
                    perso.log("Vous procédez à un moment d'introspection positif");
                    perso.cool('introspection_au_parc', 3, "Vous songez au parc");
                    var choices = [
                        ["J'ai trop raison, je crois en moi", folder, "intro"],
                    ];
                }




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

