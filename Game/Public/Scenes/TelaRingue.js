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

        if(player != null){
            player.handleMoving()
        }
        
    }

    
    initPlayers(){
        
        let _this = this

        if(players){
            if(pID === p1ID ){
                
                player = new Player(_this, player1.id, player1.x, player1.y, player1.character, player1.life)

                oponent = new Oponent(_this, player2.id, player2.x, player2.y, player2.character, player2.life)

            }

            else{
                player = new Player(_this, player2.id, player2.x, player2.y, player2.character, player2.life)

                oponent = new Oponent(_this, player1.id, player1.x, player1.y, player1.character, player1.life)

            }
        }        

    }




}


















