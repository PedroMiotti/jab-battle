"use strict";

class Player extends Phaser.GameObjects.Container {
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

			punching = false;

			playerContainer.body.setVelocityX(-160);

			socket.emit("key_press", "walk", { x: playerContainer.x, y: playerContainer.y });

		} 
		
		else if (this.keys.right.isDown) {
			this.animToPlay = "walk" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			punching = false;

			playerContainer.body.setVelocityX(160);

			socket.emit("key_press", "walk", { x: playerContainer.x, y: playerContainer.y });

		} 
		else if(Phaser.Input.Keyboard.JustDown(this.keys.jab)){
			this.animToPlay = "jab" + this.prefix;
			
			fighter.anims.play(this.animToPlay, true);
			punching = true;
			
			// Glove square go forwad
			(localPlayerIs2 ? gloves.x = -105 : gloves.x = 105);

			socket.emit("key_press", "jab", { x: playerContainer.x, y: playerContainer.y });
			
		    //TODO ----- Play PUNCH sfx

		}
		else if(Phaser.Input.Keyboard.JustDown(this.keys.direto)){

		    this.animToPlay = "direto" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			punching = true;

			socket.emit("key_press", "direto", { x: playerContainer.x, y: playerContainer.y });

		    //TODO ----- Play PUNCH sfx
		}
		
		else {
			
			this.animToPlay = "idle" + this.prefix;
			fighter.anims.play(this.animToPlay, true);

			playerContainer.body.setVelocityX(0);

			punching = false;

			// Glove square resets X axis
			(localPlayerIs2 ? gloves.x = -60 : gloves.x = 60);

			socket.emit("key_press", "idle", { x: playerContainer.x, y: playerContainer.y });
		}
	}

	handleCharacterChoosing(scene1, character, x, y) {
		// Adding Characters
		let char_1 = localPlayer.character;

		if (char_1 === "Tommy") {
			fighter = this.scene.add.existing(new Tommy(scene1, 0, 0));
			this.prefix = "_tommy";
		} 
		else if (char_1 === "Jax") {
			fighter = this.scene.add.existing(new Jax(scene1, 0, 0));
			this.prefix = "_jax";
		}
		
		// TODO add all other character HERE


		// Crating a container for the gloves and the fighter
		playerContainer = this.scene.add.container(localPlayer.x, localPlayer.y);
		playerContainer.setSize(250, 250); 
		this.scene.physics.world.enableBody(playerContainer);
		playerContainer.body.setCollideWorldBounds(true);

		// Adding the figher to the container
		playerContainer.add(fighter);
		this.scene.physics.world.enable(fighter);

		//  Gloves Physics 
		//* For the player2 x = -60
		(localPlayerIs2 ? gloves = this.scene.add.rectangle(-60, 60 , 50, 50, "#ffff") : gloves = this.scene.add.rectangle(60, 70 , 50, 50, "#ffff"));
		this.scene.physics.world.enable(gloves); 
		gloves.setAlpha(0);
		playerContainer.add(gloves); // Adding to the container

		
		if(localPlayerIs2){
            fighter.flipX = true;
        }
	}

}


















