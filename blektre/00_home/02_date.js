process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');
module.exports = {
    name: "Date",
    folder: "00_home/02_date",
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

            "habillage": function () {
                game.gC.setInPlace("Zonmai", perso);
                var text = "Vous vous préparez à aller boire une bière.";
                var choices = [
                    ["Je vais à mon rencard", folder, "intro"],
                    ["Je vais me coucher", "00_home/00_street", "dodo"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------


            , "intro": function () {
                game.gC.setInPlace("Bar Noir", perso);

                var text = "Vous êtes au Bar Noir. <~ADVERSAIRE> est en retard.\n\
Que boire pour oublier que personne ne vous respecte ?  ";

                var choices = [
                    ["Une bière ", folder, "boire__biere"],
                    ["Un mètre de téquila", folder, "boire__tequila"],
                    ["Je me tire de cet endroit puant", "01_defense", "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------




            , "boire": function (param) {

                if (param === "biere") {
                    var text = "La bière est amère. Votre vessie se remplit.";
                }

                if (param === "tequila") {
                    var text = "Un mètre de tequila, c'est énorme, et ça coûte cher. Maintenant il faut tout boire. ";
                    perso.updateStat('sanity', -50);
                }

                var choices = [
                    ["Je rote", folder, "cochon"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------



            , "cochon": function () {

                var cochon = game.getPersoByRole("COCHON");
                perso.adversaire = cochon.nom;


                var text = "<~COCHON> finit par débarquer. <Il/Elle/Ielle/COCHON> commande un mojito et vous sourit.";


                var choices = [
                    //    ["Je fais le timide", folder, "timide"],
                    ["Je la cruise outrageusement", folder, "cruise"],
                    ["J'apprends à la connaître", folder, "intro"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "cruise": function () {

            

                var text = "<~COCHON> vous met au défi.\n\
- Tu connais mon Instagram, au moins ?";

                var choices = [
                    ["Bien sûr", folder, "devine", "input"],
                    ["Peu importe, mes sentiments sont réels", folder, "pecho"],
                    ["Je pars en pleurant", "00_street", "nuit"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------








            , "devine": function () {

             


                var text = "<~COCHON> rougit car vous avez trouvé juste.\n\
<Il/Elle/Ielle/COCHON> commande un nouveau triple jack, et vous sourit de nouveau.\n\
- OK, retrouvre-moi au Bergail cette nuit.";

                var choices = [

                    ["Bien joué Smarties", "00_street", "nuit"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------



            , "bergail": function () {



                var text = "Vous entamez une profonde discussion, au détour de laquelle <~COCHON> vous explique qu'elle n'est pas l'aise avec la séduction.\n\
- Moi, mon secret pour pécho, c'est la MDMA.";

                var choices = [
                    ["Bonne idée", folder, "bergail_end"],
                    ["C'est l'heure d'y aller", "00_street", "nuit"]

                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------


            , "pecho": function () {

               



                var text = "<~COCHON> vous gifle. \n\
- Désolé mais t'es loin d'être assez chaud pour moi.\n\
Vous êtes dégoûté.";

                var choices = [
                    ["Je le fume", folder, "fume"],
                    ["C'est l'heure d'y aller", "00_fume", "nuit"]

                ];
                return {
                    flush: 1,
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

