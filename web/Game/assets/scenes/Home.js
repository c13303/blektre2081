
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {

    constructor() {
        super("Home");

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    create() {

        // home
        this.add.image(75, 50, "home");

        // player1
        const player1 = this.add.sprite(76, 68, "LAYDOWNBIBLE", 1);

        // player2
        const player2 = this.add.sprite(128, 49, "perso1", 0);
        player2.scaleX = -1;

        this.player1 = player1;
        this.player2 = player2;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    player1;
    /** @type {Phaser.GameObjects.Sprite} */
    player2;

    /* START-USER-CODE */
    init() {
        levelctx = this;

    }
    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
