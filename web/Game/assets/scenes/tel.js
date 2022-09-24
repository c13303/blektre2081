
// You can write more code here

/* START OF COMPILED CODE */

class tel extends Phaser.Scene {

    constructor() {
        super("tel");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // tel
        this.add.image(75, 50, "tel");

        this.events.emit("scene-awake");
    }

    /* START-USER-CODE */

    // Write your code here
    init() {
        levelctx = this;

    }
    create() {

        this.editorCreate();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
