

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
  // let player = null



  //  Funcao para connectar o client to the socket
  function connectToSocket(){
    try{

        socket = io.connect()

    }
    catch(err){

        console.log(err)
          
    }

  }
 




  
   