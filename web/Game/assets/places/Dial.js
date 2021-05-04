
// You can write more code here

/* START OF COMPILED CODE */

class Dial extends Phaser.Scene {
	
	constructor() {
		super("Dial");
		
		/** @type {Phaser.GameObjects.Image} */
		this.head1;
		/** @type {Phaser.GameObjects.Image} */
		this.head2;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	create() {
		
		// win
		this.add.image(320, 240, "win");
		
		// head1
		const head1 = this.add.image(-418, 169, "head_4", 1);
		head1.scaleX = 0.75;
		head1.scaleY = 0.75;
		
		// head2
		const head2 = this.add.image(396, 357, "head_4", 0);
		head2.scaleX = 2;
		head2.scaleY = 2;
		head2.flipX = true;
		
		this.head1 = head1;
		this.head2 = head2;
	}
	
	/* START-USER-CODE */

	// Write your code here.
	init() {
		levelctx = this;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
