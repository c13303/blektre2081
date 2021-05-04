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
        if (d.phaserscene && d.phaserscene !== lastScene) {
            PS.changeScene(d.phaserscene);
            lastScene = d.phaserscene;
            scenechanged = true;
        } else {
            if (d.scene && d.scene !== lastScene) {
                PS.changeScene(d.scene);
                lastScene = d.scene;
                scenechanged = true;
            }
        }

        if (scenechanged) {
            setTimeout(function () {
                PS.changeHead(1, mychar.type);
                if (mychar.adversaire) {
                    var man = persos[mychar.adversaire];
                    if (man && man.type)
                        PS.changeHead(2, man.type);
                }
            }, 100);
        }
    }

}