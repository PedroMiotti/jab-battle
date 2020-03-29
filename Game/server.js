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

        console.log('a user connected');

        socket.on('new_player',(x_posi) =>{

             player_info = {
                x: x_posi,
                playerID: socket.id
            }

            console.log(player_info.x)

        } )


       // Event for when a player disconnects
        socket.on('disconnect', function () {

          console.log('user disconnected');
        });

      });
  
    // io.on('connection', function(socket) {
    //     console.log('client connected');
    
    //     // listen for incoming data msg on this newly connected socket
    //     socket.on('data', function (data) {

    //         console.log(`data received is '${data}'`)

    //     });

    //     socket.emit('new_event', 'data here')
    
    // });

// PORT CONFIG
    const PORT = process.env.PORT || 8090
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })