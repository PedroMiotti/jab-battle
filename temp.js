class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
    

    create(){
        this.fighter = {}

        // Event to get the players data
        socket.emit('connecting_players')

        // * Getting the current player data
        socket.on('CurrentPlayerData', (id, Character, x, y, nome_player) => { 
            this.playerData = {
              id: id,
              character: Character,
              x: x,
              y: y,
              nome: nome_player,
            };

            this.addPlayer(this.playerData.id ,300, 450, this.playerData.Character)
            // Adding Physics to the Character
            this.physics.add.collider(this.fighter[this.playerData.id]) 
            this.physics.world.enable(this.fighter[this.playerData.id])
        })

        // * Getting the oponent player data
        socket.on('OponentData', (id, Character, x, y, nome_player) => {
            this.oponentData = {
                id: id,
                character: Character,
                x: x,
                y: y,
                nome: nome_player,
              };

            this.addPlayer(this.oponentData.id ,500, 450, this.oponentData.Character)
            // Adding Physics to the Character
            this.physics.add.collider(this.fighter[this.oponentData.id]) 
            this.physics.world.enable(this.fighter[this.oponentData.id])
        })
        
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        // ADDING KEYS
        this.keys = this.input.keyboard.addKeys({
            jab:Phaser.Input.Keyboard.KeyCodes.W,
            direto:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });


    }

    update(){
         // CHARACTER CONTROL
            // this.movePlayers()            
    }


    addPlayer(id ,x , y, character){
        // Adding Characters
        this.chosenChar = character //TODO - Pegar da tela ChooseChar
        
        
        if(this.chosenChar == character){
            this.fighter[id] = this.physics.add.existing(new Tommy(this, x, y))
        }

        this.fighter[id].setCollideWorldBounds(true); 

    }

    // FUNCAO PARA MOVER OS JOGADORES
        movePlayers(){
   
            if (this.keys.left.isDown){
                this.fighter.anims.play('walk', true)
                this.fighter.setVelocityX(-160)
            }

            else if(this.keys.right.isDown){

                this.fighter.setVelocityX(160)
                this.fighter.anims.play('walk', true)

            }

            else{
                this.fighter.setVelocityX(0)
                this.fighter.anims.play('idle');

            }
  
            if(this.keys.jab.isDown){
                this.fighter.anims.play('jab')
                //TODO ----- Play PUNCH sfx
                
            }
            else if(this.keys.direto.isDown){
            
                this.fighter.anims.play('direto');
                //TODO ----- Play PUNCH sfx
            }
            

            

        }
}
let player_2 = {
    x: info.room.player2.x,
    y: info.room.player2.y,
    life: info.room.player2.life,
    character: info.room.player2.character,
    id: info.room.player2.playerID,
    nome: info.room.player2.nome_player
}
let player_1 = {
    x: info.room.player1.x,
    y: info.room.player1.y,
    life: info.room.player1.life,
    character: info.room.player1.character,
    id: info.room.player1.playerID,
    nome: info.room.player1.nome_player
}




// * Player1
let player2 = info.room.player2
let player1 = info.room.player1

socket.emit('OponentData', player2.playerID, player2.character, player2.x, player2.y, player2.nome)
socket.emit('CurrentPlayerData', player1.playerID, player1.character, player1.x, player1.y, player1.nome)





// * Player2

let player1 = info.room.player1
let player2 = info.room.player2

socket.emit('OponentData', player1.playerID, player1.character, player1.x, player1.y, player1.nome)
socket.emit('CurrentPlayerData', player2.playerID, player2.character, player2.x, player2.y, player2.nome)