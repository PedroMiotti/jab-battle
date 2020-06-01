"use strict";

class TelaRingue extends Phaser.Scene {
	constructor() {
		super("telaRingue");
	}

	create() {
		// Stop lobby sfx
		lobbysound.stop()

		// Setting Background
		this.background = this.add.image(0, 0, "telaringueBG");
		this.background.setOrigin(0, 0);

		this.timerOver = false;


		// HUD 
			//Lifebar Frame
			this.lifeframe = this.add.image(37, 22, "lifebarFrame");
			this.lifeframe.setOrigin(0, 0);

			// P1 Bar
			p1Bar = this.add.image(106, 38, 'p1Bar').setOrigin(0, 0);

			// P2 Bar
			p2Bar = this.add.image(922, 40, 'p2Bar').setOrigin(1, 0);

			// Players Names
			if(localPlayerIs2){
				this.playerName = remotePlayer.nome.toUpperCase();
				this.opponentName = localPlayer.nome.toUpperCase();

				// Checking for empty string
				if(this.opponentName === '' ){
					// Players Names
					this.opponentName = localPlayer.character.toUpperCase();
				}
				if( this.playerName === ''){
					this.playerName = remotePlayer.character.toUpperCase();
				}

			}
			else{
				this.playerName = localPlayer.nome.toUpperCase();
				this.opponentName = remotePlayer.nome.toUpperCase();

				// Checking for empty string
				if(this.opponentName === '' ){
					// Players Names
					this.opponentName = remotePlayer.character.toUpperCase();
				}
				if( this.playerName === ''){
					this.playerName = localPlayer.character.toUpperCase();
				}
			}
			
			
			
			// Player
			this.add.text(98, 90, this.playerName).setFontSize(25).setFontFamily('impact' );
			// Oponent
			this.add.text(918, 90, this.opponentName).setFontSize(25).setFontFamily('impact' ).setOrigin(1, 0);

			// Timer
			this.timerText = this.add.text(485, 24, "60").setFontSize(55).setFontFamily('impact').setColor("#000000");
		

		this.initPlayers();

		// Timer
		this.timer = this.time.delayedCall(60000);


	}

	update() {
		if (player != null) {
			player.handleMoving();
					
		}

		if(moved){
			opponent.onMoveOpponent(remotePlayer.x, remotePlayer.y, remotePlayer.anim);
			
		}

		this.physics.add.collider(gloves, fighter2, this.colliderCallback, this.processCallback); // Glove1 with opponent
		// this.physics.add.collider(gloves, fighter2, this.colliderCallback); // Glove2 with opponent
		// this.physics.add.collider(playerContainer, opponentContainer); // Player with Opponents containers
		

		// Updating the LifeBars
		if(localPlayerIs2){
			p1Bar.setScale(remotePlayer.life / 100, 1);
			p2Bar.setScale(localPlayer.life / 100 , 1);

		}
		else{
			p1Bar.setScale(localPlayer.life / 100, 1);
			p2Bar.setScale(remotePlayer.life / 100 , 1);
		}

		// Timer
		if (this.timerOver === false){
			this.showTimer();
		}
		else {
			this.timerEnded(); // Callback for whent the timer ends!!
		}

		this.checkWhoWon();
	}

	initPlayers() {
		player = this.physics.add.existing(new Player(
			this,
			localPlayer.id,
			localPlayer.character,
			localPlayer.x,
			localPlayer.y,
			localPlayer.life
		));
		
		opponent = this.physics.add.existing(new Oponent(
			this,
			remotePlayer.id,
			remotePlayer.character,
			remotePlayer.x,
			remotePlayer.y,
			remotePlayer.life
		));

	}
	
	processCallback(){	
		
		return punching;
	}

	colliderCallback(){
		punching = false;

		remotePlayer.life = remotePlayer.life - 10;
		socket.emit('key_attack', remotePlayer.life)

	}

	// Ver quem ganhou
	checkWhoWon(){
		if(localPlayer.life === 0){
			
			this.lose()
			
		}
		else if (remotePlayer.life === 0){
			
			this.win()
			
		}
	}

	// Callback para quando o timer acabar
	timerEnded(){
		if(localPlayer.life > remotePlayer.life){

			this.win()

		}
		else if(localPlayer.life < remotePlayer.life){
			this.lose()
		}
		else{
			console.log("Draw")
		}
		

	}

	// Atualizar o texto do timer na tela
	showTimer(){
		let maxTime = 60;
		let time = Math.floor(this.timer.getElapsedSeconds() );
		let timeLeft = maxTime - time;
		
	
		// Quando o countdown is over
		if (timeLeft <= 0) {
			timeLeft = 0;
			this.timerOver = true;
		}
	
		let sec = timeLeft % 60;

		this.timerText.setText(sec);
	}

	// Mostrar para o jogador que perdeu
	lose(){
		this.add.image(500, 180, 'youLose');

		p1Bar.destroy()
		p2Bar.destroy()

		// Botao voltar
		this.botaoVoltar = this.add.image(512, 665, "botaoReiniciar")
		.setInteractive()
		.on("pointerdown", () => {
			location.reload()
		});
	}

	// Mostrar para o jogador que ganhou
	win(){
		this.add.image(500, 170, 'youWin');

		p1Bar.destroy()
		p2Bar.destroy()

		opponent.angle = -90;

		// Botao voltar
		this.botaoVoltar = this.add.image(512, 665, "botaoReiniciar")
		.setInteractive()
		.on("pointerdown", () => {
			location.reload()
		});

	}
	

}
















