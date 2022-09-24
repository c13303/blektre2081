
// You can write more code here

/* START OF COMPILED CODE */

class Pharmacie extends Phaser.Scene {

    constructor() {
        super("Pharmacie");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // pharmacie
        this.add.image(75, 50, "pharmacie");

        // player1
        const player1 = this.add.sprite(45, 36, "perso1", 0);

        // player2
        const player2 = this.add.sprite(106, 36, "perso1", 0);
        player2.scaleX = -1;

        // desk_bleu
        this.add.image(109, 54, "desk_bleu");

        // pharma
        this.add.image(106, 16, "pharma");

        this.player1 = player1;
        this.player2 = player2;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    player1;
    /** @type {Phaser.GameObjects.Sprite} */
    player2;

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
