/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


process.chdir("/home/blektre2081/blektre2081/");


module.exports = {
    create: function (nom, type, bio) {
        var perso = {
            nom: nom,
            type: type,
            bio: bio,
            chapitre: '00_home/00_intro',
            page: "disclaimer",
            traits: {},
            life: 100,
            karma: 0,
            sex: 0,
            moral: 0,
            sanity: 0,
            money: 12,
            place: null, // current place
            places: [["Maison", "00_home/00_intro"]], /// les places unlocked dans la map
            disclaimer: true,
            loglines: [], // les petites notifs type "vous avez .."
            popups: [], // les popups notifs (plutot pour le farming / incremental)
            interruptions: [], // bolossages 
            step: 0,
            inventaire: {},
            toInsertDB: true,
            place: null,
            day: 0,
            horsjeu: false,
        }
        return perso;
    }

}