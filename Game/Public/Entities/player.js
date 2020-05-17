"use strict";

class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, id, character, x, y, life) {
		super(scene, "Player");

		this.id = id;
		this.coor = {
			x: x,
			y: y
		};
		this.life = life;

		// this.fighter = null;
		this.prefix = null;
		this.animToPlay = null;

		this.handleCharacterChoosing(scene, character, this.coor.x, this.coor.y);

		this.keys = scene.input.keyboard.addKeys({
			jab: Phaser.Input.Keyboard.KeyCodes.W,
			direto: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D
		});

		// this.setupBody(scene)
	}

	//? Call this function on the update on TelaRingue()
	handleMoving() {
		if (this.keys.left.isDown) {
			this.animToPlay = "walk" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			fighter.setVelocityX(-160);

			socket.emit("key_press", "walk", { x: fighter.x, y: fighter.y });

		} 
		
		else if (this.keys.right.isDown) {
			this.animToPlay = "walk" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			fighter.setVelocityX(160);

			socket.emit("key_press", "walk", { x: fighter.x, y: fighter.y });

		} 
		else if(this.keys.jab.isDown){
		    this.animToPlay = "jab" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			socket.emit("key_press", "jab", { x: fighter.x, y: fighter.y });

		    //TODO ----- Play PUNCH sfx

		}
		else if(this.keys.direto.isDown){

		    this.animToPlay = "direto" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			socket.emit("key_press", "direto", { x: fighter.x, y: fighter.y });

		    //TODO ----- Play PUNCH sfx
		}
		
		else {
			this.animToPlay = "idle" + this.prefix;
			fighter.anims.play(this.animToPlay, true);
			fighter.setVelocityX(0);
			
			socket.emit("key_press", "idle", { x: fighter.x, y: fighter.y });


		}

	}

	handleCharacterChoosing(scene1, character, x, y) {
		// Adding Characters
		let char_1 = localPlayer.character;

		if (char_1 === "Tommy") {
			fighter = this.scene.physics.add.existing(new Tommy(scene1, x, y));
			this.prefix = "_tommy";
		} 
		else if (char_1 === "Jax") {
			fighter = this.scene.physics.add.existing(new Jax(scene1, x, y));
			this.prefix = "_jax";
		}
		
		// TODO add all other character HERE

		// this.scene.physics.add.collider(this.fighter);
		this.scene.physics.world.enable(fighter);
		fighter.setCollideWorldBounds(true);
		
		
		if(localPlayerIs2){
            fighter.flipX = true;
        }
	}

	setupBody(scene){

		return

	}

}


















