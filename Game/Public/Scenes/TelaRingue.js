class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }
    

    create(){
        
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        

    }

    update(){    
        
    }

    initPlayers(){
        // Inicializando Jogadores
        socket.on('', (data) => {
            for(let i in data){
                if(data.id == Player.id){
                    player = new Player(data.args)
                }
                else {
                    oponent = new Oponent(data.args)
                }
            }

        })
    }





}