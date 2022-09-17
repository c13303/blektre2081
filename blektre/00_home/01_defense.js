process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Defense",
    folder: "00_home/01_defense",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;


        perso.choiceExit = {
            folder: folder,
            page: "intro"
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {
                game.gC.setInPlace("La Défense", perso);
                var text = "La Défense. Ville lumière où tout est permis, où les costards côtoient les clochards.\n\
Une bande de cochons transgéniques manifestent sur le parvis, devant le siège de Charal.";
                var choices = [
                    ["Je fonce au bureau", "00_home/03_bureau", "bureau"],
                    ["Je vais voir les manifestants", folder, "manif"],
                    ["Je crisse mon camp", folder, "HUBdefense"]
                ];

                if (perso.iscooling("cochon_indispo")) {
                    text += " Ielles sont occupé.e.s à harceler un jeune tradeur";
                    choices[1] = ["(" + perso.iscooling("cochon_indispo") + "m)", folder, "disabled"];
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------
            , "HUBdefense": function () {
                game.gC.setInPlace("Périphérique Intra Est Nord 4ème parallèle", perso);
                var text = "Vous êtes à la Défense. La réclame géante appliquée aux parois des buildings brille et fait reluire les carrosseries dans les bouchons.";

                var choices = [
                    ["Je vais sur le parvis", "00_home/01_defense", "intro"],
                    ["Je vais sur le périphérique extérieur", folder, "periph"],
                    ["Je retourne vers chez moi", "00_home/00_street", "HUBstreet"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "manif": function () {
                perso.adversaire = game.getPersoByRole("COCHON");
                var text = "Vous approchez du groupe de cochons transgéniques, qui manifestent amèrement.\n\
- STOP ! On ne veut plus finir en saucisses ! On veut une vraie valorisation ! \n\
L'une d'entre eux s'approchent de vous et vous tend un formulaire avec un stylo.\n\
- Bonjour <monsieur/madame/madieur/SELF>, une petite signature pour faire interdire la viande de cochon, s'il vous plaît.";
                var choices = [
                    ["Je signe avec le sourire", folder, "manifsigne__sourire"],
                    ["Je lance le débat", folder, "manifdebat"],
                    ["Enculés de véganistes !", folder, "manifnovegan"],
                    ["Je m'éloigne sans mot dire", folder, "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------
            , "manifdebat": function () {

                perso.adversaire = game.getPersoByRole("COCHON");


                var text = "- Eh, quoi, on vous donne des emplois, vous n'avez pas l'impression de cracher dans la soupe ? demandez-vous en toute franchise.\n\
Vous avez l'impression que <~COCHON> va vous en coller une, mais <il/elle/elles/COCHON> se contente de vous traiter de <boomer/boomeuse/boomeurses/SELF>.";
                perso.log('Vous êtes humilier');

                var choices = [
                    ["Je l'invite à boire un verre", folder, "cochon_drague"],
                    ["Je <le/la/lae/COCHON> fume", "00_home/00_fume", "fume"],
                    ["Je souris poliment et je m'éloigne", folder, "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------



            , "manifsigne": function () {

                perso.adversaire = game.getPersoByRole("COCHON");

                if (param === 'sourire')
                    var text = "Vous signez en souriant <au cochon/à la cochonne/au cochonnes/COCHON>\n\
- Merci. Et <ravi/ravie/ravis/COCHON> de te rencontrer. Je m'appelle <~COCHON>, et toi ?\n\
Vous commencez à discuter amicalement.";


                perso.log('Vous signez la pétition anti-viande de ' + perso.adversaire.bnom);
                var choices = [
                    ["Je lance le débat", folder, "manifdebat"],
                    ["Je l'invite à boire un verre", folder, "cochon_drague"],
                    ["Je souris poliment et je m'éloigne", folder, "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------






            , "cochon_drague": function () {
                var text = "-Ca te dirait, une petite choucroute végétarienne au McSushi ? Demandez vous à <~ADVERSAIRE> ";



                if (perso.sex > perso.adversaire.sex) {
                    text += "<Il/Elle/Ielle/~ADVERSAIRE> hésite un moment et finit par vous lâcher son 06.\n\
- A ce soir, dit-<il/elle/ielle/~ADVERSAIRE>\n\
<Guilleret/Guillerette/Guilleretes/~SELF>, vous rentrez chez vous pour vous préparer pour le McSushi... \n\
";

                    perso.updateStat('sex', -10);
                    perso.adversaire.updateStat('sex', +5);
                    perso.log("Vous obtenez un rencard avec " + perso.adversaire.bnom);
                    perso.adversaire.log(perso.bnom + " vous rencarde");
                    perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");

                    var choices = [
                        ["Je m'habille", "00_home/02_date", "habillage"]
                    ];

                    // perso interruption
                } else {
                    text += "\
\n\
- <Désolé/Désolée/Désolées/~ADVERSAIRE> ... C'est pas que je te trouve moche, mais tu pues vraiment la merde. On reste amis ? ";

                    perso.updateStat('karma', +5);
                    perso.updateStat('sex', -25);
                    perso.adversaire.log("Vous recasez ce thon de " + perso.adversaire.bnom);
                    perso.log(perso.bnom + " vous recase");
                    perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");

                    // perso interruption

                    var choices = [
                        ["J'ai la haine ... je m'éloigne", folder, "intro"]
                    ];
                }





                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------






            , "manifnovegan": function () {


                var text = "Vous manifestez violemment votre opposition à leur politique.\n\
- Affameurs ! Véginazis ! Communistes ! \n\
<~ADVERSAIRE> vous regarde d'un oeil torve.";
                perso.updateStat('karma', -50);
                perso.log('Vous agressez les manifestants anti-viande');

                perso.choiceExit = {
                    folder: folder,
                    page: "intro",
                    coolDownLabel: "cochon_indispo",
                    coolDownTime: 1
                };

                var choices = [
                    ["Je présente mes excuses", folder, "excuse"],
                    ["Je <le/la/lae/ADVERSAIRE> fume", "00_home/00_fume", "fume"]
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------






            , "excuse": function () {
                var text = "Vous vous confondez en excuses.\n\
- Je ne sais pas ce qui m'a pris, dites-vous, <penaud/penaude/penaudes/~SELF>";
                perso.updateStat('karma', +25);
                perso.updateStat('sex', +2);
                perso.log('Vous vous excusez auprès de ' + perso.adversaire.bnom);
                perso.adversaire.log(perso.bnom + " vous présente ses excuses");
                perso.adversaire.updateStat('karma', +5);
                var choices = [
                    ["J'ai la haine ... je m'éloigne", folder, "intro"]

                ];

                return {
                    flush: 0,
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

