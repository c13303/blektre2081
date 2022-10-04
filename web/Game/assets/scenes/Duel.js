// You can write more code here

/* START OF COMPILED CODE */

class Duel extends Phaser.Scene {

    constructor() {
        super("Duel");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {

        // duel
        this.add.image(75, 50, "duel");

        // player2
        const player2 = this.add.sprite(88, 52, "perso1", 0);
        player2.scaleX = -1;

        // player1
        const player1 = this.add.sprite(65, 52, "perso1", 0);

        this.player2 = player2;
        this.player1 = player1;

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Sprite} */
    player2;
    /** @type {Phaser.GameObjects.Sprite} */
    player1;

    /* START-USER-CODE */



    // Write your code here
    init() {
        levelctx = this;

    }
    create() {
        this.timer = 0;
        this.resources = 0;

        this.editorCreate();
        this.player1.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject, frameKey) {



            if (anim.key.indexOf("takecher") !== -1) {
                //    console.log(anim.key + " " + frame.index);
                if (frame.index === 6) {
                    //  console.log("reculing trigger");
                    this.movingToLeft = true;
                }

                if (frame.index === 8) {
                    //  console.log("reculing trigger");
                    this.movingToLeft = false;
                    this.y += 8;
                }
            }

        });


        this.player2.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject, frameKey) {



            if (anim.key.indexOf("takecher") !== -1) {
                // console.log(anim.key + " " + frame.index);
                if (frame.index === 6) {
                    this.movingToRight = true;
                }

                if (frame.index === 8) {

                    this.movingToRight = false;
                    this.y += 8;
                }
            }

        });



    }

    update(time, delta) {
        var freq = 500;

        this.timer += delta;
        while (this.timer > freq) {
            this.resources += 1;
            this.timer -= freq;


            if (this.player1.movingToLeft) {
                this.player1.x -= 8;
            }
            if (this.player2.movingToRight) {
                this.player2.x += 8;
            }
        }


    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
