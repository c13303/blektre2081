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

                        [game.emojis.relationship + " Je vais sur Tendeur", "00_global/01_tinder", "intro"],
                        [game.emojis.relationship + " Je regarde mon répertoire pour appeller quelqu'un", folder, "call"],
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
                var adversaire = game.gC.persos[param];
                perso.adversaire = param;
                var text = "Vous appellez " + adversaire.bnom;
                text += '<br><br>El décroche au bout de douze sonneries. ';
                var relation = perso.relationships[adversaire.nom];

                if (perso.rdvblackbar[perso.adversaire]) {
                    text += "<br/><br/>- On a rendez-vous. Je t'attends.<br/><br/>El raccroche.";
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
                    text += "Sa voix est plutôt neutre.<br/><br/>- Salut " + perso.bnom + ". Qu'est ce que tu veux ?";
                    var choices = [
                        ["Je l'invite à prendre un verre", folder, "calling_verre"],
                        ["Je fais une plaisanterie sexiste", folder, "calling_sexiste"],
                        ["Je raccroche", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }

                if (relation < 0) {
                    text += "Pour raccrocher immédiatement, supposément après avoir reconnu votre voix chevrotante.";
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
                text += "<br/> OK, soupire lourdement " + adversaire.bnom + ", on s'y retrouve dans 1 heure";
                text += "<br/><br/>El vous raccroche au nez";
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

        }


        return chapitre[page](param);
    }
}