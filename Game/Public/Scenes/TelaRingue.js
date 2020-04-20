class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
     

    create(){
        
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        this.initPlayers()
        

    }

    update(){    
        // Player.handleMoving()
        
    }

    initPlayers(){
        this.self = this
        this.players = []

        socket.emit('PLAYERS_DATA')

        // ID's in room
        socket.on('PlayerInRoom', (data) => {
            // Both players [ID's]
            this.players = data
        })
        

        // Inicializando Jogadores
        // Data = players.info
        socket.on('PlayerData', (data) => {
            for(let i in this.players){
                if(data.id == this.players[i]){
                    player = new Player(this.self, data.id, data.x, data.y, data.character, data.life)  
                }

                else {
                    // oponent = new Oponent(data.args)
                    this.oponent = true
                    
                }
            }
            

        })
        
    }





}