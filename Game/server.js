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

    let rooms = {}

    let lastRoom = null

    // Socket.io   
    // Event for when a new player connects 
    io.on('connection', function (socket) {

        console.log('User connected Id : ' + socket.id)

        socket.on('info_player', (nome_player) =>{

            let info = {
                x: 100,
                y: 310,
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
                lastRoom = null; // O pr'oximo player que entrar vai criar uma room nova
                // comeca o jogo
                // para avisar os players que o jogo vai comecar, nao pode mais usar o lastRoom, porque ele e null
                // usa info.room...
                // Agora.... eu sou meio xiita... se quiser, para facilitar ainda mais, armazena logo o socket no info, nao s'o o id...
                // tipo assim
            } else {
                // esse era o primeiro player na room
                lastRoom = {
                    id: roomno,
                    player1: info,
                    player2: null
                }
                rooms[roomno] = lastRoom;
                roomno++;
                info.room = lastRoom;
            }
    // deu para entender a logica????? Sim, voce ta fazendo sem testar, so de cabeca ??
    // sim.... estou digitando aqui... Provavelmente vai dar certinho... :) Carai rafa um dia vou ser assim kkk
    // uhauhauahua nada!!! 'e que eu j'a fiz isso algumas vezes antes.... por isso ja ate sei o que nao vai bem e o que +- vai.... :)
    // kkk bele, brigadao rafa, vai la pra reuniao agradeco 
    // IMagina!!! TMJ!
        })      

        socket.on('connecting_players', () => {
            let info = player_info[socket.id];
            if (!info) {
                // hacker! :)
                return;
            }

            let room = info.room;
            
            if(room.player2 === null){
                socket.emit('check_player2', room.player2)
            }

            console.log(room)


            if (!room) {
                // hacker 2 :)
                return;
            }
            if (room.player1 === info) {
                // manda algo para o player2 +- assim
                //room.player2.socket.send....
            } else {
                // manda algo para o player1 +- assim
                //room.player1.socket.send....
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

            info.socket = null; // muito importante! garbage collector!
            delete player_info[socket.id]; // Mas ele nao retorna um json gigante ??
            // O socket 'e o objeto. esse voc^e nao vai enviar para o cliente
            // pode enviar um objeto novo, que voce cria na hora de enviar as mensagens
            // porque a'i, tendo um player, voc^e vai ter a room do player, e com a room, voc^e j'a vai ter
            // o outro player_info... E como nesse player_info voc^e j'a tem o socket direto, o envio das mensagens fica bem mais de boa...
            // da uma olhada
            let room = info.room;
            info.room = null; 
            // ajuda o garbage collector!  entendi rafa, depois quando tiver um tempo pode me explicar esse garbage collector ?
            // belea! 'e o cara que joga fora todos os objetos que nao estao mais sendo utilizados... tem no Java, JS, C#, phyton.......... :) mas as infos dos objs ficam em cache ??
            // todas as variaveis aqui ficam na RAM do servidor!!!
            // se voc^e fosse fazer um esquema desse real, para milhoes de players, cada server ia suportar um numero maximo de salas
            // ai, no momento da conexao, voce precisaria dizer para o client qual o IP que ele teria que se conectar, para gerar um balanceamento de carga
            // tudo que esta aqui est'a na RAM do server...
            // O garbage collector joga fora e libera memoria de coisas qu enao estao mais sendo utilizadas ;)
            // quando a gente se falar de novo, com mais carinho, eu te explico, sim! :)
            // Bele entendi um pouco sim depois vou dar uma lida melhor, agradeco a atencao // imagina!!! valeu!!
            // tmj! qualquer CountQueuingStrategy, me d'a um toque! falouuuuuuuuu! []'s 
            if (room) {
                delete rooms[room.id];
                if (room.player1 && room.player1 !== info) {
                    // o player saindo era o player2
                    // avisa room.player1 que acabou o jogo!
                } else if (room.player2 && room.player2 !== info) {
                    // o player saindo era o player1
                    // avisa room.player2 que acabou o jogo!
                }
                room.player1 = null; // ajuda o garbage collector!
                room.player2 = null; // ajuda o garbage collector!
            }

        })

      })
  

// PORT CONFIG
    const PORT = process.env.PORT || 2000
    server.listen(PORT, () => {

        console.log(`Servidor OK \n Port : ${PORT}`)

    })