class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
     

    create(){
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)
        
        this.socketEvents()
        this.initPlayers()

        
    }

    update(){    
        if(player != null){
            player.handleMoving()
        }
        

    }

    socketEvents(){
        socket.emit('PLAYERS_DATA')

        // ID's in room
        socket.on('PlayerInRoom', (dataID) => {
            
            // Both players [ID's]
            players = [
                dataID[0],
                dataID[1]
            ]

        })

        socket.on('PlayerData', (data) => { 
            
            playersInfo.id = data.id;
            playersInfo.x = data.x;
            playersInfo.y = data.y;
            playersInfo.character = data.character;
            playersInfo.life = data.life;
            
            
        })

    }

    initPlayers(){
        let _this = this
        players.forEach(function(i) {
            
            if(i === playersInfo.id){
                
                player = new Player(_this, playersInfo.id,playersInfo.x,playersInfo.y,playersInfo.character,playersInfo.life)
                
            }
            else {

                // oponent = new Oponent(_this, data.id, data.x, data.y, data.character, data.life)
                return

            }
        })
    }

}


















