
// You can write more code here

/* START OF COMPILED CODE */

class Cochon extends Phaser.Scene {

	constructor() {
		super("Cochon");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// parvis
		const parvis = this.add.image(75, 50, "parvis");
		parvis.scaleX = 2;
		parvis.scaleY = 2;

		// player2
		const player2 = this.add.sprite(114, 45, "perso1", 0);
		player2.scaleX = -2;
		player2.scaleY = 2;

		// player1
		const player1 = this.add.sprite(37, 46, "perso1", 0);
		player1.scaleX = 2;
		player1.scaleY = 2;

		// stop
		const stop = this.add.image(68, 89, "stop");
		stop.scaleX = 2;
		stop.scaleY = 2;

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
