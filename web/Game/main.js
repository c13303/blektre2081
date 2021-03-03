var game;
var ctx;
var levelctx, scenery;
var head1, head2, head3, head4;
var currentScene;


window.addEventListener('load', function () {

    game = new Phaser.Game({
        width: 640,
        height: 480,
        type: Phaser.AUTO,
        backgroundColor: "#96b19c",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
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
        changeScene("Portrait", false);
    }

}

function Ctx() {
    return ctx;
}

function levelCtx() {
    return levelctx;
}

function changeScene(name, remove = true) {


    if (currentScene)
        ctx.scene.stop(currentScene);

    ctx.scene.start(name);


    currentScene = name;
    return ("Switched to " + name);
}

function changeHead(headNumber, frame) {
    console.log('changing head ' + headNumber + ' to frame ' + frame);
    var head = levelctx["head" + headNumber];
    if (head)
        head.setFrame(frame);
    else {
        console.log('ERROR HEAD NOT FOUND');
        console.log(levelctx);
    }
}