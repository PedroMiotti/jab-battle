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
		if (player != null) {
			player.handleMoving();
			
		}

		if(moved){
			oponent.onMoveOpponent(remotePlayer.x, remotePlayer.y, remotePlayer.anim);
			
		}

	}

	initPlayers() {
		player = new Player(
			this,
			localPlayer.id,
			localPlayer.character,
			localPlayer.x,
			localPlayer.y,
			localPlayer.life
		);
		
		oponent = new Oponent(
			this,
			remotePlayer.id,
			remotePlayer.character,
			remotePlayer.x,
			remotePlayer.y,
			remotePlayer.life
		);
	}
}
