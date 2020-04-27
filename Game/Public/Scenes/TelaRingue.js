class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
     

    create(){
        telaRingue = this
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        this.initPlayers()
        // Inicializando Jogadores
        //? Data = players.info

        let _this = this

        socket.on('PlayerData', (data) => { 
            
            _this.players.forEach(function(i) {
                
                if(i === data.id){

                    player = this.physics.add.existing(new Player(_this, data.id, data.x, data.y, data.character, data.life))  
                    
                    
                }
                else {

                    // oponent = new Oponent(_this, data.id, data.x, data.y, data.character, data.life)
                    return

                }
            })
            
        })
        
             

    }

    update(){    
        // Player.handleMoving()
        
    }

    initPlayers(){
        
        
        this.players = new Array()
        
        socket.emit('PLAYERS_DATA')

        // ID's in room
        socket.on('PlayerInRoom', (dataID) => {
            
            // Both players [ID's]
            this.players = [
                dataID[0],
                dataID[1]
            ]

        })
    }





}