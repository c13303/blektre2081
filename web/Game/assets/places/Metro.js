
// You can write more code here

/* START OF COMPILED CODE */

class Metro extends Phaser.Scene {
	
	constructor() {
		super("Metro");
		
		/** @type {Phaser.GameObjects.Image} */
		this.head2;
		/** @type {Phaser.GameObjects.Image} */
		this.head1;
		
		/* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
	}
	
	create() {
		
		// win
		this.add.image(321, 240, "win");
		
		// head2
		const head2 = this.add.image(491, 359, "head_4", 0);
		head2.flipX = true;
		
		// head1
		const head1 = this.add.image(167, 359, "head_4", 0);
		
		this.head2 = head2;
		this.head1 = head1;
	}
	
	/* START-USER-CODE */
    init() {
        levelctx = this;
    }
    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
