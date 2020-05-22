"use strict";

class Jax extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'Jax', 'SpriteSheetJax_01.png')

        
        this.scene.add.existing(this)
        
        // ANIMATIONS

        //WALK
        this.scene.anims.create({
            key: "walk_jax",
            repeat: -1,
            frameRate: 6,
            frames: this.scene.anims.generateFrameNames('Jax', {
                prefix: 'SpriteSheetJax_',
                suffix: ".png",
                start: 1,
                end: 4,
                zeroPad: 2,
            })
        })

        //JAB
        this.scene.anims.create({
            key: "jab_jax",
            frameRate: 1,
            frames: this.scene.anims.generateFrameNames('Jax', {
                prefix: 'SpriteSheetJax_',
                suffix: ".png",
                start: 6,
                end: 6,
                zeroPad: 2,
            }),
        })
        
        
        // DIRETO
        this.scene.anims.create({
            key: "direto_jax",           
            frameRate: 1,
            frames: this.scene.anims.generateFrameNames('Jax', {
                prefix: 'SpriteSheetJax_',
                suffix: ".png",
                start: 8,
                end: 8,
                zeroPad: 2,
            })
        })

        // IDLE
        this.scene.anims.create({
            key: "idle_jax",           
            frameRate: 4,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('Jax', {
                prefix: 'SpriteSheetJax_',
                suffix: ".png",
                start: 1,
                end: 1,
                zeroPad: 2,
            })
        })

        

    }


}
