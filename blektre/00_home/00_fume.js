process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Blektre_is_not_UNIX",
    folder: "00_home/00_fume",
    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var adversaire = perso.getAdversaire();
        var folder = this.folder;
        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {
            "intro": function () {
                var text = "Wow. Vous vous êtes enfui pendant une bagarre. Vous êtes une merde !";
                perso.log('Vous reprenez vos esprits');
                perso.updateStat('karma', -5);
                var choices = [
                    ["Wow", "00_home/00_street", "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------


            , "embrouille": function () {




                adversaire = perso.getAdversaire();
                console.log(adversaire);

                var phaseranimation = [[1, perso.nom, "idle", [0, 0]]];

                phaseranimation.push([2, adversaire.nom, "idle", [0, 0]]);
                perso.phaseranimation = phaseranimation;

                var text = "Vous approchez de <~ADVERSAIRE>";
                var choices = [
                    ["Je demande de l'argent", folder, "money"],
                    ["Je l'oblige à me follow sur Insta", folder, "insta"],
                    ["Je <le/la/l'/ADVERSAIRE> fume", "00_home/00_fume", "fume"],
                    ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Duel",
                    phaseranimation: phaseranimation
                };
            } //endscene()---------------------------------------------------------------------------



            , "money": function () {

                var text = "Vous demandez de l'argent à <~ADVERSAIRE>";
                var choices = [
                    ["15 balles ?", folder, "moneyask__15"],
                    ["150 ?", folder, "moneyask__150"],
                    ["1500 et je te permets de prendre un selfie avec oim", "00_home/00_fume", "moneyask__1500"],
                    ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------





            , "moneyask": function (param) {


                if (1) {
                    if (adversaire.sex > perso.sex) {
                        var text = "<~ADVERSAIRE> vous rit au nez.\n\
- Les tarifs ont augmenté chez les mendiants, dites-donc ! dit-<il/elle/iel/ADVERSAIRE>";
                        perso.us('sex', -param);
                    } else {
                        var text = "<~ADVERSAIRE> vous regarde fixement.\n\
- Mais, certainement, certainement ! dit-<il/elle/iel/ADVERSAIRE>\n\
<Il/Elle/Iel/ADVERSAIRE> vous fait un Paypal sans tarder.";
                        perso.us('money', param);
                        adversaire.us('money', -param);
                        perso.log('Vous tapez ' + param + '€ à ' + adversaire.bnom);
                        adversaire.log(perso.bnom + 'vous tape ' + param + '€');
                    }

                }
/// WIP



                var choices = [
                    ["Je <le/la/l'/ADVERSAIRE> fume", "00_home/00_fume", "fume"],
                    ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------








            , "insta": function () {



                if (adversaire.sex > perso.sex) {
                    var text = "Vous montrez votre Insta à <~ADVERSAIRE>, qui se montre guère <impressionné/impressionnée/impressionnes/ADVERSAIRE>. Vous pouvez être sûr qu'ielle vous ignorera, désormais.";
                    adversaire.updateStat('sex', +10, perso);
                    perso.updateStat('sex', -10);
                    perso.log('Vous gagnez un nouveau follower nommé ' + adversaire.bnom);
                    adversaire.log("Vous commencez à follow " + perso.bnom);
                    var choices = [
                        ["Je <le/la/l'/COCHON> fume", "00_home/00_fume", "fume"],
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                } else {
                    adversaire.updateStat('sex', +10, perso);
                    perso.updateStat('sex', -10);
                    perso.log('Vous gagnez un nouveau follower nommé ' + adversaire.bnom);
                    adversaire.log("Vous commencez à follow " + perso.bnom);
                    var choices = [
                        ["Je <le/la/l'/COCHON> fume", "00_home/00_fume", "fume"],
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                    var text = "Peu après avoir montré votre Insta à <~ADVERSAIRE>, vous recevez une notification de following.\n\
- Gavé stylé, commente-t-<il/elle/ielle/ADVERSAIRE>";
                    var choices = [
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }




                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------









            , "fume": function () {
                adversaire = perso.getAdversaire();

                if (!adversaire) {
                    console.log(perso.nom + 'MAINFUME ERROR NO ADVERSAIRE');
                }

                if (!perso.choiceExit) {
                    console.log(perso.nom + " MAINFUME ERROR NO CHOICEEXIT");
                }


                if (perso.karma > adversaire.karma) {
                    var text = "Vous approchez de <~ADVERSAIRE> et lui adressez un prompt coup de boule sur le nez. <Il/Elle/Elles/ADVERSAIRE> s'écroule sur le sol, en sang.\n\
";
                    adversaire.updateStat('life', -25, perso);
                    adversaire.updateStat('karma', +10, perso);
                    perso.updateStat('karma', -10);

                    perso.log("Vous adressez un prompt coup de boule à " + adversaire.bnom);
                    adversaire.log(perso.bnom + " vous adresse un prompt coup de boule");
                    perso.cool("cochon_indispo", 1, "Le cochon est de nouveau dispo");
                    var choices = [
                        ["Je lui pisse dessus", folder, "pisse"],
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];


                    var phaseranimation = [
                        [1, perso.nom, "punch"],
                        [2, adversaire.nom, "takecher"]
                    ];


                    // perso interruption
                } else {
                    var text = "Tel le pigeon dans l'enfer des villes, <~ADVERSAIRE> esquive votre coup et vous allume en retour. ";

                    if (adversaire.sex > perso.sex) {
                        text += "<~ADVERSAIRE> vous urine dessus en riant, avant de s'éloigner.";
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);
                        perso.updateStat('sex', 1);

                    }

                    perso.updateStat('life', -25);
                    adversaire.log("Vous adressez un prompt coup de boule à " + adversaire.bnom);
                    adversaire.updateStat('karma', +10, perso);

                    perso.log(perso.bnom + " vous adresse un prompt coup de boule");
                    // perso interruption

                    var phaseranimation = [
                        [1, perso.nom, "takecher"],
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
                    flush: 1,
                    text: text,
                    choices: choices,
                };
            } //endscene()---------------------------------------------------------------------------






            , "pisse": function () {


                if (perso.sanity > adversaire.sanity) {
                    var text = "Vous urinez sur <~ADVERSAIRE>.\n\
";
                    perso.updateStat('sex', -10);

                    adversaire.updateStat('sex', 1);
                    adversaire.updateStat('sex', 1);
                    adversaire.updateStat('sex', 1);
                    adversaire.updateStat('sex', 1);
                    adversaire.updateStat('sex', 1);
                    adversaire.updateStat('sex', 1);
                    perso.log("Vous urinez sur " + adversaire.bnom);
                    adversaire.log(perso.bnom + " vous urine dessus");
                    var choices = [

                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                    // perso interruption
                } else {
                    var text = "Vous essayez d'uriner mais vous n'y parvenez pas. ";
                    perso.updateStat('karma', -25);
                    perso.updateStat('sanity', -25);
                    perso.log("Vous essayez d'uriner sur " + perso.bnom + " sans y parvenir");
                    // perso interruption

                    var choices = [
                        ["Je ramasse ma dignité", perso.choiceExit.folder, perso.choiceExit.page],
                        ["Je me suicide", folder, "suicide"]
                    ];


                }





                if (perso.choiceExit.coolDownLabel) {
                    perso.cool(perso.choiceExit.coolDownLabel, perso.choiceExit.coolDownTime);
                }


                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaseranimation: [
                        [1, perso.nom, "urine"],
                        [2, adversaire.nom, "lay"]
                    ]
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

