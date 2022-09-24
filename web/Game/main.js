var game;
var ctx;
var levelctx, scenery;
var currentScene;

var music;
var musicPlayed;
var musicMuted = false;
var musicTrackListPosition = 0;

var musicTrackList = [
    ["Real Life Simulator Theme", '02 - Real Life Simulator Theme.mp3'],
    ["Character Creation", '01 - Character Creation.mp3'],
    ["Valises of Life", '03 - Valises of Life.mp3']
];

var that;

window.addEventListener('load', function () {

    game = new Phaser.Game({
        width: 150,
        height: 100,
        type: Phaser.AUTO,
        backgroundColor: "#e6c86e",
        transparent: true,

        pixelArt: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });
    game.scene.add("Boot", Boot, true);
    game.jojal = true;
});
class Boot extends Phaser.Scene {

    preload() {
        this.load.pack("pack", "assets/asset-pack.json");

        for (var i = 0; i < musicTrackList.length; i++) {
            var tune = musicTrackList[i];
            this.load.audio(tune[0], [
                '../sound/mp3/' + tune[1]
            ], {stream: true});
        }


    }

    create() {
        ctx = this;
        changeScene("Preloader", false);


        this.sound.pauseOnBlur = false;


        music = this.sound.add(musicTrackList[musicTrackListPosition][0]);
        musicPlayed = false;

        that = this;

    }

}
;

function Ctx() {
    return ctx;
}

function levelCtx() {
    return levelctx;
}

function changeScene(name, remove = true) {
    console.log('=========== ChangeScene :  ' + name + "===========");
    if (currentScene)
        ctx.scene.stop(currentScene);
    ctx.scene.start(name);
    currentScene = name;

    playMusic();

    return ("Switched to " + name);

}

function musicPlaylisting() {
    console.log('Track music is over');
    musicPlayed = false;
    musicTrackListPosition++;
    if (!musicTrackList[musicTrackListPosition]) {
        musicTrackListPosition = 0;
    }

    music = that.sound.add(musicTrackList[musicTrackListPosition][0]);

    playMusic();

}

function playMusic() {
    if (music && !musicPlayed && !musicMuted) {
        music.play();
        musicPlayed = true;
        music.on('complete', musicPlaylisting);
        window.parent.document.getElementById('musictitle').innerHTML = musicTrackList[musicTrackListPosition][0];
    }
}


function stopMusic() {
    if (!musicMuted) {
        music.stop();
        musicMuted = true;
        window.parent.document.getElementById('musictitle').innerHTML = "⏵︎︎";
    } else {
        musicMuted = false;
        musicPlaylisting();
    }

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

function animateHead(phaseranimationArray, persos, d = null) {



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
        if (!phaserObj_player) {
            console.log('ERROR SPRITE NOT FOUND');
            console.log(phaseranimation);
            continue;
        }
        console.log(phaserObj_player);


        phaserObj_player.visible = true;


        var nom = phaseranimation[1];
        if (!persos) {
            console.log('Lost Persos ... reloading scene');
            return null;
        }
        var daPerso = persos[nom];
        if (!daPerso) {
            console.log(nom);
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
        //   console.log("AnimateHead de " + nom + " : P" + phaseranimation[0] + " -> " + animeName);
        phaserObj_player.play(animeName);
}


}


