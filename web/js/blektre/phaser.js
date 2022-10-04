/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/*
 * 
 *  SERT A RECUPERER LE CONTEXTE IFRAME PHASER
 */

var PS; // phaserstuff
var ctx;
var levelctx;
function phaseranim() {
    PS = document.getElementById('phaserframe').contentWindow;
    ctx = PS.Ctx();
    levelctx = PS.levelCtx();

}
setTimeout(function () {
    phaseranim();
}, 1000);

var lastScene = null;
function phaserHook(d) {

    var scenechanged = null;

    if (PS) {
        if (d.phaserscene) {
            PS.changeScene(d.phaserscene);
            scenechanged = true;
        }




        if (scenechanged) { // si scene a changé, on change les têtes peu après
            jQuery('#phaserframe').fadeOut(0);
            setTimeout(function () {
                var persals = persos;
                if (d.phaseranimation) {
                    PS.animateHeadz(d.phaseranimation, persals);
                }
                jQuery('#phaserframe').fadeIn(0);
            }, 50);
        } else { // sinon sans attendre
            if (d.phaseranimation) {
                var persals = persos;
                PS.animateHeadz(d.phaseranimation, persals);
            }
        }


    }
  

}
$(document).ready(function () {
    $('#music').click(function () {
        console.log('stopmusic');
        PS.stopMusic();
    });
});