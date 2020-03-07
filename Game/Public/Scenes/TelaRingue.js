class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }

    create(){
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        // Loading Characters 
        this.tommy = this.add.sprite(300, 450,'Tommy', 'Tommy_01.png')

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
                    frameRate: 4,
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



        this.tommy.play('jab')

        // Escondendo a TextBox da Tela Nome
        this.inputBox = document.getElementById('nameBox')
        this.inputBox.style.display = "none"

    }
}