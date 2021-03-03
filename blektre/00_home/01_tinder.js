process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');

module.exports = {
    name: "Home",
    folder: "00_home",
    chapitre: "/01_tinder",

    getPage: function (ws, page = "intro") {

        var nameChapitre = this.folder + "/" + this.chapitre;
        var folder = this.folder;
        var perso = ws.current_perso;



        /* CHAPITRE */
        var chapitre = {

            "intro": function () {
                var text = "Vous êtes sur Tinder. La photo de votre profil, qui de l'ange l'antique beauté a, n'est pas représentative de la réalité.";
                var choices = [
                    ["Je consulte les profils", "00_home/01_tinder", "swipe"],
                    ["Je modifie mon profil", "00_home/01_tinder", "myprofil"],
                    ["Je quitte", folder + "/00_intro", "intro"],
                ];

                return {
                    //   flush: 1,
                    text: text,
                    choices: choices
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
                    ["El est trop mimi, je matche", "00_home/01_tinder", "swipe"],
                    ["Je swipe", "00_home/01_tinder", "swipe"],
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