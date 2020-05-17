"use strict";

class TelaRingue extends Phaser.Scene {
	constructor() {
		super("telaRingue");
	}

	create() {
		// Setting Background
		this.background = this.add.image(0, 0, "telaringueBG");
		this.background.setOrigin(0, 0);

		// HUD 
			//Lifebar - Player
			this.lifeframe = this.add.image(20, 20, "lifeframe")
			this.lifeframe.setOrigin(0, 0);

			//Lifebar - Oponent
			this.lifeframe2 = this.add.image(686, 20, "lifeframe2")
			this.lifeframe2.setOrigin(0, 0); // Check out wordWrap on phaser API

			// Players Names
			this.opponentName = remotePlayer.nome.toUpperCase();
			this.playerName = localPlayer.nome.toUpperCase();
			// Checking for empty string
			if(this.opponentName === '' ){
				// Players Names
				this.opponentName = remotePlayer.character.toUpperCase();
			}
			else if( this.playerName === ''){
				this.playerName = localPlayer.character.toUpperCase();
			}
			
			// Player
			this.add.text(20, 90, this.playerName).setFontSize(25).setFontFamily('impact' )
			// Oponent
			this.add.text(686, 90, this.opponentName).setFontSize(25).setFontFamily('impact' )

			// Timer
			this.add.text(470, 20, "60").setFontSize(80).setFontFamily('impact' )

			


		this.initPlayers();

	}

	update() {
		if (player != null) {
			player.handleMoving();
					
		}

		if(moved){
			oponent.onMoveOpponent(remotePlayer.x, remotePlayer.y, remotePlayer.anim);
			
		}

		this.physics.world.collide(fighter, fighter2, this.colliderCallback);
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


	colliderCallback(){
		console.log("Colliding")
	}
}
