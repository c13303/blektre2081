
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {

	constructor() {
		super("Home");

		/* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	create() {

		// home
		this.add.image(75, 50, "home");

		// player1
		const player1 = this.add.sprite(49, 52, "perso1", 0);

		this.player1 = player1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player1;

	/* START-USER-CODE */
    init() {
        levelctx = this;

    }
    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
