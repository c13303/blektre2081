
// You can write more code here

/* START OF COMPILED CODE */

class Ivry extends Phaser.Scene {

	constructor() {
		super("Ivry");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// ivry
		this.add.image(75, 50, "ivry");

		// player1
		const player1 = this.add.sprite(56, 53, "perso1", 0);

		// player2
		const player2 = this.add.sprite(106, 52, "perso1", 0);
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
