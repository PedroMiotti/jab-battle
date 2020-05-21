"use strict";

// CONFIG OBJECT FOR PHASER
const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 1024,
	height: 768,
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
			gravity: {
				 y: 0 
			}
		}
	},
	scene: [Boot, TelaInicial, TelaNome, TelaChooseChar, TelaRingue]
};

// Phaser Instance
const game = new Phaser.Game(config);

// Global Variables
let player = null; // Entitie
let opponent = null; // Entitie

let fighter = null; // Player's Physics Body
let fighter2 = null; // Opponent's Physics Body

let playerContainer = null; // Player Container
let opponentContainer = null; // Opponent Container

let gloves = null; // Left Glove
let gloves2 = null; // Right Glove

let p1Bar; // Player 1 HeathBar
let p2Bar; // Player 2 HeathBar

let punching = false; // If ['w', 's'] were pressed
let moved = false; // If ['a','d'] were pressed

let pID = null; // Player ID

let roomId = 0;
let localPlayer = null; // LocalPlayer info
let remotePlayer = null; // RemotePlayer info
let localPlayerIs2 = false; // If player is player2 

let socket = null;

function cleanUpPlayers() {
	roomId = 0;
	localPlayer = null;
	remotePlayer = null;
}

function prepareSocket(nomePlayer, chosenChar) {
  cleanUpPlayers();

  let started = false;

	if (socket) {
		try {
			socket.disconnect();
		} catch (err) {
			// Apenas ignora...
		}
		socket = null;
	}

	try {
		socket = io.connect();
	} catch (err) {
		console.log(err);
		// Tratar erro...
	}

	socket.on("game_started", (gameStartData) => {
		started = true;
		roomId = gameStartData.roomId;
		if (gameStartData.player1.id === socket.id) {
			localPlayerIs2 = false;
			localPlayer = gameStartData.player1;
			remotePlayer = gameStartData.player2;
		} 
		else {
			localPlayerIs2 = true;
			localPlayer = gameStartData.player2;
			remotePlayer = gameStartData.player1;
			
		}
		
		gameStartedCallback();
	});

	socket.on("move", (data) => {
		moved = true;
		onMoveCallback(data.x, data.y, data.anim)
		
	});

	socket.on("attack", (data) => {
		onAttackCallback(data.life);
	})

	socket.on("game_ended", (gameEndData) => {
		if (started) {
			started = false;
			gameEndedCallback(gameEndData);
		}
	});

	socket.on("player_data", remoteDataCallback);

	socket.on("connect", function () {
		socket.emit("info_player", nomePlayer, chosenChar);
	});

	socket.on("disconnect", function () {
		if (started) {
			started = false;
			gameErrorCallback();
		}
		socket = null;
	});
}

function gameStartedCallback() {
  game.scene.start("telaRingue");
}

function remoteDataCallback(player_data) {
}

function gameEndedCallback(gameEndData) {
}

function gameErrorCallback() {

}

function onMoveCallback(x, y, anim){

	remotePlayer.x = x;
	remotePlayer.y = y;
	remotePlayer.anim = anim

}

function onAttackCallback(life){

	localPlayer.life = life;

}




