process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../game/game.js');
var itemTools = require('./../game/objets/itemsTools.js');
module.exports = {
    name: "Periph",
    folder: "06_periphext",
    getPage: function (ws, page = "intro", param = null) {




        var perso = ws.current_perso;
        var folder = this.folder;

        /* landing page en cas de fuming */
        perso.choiceExit = {
            folder: folder,
            page: "outfumed",
            coolDownLabel: this.name + "choiceExit",
            coolDownTime: 1
        };




        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            "intro": function () {

                game.gC.setInPlace("Periphérique Extérieur", perso);


                perso.updateStat('life', -1);

                perso.choiceExit = {
                    folder: "06_periphext",
                    page: "intro"
                };


                var text = "Vous êtes sur le périphérique extérieur. Ici les gaz d'échappements s'intensifient.";

                var mendiant = game.getPersoByRole("MENDIANT");
                perso.adversaire = mendiant.nom;
                text += "\n\
<~MENDIANT> est là, qui mendie.";

                if (mendiant.karma > perso.karma) {
                    text += "\n\
Vous vous sentez obligé de lui donner une pièce";
                    perso.updateStat("money", -1);
                    mendiant.updateStat("money", +1, perso);
                    perso.log('Vous donnez une pièce à ' + mendiant.bnom);
                    mendiant.log(perso.bnom + " vous donne une pièce");
                }


                var choices = [
                    ["Je descends de la voiture et je fume <~MENDIANT>", folder, "mendiant"],
                    ["Je retourne sur le périph' intérieur", "01_periphint", "intro"],
                    ["Je m'enfonce dans la banlieue", folder, "ivry"]
                ];

                /*
                 var random = game.gC.getSomeoneRandom(perso);
                 if (random && random.nom) {
                 text += "\n\
                 " + random.bnom + " vous double en klaxonnant";
                 perso.adversaire = random.nom;
                 phaseranimation.push([2, perso.adversaire, "idle", [0, 0]]);
                 choices.push(["J'embrouille  <~ADVERSAIRE>", "00_fume", "embrouille"]);
                 }
                 * 
                 */
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Periph",
                    phaseranimation: [[1, perso.nom, "head", [0, 0]], [2, mendiant.nom, "idle", [0, 0]]]
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
                    var text = "Vous approchez de <~ADVERSAIRE> et lui dites d'aller prendre une douche. <Il/Elle/Elles/ADVERSAIRE> s'écroule sur le sol, en sang.";
                    adversaire.updateStat('sanity', +25, perso);
                    perso.updateStat('sanity', +25);
                    perso.updateStat('karma', +10);

                    perso.log("Vous remettez " + adversaire.bnom + " dans le droit chemin");
                    text += "\n\
<~ADVERSAIRE> vous propose de prendre le spot de mendicité.";
                    adversaire.log(perso.bnom + " vous remet dans le droit chemin");
                    var choices = [
                        ["Je devient mendiant", folder, "devenir_mendiant"],
                        ["Je m'en vais", folder, intro]
                    ];


                    var phaseranimation = [[3, perso.nom, "idle", [0, 0]]];
                    phaseranimation.push([2, adversaire.nom, "takecher", [0, 0]]);


                    // perso interruption
                } else {
                    var text = "Vous approchez de <~ADVERSAIRE> pour lui faire la morale, quand soudain cette dernière ";

                    perso.updateStat('life', -25);
                    adversaire.log("Vous adressez un prompt coup de boule à " + adversaire.bnom);
                    adversaire.updateStat('karma', +10, perso);

                    perso.log(perso.bnom + " vous adresse un prompt coup de boule");
                    // perso interruption

                    var phaseranimation = [[3, perso.nom, "takecher", [0, 0]]];
                    phaseranimation.push([2, adversaire.nom, "idle," [0, 0]]);


                    var choices = [
                        ["Je ramasse mes dents", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }





                if (perso.choiceExit.coolDownLabel) {
                    perso.cool(perso.choiceExit.coolDownLabel, perso.choiceExit.coolDownTime);
                }

                return {
                    phaseranimation: phaseranimation,

                    flush: 1,
                    text: text,
                    choices: choices,
                };




            } //endscene()---------------------------------------------------------------------------
















            , "ivry": function () {

                game.gC.setInPlace("Ivry", perso);


                var phaseranimation = [[1, perso.nom, "walk", [0, 0]]];
                perso.updateStat('life', -1);

                var text = "Ivry. Ville lumière où tout est permis.";


                var choices = [
                    ["Je vais à l'église psychédélislaïque", "05_eglise", "intro"],
                    ["Je vais à la pharmacie", "08_pharmacie", "intro"],
                    ["Je retourne sur le périph'", folder, "intro", "right"],
                ];


                var random = game.gC.getSomeoneRandom(perso);
                if (random && random.nom) {
                    text += "\n\
" + random.bnom + " vous double en klaxonnant";
                    perso.adversaire = random.nom;
                    phaseranimation.push([2, perso.adversaire, "walk", [0, 0]]);
                    choices.push(["J'embrouille  <~ADVERSAIRE>", "00_fume", "embrouille"]);
                }
                return {
                    flush: 1,
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
                    flush: 0,
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

