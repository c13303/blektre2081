
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
		this.add.image(322, 241, "home");
		
		// head1
		const head1 = this.add.image(251, 380, "head_4", 0);
		head1.scaleX = 1.5;
		head1.scaleY = 1.5;
		
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
