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
            // lastScene = d.phaserscene;
            scenechanged = true;
        } else {
            /* Disabled autoscene
             if (d.scene && d.scene !== lastScene) {
             PS.changeScene(d.scene);
             lastScene = d.scene;
             scenechanged = true;
             }
             * 
             */
        }




        if (scenechanged) {

            jQuery('#phaserframe').fadeOut(0);
            var persals = persos;
            setTimeout(function () {
                // PS.changeSprite(1, mychar.type);
                /*
                 if (mychar.adversaire) {
                 var man = persos[mychar.adversaire];
                 if (man && man.type)
                 PS.changeSprite(2, man.type);
                 }
                 */
                if (d.phaseranimation) {
                    PS.animateHead(d.phaseranimation, persals);
                }
                jQuery('#phaserframe').fadeIn(100);


            }, 50);
        }









    }

}