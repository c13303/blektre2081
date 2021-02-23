/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* file created by charles.torris@gmail.com */

module.exports = {
    nPlayers: 32,
    personalKeys: ['itemsHere'],
    logLength: 64, // length of log of each ours
    debuglogLength: 0,
    worldSize: 128,
    levels: 1, // include 0 = 1 level
    tickrate: 58, // better have a 24 (pixels) round  /// 
    viewSize: 8,
    writeLogs: true,
    silentReport: false,
    cronInterval: 10000,
    spawnX: 14,
    spawnY: 115,
    iAautorevive: false,
    stuckLimitBeforeReaction: 4, // wil stop at -1
    debugOurs: -1,
    hidestats: false,
    dropItemMaxDist: 3,
    interactMaxDist: 3,
    oursmin: {
        "life": 0,
        "food": -100,
        "bladder": 0,
        "sanity": -100,
        "karma": -100,
    },
    oursmax: {
        "life": 100,
        "food": 100,
        "sanity": 100,
        "bladder": 300,
        "karma": 100,
    }

};