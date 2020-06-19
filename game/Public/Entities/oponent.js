"use strict";

class Oponent extends Phaser.GameObjects.Container {
 
    constructor(scene, id, character, x, y, life){
        super(scene,'Oponent')

        this.id = id
        this.coor = {
            x: x, 
            y: y
        }
        this.previousPosition = {
            x: x, 
            y: y
        }
        this.life = life

        // this.fighter2 = null;
        this.prefix = null;
        this.animToPlay = null;

        this.handleCharacterChoosing(scene, character ,this.coor.x, this.coor.y)
        
    }

    

    handleCharacterChoosing(scene2, character, x , y){
        // Adding Characters
        let char_2 = remotePlayer.character;

        if(char_2 === "Tommy"){          
            fighter2 = this.scene.add.existing(new Tommy(scene2, 0, 0))
            this.prefix = "_tommy";
        }
        else if(char_2 === "Jax"){
            fighter2 = this.scene.add.existing(new Jax(scene2, 0, 0))
            this.prefix = "_jax";
        }
        else if (char_2 === "Digara") {
			fighter2 = this.scene.add.existing(new Digara(scene2, 0, 0));
			this.prefix = "_digara";
		}
		else if (char_2 === "cascao") {
			fighter2 = this.scene.add.existing(new Cascao(scene2, 0, 0));
			this.prefix = "_cascao";
		}
		else if (char_2 === "spidinho") {
			fighter2 = this.scene.add.existing(new Spidinho(scene2, 0, 0));
			this.prefix = "_spidinho";
		}
        

        
        opponentContainer = this.scene.add.container(remotePlayer.x, remotePlayer.y);
		opponentContainer.setSize(250, 250);
        this.scene.physics.world.enableBody(opponentContainer);
        opponentContainer.body.setCollideWorldBounds(true);

        opponentContainer.add(fighter2);
        this.scene.physics.world.enable(fighter2);

        if(!localPlayerIs2){
            fighter2.flipX = true;
        }

    }

    onMoveOpponent(x, y, anim){
        opponentContainer.x = x;
        opponentContainer.y = y;

        this.animToPlay = anim + this.prefix;
        fighter2.anims.play(this.animToPlay, true);
        
    }
}
