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
        this.ponto1 = this.add.image(655, 150, 'ponto')
        this.ponto2 = this.add.image(675, 150, 'ponto')
        this.ponto3 = this.add.image(695, 150, 'ponto')

         // Setting dots to hide
         this.ponto2.visible = false
         this.ponto3.visible = false

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

                //TODO ----- Add Fading Animation
                this.add.image(860,385, 'LuvaAzul')
                //TODO ----- Play FIGHT sfx

                setTimeout(() => {
                    this.scene.start('telaRingue')
                    this.scene.stop()
                },1000)
                
            }
        })
        
    }



}








