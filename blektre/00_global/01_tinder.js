process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "",
    folder: "00_global",
    chapitre: "/01_tinder",

    getPage: function (ws, page = "intro") {

        var ppath = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;



        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var text = "Vous êtes sur Tinder. La photo de votre profil, qui de l'ange l'antique beauté a, n'est pas représentative de la réalité.";
                var choices = [
                    ["Je consulte les profils", ppath, "swipe"],
                    ["Je modifie mon profil", ppath, "myprofil"],
                ];
                choices.push(perso.globalEndChoice);
                return {
                    //   flush: 1,
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
                    ["Trop sexy, je matche", ppath, "swipe"],
                    ["Je swipe", ppath, "swipe"],
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