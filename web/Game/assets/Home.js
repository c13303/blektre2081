
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {
	
	constructor() {
		super("Home");
		
		/* START-USER-CTR-CODE */
		
		/* END-USER-CTR-CODE */
	}
	
	create() {
		
		// win
		const win = this.add.image(426, 317, "win");
		win.scaleX = 1.5;
		win.scaleY = 1.5;
		
		// head_40
		this.add.image(277, 321, "head_4", 0);
	}
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
