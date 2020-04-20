
class Player extends Phaser.Physics.Arcade.Sprite {
 
    constructor(scene,id, x, y, character, life){
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

        

        this.handleCharacterChoosing(character ,this.spawn.x, this.spawn.y)
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

    handleCharacterChoosing(character, x , y){
        // Adding Characters
        this.chosenChar = character //TODO - Pegar do socket.info
        this.fighter = null
        
        if(this.chosenChar == 'Tommy'){
            this.fighter = this.physics.add.existing(new Tommy(this, x, y))
        }
        else if(this.chosenChar == 'Jax'){
            this.fighter = this.physics.add.existing(new Jax(this, x, y) )
        }

        // TODO add all other character HERE


        this.fighter.scene.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this.fighter) 
        this.scene.physics.world.enable(this.fighter)

    }
}