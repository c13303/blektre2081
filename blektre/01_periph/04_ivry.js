process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Ivry",
    folder: "01_periph/04_ivry",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;

        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "outfumed"
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {

                game.gC.setInPlace("Ivry Periphérique", perso);


                perso.updateStat('life', -1);

                perso.choiceExit = {
                    folder: "01_periph/04_ivry",
                    page: "intro"
                };


                var text = "Porte d'Ivry. ";

                var mendiant = game.getPersoByRole("MENDIANT");
                perso.adversaire = mendiant.nom;
                text += "Ici, <~MENDIANT> mendie.";

                if (mendiant.karma > perso.karma) {
                    text += "\n\
[-karma] Vous vous sentez obligé de lui donner une pièce !";

                    if (perso.money > 0) {
                        perso.updateStat("money", -1);
                        mendiant.updateStat("money", +1, perso);
                        perso.log('Vous donnez une pièce à ' + mendiant.bnom);
                        mendiant.log(perso.bnom + " vous donne une pièce");
                    } else {
                        text += "\
Heureusement, vous n'avez pas une tune !\n\
- Clochard, dit <~MENDIANT>.";
                        perso.updateStat("karma", 1);
                    }

                } else {
                    text += "\n\
[karma] Vous résistez à la tentation de lui donner une pièce !";
                }


                var choices = [
                    ["Je m'enfonce dans Ivry Centre", folder, "ivry__left"],
                    ["J'agresse <~MENDIANT>", folder, "mendiant"],
                    ["Je remonte sur le périph'", "01_periph/01_peripherique", "intro__right"],
                ];

                /*
                 var random = game.gC.getSomeoneRandom(perso);
                 if (random && random.nom) {
                 text += "\n\
                 " + random.bnom + " vous double en klaxonnant";
                 perso.adversaire = random.nom;
                 phaseranimation.push([2, perso.adversaire, "idle"]);
                 choices.push(["J'embrouille  <~ADVERSAIRE>", "00/fume", "embrouille"]);
                 }
                 * 
                 */
                var pa = [[1, perso.nom, "idle"]];

                if (param === 'idle') {
                    var pa = [[1, perso.nom, "idle"]];
                }
                if (param === 'left') {
                    var pa = [[1, perso.nom, "walk", {startX: 1, endX: 60}]];
                }
                if (param === 'right') {
                    var pa = [[1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];
                    pa.push(["cartop"]);
                }

                if (perso.adversaire) {
                    pa.push([2, perso.adversaire, "idle"]);
                }

                return {
                    
                    text: text,
                    choices: choices,
                    phaserscene: "Periph",
                    phaseranimation: pa
                };

            } //endscene()---------------------------------------------------------------------------








            , "mendiant": function () {



                var text = "Le spectacle de <~MENDIANT> qui mendie est insupportable. Vous descendez de votre voiture avec l'intention d'y mettre un terme.\n\
";

                adversaire = game.getPersoByRole('MENDIANT');

                if (!adversaire) {
                    console.log(perso.nom + 'MAINFUME ERROR NO ADVERSAIRE');
                }



                if (perso.sanity < adversaire.sanity) {
                    var text = "Vous adressez un coup de boule à <~ADVERSAIRE> pour obtenir son attention. <Il/Elle/Ielle/ADVERSAIRE> se retrouve sur le sol, en sang.";
                    adversaire.updateStat('sanity', +25, perso);
                    perso.updateStat('sanity', +25);
                    perso.updateStat('karma', +10);

                    perso.log("Vous remettez " + adversaire.bnom + " dans le droit chemin");
                    text += "\n\
<~ADVERSAIRE> vous propose de prendre le spot de mendicité.";
                    adversaire.log(perso.bnom + " vous remet dans le droit chemin");
                    var choices = [
                        ["Je devient mendiant", folder, "devenir_mendiant"],
                        ["Je m'en vais", folder, "intro"]
                    ];


                    var phaseranimation = [
                        [3, perso.nom, "punch"],
                        [2, adversaire.nom, "takecher"]
                    ];


                    // perso interruption
                } else {
                    var text = "Vous approchez de <~ADVERSAIRE> pour lui faire la morale, mais <il/elle/ielle/ADVERSAIRE> vous en colle une.";

                    perso.updateStat('life', -25);
                    adversaire.log("Vous adressez un prompt coup de boule à " + perso.bnom);
                    adversaire.updateStat('karma', +10, perso);

                    perso.log(adversaire.bnom + " vous adresse un prompt coup de boule");
                    // perso interruption

                    var phaseranimation = [
                        [3, perso.nom, "takecher"],
                        [2, adversaire.nom, "punch"]
                    ];


                    var choices = [
                        ["Je ramasse mes dents", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }





                if (perso.choiceExit.coolDownLabel) {
                    perso.cool(perso.choiceExit.coolDownLabel, perso.choiceExit.coolDownTime);
                }

                return {
                    phaseranimation: phaseranimation,
                    
                    text: text,
                    choices: choices
                };




            } //endscene()---------------------------------------------------------------------------
















            , "ivry": function (param) {

                game.gC.setInPlace("Ivry", perso);


                var phaseranimation = [[1, perso.nom, "walk", {startX: 1, endX: 60}]];


                if (param === 'idle') {
                    var phaseranimation = [[1, perso.nom, "idle"]];
                }
                if (param === 'left') {
                    var phaseranimation = [[1, perso.nom, "walk", {startX: 1, endX: 75}]];
                }
                if (param === 'right') {
                    var phaseranimation = [
                        [1, perso.nom, "walk", {flipX: true, startX: 150, endX: 90}]];

                }


                perso.updateStat('life', -1);

                var text = "Ivry. Ville lumière où tout est permis.";


                var choices = [
                    ["Je vais à l'église psychédélislaïque", "01_periph/05_eglise", "intro__left"],
                    ["Je vais à la pharmacie", "01_periph/05_pharmacie", "intro__left"],
                    ["Je pars", folder, "intro__right"],
                ];


                var random = game.gC.getSomeoneRandom(perso);
                if (random && random.nom) {
                    text += "\n\
" + random.bnom + " vous double en klaxonnant";
                    perso.adversaire = random.nom;
                    phaseranimation.push([2, perso.adversaire, "idle"]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00/fume", "embrouille"]);
                }
                return {
                    
                    text: text,
                    choices: choices,
                    phaserscene: "Ivry",
                    phaseranimation: phaseranimation
                };

            } //endscene()---------------------------------------------------------------------------
















            , "outfumed": function () {


                var text = "Ainsi va la vie";



                var choices = [
                    ["OK", folder, "intro"],
                ];

                return {
                    noflush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------










        }; //endchap ============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================
        ////////////============================================ STOP ====================================================


        return chapitre[page](param);
    }//endpage
}; //end module

