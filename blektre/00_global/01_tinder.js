process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "",
    folder: "00_global/01_tinder",

    getPage: function (ws, page = "intro") {


        var perso = ws.current_perso;
        var folder = this.folder;



        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var text = "Vous êtes sur Tinder. La photo de votre profil, qui de l'ange l'antique beauté a, n'est pas représentative de la réalité.";
                var choices = [
                    ["Je consulte les profils", folder, "swipe"],
                    ["Je modifie mon profil", folder, "myprofil"],
                ];
                choices.push(["Je quitte", perso.choiceExit.folder, perso.choiceExit.page]);
                return {
                    //   flush: 1,
                    nointerrupt: true,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },
            "swipe": function () {
                var people = game.gC.people;
                var browsing = [];
                console.log(game.gC.persos);
                for (const[key, value] of Object.entries(game.gC.persos)) {
                    console.log(key + ' = ' + JSON.stringify(value));
                    browsing.push(value);
                }
                perso.adversaire = browsing[0].nom;


                var text = "S'affiche sur l'écran le profil de " + perso.adversaire;
                var choices = [
                    ["Trop sexy, je matche", folder, "swipe"],
                    ["Je swipe", folder, "swipe"],
                ];

                return {
                    flush: 1,
                    text: text,
                    choices: choices,
                    phaserscene: "Portrait",
                }
            },

        }


        return chapitre[page]();



    }
}