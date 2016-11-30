const mainState = {
	init: function(data) {
		this.player1name = data.player1;
		this.player2name = data.player2;
		this.mode = data.mode;
		this.usingAirconsole = data.usingAirconsole;
		this.highScore = data.highScore;
		console.log(`main ${this.highScore}`);
		console.log(`Airconsole is.... ${this.usingAirconsole}`);
	},

	create: function() {
		this.score = 0;
		this.score2 = 0;

		this.game.add.sprite(0, 0, 'background');

		// this.scream = this.game.add.audio('scream');

		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;

		this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

		this.ground.scale.setTo(2, 2);
		this.ground.body.immovable = true;
		this.ground.body.velocity.y = 5;

		this.game.time.events.loop(4000, this.addPlatform, this);

		this.player = this.game.add.sprite(700, this.game.world.height - 150, 'player');

		this.game.physics.arcade.enable(this.player);

		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 375;
		this.player.body.collideWorldBounds = true;

		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);

		this.scoreText = this.game.add.text(16, 16, `${this.player1name}: 0`, { fontSize: '20px', fill: '#fff' });

		// Set up player 1 controls for keyboard
		this.cursors = this.game.input.keyboard.createCursorKeys();

		if (this.mode === 'multiplayer') {
			this.player2 = this.game.add.sprite(32, this.game.world.height - 150, 'player2');

			this.game.physics.arcade.enable(this.player2);

			this.player2.body.bounce.y = 0.2;
			this.player2.body.gravity.y = 375;
			this.player2.body.collideWorldBounds = true;

			this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
			this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

			this.scoreText2 = this.game.add.text(16, 40, `${this.player2name}: 0`, { fontSize: '20px', fill: '#fff' });

			// if (this.usingAirconsole === false) {
				// Set up player 2 controls for keyboard
				this.wasd = {
					up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
					down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
					left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
					right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
				};
			// }
		}

		this.addStars();
		this.game.time.events.loop(10000, this.addDiamond, this);
		this.game.time.events.loop(7000, this.addBomb, this);

		if (this.mode === 'singleplayer') {
			this.highScoreText = this.game.add.text(650, 16, `High Score: ${this.highScore}`, { fontSize: '20px', fill: '#fff' });
		}
	},

	update: function() {
		// Kill player when touching the bottom
		if (this.player.body.position.y >= this.game.world.height - this.player.body.height) {
			this.die(this.player);
		}

		// Kill player when touching the top
		if (this.player.body.position.y <= 0) {
			this.die(this.player);
		}

		this.game.physics.arcade.collide(this.stars, this.platforms);
		this.game.physics.arcade.collide(this.player, this.platforms);
		this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
		this.game.physics.arcade.overlap(this.player, this.diamonds, this.collectDiamond, null, this);
		this.game.physics.arcade.overlap(this.player, this.bombs, this.hitBomb, null, this);

		//  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;
			this.player.animations.play('left');
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = 150;
			this.player.animations.play('right');
		} else {
			this.player.animations.stop();
			this.player.frame = 4;
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -400;
		}

		if (this.mode === 'multiplayer') {
			if (this.player2.body.position.y >= this.game.world.height - this.player2.body.height) {
				this.die(this.player2);
			}

			if (this.player2.body.position.y <= 0) {
				this.die(this.player2);
			}

			this.game.physics.arcade.collide(this.player2, this.platforms);
			this.game.physics.arcade.overlap(this.player2, this.stars, this.collectStar, null, this);
			this.game.physics.arcade.overlap(this.player2, this.diamonds, this.collectDiamond, null, this);
			this.game.physics.arcade.overlap(this.player2, this.bombs, this.hitBomb, null, this);

			// Player 2 controls for keyboard
			this.player2.body.velocity.x = 0;

			if (this.wasd.left.isDown) {
				this.player2.body.velocity.x = -150;
				this.player2.animations.play('left');
			} else if (this.wasd.right.isDown) {
				this.player2.body.velocity.x = 150;
				this.player2.animations.play('right');
			} else {
				this.player2.animations.stop();
				this.player2.frame = 4;
			}

			if (this.wasd.up.isDown && this.player2.body.touching.down) {
				this.player2.body.velocity.y = -400;
			}


			// Start AirConsole stuff
			if (this.usingAirconsole === true) {
				if (player_control_map[0].move.left) {
						//  Move to the left
						this.player.body.velocity.x = -150;

						this.player.animations.play('left');
				} else if (player_control_map[0].move.right) {
					//  Move to the right
					this.player.body.velocity.x = 150;

					this.player.animations.play('right');
				} else {
					//  Stand still
					this.player.animations.stop();
					this.player.frame = 4;
				}

				if (player_control_map[0].move.jump && this.player.body.touching.down) {
					this.player.body.velocity.y = -350;
				}

				if (player_control_map[1].move.left) {
					this.player2.body.velocity.x = -150;
					this.player2.animations.play('left');
				} else if (player_control_map[1].move.right) {
					this.player2.body.velocity.x = 150;
					this.player2.animations.play('right');
				} else {
					this.player2.animations.stop();
					this.player2.frame = 4;
				}

				if (player_control_map[1].move.jump && this.player2.body.touching.down) {
					this.player2.body.velocity.y = -350;
				}
			}
		}

		if (this.stars.countLiving() === 0) {
			this.addStars();
		}
	},

	addPlatform: function() {
		let ledgeX = this.game.rnd.integerInRange(35,465);
		let ledgeY = this.game.rnd.integerInRange(600, 630);

		let ledge = this.platforms.create(ledgeX, ledgeY, 'platform');
		ledge.body.immovable = true;
		ledge.body.velocity.y = -40;
	},

	addStars: function() {
		this.stars = this.game.add.group();
		this.stars.enableBody = true;

		for (var i = 0; i < 5; i++) {
				var star = this.stars.create(this.game.rnd.integerInRange(40,760), this.game.rnd.integerInRange(0,400), 'star');

				star.body.gravity.y = this.game.rnd.integerInRange(40,200);
				star.body.bounce.y = 0.7 + Math.random() * 0.2;

				star.checkWorldBounds = true;
    		star.outOfBoundsKill = true;
		}
	},

	collectStar: function(player, star) {
			star.kill();

			if (player === this.player) {
				this.score += 5;
				this.scoreText.text = `${this.player1name}: ` + this.score;
			} else if (this.mode === 'multiplayer') {
				if (player === this.player2) {
					this.score2 += 5;
					this.scoreText2.text = `${this.player2name}: ` + this.score2;
				}
			}

			if (this.score >= 100) {
				this.game.state.start('win', true, false, { 'winner': `${this.player1name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}`, 'highScore': this.highScore });
			} else if (this.mode === 'multiplayer') {
				if (this.score2 >= 100) {
					this.game.state.start('win', true, false, { 'winner': `${this.player2name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}`, 'highScore': this.highScore });
				}
			}
	},

	addDiamond: function() {
		this.diamonds = this.game.add.group();
		this.diamonds.enableBody = true;

		var diamond = this.diamonds.create(this.game.rnd.integerInRange(40,760), this.game.rnd.integerInRange(0,400), 'diamond');

		diamond.body.gravity.y = 100;

		diamond.checkWorldBounds = true;
		diamond.outOfBoundsKill = true;
	},

	collectDiamond: function(player, diamond) {
		diamond.kill();

		if (player === this.player) {
			this.score += 10;
			this.scoreText.text = `${this.player1name}: ` + this.score;
		} else if (this.mode === 'multiplayer') {
			if (player === this.player2) {
				this.score2 += 10;
				this.scoreText2.text = `${this.player2name}: ` + this.score2;
			}
		}

		if (this.score >= 100) {
			this.game.state.start('win', true, false, { 'winner': `${this.player1name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}`, 'highScore': this.highScore });
		} else if (this.mode === 'multiplayer') {
			if (this.score2 >= 100) {
				this.game.state.start('win', true, false, { 'winner': `${this.player2name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}`, 'highScore': this.highScore });
			}
		}
	},

	addBomb: function() {
		this.bombs = this.game.add.group();
		this.bombs.enableBody = true;

		let randomNum = Math.random();

		if (randomNum > 0.5) {
			var bomb = this.bombs.create(0, 0, 'bomb');
			bomb.body.gravity.y = this.game.rnd.integerInRange(30,100);
			bomb.body.velocity.x = this.game.rnd.integerInRange(100,200);
		} else {
			var bomb = this.bombs.create(800, 0, 'bomb');
			bomb.body.gravity.y = this.game.rnd.integerInRange(30,100);
			bomb.body.velocity.x = this.game.rnd.integerInRange(-100,-200);
		}

		bomb.checkWorldBounds = true;
		bomb.outOfBoundsKill = true;
	},

	hitBomb: function(player, bomb) {
		bomb.kill();
		this.die(player);
	},

	die: function(player) {
		player.kill();

		// Leave this commented out until I figure out how to make it work all the time...
		// this.scream.play();
		if (player === this.player) {
			this.scoreText.text = `${this.player1name}: DEAD`;
		} else if (this.mode === 'multiplayer') {
			if (player === this.player2) {
				this.scoreText2.text = `${this.player2name}: DEAD`;
			}
		}

		if (this.mode === 'singleplayer' && !this.player.alive) {
			this.gameOver();
		} else if (this.mode === 'multiplayer' && !this.player.alive && !this.player2.alive) {
			this.gameOver();
		}
	},

	gameOver: function() {
		if (this.score > this.highScore) {
			this.highScore = this.score;
		}
		this.game.state.start('gameOver', true, false, { 'highScore': this.highScore });
	}
};
