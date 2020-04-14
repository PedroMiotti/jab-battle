
class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(id, x, y, character, life){
        super('Player')
        this.spawn = {x: x, y: y}
        this.id = id
        this.character = character
        this.life = life

        this.handleCharacterChoosing(this.character)

        this.physics.add.collider(this.fighter) 
        this.physics.world.enable(this.fighter)

    }

    create(){
        // ADDING KEYS
        this.keys = this.input.keyboard.addKeys({
            jab:Phaser.Input.Keyboard.KeyCodes.W,
            direto:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });
    }


    //? Call this function on the update on TelaRingue()
    handleMoving(){
        if (this.keys.left.isDown){
            this.fighter.anims.play('walk', true)
            this.fighter.setVelocityX(-160)
        }

        else if(this.keys.right.isDown){

            this.fighter.setVelocityX(160)
            this.fighter.anims.play('walk', true)

        }

        else{
            this.fighter.setVelocityX(0)
            this.fighter.anims.play('idle');

        }

        if(this.keys.jab.isDown){
            this.fighter.anims.play('jab')
            //TODO ----- Play PUNCH sfx
            
        }
        else if(this.keys.direto.isDown){
        
            this.fighter.anims.play('direto');
            //TODO ----- Play PUNCH sfx
        }

    }

    handleCharacterChoosing(character){
        // Adding Characters
        this.chosenChar = character //TODO - Pegar do socket.info
        this.fighter;
        
        if(this.chosenChar == character){
            this.fighter = this.physics.add.existing(new Tommy(this, x, y))
        }
        // TODO add all other character HERE


        this.fighter.setCollideWorldBounds(true);

    }
}