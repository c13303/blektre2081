process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Blektre_is_not_UNIX",
    folder: "00/fume",
    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;

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
                    ["Wow", "01_home/00_home", "intro"]
                ];
                return {
                    
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------





            , "fume": function (param) {
                adversaire = perso.getAdversaire();

                if (!adversaire) {
                    console.log(perso.nom + 'MAINFUME ERROR NO ADVERSAIRE');
                }

                if (!perso.choiceExit) {
                    console.log(perso.nom + " MAINFUME ERROR NO CHOICEEXIT");
                }


                /* PERSO WINS */
                if (perso.karma > adversaire.karma) {
                    var text = "Vous adressez un coup de boule à <~ADVERSAIRE>. <Il/Elle/Ielle/ADVERSAIRE> se retrouve sur le sol, en sang.";

                    adversaire.updateStat('life', -25, perso);
                    adversaire.updateStat('karma', +10, perso);
                    perso.updateStat('karma', -10);
                    perso.log("Vous fumez " + adversaire.bnom);
                    adversaire.log(perso.bnom + " vous a fumé");
                    adversaire.horsjeu = 1;

                    var choices = [
                        ["Je lui pisse dessus", folder, "pisse"],
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];


                    var phaseranimation = [
                        [1, perso.nom, "punch"],
                        [2, adversaire.nom, "takecher"]
                    ];


                    adversaire.interrupt("00/fume", "interrupt_fume", perso, "Test Notif Stat ?", {isWinning: 1});



                } else {
                    /* ADVERSAIRE WINS */

                    var text = "Agile comme le pigeon, <~ADVERSAIRE> esquive votre coup et vous fume en retour. ";
                    var urine = 0;
                    if (adversaire.sex > 10) {
                        text += "\
\n\
[-sex] <~ADVERSAIRE> vous urine dessus en riant, avant de s'éloigner.";
                        for (var i = 0; i < 10; i++)
                            perso.updateStat('sex', 1);
                        urine = 1;
                    }

                    perso.updateStat('life', -25);
                    adversaire.log("Vous avez fumé " + perso.bnom);
                    adversaire.updateStat('karma', +10, perso);

                    perso.log("Vous vous faites fumer par " + adversaire.bnom);
                    // perso interruption

                    var phaseranimation = [
                        [1, perso.nom, "takecher"],
                        [2, adversaire.nom, "punch"]
                    ];



                    var choices = [
                        ["Je ramasse mes dents", perso.choiceExit.folder, perso.choiceExit.page]
                    ];

                    adversaire.interrupt("00/fume", "interrupt_fume", perso, "Test Notif Stat ?", {isWinning: 0, urinated: urine});

                }




                if (perso.choiceExit.coolDownLabel) {
                    perso.cool(perso.choiceExit.coolDownLabel, perso.choiceExit.coolDownTime);
                }

                return {
                    phaserscene: "Duel",
                    phaseranimation: phaseranimation,
                    
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------









            , "peopleHere": function () {


                var text = "Qui embrouiller ? ";

                var choices = [

                ];






                var peopleHere = game.gC.getOtherPeopleHere(perso.place, perso);
                for (var i = 0; i < peopleHere.length; i++) {

                    var random = peopleHere[i];


                    choices.push([random.nom, folder, "selectPeople__" + random.nom]);
                }

                choices.push(["Finalement, non", perso.choiceExit.folder, perso.choiceExit.page]);

                return {
                    
                    text: text,
                    choices: choices


                };

            }

            , selectPeople: function (param) {
                if (!param) {
                    perso.hack();
                    return null;
                }


                if (!game.gC.persos[param] || param === perso.nom) {
                    perso.hack();
                    return null;
                }

                perso.adversaire = param;
                return this.fume();

            }





            , interrupt_fume: function (param) {


                //   console.log('interrupt_fume');
                //    console.log(param);

                var text = "";


                var choices = [perso.getChoiceEndInterrupt("GOSH")];


                var adversaire = game.gC.persos[param.adversaire];

                if (!param.isWinning) {
                    text += "Quand tout à coup, vous tombe dessus par surprise.\n\
[karma] Vous évitez le coup et lui adressez un prompt coup de boule en retour.\n\
Vous le laissez, en PLS sur le sol.";
                    var phaseranimation = [
                        [1, perso.nom, "punch"],
                        [2, adversaire.nom, "takecher"]
                    ];
                } else {
                    text += "Quand tout à coup,  vous tombe dessus par surprise.\n\
[-karma] Il vous adresse un prompt coup de boule qui vous laisse en PLS sur le sol.";
                    var phaseranimation = [
                        [1, perso.nom, "takecher"],
                        [2, adversaire.nom, "punch"]
                    ];
                }


                return {
                    phaserscene: "Duel",
                    phaseranimation: phaseranimation,
                    
                    text: text,
                    choices: choices
                };
            }

            //endscene()---------------------------------------------------------------------------




















            , "embrouille": function () {




                adversaire = perso.getAdversaire();
                console.log(adversaire);

                var phaseranimation = [[1, perso.nom, "idle"]];

                phaseranimation.push([2, adversaire.nom, "idle"]);
                perso.phaseranimation = phaseranimation;

                var text = "Vous approchez de <~ADVERSAIRE>";
                var choices = [
                    ["Je demande de l'argent", folder, "money"],
                    ["Je l'oblige à me follow sur Insta", folder, "insta"],
                    ["Je <le/la/l'/ADVERSAIRE> fume", "00/fume", "fume"],
                    ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                ];
                return {
                    
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
                    ["1500 et je te permets de prendre un selfie avec oim", "00/fume", "moneyask__1500"],
                    ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                ];
                return {
                    
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
                    ["Je <le/la/l'/ADVERSAIRE> fume", "00/fume", "fume"],
                    ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                ];
                return {
                    
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------








            , "insta": function () {



                if (adversaire.sex > perso.sex) {
                    var text = "[-sex] Vous montrez votre Insta à <~ADVERSAIRE>, qui se montre guère <impressionné/impressionnée/impressionnes/ADVERSAIRE>. Vous pouvez être sûr qu'ielle vous ignorera, désormais.";
                    adversaire.updateStat('sex', +10, perso);
                    perso.updateStat('sex', -10);
                    perso.log('Vous gagnez un nouveau follower nommé ' + adversaire.bnom);
                    adversaire.log("Vous commencez à follow " + perso.bnom);
                    var choices = [
                        ["Je <le/la/l'/COCHON> fume", "00/fume", "fume"],
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                } else {
                    adversaire.updateStat('sex', +10, perso);
                    perso.updateStat('sex', -10);
                    perso.log('Vous gagnez un nouveau follower nommé ' + adversaire.bnom);
                    adversaire.log("Vous commencez à follow " + perso.bnom);
                    var choices = [
                        ["Je <le/la/l'/COCHON> fume", "00/fume", "fume"],
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                    var text = "Peu après avoir montré votre Insta à <~ADVERSAIRE>, vous recevez une notification de following.\n\
- Gavé stylé, commente-t-<il/elle/ielle/ADVERSAIRE>";
                    var choices = [
                        ["Je m'en vais", perso.choiceExit.folder, perso.choiceExit.page]
                    ];
                }




                return {
                    
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------












            , "pisse": function () {


                if (perso.sanity > adversaire.sanity) {
                    var text = "[+sex] Vous urinez sur <~ADVERSAIRE>.\n\
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

