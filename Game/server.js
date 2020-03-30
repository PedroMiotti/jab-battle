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
        




    let roomno = 0
    // Array for the socket.id of every player in the game
    let players = []

    // Object for the player's info
    let player_info = {}    

    // Socket.io   
    // Event for when a new player connects 
    io.on('connection', function (socket) {

        console.log('User connected Id : ' + socket.id)

        // Adiciona o Jogador no array Players
        players.push(socket.id)

        socket.on('new_player', (nome_player) =>{

             player_info[socket.id] = {
                x: 100,
                playerID: socket.id,
                nome: nome_player
            }

        })

        socket.on('create_room', () => {
            
            // Getting how many player are connected to the room
            let playersInRoom
            io.in('room_' + roomno).clients((err, clients) => {

                playersInRoom = clients.length
                
                    // Room max = 2
                    chooseRoom: {
                        if(playersInRoom >= 2){
                        socket.on('create_new_room', () => {
                            socket.join('room_' + roomno)
                        
                        })

                    }

                    // If there is a room with only one player in it join
                    else{
                        socket.join('room_' + roomno)
                        console.log("Else")
                        break chooseRoom
                        
                    }
                
                    roomno++
                    console.log(roomno)
                    

                    
                }
            })

            console.log(socket.adapter.rooms['room_' + roomno])

            

            
 
        })
        
       // Event for when a player disconnects
        socket.on('disconnect', function () {

          console.log('User disconnected')

          // Removendo jogador do array players quando se desconecta
          let id_index = players.indexOf(socket.id) // Pegando o Index do id no array
          players.splice(id_index, 1) // Removendo o id pelo index

        })

      })
  

// PORT CONFIG
    const PORT = process.env.PORT || 2000
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })