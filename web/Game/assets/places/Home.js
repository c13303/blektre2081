
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {
	
	constructor() {
		super("Home");
		
		/** @type {Phaser.GameObjects.Image} */
		this.head1;
		
		/* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
	}
	
	create() {
		
		// home
		this.add.image(320, 240, "home");
		
		// head1
		const head1 = this.add.image(251, 240, "head_4", 0);
		
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
