class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }

    create(){

        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        // // Loading Characters 
        this.tommy = this.physics.add.sprite(300, 450,'Tommy', 'Tommy_01.png')

        // Adding physics to the character
        this.tommy.setCollideWorldBounds(true);
        this.physics.add.collider(this.tommy);
        
        
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

                
        // ADDING KEYS
        this.keys = this.input.keyboard.addKeys({
            jab:Phaser.Input.Keyboard.KeyCodes.W,
            direto:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });

        // Escondendo a TextBox da Tela Nome
        this.inputBox = document.getElementById('nameBox')
        this.inputBox.style.display = "none"

    }

    update(){
         // CHARACTER CONTROL
            // TOMMY
                this.movePlayers()

            
    }

    // FUNCAO PARA MOVER OS JOGADORES
        movePlayers(){
   
            if (this.keys.left.isDown){

                this.tommy.anims.play('walk', true)
                this.tommy.setVelocityX(-160);
            }

            else if (this.keys.right.isDown){

                this.tommy.setVelocityX(160);
                this.tommy.anims.play('walk', true)

            }

            else if (this.keys.jab.isDown){
                this.tommy.anims.play('jab')
            }

            else if (this.keys.direto.isDown){
                this.tommy.anims.play('direto')

            }

            else{

                this.tommy.setVelocityX(0);
                this.tommy.anims.play('idle')

            }

        }
}