"use strict";

class TelaChooseChar extends Phaser.Scene {
	constructor() {
		super({ key: "TelaChooseChar" });
	}

	create(data) {
		this.nomePlayer = data.nome; // Getting player's name from the TelaNome
		this.chosenChar = "Tommy"; // Default

		// Setting Background
		this.background = this.add.image(0, 0, "telachooseCharBG");
		this.background.setOrigin(0, 0);

		this.selectedChar = this.add.image(520, 532, "TommyIMG");

		// Char buttons
		// Tommy
		this.tommyBtt = this.add
			.image(112, 344, "TommyBtt")
			.setInteractive()
			.on("pointerdown", () => {
				this.chosenChar = "Tommy";
				this.selectedChar.destroy();
				this.selectedChar = this.add.image(520, 532, "TommyIMG");
			});
		// Jax
		this.JaxBtt = this.add
			.image(209, 344, "JaxBtt")
			.setInteractive()
			.on("pointerdown", () => {
				this.chosenChar = "Jax";
				this.selectedChar.destroy();
				this.selectedChar = this.add.image(520, 555, "JaxIMG");
			});
		// Digara
		this.DigaraBtt = this.add
			.image(299, 344, "DigaraBtt")
			.setInteractive()
			.on("pointerdown", () => {
				this.chosenChar = "Digara";
				this.selectedChar.destroy();
				this.selectedChar = this.add.image(535, 520, "DigaraIMG");
			});
		// Cascao
		this.CascaoBtt = this.add
			.image(68, 461, "CascaoBtt")
			.setInteractive()
			.on("pointerdown", () => {
				this.chosenChar = "Cascao";
				this.selectedChar.destroy();
				this.selectedChar = this.add.image(520, 532, "CascaoIMG");
			});
		// Spidinho
		this.SpidinhoBtt = this.add
			.image(160, 461, "SpidinhoBtt")
			.setInteractive()
			.on("pointerdown", () => {
				this.chosenChar = "Spidinho";
				this.selectedChar.destroy();
				this.selectedChar = this.add.image(520, 548, "SpidinhoIMG");
			});



		// Fight Button
		this.clicked = false;
		this.FightBotao = this.add
			.image(923, 665, "FightButtonBig")
			.setInteractive()
			.on("pointerdown", () => {
				this.clicked = true;
				this.FightBotao.disableInteractive();
				this.addBanner();
				prepareSocket(this.nomePlayer, this.chosenChar);
				
			});

	}

	update(){
		if(this.clicked){
			this.FightBotao.angle += 1;
		}
	}

	addBanner(){
		this.add.image(939, 562, "procJogadorBanner");
	}





}
