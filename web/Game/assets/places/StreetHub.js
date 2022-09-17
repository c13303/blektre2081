
// You can write more code here

/* START OF COMPILED CODE */

class StreetHub extends Phaser.Scene {

	constructor() {
		super("StreetHub");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// street_1
		this.add.image(75, 50, "street_1");

		// player1
		const player1 = this.add.sprite(38, 50, "perso1", 0);

		// player2
		const player2 = this.add.sprite(114, 52, "perso1", 0);
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
	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
