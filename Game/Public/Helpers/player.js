
class Player extends Phaser.Physics.Arcade.Sprite {
 
    constructor(scene, id, x, y, character, life){
        super(scene,'Player')

        this.id = id
        this.spawn = {
            x: 235, 
            y: 575
        }
        this.previousPosition = {
            x: x, 
            y: y
        }
        this.life = life


        this.handleCharacterChoosing(scene ,character ,this.spawn.x, this.spawn.y)

        
        this.keys = scene.input.keyboard.addKeys({
            jab:Phaser.Input.Keyboard.KeyCodes.W,
            direto:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
          })

    }


    //? Call this function on the update on TelaRingue()
    handleMoving(){
        
        if (this.keys.left.isDown){
            this.fighter.anims.play('walk', true)
            console.log('LEFT')
            this.fighter.setVelocityX(-160)
        }

    
        else if(this.keys.right.isDown){

            this.fighter.setVelocityX(160) 
            this.fighter.anims.play('walk', true)

        }

        else{
            this.fighter.setVelocityX(0)
            this.fighter.anims.play('idle', true)

        }

        // if(this.keys.jab.isDown){
        //     this.fighter.anims.play('jab')
        //     //TODO ----- Play PUNCH sfx
            
        // }
        // else if(this.keys.direto.isDown){
        
        //     this.fighter.anims.play('direto')
        //     //TODO ----- Play PUNCH sfx
        // }

    }

    handleCharacterChoosing(scene1, character, x , y){
        // Adding Characters
       this.chosenChar = character 
       this.fighter = null
        
        if(this.chosenChar == 'Tommy'){          
            this.fighter = this.scene.physics.add.existing(new Tommy(scene1, x, y))
            
        }
        else if(this.chosenChar == 'Jax'){
            this.fighter = this.scene.physics.add.existing(new Jax(scene1, x, y))
            
        }

        // TODO add all other character HERE

        this.scene.physics.add.collider(this.fighter) 
        this.scene.physics.world.enable(this.fighter)
        // debugger
        this.fighter.setCollideWorldBounds(true)

    }
}