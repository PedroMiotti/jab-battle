class TelaRingue extends Phaser.Scene {
    constructor(){
        super('telaRingue')
    }

    create(){
        // Setting Background
        this.background = this.add.image(0, 0, 'telaringueBG')
        this.background.setOrigin(0, 0)

        
        this.tommyIdle = this.add.sprite(this.world.centerX, this.world.centerY, 'tommyIdle')
        this.tommyIdle.anchor.set(0.5,0.5)

        // Escondendo a TextBox da Tela Nome
        this.inputBox = document.getElementById('nameBox')
        this.inputBox.style.display = "none"

    }
}