
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
		const player1 = this.add.sprite(16, 26, "perso1", 0);

		// player2
		const player2 = this.add.sprite(108, 26, "perso1", 0);
		player2.scaleX = -1;

		// tables0
		this.add.image(102, 32, "tables", 1);

		// chapeaux0
		this.add.image(108, 5, "chapeaux", 0);

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
