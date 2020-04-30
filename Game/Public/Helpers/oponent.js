
class Oponent extends Phaser.Physics.Arcade.Sprite {
 
    constructor(scene, id, x, y, character, life){
        super(scene,'Oponent')

        this.id = id
        this.spawn = {
            x: 650, 
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
        return
    }


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