
// You can write more code here

/* START OF COMPILED CODE */

class Portrait extends Phaser.Scene {

	constructor() {
		super("Portrait");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	create() {

		// iNTRO
		this.add.image(75, 50, "INTRO");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	init() {
		levelctx = this;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
