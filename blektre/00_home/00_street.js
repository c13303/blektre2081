process.chdir("/home/blektre2081/blektre2081/");
var game = require('./../../game/game.js');
var itemTools = require('./../../game/objets/itemsTools.js');



module.exports = {
    name: "Blektre_is_not_UNIX",
    folder: "00_home/00_street",

    getPage: function (ws, page = "intro", param = null) {

        var perso = ws.current_perso;
        var folder = this.folder;


        perso.choiceExit = {
            folder: folder,
            page: "intro"
        };

        perso.metroExit = {
            folder: folder,
            page: "intro"
        };



        /* 
         * 
         * CHAPITRES
         * 
         *   */
        var chapitre = {

            intro: function () {

                game.gC.setInPlace("Zonmai", perso);
                if (!perso.milestones.number_of_times_I_went_home) {
                    perso.milestones.number_of_times_I_went_home = 0;
                }
                perso.milestones.number_of_times_I_went_home++;



                var text = "Lundi 29 mars 2081. 44ème étage de la tour B du square Manuel Valls, dans le 796ème arrondissement de Parly 3. Fin de matinée. \n\
Assis sur le lit, vous contemplez par la fenêtre le périphérique interieur aérien supérieur, et son balet de voitures.\n\
Vous repensez au pot de célébration de la signature de votre CDI, hier soir. Peut-être auriez-vous dû éviter de vous faire gifler par <~STAGIAIRE>, <le/la/lea/STAGIAIRE> <stagiaire/stagiaire/stagiaires/STAGIAIRE>. A moins qu'il ne s'agissait d'une maladroite manifestation de son intérêt pour vous.\n\
Vous êtes en retard. Que faites-vous ?";

                var choices = [
                    ["Je vérifie mes likes sur Instagram", folder, "instagram"],
                    //    ["Je décroche le téléphone", folder, "tel_permis"],
                    ["Je m'habille rapidement, et je fonce au travail", folder, "HUBstreet"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            }//endscene()---------------------------------------------------------------------------

            , intro2: function () {

                perso.milestones.number_of_times_I_went_home++;
                if (perso.milestones.number_of_times_I_went_home === 3) {
                    
                }
                var text = " Vous êtes dans votre salon. Dehors, c'est l'heure de pointe et ça empeste le biodiesel.\n\
Le quartier est devenu très en vogue, car cela fait bien deux ou trois ans que l'heure de pointe dure de façon ininterrompue. \n\
Le téléphone, qui s'était tû quelques instants, se met à rejouer l'air agaçant qui vous sert de sonnerie, <~DJ_tube>, de <~DJ>. ";

                var choices = [
                    ["Je vérifie mes likes sur Instagram", folder, "instagram"],
                    //   ["Je décroche le téléphone", folder, "tel_permis"],
                    ["Je sors de chez moi", folder, "HUBstreet"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };
            }//endscene()---------------------------------------------------------------------------

            , "instagram": function () {
                var text = "Après avoir retrouvé votre téléphone au fond de votre lit, vous scrollez fièvreusement vers le haut du fil pour découvrir une seule et unique petite notification de like. \n\
Un unique like en 24 heures, c'est peu, mais c'est déjà ça.\n\
Vous cliquez nerveusement sur la notif', et découvrez qu'elle vient d'<un/une/uns/INFLUENCE> <certain/certaine/certaines/INFLUENCE> <~INFLUENCE> \n\
Vous ressentez quelque chose de l'ordre de la satisfaction, mêlée à un goût de merde. ";

                var choices = [
                    ["Je contacte <cet inconnu/cette inconnue/cettes inconnus/INFLUENCE>", folder, "instacontact"],
                    //  ["Je poste une nouvelle photo", folder, "instaphoto"],
                    ["Je range ce maudit téléphone", folder, "intro2"]

                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            }//endscene()---------------------------------------------------------------------------

            , "instacontact": function () {
                var text = "Vous parcourez rapidement son flux de photos, habilement habillé de selfies dans lesquelles <~INFLUENCE> se met en valeur dans des poses suggestives.  \n\
Vous sentez le pouvoir de l'attraction appliquer lentement ses gros pouces grumeleux tout autour de votre gorge.\n\
Vous vous lancez et commencez à pianoter un message. Quelle teneur souhaitez-vous lui susursufler ? ";

                var choices = [
                    ["Supplication menaçante", folder, "instacontact2__menace"],
                    ["Soumission totale", folder, "instacontact2__soumi"],
                    ["Rentre-dedans", folder, "instacontact2__rentre"],
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            } //endscene()---------------------------------------------------------------------------

            , "instacontact2": function (param) {

                if (param === 'menace') {
                    var text = "- Salut beauté/beautée/beauté, bien vu ton like ! Dis donc, j'avais justement prévu de passer dans le 77ème, j'espère que tu vas bien m'y accueillir ! LOL";
                }
                if (param === 'soumi') {
                    var text = "- Bonjour, merci infiniment pour ton petit like qui fait tellement du bien ... Je pensais passer dans le 77ème justement, tu crois que je pourrais t'y croiser ?";
                }
                if (param === 'rentre') {
                    var text = "- Yop";
                }

                text += "\
\n\
Le message est rapidement mis en vu, et reste sans réponse. Vous prenez cela pour une invitation.";

                var choices = [
                    ["Excellent", folder, "intro2"]
                ];
                return {
                    flush: 1,
                    text: text,
                    choices: choices
                };

            }//endscene()---------------------------------------------------------------------------


            , "HUBstreet": function () {
                game.gC.setInPlace("Square Manuel Valls", perso);

                var text = "Dehors, le bruit des voitures rend la communication difficile. Vous montez dans votre micro-Ford violette.";

                var choices = [
                    ["Je vais à la Défense", "00_home/01_defense", "HUBdefense"],
                    //   ["Je vais à Beverly Hills", folder, "HUBbeverly"],
                    ["Je vais sur le périphérique extérieur", folder, "HUBperiph"],
                    ["Je rentre chez moi", folder, "intro2"],
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

