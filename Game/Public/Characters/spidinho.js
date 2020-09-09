"use strict";

class Spidinho extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'spidinho', 'spidinho_01.png')

        
        this.scene.add.existing(this)
        
        // ANIMATIONS

        //WALK
        this.scene.anims.create({
            key: "walk_spidinho",
            repeat: -1,
            frameRate: 6,
            frames: this.scene.anims.generateFrameNames('spidinho', {
                prefix: 'spidinho_',
                suffix: ".png",
                start: 1,
                end: 4,
                zeroPad: 2,
            })
        })

        //JAB
        this.scene.anims.create({
            key: "jab_spidinho",            
            frameRate: 4,
            frames: this.scene.anims.generateFrameNames('spidinho', {
                prefix: 'spidinho_',
                suffix: ".png",
                start: 5,
                end: 6,
                zeroPad: 2,
            })
        })

        // DIRETO
        this.scene.anims.create({
            key: "direto_spidinho",      
            frameRate: 4,
            frames: this.scene.anims.generateFrameNames('spidinho', {
                prefix: 'spidinho_',
                suffix: ".png",
                start: 7,
                end: 8,
                zeroPad: 2,
            })
        })

        // IDLE
        this.scene.anims.create({
            key: "idle_spidinho",           
            frameRate: 4,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('spidinho', {
                prefix: 'spidinho_',
                suffix: ".png",
                start: 7,
                end: 7,
                zeroPad: 2,
            })
        })

    }


}
