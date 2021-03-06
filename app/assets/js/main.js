const mainState = {
	init(data) {
		this.player1name = data.player1;
		this.player2name = data.player2;
		this.mode = data.mode;
		this.usingAirconsole = data.usingAirconsole;
		this.highScore = data.highScore;
		this.currentScores = data.currentScores;
	},

	create() {
		this.score = 0;
		this.score2 = 0;
		this.difficulty = 1;

		this.game.add.sprite(0, 0, 'background');

		this.scream = this.game.add.audio('scream');
		this.goldSound = this.game.add.audio('goldsound');
		this.bombSound = this.game.add.audio('bombsound');
		this.silverSound = this.game.add.audio('silversound');
		this.bronzeSound = this.game.add.audio('bronzesound');

		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;

		this.bronze = this.game.add.group();
		this.bronze.enableBody = true;

		const startingPlatform = this.platforms.create(0, 300, 'platform');

		startingPlatform.body.immovable = true;
		startingPlatform.body.velocity.x = -30;

		this.game.time.events.loop(4000, this.addPlatform, this);
		this.game.time.events.loop(30000, this.upDifficulty, this);

		this.player = this.game.add.sprite(40, 250, 'player');

		this.game.physics.arcade.enable(this.player);

		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 375;
		this.player.body.collideWorldBounds = true;

		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);

		this.scoreText = this.game.add.text(16, 16, `${this.player1name}: 0`, { fontSize: '20px', fill: '#fff' });

		// Set up player 1 controls for keyboard
		this.wasd = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
		};

		if (this.mode === 'multiplayer') {
			const startingPlatform2 = this.platforms.create(500, 300, 'platform');

			startingPlatform2.body.immovable = true;
			startingPlatform2.body.velocity.x = 30;

			this.player2 = this.game.add.sprite(600, 250, 'player2');

			this.game.physics.arcade.enable(this.player2);

			this.player2.body.bounce.y = 0.2;
			this.player2.body.gravity.y = 375;
			this.player2.body.collideWorldBounds = true;

			this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
			this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

			this.scoreText2 = this.game.add.text(16, 40, `${this.player2name}: 0`, { fontSize: '20px', fill: '#fff' });

			this.cursors = this.game.input.keyboard.createCursorKeys();
		}

		this.addGold();
		this.game.time.events.loop(12000, this.addSilver, this);
		this.game.time.events.loop(10000, this.addBomb, this);

		if (this.mode === 'singleplayer' && this.highScore !== undefined) {
			this.highScoreText = this.game.add.text(600, 16, `High Score: ${this.highScore}`, { fontSize: '20px', fill: '#fff' });
		}
		this.difficultyText = this.game.add.text(655, 555, `Difficulty: ${this.difficulty}`, { fontSize: '20px', fill: '#fff' });

	},

	update() {
		// Kill player when touching the bottom
		if (this.player.body.position.y >= this.game.world.height - this.player.body.height) {
			this.die(this.player);
		}

		// Kill player when touching the top
		if (this.player.body.position.y <= 0) {
			this.die(this.player);
		}

		this.game.physics.arcade.collide(this.gold, this.platforms);
		this.game.physics.arcade.collide(this.player, this.platforms);
		this.game.physics.arcade.collide(this.player, this.bronze, this.collectBronze, null, this);
		this.game.physics.arcade.overlap(this.player, this.gold, this.collectGold, null, this);
		this.game.physics.arcade.overlap(this.player, this.silver, this.collectSilver, null, this);
		this.game.physics.arcade.overlap(this.player, this.bombs, this.hitBomb, null, this);

		//  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if (this.wasd.left.isDown) {
			this.player.body.velocity.x = -150;
			this.player.animations.play('left');
		} else if (this.wasd.right.isDown) {
			this.player.body.velocity.x = 150;
			this.player.animations.play('right');
		} else {
			this.player.animations.stop();
			this.player.frame = 4;
		}

		if (this.wasd.up.isDown && this.player.body.touching.down) {
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
			this.game.physics.arcade.overlap(this.player2, this.gold, this.collectGold, null, this);
			this.game.physics.arcade.overlap(this.player2, this.silver, this.collectSilver, null, this);
			this.game.physics.arcade.overlap(this.player2, this.bombs, this.hitBomb, null, this);

			// Player 2 controls for keyboard
			this.player2.body.velocity.x = 0;

			if (this.cursors.left.isDown) {
				this.player2.body.velocity.x = -150;
				this.player2.animations.play('left');
			} else if (this.cursors.right.isDown) {
				this.player2.body.velocity.x = 150;
				this.player2.animations.play('right');
			} else {
				this.player2.animations.stop();
				this.player2.frame = 4;
			}

			if (this.cursors.up.isDown && this.player2.body.touching.down) {
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

		if (this.gold.countLiving() === 0) {
			this.addGold();
		}
	},

	addPlatform() {
		const ledgeX = this.game.rnd.integerInRange(35, 465);
		const ledgeY = this.game.rnd.integerInRange(600, 630);

		const ledge = this.platforms.create(ledgeX, ledgeY, 'platform');
		ledge.body.immovable = true;

		ledge.body.velocity.y = -40 - (this.difficulty * 3);
	},

	addGold() {
		this.gold = this.game.add.group();
		this.gold.enableBody = true;

		for (let i = 0; i < 5; i++) {
			const gold = this.gold.create(this.game.rnd.integerInRange(40, 760), this.game.rnd.integerInRange(0, 400), 'gold');
			gold.scale.setTo(0.04, 0.04);

			gold.body.gravity.y = this.game.rnd.integerInRange(40, 200);
			gold.body.bounce.y = 0.7 + Math.random() * 0.2;

			gold.checkWorldBounds = true;
			gold.outOfBoundsKill = true;
		}
	},

	collectGold(player, gold) {
		gold.kill();
		this.goldSound.play();

		if (player === this.player) {
			this.score += 5;
			this.scoreText.text = `${this.player1name}: ${this.score}`;
		} else if (this.mode === 'multiplayer') {
			if (player === this.player2) {
				this.score2 += 5;
				this.scoreText2.text = `${this.player2name}: ${this.score2}`;
			}
		}

		if (this.mode === 'multiplayer') {
			this.checkForWin();
		}
	},

	addSilver() {
		this.silver = this.game.add.group();
		this.silver.enableBody = true;

		const silver = this.silver.create(this.game.rnd.integerInRange(40, 760), this.game.rnd.integerInRange(0, 400), 'silver');

		silver.scale.setTo(0.04, 0.04);

		silver.body.gravity.y = 100;

		silver.checkWorldBounds = true;
		silver.outOfBoundsKill = true;
	},

	collectSilver(player, silver) {
		silver.kill();
		this.silverSound.play();

		if (player === this.player) {
			this.score += 10;
			this.scoreText.text = `${this.player1name}: ` + this.score;
		} else if (this.mode === 'multiplayer') {
			if (player === this.player2) {
				this.score2 += 10;
				this.scoreText2.text = `${this.player2name}: ` + this.score2;
			}
		}

		if (this.mode === 'multiplayer') {
			this.checkForWin();
		}
	},

	addBronze(x, y, side) {
		var bronze = this.bronze.create(x, y, 'bronze');
		bronze.scale.setTo(0.04, 0.04);

		bronze.body.gravity.y = this.game.rnd.integerInRange(30, 100);

		if (side === 'left') {
			bronze.body.velocity.x = this.game.rnd.integerInRange(100, 200);
		} else if (side === 'right') {
			bronze.body.velocity.x = this.game.rnd.integerInRange(-100, -200);
		}

		bronze.checkWorldBounds = true;
		bronze.outOfBoundsKill = true;
	},

	collectBronze(player, bronze) {
		bronze.kill();
		this.bronzeSound.play();

		if (player === this.player) {
			this.score += 20;
			this.scoreText.text = `${this.player1name}: ${this.score}`;
		} else if (this.mode === 'multiplayer') {
			if (player === this.player2) {
				this.score2 += 20;
				this.scoreText2.text = `${this.player2name}: ${this.score2}`;
			}
		}

		if (this.mode === 'multiplayer') {
			this.checkForWin();
		}
	},

	addBomb() {
		this.bombs = this.game.add.group();
		this.bombs.enableBody = true;

		const randomNum = Math.random();
		let bomb;

		for (let difficulty = this.difficulty; difficulty > 0; difficulty -= 1) {
			if (randomNum > 0.5) {
				bomb = this.bombs.create(0, 0, 'bomb');

				bomb.body.gravity.y = this.game.rnd.integerInRange(30, 100);
				bomb.body.velocity.x = this.game.rnd.integerInRange(100, 200);
				if (randomNum > 0.9) {
					this.addBronze(0, 0, 'left');
				}
			} else {
				bomb = this.bombs.create(800, 0, 'bomb');

				bomb.body.gravity.y = this.game.rnd.integerInRange(30, 100);
				bomb.body.velocity.x = this.game.rnd.integerInRange(-100, -200);
				if (randomNum < 0.1) {
					this.addBronze(800, 0, 'right');
				}
			}
		}

		bomb.checkWorldBounds = true;
		bomb.outOfBoundsKill = true;
	},

	hitBomb(player, bomb) {
		bomb.kill();
		this.bombSound.play();
		this.die(player);
	},

	upDifficulty() {
		this.difficulty += 1;
		this.difficultyText.destroy();
		this.difficultyText = this.game.add.text(655, 555, `Difficulty: ${this.difficulty}`, { fontSize: '20px', fill: '#fff' });
	},

	checkForWin() {
		if (this.score >= 100) {
			this.game.state.start('win', true, false, { winner: `${this.player1name}`, player1: `${this.player1name}`, player2: `${this.player2name}`, highScore: this.highScore });
		} else if (this.score2 >= 100) {
			this.game.state.start('win', true, false, { winner: `${this.player2name}`, player1: `${this.player1name}`, player2: `${this.player2name}`, highScore: this.highScore });
		}
	},

	die(player) {
		player.kill();
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

	gameOver() {
		if (this.score > this.highScore) {
			this.highScore = this.score;
		}
		if (this.mode === 'singleplayer') {
			this.currentScores.push(this.score);
		}
		this.game.state.start('gameOver', true, false, { highScore: this.highScore, currentScores: this.currentScores });
	}
};
