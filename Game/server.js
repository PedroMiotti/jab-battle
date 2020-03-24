// IMPORTS
    // Express
        const express = require(`express`)
        const app = express()
        const path = require('path');

    // Socket.io
        const server = require('http').Server(app)
        const io = require('socket.io')(server)


// CONFIG
    // MIDDLEWARES
        // app.use(express.static(__dirname + '/Public')) // Using the Public folder as the static folder
        app.use(express.static(path.join(__dirname, '/Public')));
        // app.get('/', function (req, res) {

        //     res.sendFile(__dirname + 'index.html');
            
        //   });
        
    // Socket.io    
    io.on('connection', function (socket) {W
        console.log('a user connected');
        socket.on('disconnect', function () {
          console.log('user disconnected');
        });
      });
  

// PORT CONFIG
    const PORT = process.env.PORT || 8090
    app.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })