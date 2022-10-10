
// You can write more code here

/* START OF COMPILED CODE */

class Bugne extends Phaser.Scene {

	constructor() {
		super("Bugne");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// periph_int_spritesheet2
		this.add.image(75, 50, "periph_int_spritesheet", 2);

		// cartop
		const cartop = this.add.image(116, 50, "cartop1");
		cartop.scaleX = -1;

		// cartop1
		this.add.image(26, 57, "cartop1");

		// player2
		const player2 = this.add.sprite(90, 63, "perso1", 0);
		player2.scaleX = -1;

		// player1
		const player1 = this.add.sprite(58, 63, "perso1", 0);

		this.player2 = player2;
		this.player1 = player1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player2;
	/** @type {Phaser.GameObjects.Sprite} */
	player1;

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
