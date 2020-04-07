class TelaEncJogador extends Phaser.Scene {
    constructor(){
        super('TelaEncJogador')

    }

 
    create(){

        this.player_2 = null

        // Escondendo a TextBox da Tela Nome
        this.inputBox = document.getElementById('nameBox')
        this.inputBox.style.display = "none"

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

        // let dots = window.setInterval( () => {
           
        //     if ( this.ponto3.visible === true ) {
        //         this.ponto1.visible = true
        //         this.ponto2.visible = false
        //         this.ponto3.visible = false
        //     }
        //     else{ 
        //         this.ponto1.visible = false
        //         this.ponto2.visible = true
                
        //     }

        //     if(this.ponto2.visible === true){
        //         this.ponto2.visible = false
        //         this.ponto3.visible = true

        //     }
        // }, 100);
      
    }

    checkingPlayer2(){
        socket.emit('connecting_players')
        
        // Evento para checar se o player2 e null
        socket.on('check_player2', player2 => {
            this.player_2 = player2
            if(this.player_2 !== null){
                this.scene.start('telaRingue')
            }
        })
        
    }



}










