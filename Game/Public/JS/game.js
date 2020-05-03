

// CONFIG OBJECT FOR PHASER

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: [Boot, TelaInicial, TelaNome, TelaChooseChar, TelaRingue, TelaEncJogador] 
  };

  // Phaser Instance
  const game = new Phaser.Game(config, connectToSocket());

  // Global Variables
  let player = null // Entitie
  let oponent = null // Entitie

  let pID = null // Player ID
  let p1ID = null // First Player ID

  let players = new Array() // Players ID's
  let player1 = new Object() // Player 1 info
  let player2 = new Object() // Player 2 info



  //  Funcao para connectar o client to the socket
  function connectToSocket(){
    try{

        socket = io.connect()

    }
    catch(err){

        console.log(err)
          
    }

  }
 




  
   