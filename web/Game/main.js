var game;
var ctx;
var levelctx, scenery;
var currentScene;
window.addEventListener('load', function () {

    game = new Phaser.Game({
        width: 150,
        height: 100,
        type: Phaser.AUTO,
        backgroundColor: "#55415f",
        pixelArt: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }, physics: {
            default: 'arcade',
            arcade: {debug: true}
        },
    });
    game.scene.add("Boot", Boot, true);
    game.jojal = true;
});
class Boot extends Phaser.Scene {

    preload() {
        this.load.pack("pack", "assets/asset-pack.json");
    }

    create() {
        ctx = this;
        changeScene("StreetHub", false);
    }

}

function Ctx() {
    return ctx;
}

function levelCtx() {
    return levelctx;
}

function changeScene(name, remove = true) {
    console.log('===========ChangeScene :  ' + name + "===========");
    if (currentScene)
        ctx.scene.stop(currentScene);
    ctx.scene.start(name);
    currentScene = name;
    return ("Switched to " + name);
}
/*
 function changeSprite(playerId, animationName) {
 
 
 console.log("---ChangeSprite P" + playerId + "---");
 var phaserObj_character = levelctx["player" + playerId];
 console.log(phaserObj_character);
 if (phaserObj_character)
 {
 
 // init du sprite avec le skin
 phaserObj_character.skin = animationName;
 
 // idle
 try {
 phaserObj_character.play('idleP' + phaserObj_character.skin);
 } catch (e) {
 console.log('ERROR : Sprite Load for Player ' + playerId + ' : Skin ' + animationName + '');
 
 }
 
 
 } else {
 console.log('ERROR HEAD NOT FOUND');
 console.log(levelctx);
 }
 }
 */

function animateHead(phaseranimationArray, persos) {



//   console.log(phaseranimation);

    // hide all caracters
    for (var i = 0; i < 5; i++) {
        var playerCheck = levelctx["player" + i];
        if (playerCheck) {
            playerCheck.visible = false;
        }
    }

    for (var i = 0; i < phaseranimationArray.length; i++) {

        var phaseranimation = phaseranimationArray[i];
        var phaserObj_player = levelctx["player" + phaseranimation[0]];
        phaserObj_player.visible = true;

        if (!phaserObj_player) {
            console.log('ERROR SPRITE NOT FOUND');
            console.log(phaseranimation);
        }
        var nom = phaseranimation[1];
        var daPerso = persos[nom];
        if (!daPerso) {
            console.log('ERROR PERSAL NOT FOUND ' + nom);
        }
        console.log(daPerso.type);
        var type = phaseranimation[2];
        if (phaseranimation[3]) {
            var where = phaseranimation[3];
            var x = where[0];
            var y = where[1];
        }

        var animeName = type + 'P' + daPerso.type;
        console.log("AnimateHead de " + nom + " : P" + phaseranimation[0] + " -> " + animeName);
        phaserObj_player.play(animeName);
    }


}



