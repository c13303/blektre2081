var game;
var ctx;
var levelctx, scenery;
var currentScene;
var persosOnScreen;

var music;
var musicPlayed;
var musicMuted = false;
var musicTrackListPosition = 0;
var musicTrackList = [
    ["Real Life Simulator Theme", ['../sound/mp3/02 - Real Life Simulator Theme.mp3', '../sound/mp3/02-Real-Life-Simulator-Theme.ogg', '../sound/mp3/02 - Real Life Simulator Theme.m4a']],
    ["Character Creation", ['../sound/mp3/01 - Character Creation.mp3', '../sound/mp3/01-Character-Creation.ogg', '../sound/mp3/01 - Character Creation.m4a']],
    ["Valises of Life", ['../sound/mp3/03 - Valises of Life.mp3', '../sound/mp3/03-Valises-of-Life.ogg', '../sound/mp3/03 - Valises of Life.m4a']]
];
var musicTrackList = [];
var that;
var width = window.parent.$(window).width();
var ZOOM = 4;
if (width < 600) {
    ZOOM = 3;
}

if (width < 400) {
    ZOOM = 2;
}

console.log('Start with Zoom ' + ZOOM);
window.addEventListener('load', function () {

    game = new Phaser.Game({
        width: 150,
        height: 100,
        type: Phaser.AUTO,
        backgroundColor: "#e6c86e",
        transparent: true,
        zoom: ZOOM,
        pixelArt: true

    });
    game.scene.add("Boot", Boot, true);
    game.jojal = true;
    /*
     * 
     * @type type scale: {
     mode: Phaser.Scale.FIT,
     autoCenter: Phaser.Scale.CENTER_BOTH
     }
     */
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
        if (musicTrackList.length) {
            music = this.sound.add(musicTrackList[musicTrackListPosition][0]);
            musicPlayed = false;
        }

        that = this;
        changeScene("Preloader", false);
        setInterval(this.update, 500);
    }

    update() {

        if (persosOnScreen) /// label following ass
            for (const [nom, spritePlayer] of Object.entries(persosOnScreen)) {
                var label = spritePlayer.label;
                label.css("left", (spritePlayer.x - 16) * ZOOM);
                label.css("margin-top", (spritePlayer.y - (28 * ZOOM)) * ZOOM);


                if (spritePlayer.movingToLeft) {
                    spritePlayer.x -= 8;
                }
                if (spritePlayer.movingToRight) {
                    spritePlayer.x += 8;
                }

            }





    }

}




;
function Ctx() {
    return ctx;
}

function levelCtx() {
    return levelctx;
}

function changeScene(name) {
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
    if (!musicTrackList.length)
        return null;
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

function moveSprite() {

}

function noticeHeads() {
    for (var i = 0; i < 5; i++) {
        var playerCheck = levelctx["player" + i];
        if (playerCheck) {
            playerCheck.visible = false;
        }
    }
}



function animateHeadz(phaseranimationArray, persos, d = null) {
    // console.log('-----animateHeadz---');
    persosOnScreen = {};
    var nbNotice = 0;
    var html = "";
    //   console.log(phaseranimation);

    // hide all caracters
    for (var i = 0; i < 5; i++) {
        var playerCheck = levelctx["player" + i];
        if (playerCheck) {
            // console.log('invisible');
            playerCheck.visible = false;
        }
    }

    window.parent.$(".playername").hide();
    window.parent.$(".playername").css('width', 42 * ZOOM);
    var arrayOfNoticesToShow = [];
    for (var i = 0; i < phaseranimationArray.length; i++) {

        var phaseranimation = phaseranimationArray[i];

        if (phaseranimation[0] === 'cartop') {
            levelctx.cartop.scaleX = -1;
            continue;
        }

        var spritePlayer = levelctx["player" + phaseranimation[0]];

        var options = phaseranimation[3];




        if (!spritePlayer) {
            console.log('ERROR SPRITE NOT FOUND');
            console.log(phaseranimation);
            continue;
        }


        spritePlayer.visible = true;
        // console.log('visible');
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

        spritePlayer.perso = nom;
        spritePlayer.daPerso = daPerso;
        // console.log(spritePlayer.perso + ' is visible');
        persosOnScreen[nom] = spritePlayer;
        // console.log(daPerso.type);
        var type = phaseranimation[2];


        if (options) {

            if (options.startX)
                spritePlayer.x = options.startX;

            if (options.startY)
                spritePlayer.y = options.startY;

            if (options.flipX)
                spritePlayer.scaleX = -1;

            if (options.endX) {
                if (options.endX > spritePlayer.x) {  /// from left to right
                    var endX = options.endX;
                    spritePlayer.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject, frameKey) {
                        if (this.cancel)
                            return null;


                        if (this.x < endX) {
                            this.x += 4;
                        } else {
                            console.log('Walk  anime (1) stopeed : idle');
                            this.play('idleP' + this.daPerso.type);
                            delete this.options;
                            this.cancel = true;

                        }
                    });
                }

                if (options.endX < spritePlayer.x) {  /// from left to right
                    var endX = options.endX;
                    spritePlayer.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject, frameKey) {
                        if (this.cancel)
                            return null;

                        if (this.x > endX) {
                            this.x -= 4;
                        } else {
                            console.log('Walk  anime (2) stopeed : idle');
                            this.play('idleP' + this.daPerso.type);
                            delete this.options;
                            this.cancel = true;
                        }
                    });
                }

            }






        }


        /* FUMING MOVESET */

        spritePlayer.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject, frameKey) {

            if (anim.key.indexOf("takecher") !== -1) {
                //    console.log(anim.key + " " + frame.index);
                if (frame.index === 6) {
                    //  console.log("reculing trigger");
                    gameObject.movingToLeft = true;
                }

                if (frame.index === 8) {
                    //  console.log("reculing trigger");
                    gameObject.movingToLeft = false;
                    this.y += 8;
                }
            }

        });













        var animeName = type + 'P' + daPerso.type;
        //   console.log("animateHeadz de " + nom + " : P" + phaseranimation[0] + " -> " + animeName);
//        console.log(spritePlayer);
        //      console.log(animeName);
        try {

            spritePlayer.play(animeName);
        } catch (e) {
            console.log(e);
        }



        var coord = [spritePlayer.x - 16, spritePlayer.y + 24];
        var j = i + 1;
        var label = window.parent.$("#p" + j);
        var yOFFSET = 0;
        if (ZOOM === 4)
            yOFFSET = 236;
        if (ZOOM === 2)
            yOFFSET = -156;
        var stil = "margin-top: " + yOFFSET + "px";

        spritePlayer.label = label;
        label.show();
        label.html("<div class='etikette etikette_" + nom + "'   style='" + stil + "'>" + nom + "</div>");
        label.css("left", (spritePlayer.x - 16) * ZOOM);
        label.css("margin-top", (spritePlayer.y - (28 * ZOOM)) * ZOOM);



        // this.levelctx.add.dynamicBitmapText(spritePlayer.x - 16, spritePlayer.y + 24, 'CIOFONT', nom, 9);

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
    // console.log('distributing ' + arrayOfNoticesToShow.length + ' notices');
    // console.log(arrayOfNoticesToShow);
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
                    // console.log('show ' + elem.html());
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


