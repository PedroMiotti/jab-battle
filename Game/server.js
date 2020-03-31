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

    // Socket.io   
    // Event for when a new player connects 
    io.on('connection', function (socket) {

        console.log('User connected Id : ' + socket.id)

        socket.on('info_player', (nome_player) =>{

             player_info[socket.id] = {
                x: 100,
                playerID: socket.id,
                nome: nome_player
            }

        })

        socket.on('new_player_room', () => {
            
            // Getting how many player are connected to the room
            let playersInRoom

            io.in('room_' + roomno).clients((err, clients) => {
                console.log(clients)

                playersInRoom = clients.length

                chooseRoom: {
                    // Room max = 2
                    if(playersInRoom > 1){
                        socket.on('create_new_room', () => {
                            
                            socket.join('room_' + roomno)
                            console.log("Players in the room : "+ roomno + " : " + playersInRoom  )
                    
                        })

                    }

                    // If there is a room with only one player in it join
                    else{

                        socket.join('room_' + roomno)
                        console.log("Players in the room : "+ roomno + " : " + playersInRoom  )
                        break chooseRoom
                    }
                
                    roomno++
           
                }
            })
        })
        
       // Event for when a player disconnects
        socket.on('disconnect', function () {

            console.log('User disconnected')

            // Pegando qual room o usuario esta
            let rooms = Object.keys(socket.rooms).filter(function(item) {
                return item !== socket.id;
            });

            // Deletando o usuario daquele room
            io.of('/').in(rooms).clients((error, socketIds) => {
                if (error) throw error;
            
                socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(rooms));
            
            });


        })

      })
  

// PORT CONFIG
    const PORT = process.env.PORT || 2000
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })