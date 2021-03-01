
// You can write more code here


/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
	}
	
	create() {
		
		// title
		const title = this.add.text(125, 22, "", {});
		title.text = "BLEKTRE 2081";
		title.setStyle({"fontSize":"55px"});
		
		// head_41
		this.add.image(256, 242, "head_4", 1);
		
		// head_42
		this.add.image(649, 245, "head_4", 2);
		
		// head_43
		this.add.image(460, 241, "head_4", 3);
		
		// head_44
		this.add.image(41, 243, "head_4", 4);
	}
	
	/* START-USER-CODE */

    init() {
        this.rain();
        levelctx = this;


    }

    update() {

    }
    rain() {
        var particles = this.add.particles('raindrop');
        particles.createEmitter({
            y: 0,
            x: {min: 0, max: 800},
            lifespan: 2000,
            speedY: {min: 200, max: 400},
            scale: {start: 0.2, end: 0},
            quantity: 3,
            blendMode: 'ADD'
        });
    }

   

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

