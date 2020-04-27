class TelaEncJogador extends Phaser.Scene {
    constructor(){
        super('TelaEncJogador')

    }

 
    create(){

        this.player_2 = null

        // Setting Background
        this.background = this.add.image(0, 0, 'telaencontrarjogadorBG')
        this.background.setOrigin(0, 0)

        // Ponto
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

    checkingPlayer2(){
        socket.emit('checkPlayer2')
        // Evento para checar se o player2===null
        socket.on('check_player2', player2 => {
            this.player_2 = player2
            if(this.player_2 !== null){

                // Playing the blue glove animation
                this.tween.play()
            
                //TODO ----- Play FIGHT sfx

                setTimeout(() => {
                    this.scene.start('telaRingue')
                    this.scene.stop()
                },1500)
                
            }
        })
        
    }



}








