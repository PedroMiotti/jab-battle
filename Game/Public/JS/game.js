

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
    scene: [Boot, TelaInicial, TelaNome, TelaRingue] 
  };

  // Phaser Instance
  const game = new Phaser.Game(config);


  
   