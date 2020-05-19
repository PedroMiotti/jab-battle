"use strict";

class Oponent extends Phaser.Physics.Arcade.Sprite {
 
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
            fighter2 = this.scene.physics.add.existing(new Tommy(scene2, x, y))
            this.prefix = "_tommy";

        }
        else if(char_2 === "Jax"){
            fighter2 = this.scene.physics.add.existing(new Jax(scene2, x, y))
            this.prefix = "_jax";

        }
        
        
        // TODO add all other character HERE

        // this.scene.physics.add.collider(this.fighter2) 
        // this.scene.physics.world.enableBody(fighter2)
        fighter2.setCollideWorldBounds(true)

        
        if(!localPlayerIs2){
            fighter2.flipX = true;
        }

    }

    onMoveOpponent(x, y, anim){
        fighter2.body.x = x;
        fighter2.body.y = y;

        this.animToPlay = anim + this.prefix;
        fighter2.anims.play(this.animToPlay, true);
        
    }
}
