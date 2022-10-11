
// You can write more code here

/* START OF COMPILED CODE */

class Square extends Phaser.Scene {

	constructor() {
		super("Square");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// square
		this.add.image(75, 50, "square");

		// player2
		const player2 = this.add.sprite(31, 21, "perso1", 0);
		player2.scaleX = -1;

		// player3
		const player3 = this.add.sprite(115, 38, "perso1", 0);

		// player4
		const player4 = this.add.sprite(93, 31, "perso1", 0);
		player4.scaleX = -1;

		// player5
		const player5 = this.add.sprite(43, 27, "perso1", 0);

		// player6
		const player6 = this.add.sprite(57, 36, "perso1", 0);

		// player1
		const player1 = this.add.sprite(15, 48, "perso1", 0);

		// player7
		const player7 = this.add.sprite(131, 69, "perso1", 0);
		player7.scaleX = -1;

		this.player2 = player2;
		this.player3 = player3;
		this.player4 = player4;
		this.player5 = player5;
		this.player6 = player6;
		this.player1 = player1;
		this.player7 = player7;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player2;
	/** @type {Phaser.GameObjects.Sprite} */
	player3;
	/** @type {Phaser.GameObjects.Sprite} */
	player4;
	/** @type {Phaser.GameObjects.Sprite} */
	player5;
	/** @type {Phaser.GameObjects.Sprite} */
	player6;
	/** @type {Phaser.GameObjects.Sprite} */
	player1;
	/** @type {Phaser.GameObjects.Sprite} */
	player7;

	/* START-USER-CODE */

    // Write your code here
    init() {
        levelctx = this;

    }
    create() {

        this.editorCreate();

    }

    update() {

    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
