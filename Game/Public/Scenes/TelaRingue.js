class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
    

    create(){

        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        // Adding Characters
        this.chosenChar = 'tommy' // Pegar da tela ChooseChar
        this.character
        if(this.chosenChar == 'tommy'){
            this.character = this.physics.add.existing(new Tommy(this, 300, 450))
        }
       
       // Adding Physics to the Character
       this.character.setCollideWorldBounds(true); 
       this.physics.add.collider(this.character) 
       this.physics.world.enable(this.character) 
       

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
        // SOCKET CONTROL
            this.socketEvents()

         // CHARACTER CONTROL
            this.movePlayers()            
    }

    socketEvents(){

        // Event to receive data and add the player to the screen
        socket.on('addPlayer', data => {
            console.log(data.x)

        })
    }

    // FUNCAO PARA MOVER OS JOGADORES
        movePlayers(){
   
            if (this.keys.left.isDown){
                // debugger
                this.character.anims.play('walk', true)
                this.character.setVelocityX(-160)
            }

            else if(this.keys.right.isDown){

                this.character.setVelocityX(160)
                this.character.anims.play('walk', true)

            }

            else{
                this.character.setVelocityX(0)
                this.character.anims.play('idle');

            }

            
                
            if(this.keys.jab.isDown){
                this.character.anims.play('jab')
                
            }
            else if(this.keys.direto.isDown){
            
                this.character.anims.play('direto');

            }
            

            

        }
}