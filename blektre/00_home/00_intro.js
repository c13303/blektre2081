process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home/00_intro",

    getPage: function (ws, page = "intro") {

        var perso = ws.current_perso;
        var folder = this.folder;

        perso.choiceExit = {
            folder: folder,
            page: "intro"
        }

        perso.metroExit = {
            folder: folder,
            page: "intro"
        }
        
        

        /* CHAPITRE */
        var chapitre = {
            disclaimer: function () {

                var text = "Bienvenue dans Blektre 2081, simulateur de vie du futur. En continuant, vous acceptez la collecte de vos données, et respectez les règles de la netiquette.";



                var choices = [
                    ["J'accepte tout et je respecte la netiquette", folder, "intro"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            /* PAGE */
            intro: function () {

                var text = "";
                if (perso.daytime === 0)
                    text += "C'est <b>le matin</b>.";
                if (perso.daytime === 1)
                    text += "C'est <b>l'après-midi</b>.";
                if (perso.daytime === 2)
                    text += "C'est <b>la nuit</b>.";


                text += "\n\Vous êtes chez vous, dans la grande tour d'habitation du Blektre.";

                text += "<br/><br/>Vous vivez seul. Vous êtes pauvre.";
                // loyer
                var restant = perso.loyer.amount - perso.money;

                if (restant > 0)
                    text += "\n\Il vous reste par ailleurs " + perso.loyer.days + " jours pour trouver les " + restant + "€ qui manquent pour payer votre loyer. ";


                text += "\n\Que faire ?";







                var choices = [

                    ["Je vais aux WC", "00_global/wc", "intro"],
                    ["Je vais à mon bureau", "00_home/bureau", "intro"],
                    [">> Je sors dans la rue", "00_home/street", "intro"]
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

