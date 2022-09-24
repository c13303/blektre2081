
// You can write more code here

/* START OF COMPILED CODE */

class Periph extends Phaser.Scene {

	constructor() {
		super("Periph");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// periph
		this.add.image(75, 50, "periph");

		// player4
		const player4 = this.add.sprite(109, 63, "perso1", 0);
		player4.scaleX = -1;

		// player3
		const player3 = this.add.sprite(132, 53, "perso1", 0);
		player3.scaleX = -1;

		// player1
		const player1 = this.add.sprite(31, 54, "perso1", 0);

		// player2
		const player2 = this.add.sprite(90, 53, "perso1", 0);
		player2.scaleX = -1;

		this.player4 = player4;
		this.player3 = player3;
		this.player1 = player1;
		this.player2 = player2;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player4;
	/** @type {Phaser.GameObjects.Sprite} */
	player3;
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
