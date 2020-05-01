

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
  let player = null
  let oponent = null

  let players = new Array()
  let playersInfo = new Object()


  //  Funcao para connectar o client to the socket
  function connectToSocket(){
    try{

        socket = io.connect()

    }
    catch(err){

        console.log(err)
          
    }

  }
 




  
   