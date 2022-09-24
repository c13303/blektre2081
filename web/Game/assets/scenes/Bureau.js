
// You can write more code here

/* START OF COMPILED CODE */

class Bureau extends Phaser.Scene {

    constructor() {
        super("Bureau");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // bureau
        this.add.image(75, 50, "bureau");

        // player1
        const player1 = this.add.sprite(48, 65, "perso1", 0);

        // player2
        const player2 = this.add.sprite(106, 45, "perso1", 0);
        player2.scaleX = -1;

        // player4
        const player4 = this.add.sprite(67, 46, "perso1", 0);
        player4.scaleX = -1;

        // office
        this.add.image(106, 62, "office");

        // player3
        const player3 = this.add.sprite(135, 68, "perso1", 0);
        player3.scaleX = -1;

        this.player1 = player1;
        this.player2 = player2;
        this.player4 = player4;
        this.player3 = player3;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    player1;
    /** @type {Phaser.GameObjects.Sprite} */
    player2;
    /** @type {Phaser.GameObjects.Sprite} */
    player4;
    /** @type {Phaser.GameObjects.Sprite} */
    player3;

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
