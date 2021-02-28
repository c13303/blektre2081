
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Image} */
		this.head_40;
		
		/* START-USER-CTR-CODE */
		this.started = 0;
		/* END-USER-CTR-CODE */
	}
	
	create() {
		
		// win
		const win = this.add.image(328, 319, "win");
		win.scaleX = 1.5;
		win.scaleY = 1.5;
		
		// head_40
		const head_40 = this.add.image(284, 344, "head_4", 0);
		
		this.head_40 = head_40;
	}
	
	/* START-USER-CODE */

	update() {
		if (!this.started) {
			this.started = true;
			this.rain();
			this.changeHead(3);
		}
	}
	rain() {
		var particles = this.add.particles('raindrop');

		particles.createEmitter({
			y: 0,
			x: { min: 0, max: 800 },
			lifespan: 2000,
			speedY: { min: 200, max: 400 },
			scale: { start: 0.2, end: 0 },
			quantity: 3,
			blendMode: 'ADD'
		});
	}

	changeHead(frame = 1){
		this.head_40.setFrame(frame);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
