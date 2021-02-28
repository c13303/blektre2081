var game;

window.addEventListener('load', function () {

    game = new Phaser.Game({
        width: 640,
        height: 480,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
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
    }

    create() {

        this.scene.start("Level");


    }

}


var jeanpierre = 333;
function Test(){
    return ('OK GROS');
    var caca = 2;
}