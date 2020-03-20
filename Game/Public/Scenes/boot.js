class Boot extends Phaser.Scene {
    constructor(){
        super('boot')

    }

    preload() {

        // Tela Inicial 

            // Background
            this.load.image('telainicialBG', 'Assets/img/TelaInicial.png')
            // Botao Jogar
            this.load.image('botaoJogar', 'Assets/UI/BotaoJogar.png')
            // Botao Config
            this.load.image('configBotao', 'Assets/UI/ConfigBotao1.png')

         // Tela Nome 

            // Background
            this.load.image('telanomeBG', 'Assets/img/TelaNome.png')
            // Botao Voltar
            this.load.image('botaoVoltar', 'Assets/UI/BackButton.png')
            // Botao Fight
            this.load.image('botaoFight', 'Assets/UI/FightButton.png' )
            
        // Tela Ringue

            // Background 
            this.load.image('telaringueBG', 'Assets/img/TelaRingue.png')

            // Sprites
                // Tommy
                this.load.atlas("Tommy", "Assets/Sprites/Spritesheet/sprites.png", 'Assets/Sprites/JSON/sprites.json')
                this.load.spritesheet("dude", "Assets/Characters/dude.png", { frameWidth: 32, frameHeight: 48 });

                
    }

    create() {

        // Escondendo a TextBox da Tela Nome
        this.inputBox = document.getElementById('nameBox')
        this.inputBox.style.display = "none"

        this.scene.start('telaInicial')

    }
}

