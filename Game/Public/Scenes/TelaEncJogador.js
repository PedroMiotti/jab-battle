class TelaEncJogador extends Phaser.Scene {
    constructor(){
        super('TelaEncJogador')

    }

 
    create(){

        this.player_2 = null

        this.socketEvents()  

        // Setting Background
        this.background = this.add.image(0, 0, 'telaencontrarjogadorBG')
        this.background.setOrigin(0, 0)

        // Ponto //TODO : The ... animation
        // this.ponto1 = this.add.image(655, 150, 'ponto')
        // this.ponto2 = this.add.image(675, 150, 'ponto')
        // this.ponto3 = this.add.image(695, 150, 'ponto')
        // let pontos = this.add.group(655, 150, {key: 'ponto', repeat: 107})

        // let _this = this;

        // let i = 0;
    
        // pontos.children.iterate(function (child) {
    
        //     _this.tweens.add({
        //         targets: child,
        //         scaleX: 1,
        //         scaleY: 1,
        //         ease: 'Sine.easeInOut',
        //         duration: 300,
        //         delay: i * 50,
        //         repeat: -1,
        //         yoyo: true,
        //         repeatDelay: 500
        //     });
    
        //     i++;
    
        //     if (i % 3 === 0)
        //     {
        //         i = 0;
        //     }
    
        // });

        // Luva Azul
        this.luvaAzul = this.add.image(1150,385, 'LuvaAzul')
        // Fade in
        this.tween = this.tweens.add({
            targets: this.luvaAzul,
            x: 860,
            ease: 'Power1',
            duration: 1500,
            paused: true,
        })


        // Botao Voltar
        this.botaoJogar = this.add.image(512,650, 'botaoVoltar')
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('telaNome')
        })

    }

    update(){
        this.checkingPlayer2()
      
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

            p1ID = dataID[0]
 
        })


        // Getting the player ID
        socket.on('player_id', data => {
            pID = data
        })

    }

    checkingPlayer2(){
        socket.emit('checkPlayer2')
        // Evento para checar se o player2===null
        socket.on('check_player2', data => {
            if(data !== null){
                // Player 1 Object
                player1.id = data.p1.id;
                player1.x = data.p1.x;
                player1.y = data.p1.y;
                player1.character = data.p1.character;
                player1.life = data.p1.life;
                
                // Player 2 Object
                player2.id = data.p2.id;
                player2.x = data.p2.x;
                player2.y = data.p2.y;
                player2.character = data.p2.character;
                player2.life = data.p2.life;

                // Playing the blue glove animation
                this.tween.play() //! Fix it
            
                //TODO ----- Play FIGHT sfx

                setTimeout(() => {
                    this.scene.start('telaRingue')
                    this.scene.stop()
                },1500)
                
            }
        })
        
    }



}








