
// You can write more code here

/* START OF COMPILED CODE */

class Portrait extends Phaser.Scene {
	
	constructor() {
		super("Portrait");
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	create() {
		
		// phone
		this.add.image(318, 221, "phone");
		
		// head2
		const head2 = this.add.image(313, 204, "head_4", 1);
		head2.scaleX = 0.75;
		head2.scaleY = 0.75;
	}
	
	/* START-USER-CODE */

	init() {
		levelctx = this;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
