class TelaNome extends Phaser.Scene {
    constructor(){
        super('telaNome')

    }

 
    create(){

        // Setting Background
        this.background = this.add.image(0, 0, 'telanomeBG')
        this.background.setOrigin(0, 0)


        // Text Box
        this.inputBox = document.getElementById('nameBox')
        // Text Box Style
        this.inputBox.style.display = "block"
        this.inputBox.style.position = "absolute"
        this.inputBox.style.marginLeft = "363px"
        this.inputBox.style.marginTop = "328px"
        this.inputBox.style.width = "283px"
        this.inputBox.style.height = "43px"
        this.inputBox.style.border = "0px solid #1C6EA4"
        this.inputBox.style.borderRadius = "10px"
        this.inputBox.style.outline = "none"
        this.inputBox.style.fontFamily = "impact"
        this.inputBox.style.fontSize = "25px"

        
    
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
            this.inputBoxValue = document.getElementById('nameBox').value
            this.socketEvents(this.inputBoxValue)
            // this.scene.start('TelaEncJogador')
            this.scene.start('TelaRingue')            
        })

    }

 
     // Funcao para tratar os eventos do Socket
     socketEvents(nome_player){
        socket.emit('connecting_players')
        // Evento para checar se o player2 e null
        socket.on('check_player2', player2 => {
            this.player_2 = player2
            console.log(player2)
        })

        // Mandando o nome do jogador para o array player_info
       socket.emit('info_player',  nome_player)
       
   }

       


        
    }












