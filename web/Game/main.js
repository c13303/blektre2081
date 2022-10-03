var game;
var ctx;
var levelctx, scenery;
var currentScene;

var music;
var musicPlayed;
var musicMuted = false;
var musicTrackListPosition = 0;

var musicTrackList = [
    ["Real Life Simulator Theme", ['../sound/mp3/02 - Real Life Simulator Theme.mp3', '../sound/mp3/02-Real-Life-Simulator-Theme.ogg', '../sound/mp3/02 - Real Life Simulator Theme.m4a']],
    ["Character Creation", ['../sound/mp3/01 - Character Creation.mp3', '../sound/mp3/01-Character-Creation.ogg', '../sound/mp3/01 - Character Creation.m4a']],
    ["Valises of Life", ['../sound/mp3/03 - Valises of Life.mp3', '../sound/mp3/03-Valises-of-Life.ogg', '../sound/mp3/03 - Valises of Life.m4a']]
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

        // this.load.bitmapFont('CIOFONT', '../font/bmp/silkcreen_0.png', '../font/bmp/silkcreen.fnt');

        //    this.load.bitmapFont('CIOFONT', '../font/bmp/desyrel.png', '../font/bmp/desyrel.xml');



        this.load.pack("pack", "assets/asset-pack.json");

        for (var i = 0; i < musicTrackList.length; i++) {
            var tune = musicTrackList[i];
            // console.log(tune);
            this.load.audio(tune[0], tune[1], {stream: true});
        }








        this.load.on('progress', function (value) {
            window.parent.$("#loadingtext").html(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function (file) {
            //  assetText.setText(file.key);
            //   window.parent.$("#assettext").html(file.key);
        });
        this.load.on('complete', function () {

            window.parent.$("#loadingtext").remove();
            window.parent.$("#assettext").remove();
        });








    }

    create() {
        ctx = this;




        //console.log('writing');

        this.sound.pauseOnBlur = false;


        music = this.sound.add(musicTrackList[musicTrackListPosition][0]);
        musicPlayed = false;

        that = this;
        changeScene("Preloader", false);
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
    //  console.log('=========== ChangeScene :  ' + name + "===========");
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


function noticeHeads() {
    for (var i = 0; i < 5; i++) {
        var playerCheck = levelctx["player" + i];
        if (playerCheck) {
            playerCheck.visible = false;
        }
    }
}



function animateHeadz(phaseranimationArray, persos, d = null) {

    var persosOnScreen = {};

    var nbNotice = 0;
    var html = "";
    //   console.log(phaseranimation);

    // hide all caracters
    for (var i = 0; i < 5; i++) {
        var playerCheck = levelctx["player" + i];
        if (playerCheck) {
            playerCheck.visible = false;
        }
    }

    window.parent.$(".playername").hide();
    var arrayOfNoticesToShow = [];

    for (var i = 0; i < phaseranimationArray.length; i++) {

        var phaseranimation = phaseranimationArray[i];
        var phaserObj_player = levelctx["player" + phaseranimation[0]];
        if (!phaserObj_player) {
            console.log('ERROR SPRITE NOT FOUND');
            console.log(phaseranimation);
            continue;
        }


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

        phaserObj_player.perso = nom;
        persosOnScreen[nom] = phaserObj_player;



        // console.log(daPerso.type);
        var type = phaseranimation[2];
        if (phaseranimation[3]) {
            var where = phaseranimation[3];
            var x = where[0];
            var y = where[1];
        }

        var animeName = type + 'P' + daPerso.type;
        //   console.log("animateHeadz de " + nom + " : P" + phaseranimation[0] + " -> " + animeName);
//        console.log(phaserObj_player);
        //      console.log(animeName);
        try {

            phaserObj_player.play(animeName);
        } catch (e) {
            console.log(e);
        }




        var coord = [phaserObj_player.x - 16, phaserObj_player.y + 24];
        var j = i + 1;
        var label = window.parent.$("#p" + j);
        label.show();
        label.html("<div class='etikette etikette_" + nom + "'>" + nom + "</div>");
        label.css("left", (phaserObj_player.x - 10) * 4);
        label.css("top", (phaserObj_player.y - 28) * 4);



        // this.levelctx.add.dynamicBitmapText(phaserObj_player.x - 16, phaserObj_player.y + 24, 'CIOFONT', nom, 9);

        if (daPerso.nom === window.parent.mychar.nom) {
            var noticeOrder = 1;
            var seconds = 1;
            var noticeHtml = "";
            // [noticeId, delay]


            if (daPerso.usNotice && daPerso.usNotice.length > 0) {
                for (var k = 0; k < daPerso.usNotice.length; k++) {
                    nbNotice++;
                    var daNotz = daPerso.usNotice[k];
                    var sign;
                    if (daNotz.value > 0) {
                        sign = "+";
                        var dieClasse = "usnotice_plus";
                    } else {
                        sign = "";
                        var dieClasse = "usnotice_moins";

                    }
                    var usNoticeID = "usNotice_N" + nbNotice;

                    // playername update labels
                    var curDelay = noticeOrder * seconds;
                    // arrayOfNoticesToShow.push([usNoticeID, curDelay]);


                    noticeOrder++;

                    arrayOfNoticesToShow.push([daNotz.nom, "<div id='" + usNoticeID + "' class='usNotice " + dieClasse + " ' data-nom='" + daPerso.nom + "' data-delay='" + curDelay + "'>" + daNotz.stat + sign + daNotz.value + '</div>']);



                }
            }
        }

    } /// endof animationArray


    /// redistribuer les notices
    console.log('distributing ' + arrayOfNoticesToShow.length + ' notices');
    console.log(arrayOfNoticesToShow);
    for (var u = 0; u < arrayOfNoticesToShow.length; u++) {
        var nom = arrayOfNoticesToShow[u][0];
        var html = arrayOfNoticesToShow[u][1];
        window.parent.$("body").find(".etikette_" + nom).append(html);
}


}


function attribute_notice_to_sprite() {

}


function display_usNotices() {
    setTimeout(function () {

        var notices = window.parent.$("body").find(".usNotice");

        if (notices && notices.length) {

            notices.each(function () {
                var elem = window.parent.$(this);



                var delay = elem.data('delay');

                delay--;
                if (delay === 0) {
                    console.log('show ' + elem.html());
                    elem.show().addClass('acvite');
                    setTimeout(function () {
                        window.parent.tweenNotice();
                    }, 100);

                }
                elem.data('delay', delay);
                if (delay === -2) {
                    elem.remove();
                }




            });


        }

        display_usNotices();
        // 





    }, 1000);
}
display_usNotices();


