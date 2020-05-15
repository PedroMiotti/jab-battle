"use strict";

class TelaRingue extends Phaser.Scene {
	constructor() {
		super("telaRingue");
	}

	create() {
		// Setting Background
		this.background = this.add.image(0, 0, "telaringueBG");
		this.background.setOrigin(0, 0);

		this.initPlayers();
	}

	update() {
		//if (player != null) {
		//	player.handleMoving();
		//}
	}

	initPlayers() {
		player = new Player(
			this,
			localPlayer.id,
			localPlayer.x,
			localPlayer.y,
			localPlayer.character,
			localPlayer.life
		);
		oponent = new Oponent(
			this,
			remotePlayer.id,
			remotePlayer.x,
			remotePlayer.y,
			remotePlayer.character,
			remotePlayer.life
		);
	}
}
