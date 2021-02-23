/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


process.chdir("/home/blektre2081/blektre2081/");

var game = require('./../../game/game.js');

module.exports = {
    emoji: {
        DOOR: "&#128682;",
        CAR: "&#128663;",
        BUILDING: "&#127961;&#65039",
        DESTIN: "&#x1F9EC;",
    },
    addItem: function (perso, nom, qt, data = null) {
        var item = {
            nom: nom,
            qt: qt,
            data: data
        }

        if (!perso.inventaire[nom]) {
            perso.inventaire[nom] = item;
        } else {
            perso.inventaire[nom].qt += qt;
        }
        console.log(perso.nom + ' ajout item : ' + JSON.stringify(item));
        return item;
    },

    hasItem: function (perso, nom, qt = 1) {
        if (perso.inventaire[nom] && perso.inventaire[nom].qt >= qt) {
            return perso.inventaire[nom];
        } else {
            return null;
        }
        return null;
    },

    removeItem: function (perso, nom, qt = 1) {
        if (!this.hasItem(perso, nom, qt))
            return null;
        perso.inventaire[nom].qt -= qt;
        console.log('remove restant ' + perso.inventaire[nom].qt)
        if (perso.inventaire[nom].qt <= 0) {
            perso.inventaire[nom] = null;
            delete perso.inventaire[nom];
        }

        return perso.inventaire[nom];

    }

}