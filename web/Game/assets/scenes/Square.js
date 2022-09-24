
// You can write more code here

/* START OF COMPILED CODE */

class Square extends Phaser.Scene {

    constructor() {
        super("Square");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // square
        this.add.image(75, 50, "square");

        // player2
        const player2 = this.add.sprite(105, 30, "perso1", 0);
        player2.scaleX = -1;

        // player1
        const player1 = this.add.sprite(48, 56, "perso1", 0);

        this.player2 = player2;
        this.player1 = player1;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    player2;
    /** @type {Phaser.GameObjects.Sprite} */
    player1;

    /* START-USER-CODE */

    // Write your code here
    init() {
        levelctx = this;

    }
    create() {

        this.editorCreate();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
