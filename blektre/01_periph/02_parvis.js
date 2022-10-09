process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Defense",
    folder: "01_periph/03_parvis",

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

            "intro": function (param) {
                game.gC.setInPlace("La Défense", perso);
                
                var text = "La Défense.\n\
Il y a une manifestation devant les bureaux.";
                var choices = [
                    ["Je vais au bureau", "01_periph/03_bureau", "bureau__left"],
                    ["Je m'approche de la manifestation", folder, "manif__left"],
                    ["Je continue aux 4 temps", "01_periph/03_quatre", "intro__left"],
                    ["Je pars", "01_periph/01_peripherique", "porteladefense__right"]
                ];

                if (perso.iscooling("cochon_indispo")) {
                    text += " Ielles sont occupé.e.s à harceler un jeune tradeur";
                    choices[1] = ["(" + perso.iscooling("cochon_indispo") + "m)", folder, "disabled"];
                }


                var cochon = game.getPersoByRole("COCHON");
                perso.adversaire = cochon.nom;


                var pa = [[1, perso.nom, "idle"]];

                if (param === 'left') {
                    var pa = [[1, perso.nom, "walk", {startX: 1, endX: 60}]];
                }
                if (param === 'right') {
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];
                }

                if (perso.adversaire) {
                    pa.push([2, perso.adversaire, "idle"]);
                }

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Parvis",
                    phaseranimation: pa
                };

            } //endscene()---------------------------------------------------------------------------


            , "manif": function () {
                var cochon = game.getPersoByRole("COCHON");
                perso.adversaire = cochon.nom;


                var text = "La manifestation, constituée de <~COCHON>, bat son plein. \n\
- Bonjour <monsieur/madame/mademonsieur/SELF>, une petite signature pour faire interdire la viande de cochon, s'il vous plaît.";
                var choices = [
                    ["Je signe avec le sourire", folder, "manifsigne__sourire"],
                    ["Je pose des questions", folder, "manifdebat"],
                    ["Enculés de véganistes !", folder, "manifnovegan"],
                    ["Je m'éloigne", folder, "intro"]
                ];

                /* phaseranimation */
                var pa = [[1, perso.nom, "idle"]];

                if (param === 'left') {
                    var pa = [[1, perso.nom, "walk", {startX: 1, endX: 60}]];
                }
                if (param === 'right') {
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];
                }
                if (perso.adversaire) {
                    pa.push([2, perso.adversaire, "idle"]);
                }

                /*choice*/
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Cochon",
                    phaseranimation: pa
                };

            } //endscene()---------------------------------------------------------------------------
            , "manifdebat": function () {


                var cochon = game.getPersoByRole("COCHON");
                perso.adversaire = cochon.nom;
                adversaire = perso.getAdversaire();


                var text = "- Les cochons bénéficient du plein emploi ... Vous n'avez pas l'impression de cracher dans la soupe ? demandez-vous.\n\
<~COCHON> est révolté. \n\
- <Boomers/Boomeuses/Boomeurses/SELF> ! Vous ne comprenez rien. On se tue au travail ! On veut de meilleures conditions ! ";
                perso.log(adversaire.bnom + " vous recadre lors d'un débat pacifique");

                var choices = [
                    ["Je souris poliment et je m'éloigne", folder, "intro"],
                    ["Je <le/la/lae/COCHON> fume", "00/fume", "fume"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------



            , "manifsigne": function () {

                adversaire = perso.getAdversaire();


                if (perso.steps.petition) {
                    var text = "<~COCHON> vous regarde fixement.\n\
- C'est gentil, mais tu as déjà signé la pétition.";

                } else {
                    var text = "Vous signez la pétition avec le sourire. <~COCHON> sourit également.";
                    perso.updateStat("life", +10);
                    perso.steps.petition = true;
                    adversaire.updateStat("sex", +1, perso);
                    adversaire.log(perso.bnom + 'signe votre pétition');
                    perso.log('Vous signez la pétition de ' + adversaire.bnom);

                }



                var choices = [
                    ["Je l'invite à boire un verre", folder, "cochon_drague"],
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


                adversaire = perso.getAdversaire();

                var text = "Vous prenez une voix sexy et proposez une bière à <~ADVERSAIRE>.\n\
";


                if (perso.sex > adversaire.sex) {
                    text += "<Il/Elle/Ielle/ADVERSAIRE> accepte.";
                    perso.updateStat('sex', +5);
                    adversaire.updateStat('sex', +5, perso);
                    perso.log("Vous obtenez un rencard avec " + adversaire.bnom);
                    adversaire.log(perso.bnom + " vous rencarde");
                    // perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");

                    var choices = [
                        ["Je rentre me préparer", "01_home/02_date", "habillage"]
                    ];

                    // perso interruption
                } else {
                    text += "<Il/Elle/Ielle/ADVERSAIRE> refuse.";

                    perso.updateStat('karma', +5);
                    perso.updateStat('sanity', -5);
                    adversaire.log("Vous mettez un rateau à " + adversaire.bnom);
                    perso.log(perso.bnom + " vous met un rateau");
                    // perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");

                    // perso interruption

                    var choices = [
                        ["Je suis <penaud/penaude/penaudes/SELF>", folder, "intro"]
                    ];
                }





                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------






            , "manifnovegan": function () {


                var text = "- Mais si on ne mange plus de viande, on va manger quoi ? Affameurs ! Véginazis !\n\
<~ADVERSAIRE> vous regarde fixement, l'air passablement énervé.";
                perso.updateStat('karma', -10);
                perso.log('Vous agressez les manifestants anti-viande');

                perso.choiceExit = {
                    folder: folder,
                    page: "intro"
                };

                var choices = [
                    ["Je <le/la/lae/ADVERSAIRE> fume", "00/fume", "fume"],
                    ["Je bredouille une excuse et je m'éloigne", folder, "intro"],
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

