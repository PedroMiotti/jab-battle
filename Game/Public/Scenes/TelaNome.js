class TelaNome extends Phaser.Scene {
    constructor(){
        super('telaNome')

    }

 
    create(){

        // Setting Background
        this.background = this.add.image(0, 0, 'telanomeBG')
        this.background.setOrigin(0, 0)


        // Text Box
        this.textBox = document.getElementById('box')
        this.textBox.innerHTML = '<input id="nameBox" type="text" placeholder="Nome"></input>'

        // Botao Voltar
        this.botaoJogar = this.add.image(395,520, 'botaoVoltar')
        .setInteractive()
        .on('pointerdown', () => {

            this.scene.start('telaInicial')

        })

        // Fight Button
        this.configBotao = this.add.image(610, 520, 'botaoFight')
        .setInteractive()
        .on('pointerdown', () => {

            // Getting the value of the text box
            this.inputBoxValue = this.textBox.value
            this.socketEvents(this.inputBoxValue)

            // Hidding textBox
            this.textBox.style.display = "none"
            this.scene.start('TelaChooseChar')
            // this.scene.start('telaRingue')           
        })

    }

     // Funcao para tratar os eventos do Socket
     socketEvents(nome_player){
        
        // Mandando o nome do jogador para o objeto player_info
       socket.emit('info_player',  nome_player)
    
   }

}












