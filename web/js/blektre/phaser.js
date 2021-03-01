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

function phaserHook(d) {

    if (PS) {
        if (d.scene) {
            PS.changeScene(d.scene);
            setTimeout(function () {
                PS.changeHead(1, mychar.type);
                if (mychar.adversaire) {
                    var man = persos[mychar.adversaire];
                    PS.changeHead(2, man.type);
                }
            }, 100);
        }


    }

}