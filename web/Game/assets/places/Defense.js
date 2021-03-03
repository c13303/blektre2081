
// You can write more code here

/* START OF COMPILED CODE */

class Defense extends Phaser.Scene {
	
	constructor() {
		super("Defense");
		
		/** @type {Phaser.GameObjects.Image} */
		this.head1;
		/** @type {Phaser.GameObjects.Image} */
		this.head2;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	create() {
		
		// defense
		this.add.image(320, 240, "Defense");
		
		// head1
		const head1 = this.add.image(159, 241, "head_4", 0);
		
		// head2
		const head2 = this.add.image(479, 239, "head_4", 0);
		
		this.head1 = head1;
		this.head2 = head2;
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
