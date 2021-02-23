/* fromage server */
console.log(' --- go --- ');
var params = require('./params.js');
var tools = require('./server/tools.js');
tools.setup();
//var game = require('./game/game.js');
var express = require('express');
var serveur = require('./server/server.js');
var app = express();
var fs = require('fs');









var scriptstoload = [];
var completedFiles = 0;

function fileCompleteLoader(a) {

    completedFiles++;
    var max = scriptstoload.length;
    if (completedFiles == max) {
        tools.report(max + ' JSON Files Loaded :-) !');
        serveur.startServer();
    }
}

function setup() {
    tools.report('Start loading JSON files ...');
    scriptstoload = [

    ];
    if (!scriptstoload.length)
        serveur.startServer();
    
    for (scr = 0; scr < scriptstoload.length; scr++) {
        tools.loadFile(scriptstoload[scr][1], scriptstoload[scr][0], fileCompleteLoader);
    }
}

setup();




















