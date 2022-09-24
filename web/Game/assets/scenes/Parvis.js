
// You can write more code here

/* START OF COMPILED CODE */

class Parvis extends Phaser.Scene {

    constructor() {
        super("Parvis");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // parvis
        this.add.image(75, 50, "parvis");

        // player2
        const player2 = this.add.sprite(108, 54, "perso1", 0);
        player2.scaleX = -1;

        // player1
        const player1 = this.add.sprite(49, 55, "perso1", 0);

        // player3
        const player3 = this.add.sprite(133, 47, "perso1", 0);
        player3.scaleX = -1;

        // player4
        const player4 = this.add.sprite(127, 64, "perso1", 0);
        player4.scaleX = -1;

        this.player2 = player2;
        this.player1 = player1;
        this.player3 = player3;
        this.player4 = player4;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    player2;
    /** @type {Phaser.GameObjects.Sprite} */
    player1;
    /** @type {Phaser.GameObjects.Sprite} */
    player3;
    /** @type {Phaser.GameObjects.Sprite} */
    player4;

    /* START-USER-CODE */
    init() {
        levelctx = this;

    }
    // Write your code here

    create() {

        this.editorCreate();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
