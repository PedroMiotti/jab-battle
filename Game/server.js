// IMPORTS
    // Express
        const express = require(`express`)
        const app = express()

    // Socket.io
        const server = require('http').Server(app)
        const io = require('socket.io').listen(server)


// CONFIG
    // MIDDLEWARES
        app.use(express.static(__dirname + '/Public')) // Using the Public folder as the static folder
        




    let roomno = 1

    // Object for the player's info
    let player_info = {}    

    // Players ID in room
    let players_id = []

    let rooms = {}

    let lastRoom = null

    // Socket.io   
    // Event for when a new player connects 
    io.on('connection', function (socket) {

        console.log(`User connected, Id : ${socket.id}` )

        socket.on('info_player', (nome_player, chosen_char) =>{

            let info = {
                x: 100,
                y: 310,
                life: 100,
                character: chosen_char, 
                playerID: socket.id,
                socket: socket,
                nome: nome_player,
                room: null
            };

            player_info[socket.id] = info;

            // Segundo jogador
            if (lastRoom) {
                // entra na room
                info.room = lastRoom;
                lastRoom.player2 = info;

                players_id.push(info.room.player2.playerID)
                

                lastRoom = null; 
            } 
            else {
                // esse era o primeiro player na room
                lastRoom = {
                    id: roomno,
                    player1: info,
                    player2: null
                }
                rooms[roomno] = lastRoom;
                roomno++;
                info.room = lastRoom;

                players_id.push(info.room.player1.playerID)
                
            }
    
        })  
        
        // * Vendo se o player 2 ja se conectou
        socket.on('checkPlayer2', () => {
            let info = player_info[socket.id]
        
            if (info.room.player2 === null) {

                socket.emit("check_player2", null);

            } 
            else {

                socket.emit("check_player2", "GoToFight");
            
            }

        })


        socket.on('PLAYERS_DATA', () => {
            let info = player_info[socket.id];
            if (!info) {
                // hacker! :)
                return;
            }
             
            if (!info.room) {
                // hacker 2 :)
                return;
            }

            // Sending both players ID's
            socket.emit('PlayerInRoom' , players_id)
            
            if (info.room.player2 === info) {
                
                let player_2 = {
                    x: info.room.player2.x,
                    y: info.room.player2.y,
                    life: info.room.player2.life,
                    character: info.room.player2.character,
                    id: info.room.player2.playerID,
                    nome: info.room.player2.nome
                }
                socket.emit('PlayerData', player_2)
                
            } 
            else {
                let player_1 = {
                    x: info.room.player1.x,
                    y: info.room.player1.y,
                    life: info.room.player1.life,
                    character: info.room.player1.character,
                    id: info.room.player1.playerID,
                    nome: info.room.player1.nome
                }
                socket.emit('PlayerData', player_1)
            }
        });


       // Event for when a player disconnects
        socket.on('disconnect', function () {

            console.log('User disconnected')

            let info = player_info[socket.id];
            if (!info) {
                // Por algum motivo bizarro, esse socket nao tinha nem um player_info...
                return;
            }

            info.socket = null;// garbage collector!
            delete player_info[socket.id]; 
            let room = info.room;
            info.room = null; 
     
            if (room) {
                delete rooms[room.id];
                if (room.player1 && room.player1 !== info) {
                    // o player saindo era o player2
                    // avisa room.player1 que acabou o jogo!
                } else if (room.player2 && room.player2 !== info) {
                    // o player saindo era o player1
                    // avisa room.player2 que acabou o jogo!
                }
                room.player1 = null; //  garbage collector!
                room.player2 = null; //  garbage collector!
            }

        })

      })
  

// PORT CONFIG
    const PORT = process.env.PORT || 2000
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })