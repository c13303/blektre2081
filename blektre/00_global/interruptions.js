process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_global/interruptions",
    getPage: function (ws, page = "intro") {
        var perso = ws.current_perso;
        var folder = this.folder;
        /* CHAPITRE */
        var chapitre = {

            intro: function () {
                return this.manche();
            },
            /*
             * Drague Et Compliment Et Associationship
             * interruptions
             * 
             */
            "embrouille_passive_lose": function () {
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Soudain, [' + adversaire.nom + '] vous interpelle pour une raison mystérieuse. Vous avez mauvais karma, le ton monte et [' + adversaire.nom + '] finit par vous coller une gifle. ';

                choices.push(perso.getChoiceEndInterrupt(":'("));

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            },
            "embrouille_passive_win": function () {


                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Soudain, vous croisez [' + adversaire.nom + '], qui essaie de vous gifler pour une raison mystérieuse. \n\
\n\
El rate et tombe lamentablement sur le sol.';
                choices.push(perso.getChoiceEndInterrupt("Pitoyable ... "));


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            },
            "seduce_passive_lose": function () {
                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Soudain, [' + adversaire.nom + '] vous  aborde. Il n\'est pas attirant, avec son visage qui rappelle Christine Boutin. Vous le reconduisez poliment, tandis qu\'il part en pleurant à chaudes larmes. ';

                choices.push(perso.getChoiceEndInterrupt("Il a cru quoi ?"));

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            },
            "seduce_passive_win": function () {


                var choices = [];
                var adversaire = game.gC.persos[perso.adversaire];
                var text = 'Soudain,  [' + adversaire.nom + '] vous  aborde. Son charme puissant vous laisse sans défense, et vous lui lâchez votre 06.';
                choices.push(perso.getChoiceEndInterrupt("J'espère que je n'ai pas fait une connerie ... "));


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Dial"
                }
            },
            
            
            
        }
        return chapitre[page]();
    }
}