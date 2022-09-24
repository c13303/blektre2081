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
                var text = "Parvis de la Défense.\n\
Des cochons manifestent au milieux des tours.";
                var choices = [
                    ["Je pénètre dans les bureaux", "00_home/03_bureau", "bureau"],
                    ["Je vais aux 4 temps", folder, "quatre"],
                    ["Je vais voir les cochons", folder, "manif"],
                    ["Je crisse mon camp", folder, "HUBdefense"]
                ];

                if (perso.iscooling("cochon_indispo")) {
                    text += " Ielles sont occupé.e.s à harceler un jeune tradeur";
                    choices[1] = ["(" + perso.iscooling("cochon_indispo") + "m)", folder, "disabled"];
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Parvis",
                    phaseranimation: [[1, perso.nom, "idle", [0, 0]]]
                };

            } //endscene()---------------------------------------------------------------------------
            , "HUBdefense": function () {
                game.gC.setInPlace("La défense", perso);
                var text = "La Défense.";
                var random = game.gC.getSomeoneRandom(perso);

                var choices = [
                    ["Je descend sur le parvis", "00_home/01_defense", "intro"],
                    ["Je pars sur le périphérique extérieur", "00_home/06_periphext", "intro"],
                    ["Je vais au square Manuel Valls", "00_home/00_street", "TheSquare"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Defense",
                    phaseranimation: [[1, perso.nom, "idle", [0, 0]]]
                };

            } //endscene()---------------------------------------------------------------------------


            , "manif": function () {
                perso.adversaire = game.getPersoByRole("COCHON");
                var text = "La manifestation, constituée de <~COCHON>, bat son plein. \n\
- STOP ! Valorisation de nos emplois ! On ne veut plus finir en saucisses !  \n\
<Il/Elle/Ielle/COCHON> s'approche de vous.\n\
- Bonjour <monsieur/madame/mademonsieur/SELF>, une petite signature pour faire interdire la viande de cochon, s'il vous plaît.";
                var choices = [
                    ["Je signe avec le sourire", folder, "manifsigne__sourire"],
                    ["Je lance le débat", folder, "manifdebat"],
                    ["Enculés de véganistes !", folder, "manifnovegan"],
                    ["Je m'éloigne sans mot dire", folder, "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Parvis",
                    phaseranimation: [
                        [1, perso.nom, "idle"],
                        [2, perso.adversaire.nom, "idle"],
                    ]
                };

            } //endscene()---------------------------------------------------------------------------
            , "manifdebat": function () {




                var text = "- Quand même, ce sont des emplois ... Vous n'avez pas l'impression de cracher dans la soupe ? demandez-vous.\n\
<~COCHON> vous traite de <boomer/boomeuse/boomeurses/SELF>.";
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


                if (param === 'sourire')
                    var text = "Vous signez en souriant <au cochon/à la cochonne/au cochonnes/COCHON>\n\
- Merci. Et <ravi/ravie/ravis/COCHON> de te rencontrer. Je m'appelle <~COCHON>.\n\
Cette personne est belle. Sa cause est noble. Vous ressentez quelque chose d'étrange : se pourrait-il qu'il s'agisse d'attraction ?";


                perso.log('Vous signez la pétition anti-viande de ' + perso.adversaire.bnom);
                var choices = [
                    ["Je craque sur cette personne <~COCHON>", folder, "cochon_drague"],
                    ["Je lance un débat sur le véganisme", folder, "manifdebat"],
                    ["Je souris poliment et je m'éloigne", folder, "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------






            , "cochon_drague": function () {
                var text = "Vous souriez avec un zeste d'arrogance, comme vous l'avez appris dans une vidéo Youtube, et vous proposez une bière à <~ADVERSAIRE>.";



                if (perso.sex > perso.adversaire.sex) {
                    text += "<Il/Elle/Ielle/~ADVERSAIRE> hésite une seconde, puis vous lâche son 06.\n\
Vous rentrez chez vous, <guilleret/guillerette/guilleretes/~SELF>. \n\
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
- <Désolé/Désolée/Désolées/~ADVERSAIRE> ... dit-<il/elle/ielle/~ADVERSAIRE>. Je te trouve trop laid. Peut-on rester amis ? ";

                    perso.updateStat('karma', +5);
                    perso.updateStat('sex', -25);
                    perso.adversaire.log("Vous recasez ce thon de " + perso.adversaire.bnom);
                    perso.log(perso.bnom + " vous recase");
                    perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");

                    // perso interruption

                    var choices = [
                        ["Je suis <penaud/penaude/penaudes/~SELF>", folder, "intro"]
                    ];
                }





                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------






            , "manifnovegan": function () {


                var text = "Vous manifestez agressivement votre opposition à leur point de vue politique.\n\
- Mais si on ne mange plus de viande, on va manger quoi ? Affameurs ! Véginazis !\n\
<~ADVERSAIRE> décide de vous ignorer. Vous pensez l'avoir bien <remis/remise/remises/~ADVERSAIRE> en place.";
                perso.updateStat('karma', -50);
                perso.log('Vous agressez les manifestants anti-viande');

                perso.choiceExit = {
                    folder: folder,
                    page: "intro",
                    coolDownLabel: "cochon_indispo",
                    coolDownTime: 1
                };

                var choices = [
                    ["J'avance des arguments politiques", folder, "manifdebat"],
                    ["Je m'éloigne", folder, "intro"],
                    ["Je <le/la/lae/ADVERSAIRE> fume", "00_home/00_fume", "fume"]
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

