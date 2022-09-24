
// You can write more code here

/* START OF COMPILED CODE */

class Preloader extends Phaser.Scene {

    constructor() {
        super("Preloader");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // introscreen
        this.add.image(75, 50, "introscreen");

        // click
        const click = this.add.sprite(75, 50, "click");

        this.click = click;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    click;

    /* START-USER-CODE */

    // Write your code here
    init() {
        levelctx = this;

    }
    create() {

        this.editorCreate();
        this.click.setInteractive();

        window.parent.resizeIframeOnCanvas();
        
        this.click.on('pointerdown', function (pointer) {

            changeScene('Portrait');

        });

    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
