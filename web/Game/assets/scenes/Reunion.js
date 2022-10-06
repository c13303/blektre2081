
// You can write more code here

/* START OF COMPILED CODE */

class Reunion extends Phaser.Scene {

	constructor() {
		super("Reunion");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// reunion
		this.add.image(75, 50, "reunion");

		// player3
		const player3 = this.add.sprite(101, 44, "perso1", 0);
		player3.scaleX = -1;

		// player1
		const player1 = this.add.sprite(21, 55, "perso1", 0);

		// player2
		const player2 = this.add.sprite(62, 45, "perso1", 0);
		player2.scaleX = -1;

		this.player3 = player3;
		this.player1 = player1;
		this.player2 = player2;

		this.events.emit("scene-awake");
	}

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
