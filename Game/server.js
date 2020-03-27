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
        
  
        
    // Socket.io    
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
          console.log('user disconnected');
        });
      });
  

// PORT CONFIG
    const PORT = process.env.PORT || 8090
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })