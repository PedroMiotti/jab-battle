// IMPORTS
// Express
const express = require(`express`);
const app = express();
var path = require('path');

// Socket.io
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

// CONFIG
// MIDDLEWARES
// app.use(express.static(__dirname + "/Public")); // Using the Public folder as the static folder
app.use(express.static(path.join(__dirname, '/Public'), { maxAge: 86400000 }));

// Socket.io

let roomno = 1;

// Object for the player's info
let player_info = {};

let rooms = {};

let lastRoom = null;

// Event for when a new player connects
io.on("connection", function (socket) {
	console.log(`User connected, Id : ${socket.id} 😄`);
	const id = socket.id;

	socket.on("info_player", (nome, character) => {
		let info = {
			x: 0,
			y: 0,
			life: 100,
			character: character,
			animation: null,
			id: socket.id,
			socket: socket,
			nome: nome,
			room: null
		};

		player_info[socket.id] = info;

		// Segundo jogador
		if (lastRoom) {
            // entra na room
            // spawn 2
            info.x = 780;
            info.y = 555;
			info.room = lastRoom;
			lastRoom.player2 = info;

			let gameStartData = {
				roomId: lastRoom.id,
				player1: {
					id: lastRoom.player1.id,
                    nome: lastRoom.player1.nome,
					character: lastRoom.player1.character,
					anim: lastRoom.player1.anim,
                    x: lastRoom.player1.x,
                    y: lastRoom.player1.y,
                    life: lastRoom.player1.life
				},
				player2: {
					id: lastRoom.player2.id,
					nome: lastRoom.player2.nome,
					character: lastRoom.player2.character,
					anim: lastRoom.player2.anim,
                    x: lastRoom.player2.x,
                    y: lastRoom.player2.y,
                    life: lastRoom.player2.life
				}
			};

			lastRoom.player1.socket.emit("game_started", gameStartData);
			lastRoom.player2.socket.emit("game_started", gameStartData);

			lastRoom = null;
		} else {
			// esse era o primeiro player na room
            // spawn 1
            info.x = 235;
			info.y = 555;
            lastRoom = {
				id: roomno,
				player1: info,
				player2: null
			};
			rooms[roomno] = lastRoom;
			roomno++;
			info.room = lastRoom;
		}
	});

	// Event for when the player moves
	socket.on("key_press", (anim, coor) => {
		let info = player_info[socket.id];

		if(!info){
			return;
		}

		let room = info.room;

		
		if (room.player1 === info) {
			if(room.player1){
				room.player1.x = coor.x;
				room.player1.y = coor.y;
				room.player1.animation = anim;

				let moveData = {
					x: room.player1.x,
					y: room.player1.y,
					anim: room.player1.animation
				}

				socket.to(room).emit("move", moveData);
				info.room.player2.socket.emit("move", moveData);
			}
			else{
				socket.emit('disconnect');
			}
		} 
		
		else {
			if(room.player2){
				room.player2.x = coor.x;
				room.player2.y = coor.y;
				room.player1.animation = anim;

				let moveData = {
					x: room.player2.x,
					y: room.player2.y,
					anim : room.player1.animation
				}

				info.room.player1.socket.emit("move", moveData);
			}
			else{
				socket.emit('disconnect');
			}
		}

	});

	// Event for when the player attacks
	socket.on('key_attack', (life) => {
		let info = player_info[socket.id];
		let room = info.room;

		if (room.player1 === info) {
			room.player1.life = life;
			

			let lifeData = {
				life: room.player1.life,
			}

			info.room.player2.socket.emit("attack", lifeData);

		} 

		else {
			room.player2.life = life;
			

			let lifeData = {
				life: room.player2.life,
			}
			info.room.player1.socket.emit("attack", lifeData);


		}
	})


	// Event for when a player disconnects
	socket.on("disconnect", function () {
		console.log(`User disconnected ${socket.id}`);

		let info = player_info[socket.id];
		if (!info) {
			// Por algum motivo bizarro, esse socket nao tinha nem um player_info...
			return;
		}

		info.socket = null; // garbage collector!
		delete player_info[socket.id];
		let room = info.room;
		info.room = null;

		if (room) {
			delete rooms[room.id];
			if (room.player1 && room.player1 !== info) {
				// o player saindo era o player2
				// avisa room.player1 que acabou o jogo!

				socket.to(room).emit("disconnect", 'O jogador 2 se desconectou !')
				// TODO - create an event to display something at the screen when a player leaves
			} else if (room.player2 && room.player2 !== info) {
				// o player saindo era o player1
				// avisa room.player2 que acabou o jogo!
				socket.to(room).emit("disconnect", 'O jogador 1 se desconectou !')

			}
			room.player1 = null; //  garbage collector!
			room.player2 = null; //  garbage collector!


		}
	});
});



// PORT CONFIG
const PORT = process.env.PORT || 2000;


server.listen(PORT, () => {
	console.log(`Servidor OK \n Port : ${PORT}`);
});
