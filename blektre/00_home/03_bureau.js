process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Bureau",
    folder: "00_home/03_bureau",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;







        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "bureau": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "Vous êtes dans le hall des bureaux de McSushi. <~SECRETAIRE>, <le secrétaire/la secrétaire/lea secrétaires/SECRETAIRE> a un petit sourire en coin.\n\
- Je crois qu'ils n'ont pas terminé la réunion ... \n\
Comme à chaque fois que vous vous trouvez dans ces locaux, vous vous mettez à suer abondamment, de cette sueur de stress âcre et très odorante.";
                perso.log('Vous suez');
                perso.updateStat('sanity', -2);

                perso.adversaire = game.getPersoByRole('SECRETAIRE');

                perso.choiceExit = {
                    folder: folder,
                    page: "bureau",
                    coolDownLabel: "fuming_de_secretaire",
                    coolDownTime: 1
                };

                var choices = [
                    ["Je fonce en réunion", folder, "reunion"],
                    ["Je vais à la machine à café", folder, "cafe"],
                    ["Je <le/la/lae/SECRETAIRE> fume", "00_home/00_fume", "fume"],
                    ["Je me tire", "00_home/01_defense", "intro"]
                ];

                if (perso.iscooling(perso.choiceExit.coolDownLabel)) {
                    choices[2] = ["(" + perso.iscooling(perso.choiceExit.coolDownLabel) + "m)", folder, "disabled"];
                }

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------



            , "reunion": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "Vous débarquez, suant, en salle de réunion. <~DIRECTOR>. Elle a spécialement été conçue pour être la pièce la plus anxiogène de tout le batiment. \n\
<Le directeur/La directrice/Le directrices/DIRECTOR>, vous regarde d'un air furieux.\n\
- Hé beh. C'est pas trop tôt.\n\
De son côté, <~STAGIAIRE>, <le stagiaire/la stagiaire/lea stagiaires/STAGIAIRE>, vous regarde également d'un air peu amène.\n\
Que dites-vous ? ";



                var choices = [
                    ["Je fais une blague en lorrain pour détendre l'atmosphère", folder, "reunion_sanity"],
                    ["Désolé, j'ai eu du retard ...", folder, "reunion_karma"],
                    ["Je décoiffe négligemment <le directeur/la directrice/le directrices/DIRECTOR>", folder, "reunion_sex"]
                ];



                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------









            , "reunion_sex": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "<Le directeur/La directrice/Le directrices/DIRECTOR> <DIRECTOR> vous regarde fixement. \n\
De son côté, <~STAGIAIRE>, <le stagiaire/la stagiaire/lea stagiaires/STAGIAIRE>, vous regarde avec jalousie. \n\
";

                if (perso.sex > 100) {
                    text += "- Je n'avais jamais prêté attention à votre style, " + perso.bnom + ". Il cisaille.\n\
<Flatté/Flattée/Flattés/~SELF>, vous rougissez comme une tomate. ";
                } else {
                    text += "- C'est vous qui avez pété, " + perso.bnom + " ?\n\
<Gêné/Gênée/Gênés/~SELF>, vous rougissez comme une tomate. ";
                    perso.updateStat('sex', -5);
                    perso.log('Vous avez des gazs');
                }


                var choices = [
                    ["Je bosse sérieusement", folder, "bosse"],
                    ["Je m'éclipse au WC", folder, "wc"]
                ];



                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------



            , "reunion_sanity": function () {
                game.gC.setInPlace("Bureau", perso);
                var text = "- Salut les feuts, sa gets mol ? dites-vous avec votre plus bel accent spinalien. \n\
";

                if (perso.sanity > 100) {
                    text += "<Le directeur/La directrice/Le directrices/DIRECTOR> <DIRECTOR> semble troublé.\n\
- <~SELF>, vous passerez me voir dans mon bureau après la réunion.\n\
<il/elle/ielle/~DIRECTOR> sort.";
                } else {
                    text += "<Le directeur/La directrice/Le directrices/DIRECTOR> <DIRECTOR> vous regarde fixement. Puis <il/elle/ielle/~DIRECTOR> regarde se montre, et dit enfin : \n\
- La réunion est terminée. <~SELF> ... non, rien. Les autres : on fait comme on a dit. Bonne journée.";
                    perso.updateStat('sex', -5);
                    perso.log('Vous avez des gazs');
                }


                var choices = [
                    ["Je bosse sérieusement", folder, "bosse"],
                    ["Je m'éclipse au WC", folder, "wc"]
                ];



                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------



























        };//endchap ============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================


        return chapitre[page](param);


    }//endpage
};//end module

