"use strict";

class TelaInicial extends Phaser.Scene {
	constructor() {
		super("telaInicial");
	}

	create() {
		// Setting Background
		this.background = this.add.image(0, 0, "telainicialBG");
		this.background.setOrigin(0, 0);

		// Botao Jogar
		this.botaoJogar = this.add
			.image(512, 699, "botaoJogar")
			.setInteractive()
			.on("pointerdown", () => {
				this.scene.start("telaNome");
				
			});

		// Config Botao
		this.configBotao = this.add
			.image(950, 70, "configBotao")
			.setInteractive()
			.on("pointerdown", () => {
				console.log("Config");
			});
	}
}
