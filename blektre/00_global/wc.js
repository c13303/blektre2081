process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: null,
    folder: "00_global/wc",

    getPage: function (ws, page = "intro", param = null) {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {

                var text = "Vous voilà confortablement installé dans les cabinets.";
                var choices = [
                    ['Je regarde mon iPhune', folder, 'phone'],

                    [game.emojis.exit + " Je sors des WC", perso.choiceExit.folder, perso.choiceExit.page]

                ];

                return {
                    nointerrupt: true,
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }

            },
            "phone": function () {
                return {
                    flush: null,
                    text: "Quelle application allez vous faire de votre téléphone malin ?",
                    choices: [

                        //  [game.emojis.relationship + " Je vais sur Tendeur", "00_global/01_tinder", "intro"],
                        [game.emojis.relationship + " J'appelle quelqu'un", folder, "call"],
                        [game.emojis.exit + " J'éteinds le téléphone", perso.choiceExit.folder, perso.choiceExit.page]
                    ]
                }

            },
            "call": function () {


                var choices = [];
                for (const [name, value] of Object.entries(perso.relationships)) {
                    //   dynamic_selection.push();
                    choices.push([name, folder, "calling__" + name]);
                }
                choices.push([game.emojis.exit + "En fait, non", perso.choiceExit.folder, perso.choiceExit.page]);

                return {

                    flush: 1,
                    text: "Qui appellez-vous ?",
                    choices: choices
                }
            },

            "calling": function (param) {
                var choices = [];
                var adversaire = game.gC.persos[param];
                perso.adversaire = param;
                var text = "Vous appellez " + adversaire.bnom;
                text += '__El décroche au bout de douze sonneries. ';
                var relation = perso.relationships[adversaire.nom];

                if (perso.rdvblackbar[perso.adversaire]) {
                    text += "__- On a rendez-vous. Je t'attends.<br/><br/>El raccroche.";
                    ["Je raccroche", perso.choiceExit.folder, perso.choiceExit.page]

                    return {
                        flush: 1,
                        text: text,
                        choices: [
                            ["Je raccroche", perso.choiceExit.folder, perso.choiceExit.page]
                        ]
                    }
                }

                if (relation >= 0) {
                    text += "Sa voix est plutôt neutre.__- Salut " + perso.bnom + ". Qu'est ce que tu veux ?";
                    var choices = [
                        ["Je l'invite à prendre un verre", folder, "calling_verre"],
                        ["Je fais une plaisanterie gênante", folder, "calling_genant"],
                        ["Je raccroche", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }

                if (relation < 0) {
                    text += "<div class='bad'>Pour raccrocher immédiatement, supposément après avoir reconnu votre voix chevrotante.</div>";
                    choices.push([game.emojis.exit + "Grosse ambiance", perso.choiceExit.folder, perso.choiceExit.page]);

                }




                return {

                    flush: 1,
                    text: text,
                    choices: choices
                }
            },

            "calling_verre": function () {
                var adversaire = game.gC.persos[perso.adversaire];

                var text = "Vous suggérez d'aller prendre un verre au Black Bar";
                text += "__- OK, soupire lourdement " + adversaire.bnom + ", on s'y retrouve dans 1 heure";
                text += "__El vous raccroche au nez";
                perso.rdvblackbar[perso.adversaire] = true;
                perso.log('Vous obtenez un RDV au Black Bar avec ' + perso.adversaire);

                var choices = [];

                choices.push([game.emojis.exit + "Super", perso.choiceExit.folder, perso.choiceExit.page]);

                return {

                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "calling_genant": function () {
                var adversaire = game.gC.persos[perso.adversaire];

                var text = "Vous racontez une blague qui implique des minorités qui se font maltraiter.";

                if (adversaire.getTrait('sensibilite') === 'epais') {
                    text += "__" + adversaire.bnom + " éclate de rire, et en rajoute une couche.";
                    text += perso.updateRelationship(adversaire, +1);
                } else {
                    text += "__-OK, soupire lourdement " + adversaire.bnom + ".";
                    text += "__El vous raccroche au nez";
                    text += perso.updateRelationship(adversaire, -1);
                }



                var choices = [];

                choices.push([game.emojis.exit + "Super", perso.choiceExit.folder, perso.choiceExit.page]);

                return {

                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
        }


        return chapitre[page](param);
    }
}