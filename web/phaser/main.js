
window.addEventListener('load', function () {

    var game = new Phaser.Game({
        width: 240,
        height: 150,
        type: Phaser.AUTO,
        backgroundColor: "#FFF",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });

    game.scene.add("Boot", Boot, true);

});

class Boot extends Phaser.Scene {

    preload() {

        this.load.pack("pack", "assets/asset-pack.json");
    }

    create() {

        this.scene.start("Level");
    }

}