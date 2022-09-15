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
                var text = "Vous n'avez rien dans votre garde robe. Vous allez donc porter votre tenue normcore usée habituelle.";
                var choices = [
                    ["Je vais à mon rencard", folder, "rencard"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            } //endscene()---------------------------------------------------------------------------


            , "rencard": function () {
                game.gC.setInPlace("Domaque", perso);

                var text = "Vous arrivez au McSushi, avec une petite boule dans la gorge.\n\
A peine 47 minutes après, <~ADVERSAIRE> arrive, l'air <saoulé/saoulée/saoulés/~ADVERSAIRE>\n\
- Bon, on y va ? dit-<il/elle/iel/~ADVERSAIRE>\n\
Vous pénétrez dans le restaurant. <Le serveur/La serveuse/Le serveuses/~SERVEUR> semble vous ignorer.";
                var choices = [
                    ["J'essaie d'attirer poliment l'attention <du serveur/de la serveuse/du serveuses/~SERVEUR> ", folder, "attention"],
                    ["Je me chie dessus et désire m'en aller> ", folder, "quit"],
                    ["Je <le/la/lea/~SERVEUR> fume", folder, "fume"]
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

