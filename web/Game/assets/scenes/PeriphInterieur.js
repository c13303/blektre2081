
// You can write more code here

/* START OF COMPILED CODE */

class PeriphInterieur extends Phaser.Scene {

	constructor() {
		super("PeriphInterieur");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// PeriphBG
		const periphBG = this.add.sprite(75, 50, "periph_int_spritesheet", 0);

		// player1
		const player1 = this.add.sprite(63, 38, "HEADS_", 0);

		// cartop1
		this.add.image(55, 49, "cartop1");

		// player2
		const player2 = this.add.sprite(126, 52, "perso1", 0);
		player2.scaleX = -1;

		// player3
		const player3 = this.add.sprite(93, 54, "perso1", 0);

		this.periphBG = periphBG;
		this.player1 = player1;
		this.player2 = player2;
		this.player3 = player3;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	periphBG;
	/** @type {Phaser.GameObjects.Sprite} */
	player1;
	/** @type {Phaser.GameObjects.Sprite} */
	player2;
	/** @type {Phaser.GameObjects.Sprite} */
	player3;

	/* START-USER-CODE */

	// Write your code here
	init() {
		levelctx = this;

	}
	create() {

		this.editorCreate();

		this.periphBG.play("PeriphInterieur");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
