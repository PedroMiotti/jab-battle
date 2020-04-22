
class Player extends Phaser.Physics.Arcade.Sprite {
 
    constructor(scene, id, x, y, character, life){
        super(scene,'Player')

        this.id = id
        this.spawn = {
            x: 275, 
            y: 630
        }
        this.previousPosition = {
            x: x, 
            y: y
        }
        this.life = life


        this.handleCharacterChoosing(scene ,character ,this.spawn.x, this.spawn.y)

    }

    create(){
        // ADDING KEYS
        this.keys = this.input.keyboard.addKeys({
            jab:Phaser.Input.Keyboard.KeyCodes.W,
            direto:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        })
    }


    //? Call this function on the update on TelaRingue()
    // static handleMoving(){
    //     if (this.keys.left.isDown){
    //         this.fighter.anims.play('walk', true)
    //         this.fighter.setVelocityX(-160)
    //     }

    //     else if(this.keys.right.isDown){

    //         this.fighter.setVelocityX(160)
    //         this.fighter.anims.play('walk', true)

    //     }

    //     else{
    //         this.fighter.setVelocityX(0)
    //         this.fighter.anims.play('idle')

    //     }

    //     if(this.keys.jab.isDown){
    //         this.fighter.anims.play('jab')
    //         //TODO ----- Play PUNCH sfx
            
    //     }
    //     else if(this.keys.direto.isDown){
        
    //         this.fighter.anims.play('direto')
    //         //TODO ----- Play PUNCH sfx
    //     }

    // }

    handleCharacterChoosing(scene, character, x , y){
        // Adding Characters
        this.chosenChar = character 
        this.fighter = null
        
        if(this.chosenChar == 'Tommy'){          
            this.fighter = this.scene.physics.add.existing(new Tommy(scene, x, y))
        }
        else if(this.chosenChar == 'Jax'){
            this.fighter = this.scene.physics.add.existing(new Jax(scene, x, y))
        }

        // TODO add all other character HERE

        
        this.scene.physics.add.collider(this.fighter) 
        this.scene.physics.world.enableBody(this.fighter)
        // debugger
        this.fighter.setCollideWorldBounds(true)


        
       

    }
}