
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
		const player2 = this.add.sprite(81, 24, "perso1", 0);
		player2.scaleX = -1;

		// stop
		this.add.image(98, 41, "stop");

		// player1
		const player1 = this.add.sprite(52, 54, "perso1", 0);

		this.player2 = player2;
		this.player1 = player1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player2;
	/** @type {Phaser.GameObjects.Sprite} */
	player1;

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
