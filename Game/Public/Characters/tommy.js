

function Tommy() {

    // // Loading Characters 
    this.tommy = this.physics.add.sprite(300, 450,'Tommy', 'Tommy_01.png')

    this.tommy.setCollideWorldBounds(true);


    // ANIMATIONS
        // TOMMY
            //WALK
            this.anims.create({
                key: "walk",
                repeat: -1,
                frameRate: 6,
                frames: this.anims.generateFrameNames('Tommy', {
                    prefix: 'Tommy_',
                    suffix: ".png",
                    start: 7,
                    end: 10,
                    zeroPad: 2,
                })
            })

            // IDLE
            this.anims.create({
                key: "idle",
                repeat: -1,
                frameRate: 3,
                frames: this.anims.generateFrameNames('Tommy', {
                    prefix: 'Tommy_',
                    suffix: ".png",
                    start: 3,
                    end: 4,
                    zeroPad: 2,
                })
            })

            //JAB
            this.anims.create({
                key: "jab",
                repeat: -1,
                frameRate: 4,
                frames: this.anims.generateFrameNames('Tommy', {
                    prefix: 'Tommy_',
                    suffix: ".png",
                    start: 5,
                    end: 6,
                    zeroPad: 2,
                })
            })

            // DIRETO
            this.anims.create({
                key: "direto",
                repeat: -1,
                frameRate: 4,
                frames: this.anims.generateFrameNames('Tommy', {
                    prefix: 'Tommy_',
                    suffix: ".png",
                    start: 1,
                    end: 2,
                    zeroPad: 2,
                })
            })

}

module.exports = Tommy
