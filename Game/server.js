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
        




        
    // Array for the socket.id of every player in the game
    let players = []

    // Object for the player's info
    let player_info = {}    

    // Socket.io   
    // Event for when a new player connects 
    io.on('connection', function (socket) {

        console.log('User connected')

        // Adiciona o Jogador no array Players
        players.push(socket.id)

        socket.on('new_player',(nome_player) =>{

             player_info = {
                x: 100,
                playerID: socket.id,
                nome: nome_player
            }

        })

        console.log(players)
        console.log(player_info)

       // Event for when a player disconnects
        socket.on('disconnect', function () {

          console.log('User disconnected')

          // Removendo jogador do array players quando se desconecta
          let id_index = players.indexOf(socket.id) // Pegando o Index do id no array
          players.splice(id_index, 1) // Removendo o id pelo index

        })

      })
  

// PORT CONFIG
    const PORT = process.env.PORT || 8090
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })