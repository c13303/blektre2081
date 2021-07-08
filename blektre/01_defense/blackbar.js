process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Black Bar",
    folder: "01_defense/blackbar",
    station: "La Defense",

    getPage: function (ws, page = "intro", param = null) {


        var perso = ws.current_perso;
        var folder = this.folder;

        /* CHAPITRE */
        var chapitre = {

            /* PAGE */
            "intro": function () {
                delete perso.adversaire;

                var text = "Vous êtes au Black Bar.";

                var rdvs = 0;

                var serveurSlug = game.gC.roles.serveur.nom;
                var serveur = game.gC.persos[serveurSlug];

                for (const [key, value] of Object.entries(perso.rdvblackbar)) {
                    rdvs++;
                    var myRdv = game.gC.persos[key];
                }


                if (rdvs === 1) {
                    text += myRdv.bnom + " vous attend à une table, l'air impénétrable. ";

                    if (serveurSlug === myRdv.nom) {
                        text += "Vous vous installez, tandis que " + serveur.bnom + ", qui est aussi employé.e ici, vous demande : ";
                    } else {
                        text += "Vous vous installez, quand " + serveur.bnom + " se plante devant la table.";
                    }

                    perso.currentRDV = myRdv.nom;
                }

                if (rdvs > 1) {
                    return this.multimeeting();
                }

                if (rdvs === 0) {
                    text += "Vous vous installez, quand " + serveur.bnom + " se plante devant la table.";
                }


                text += "<br/>- Qu'est ce que je te sers ? ";
                text += "";
                var choices = [
                    ["Une boisson douce", folder, "drink__soft"],
                    ["Une bière bon marché", folder, "drink__biere"],
                    ["Un whisky 200 ans d'âge", folder, "drink__whisky"],

                ];

                choices.push(["Je m'excuse poliment et je m'en vais.", "01_defense/00_intro", "intro"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "drink": function (param) {

                var serveurSlug = game.gC.roles.serveur.nom;
                var serveur = game.gC.persos[serveurSlug];

                var choices = [];
                var text = "";

                if (perso.currentRDV) {
                    perso.adversaire = perso.currentRDV;
                    var adversaire = game.gC.persos[perso.currentRDV];
                    text += adversaire.bnom + " prend la même chose que vous. <br/><br/>";
                }

                if (param === "soft") {
                    text += "- C'est 3€ s'il te plaît, dit " + serveur.bnom;
                    text += perso.updateStat('money', -3);
                    text += ""
                }

                if (param === "biere") {
                    text += "- C'est 6€ s'il te plaît, dit " + serveur.bnom;
                    text+= perso.updateStat('money', -6);
                }

                if (param === "whisky") {
                    text += "- C'est 45€ s'il te plaît, dit " + serveur.bnom;
                    text+= perso.updateStat('money', -45);
                }

                if (perso.money < 0) {
                    text += "<br/><br/>Vous n'avez pas les moyens de régler l'addition ...";
                    perso.money = 0;
                    perso.log("Vous êtes fauché !");
                    choices = [[
                        "huho ...", folder, "kicked"
                    ]
                    ];
                }

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            multimeeting: function () {

            }

        }


        return chapitre[page](param);


    }
}