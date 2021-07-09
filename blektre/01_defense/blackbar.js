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

        perso.choiceExit = {
            folder: folder,
            page: "intro"
        }




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
                    text += "__" + myRdv.bnom + ", votre rendez-vous, vous attend au comptoir, l'air impénétrable. ";

                    perso.currentRDV = myRdv.nom;
                }

                if (rdvs > 1) {
                    return this.multimeeting();
                }
                var choices = [
                    ["Je commande à boire", folder, "commander"],
                    ["Je vais aux WC &#128241;", "00_global/wc", "intro"],
                ];
                choices.push(["Je sors", "01_defense/00_intro", "intro"]);


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }


            },
            "commander": function () {

                var text = "";
                var serveurSlug = game.gC.roles.serveur.nom;
                var serveur = game.gC.persos[serveurSlug];

                text += "- Qu'est ce que je te sers ? demande " + serveur.bnom + ", derrière le comptoir.";
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
                var multiplier = 1;

                if (perso.currentRDV) {
                    perso.adversaire = perso.currentRDV;
                    var adversaire = game.gC.persos[perso.currentRDV];
                    text += adversaire.bnom + " prend la même chose que vous.";
                    multiplier = 2;
                    choices.push(["Je discute avec " + adversaire.bnom, folder, "discuter"]);
                }

                text += "__" + serveur.bnom + " vous sert votre verre de " + param;

                if (param === "soft") {
                    var price = 3 * multiplier;
                }

                if (param === "biere") {
                    var price = 6 * multiplier;
                    text += perso.updateStat('sanity', -1);
                }

                if (param === "whisky") {
                    var price = 48 * multiplier;
                    text += perso.updateStat('sanity', -5);
                }

                text += "__- C'est " + price + "€ s'il te plaît, dit " + serveur.bnom;
                text += '__Vous souriez poliment et réglez en carte bancaire.';
                text += perso.updateStat('money', -price);


                choices.push(["Je reprends un verre.", folder, "commander"]);
                choices.push(["Je vais aux WC &#128241;", "00_global/wc", "intro"]);
                choices.push(["Je m'excuse poliment et je m'en vais.", "01_defense/00_intro", "intro"]);

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            multimeeting: function () {

            },
            "discuter": function () {

                var text = "";
                var choices = [];

                if (perso.currentRDV) {
                    perso.adversaire = perso.currentRDV;
                    var adversaire = game.gC.persos[perso.currentRDV];
                } else {
                    game.tools.report("EEROR DISCUTER NO CURRENTRDV");
                }

                text += "Quel sujet aborder avec " + adversaire.bnom + "? ";
                text += "";
                var choices = [
                    ["Je fustige les gilets jaunes", folder, "say__epais"],
                    ["Je parle de mon éco-anxiété", folder, "say__sensible"],
                ];

                //   choices.push(["Je m'excuse poliment et je m'en vais.", "01_defense/00_intro", "intro"]);

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                }
            },
            "say": function (param) {

                var text = "";
                var choices = [];

                if (perso.currentRDV) {
                    perso.adversaire = perso.currentRDV;
                    var adversaire = game.gC.persos[perso.currentRDV];
                } else {
                    game.tools.report("EEROR DISCUTER NO CURRENTRDV");
                }

                if (param === 'epais') {
                    text += "- Les gilets jaunes, vraiment, ils exagèrent, dites-vous avez une grande fermeté, preuve de votre force d'âme";

                    if (perso.getTrait('sensibilite') === 'sensible') {
                        text += " Toutefois, vous perdez un peu de crédibilité en laissant échapper un peu de boisson sur votre justocou noir.";
                        if (adversaire.getTrait('sensibilite') === 'sensible') {
                            text += "__" + adversaire.bnom + " prend un air dégoûté.";
                            perso.updateRelationship(adversaire, -1);

                        } else {
                            text += "__" + adversaire.bnom + " éclate de rire.";
                            perso.updateRelationship(adversaire, -1);
                        }

                    } else {
                        text += "  Vous appuyez votre propos d'un rot viril.";
                        if (adversaire.getTrait('sensibilite') === 'sensible') {
                            text += "__" + adversaire.bnom + " prend un air dégoûté.";
                            text += perso.updateRelationship(adversaire, -1);

                        } else {
                            text += "__" + adversaire.bnom + " a les yeux qui s'animent.";
                            text += "__- Mais oui, quels emmerdeurs ceux-là ! dit-el avec véhémence.";
                            text += perso.updateRelationship(adversaire, +3);
                        }
                    }

                }



                if (param === 'sensible') {
                    text += "- Ca fait chier, toutes ces touillettes en plastiques. Enfoirés de lobbys.";

                    if (perso.getTrait('sensibilite') === 'sensible') {
                        text += "__ Le ton amer de votre voix souligne parfaitement votre propos.";
                        if (adversaire.getTrait('sensibilite') === 'sensible') {
                            text += "__" + adversaire.bnom + " vous regarde avec les yeux tremblant d'émotion.";
                            perso.updateRelationship(adversaire, +3);

                        } else {
                            text += "__ - Tes préoccupations sont très importantes, hein ? dit " + adversaire.bnom + " avec ironie.";
                            perso.updateRelationship(adversaire, -1);
                        }

                    } else {
                        text += "  Vous appuyez votre propos d'un rot viril.";
                        if (adversaire.getTrait('sensibilite') === 'sensible') {
                            text += "__" + adversaire.bnom + " prend un air dégoûté.";
                            text += perso.updateRelationship(adversaire, -1);

                        } else {
                            text += "__" + adversaire.bnom + " regarde ailleurs avec désintérêt.";
                            text += perso.updateRelationship(adversaire, -1);
                        }
                    }

                }




                choices.push(["J'embrasse " + adversaire.bnom, folder, "kiss"]);
                choices.push(["Je reprends un verre.", folder, "commander"]);
                choices.push(["Je m'excuse poliment et je m'en vais.", "01_defense/00_intro", "intro"]);

                return {
                    flush: 0,
                    text: text,
                    choices: choices
                }
            },
            "kiss": function () {

                var text = "";
                var choices = [];

                if (perso.currentRDV) {
                    perso.adversaire = perso.currentRDV;
                    var adversaire = game.gC.persos[perso.currentRDV];
                } else {
                    game.tools.report("EEROR DISCUTER NO CURRENTRDV");
                }

                if (perso.relationships[adversaire.nom] > 5) {
                    text += "Vous vous approchez de " + adversaire.bnom + " et plongez votre langue dans sa bouche.";
                    text += "__" + adversaire.bnom + " se laisse faire et vous adresse même un petit sourire lorsque vous avez terminé.";
                    text += "__El se lève ensuite.";
                    text += "__- Bon, tu m'appelles, OK ? ";
                    text += "__El quitte le bar. ";

                    perso.updateRelationship(adversaire, 10);
                } else {
                    text += "Vous approchez votre visage de celui de  " + adversaire.bnom + ", qui vous gifle";
                    text += "__El se lève ensuite et quitte le bar.";
                }

                delete perso.rdvblackbar[adversaire.nom];
                delete perso.currentRDV;
                delete perso.adversaire;



                choices.push(["Je reprends un verre.", folder, "commander"]);
                choices.push(["Je m'en vais.", "01_defense/00_intro", "intro"]);

                //   choices.push(["Je m'excuse poliment et je m'en vais.", "01_defense/00_intro", "intro"]);

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