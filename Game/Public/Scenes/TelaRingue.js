class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }

    // Characters
    

    create(){

        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        this.add('Tommy', tommy)

        // Adding physics to the character
        this.physics.add.collider(this.tommy) 
        this.physics.world.enable(this.tommy)  
        
        

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
            this.movePlayers()            
    }

    // FUNCAO PARA MOVER OS JOGADORES
        movePlayers(){
   
            if (this.keys.left.isDown){

                this.tommy.anims.play('walk', true);
                this.tommy.setVelocityX(-160);
            }

            else if (this.keys.right.isDown){

                this.tommy.setVelocityX(160);
                this.tommy.anims.play('walk', true);

            }

            else if (this.keys.jab.isDown){
                this.tommy.anims.play('jab')
            }

            else if (this.keys.direto.isDown){
                this.tommy.anims.play('direto');

            }

            else{

                this.tommy.setVelocityX(0);
                this.tommy.anims.play('idle');

            }

        }
}