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
            this.inputBoxValue = document.getElementById('nameBox').value
            
            // Hidding textBox
            this.textBox.style.display = "none"


            this.scene.start('TelaChooseChar',  {nome: this.inputBoxValue})          
        })

    }


}












