
// You can write more code here

/* START OF COMPILED CODE */

class Fired extends Phaser.Scene {

	constructor() {
		super("Fired");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// fired
		this.add.image(75, 50, "fired");

		// player1
		const player1 = this.add.sprite(19, 64, "perso1", 0);

		this.player1 = player1;

		this.events.emit("scene-awake");
	}

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
