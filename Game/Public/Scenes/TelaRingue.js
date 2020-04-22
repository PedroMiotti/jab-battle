class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
     

    create(){
        
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        this.initPlayers()
        // Inicializando Jogadores
        //? Data = players.info
        socket.on('PlayerData', (data) => { 
            
            this.players.forEach(function(i) {
                
                if(i === data.id){

                    this.player = new Player(this, data.id, data.x, data.y, data.character, data.life)  

                }
                else {

                    this.oponent = 'Oponente Here'

                }
            }, this)
            
        })
        
             

    }

    update(){    
        // Player.handleMoving()
        
    }

    initPlayers(){
        // let _self = this
        
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