
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

		// player1
		const player1 = this.add.sprite(64, 45, "HEADS_", 0);

		// player2
		const player2 = this.add.sprite(130, 64, "perso1", 0);
		player2.scaleX = -1;

		// cartop
		const cartop = this.add.sprite(53, 55, "cartop1");

		// player3
		const player3 = this.add.sprite(103, 64, "perso1", 0);

		this.player1 = player1;
		this.player2 = player2;
		this.cartop = cartop;
		this.player3 = player3;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player1;
	/** @type {Phaser.GameObjects.Sprite} */
	player2;
	/** @type {Phaser.GameObjects.Sprite} */
	cartop;
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
