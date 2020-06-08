"use strict";

class TelaInicial extends Phaser.Scene {
	constructor() {
		super("telaInicial");
	}

	create() {
		// Setting Background
		this.background = this.add.image(0, 0, "telainicialBG");
		this.background.setOrigin(0, 0);

		// SFX
		lobbysound = this.sound.add('lobby', {loop: true, volume: 0.1});
		lobbysound.play()

		// Botao Jogar
		this.botaoJogar = this.add
			.image(512, 699, "botaoJogar")
			.setInteractive()
			.on("pointerdown", () => {
				this.scene.start("telaNome");
			});

		// Config Botao
		this.musicButton = this.add.image(950, 70, "music")
			.setInteractive()
			.on("pointerdown", () => {
				this.musicButton.visible = false;
				this.sound.mute = true;
				

				this.muteButton = this.add.image(950, 70, 'mute')
					.setInteractive()
					.on("pointerdown", () => {
						this.muteButton.visible = false;
						this.musicButton.visible = true;
						this.sound.mute = false;

					});
			});

		
		
			
	}
}






