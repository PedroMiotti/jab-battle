class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
     

    create(){
        this.self = this
        
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        // this.initPlayers()
        this.player = new Player(this, '1234', 275, 630, 'Tommy', 100)        

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
        
        // Inicializando Jogadores
        //? Data = players.info
        socket.on('PlayerData', (data) => {
            
            this.players.forEach(i => {
                
                if(i === data.id){
                    
                    this.self.player = new Player(this.self, data.id, data.x, data.y, data.character, data.life)  
                    debugger
                }

                else {
                    debugger
                    return
                    // oponent = new Oponent(data.args)
                    // this.self.player = new Player(this.self, data.id, data.x, data.y, data.character, data.life)
                }
            })
            

        })
        
    }





}