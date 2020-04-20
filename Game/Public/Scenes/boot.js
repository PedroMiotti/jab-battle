class Boot extends Phaser.Scene {
    constructor(){
        super('boot')
    }

    preload() {
        // ------------- Loading Screen
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(345, 355, 320, 50);
            
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 65,
            text: 'Carregando...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(355, 365, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Carregando arquivo : ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        this.load.image('logo', 'Assets/UI/Logo.png');
        
        for (let i = 0; i < 800; i++) {
            this.load.image('logo'+i, 'Assets/UI/Logo.png');
        }
        // -------------
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

        // Tela Escolher jogador

            // Background
            this.load.image('telachooseCharBG', 'Assets/img/TelaChooseChar1.png')

            // Fight Button
            this.load.image('FightButtonBig', "Assets/UI/FightButtonBig.png" )

            // Botao Voltar
            this.load.image('botaoVoltarBig', 'Assets/UI/BackButtonBig.png')
            
            // Characters Images
                // Tommy
                this.load.image('TommyBtt', '/Assets/UI/ChooseCharBtt/TommyBTT.png') // Buttons
                this.load.image('TommyIMG', 'Assets/UI/ChooseCharIMG/TommyIMG.png') // IMG
                
                // Jax
                this.load.image('JaxBtt', '/Assets/UI/ChooseCharBtt/JaxBTT.png') // Buttons
                this.load.image('JaxIMG', 'Assets/UI/ChooseCharIMG/JaxIMG.png') // IMG

                // Rut
                this.load.image('DigaraBtt', '/Assets/UI/ChooseCharBtt/RutBTT.png') // Buttons
                this.load.image('DigaraIMG', 'Assets/UI/ChooseCharIMG/DigaraIMG.png') // IMG

                // Cascao
                this.load.image('CascaoBtt', '/Assets/UI/ChooseCharBtt/CascaoBTT.png') // Buttons
                this.load.image('CascaoIMG', 'Assets/UI/ChooseCharIMG/CascaoIMG.png') // IMG

                // Spidinho
                this.load.image('SpidinhoBtt', '/Assets/UI/ChooseCharBtt/SpidinhoBTT.png') // Buttons
                this.load.image('SpidinhoIMG', 'Assets/UI/ChooseCharIMG/SpidinhoIMG.png') // IMG
                

        // Tela Encontrando Jogador
            // Background
            this.load.image('telaencontrarjogadorBG', 'Assets/img/TelaEncontrandoJogador.png')

            // Ponto
            this.load.image('ponto', 'Assets/UI/ponto.png')

            // Luva Azul
            this.load.image('LuvaAzul', 'Assets/UI/LuvaAzul1.png')

            
        // Tela Ringue

            // Background 
            this.load.image('telaringueBG', 'Assets/img/TelaRingue.png')

            // Sprites
                // Tommy
                this.load.atlas("Tommy", "Assets/Sprites/Spritesheet/sprites.png", 'Assets/Sprites/JSON/sprites.json')
        

        
 
    }

    create() {

        this.add.image(512, 384, 'logo');
        
        setTimeout(() => { 
            this.scene.start('telaInicial') 
        }, 100);

    }

}










