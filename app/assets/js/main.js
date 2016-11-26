const mainState = {
	init: function(playerNames) {
		this.player1name = playerNames.player1;
		this.player2name = playerNames.player2;
	},

	create: function() {
		this.score = 0;
		this.score2 = 0;

		this.game.add.sprite(0, 0, 'background');

		this.scream = game.add.audio('scream');

		this.platforms = game.add.group();
		this.platforms.enableBody = true;

		this.ground = this.platforms.create(0, game.world.height - 64, 'ground');

		this.ground.scale.setTo(2, 2);
		this.ground.body.immovable = true;
		this.ground.body.velocity.y = 5;

		game.time.events.loop(4000, this.addPlatform, this);

		this.player = game.add.sprite(700, game.world.height - 150, 'player');

		game.physics.arcade.enable(this.player);

		this.player.body.bounce.y = 0.2;
		this.player.body.gravity.y = 375;
		this.player.body.collideWorldBounds = true;

		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);

		this.player2 = game.add.sprite(32, game.world.height - 150, 'player2');

		game.physics.arcade.enable(this.player2);

		this.player2.body.bounce.y = 0.2;
		this.player2.body.gravity.y = 375;
		this.player2.body.collideWorldBounds = true;

		this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

		this.addStars();
		game.time.events.loop(10000, this.addDiamond, this);
		game.time.events.loop(5000, this.addBomb, this);

		this.scoreText = game.add.text(16, 16, `${this.player1name}: 0`, { fontSize: '20px', fill: '#fff' });
		this.scoreText2 = game.add.text(16, 40, `${this.player2name}: 0`, { fontSize: '20px', fill: '#fff' });
		this.levelText = game.add.text(650, 16, 'Level 1', { fontSize: '20px', fill: '#fff' });

		this.cursors = game.input.keyboard.createCursorKeys();

		this.wasd = {
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		};
	},

	update: function() {
		// Kill player when touching the bottom
		if (this.player.body.position.y >= game.world.height - this.player.body.height) {
			this.die(this.player);
		}

		// Kill player when touching the top
		if (this.player.body.position.y <= 0) {
			this.die(this.player);
		}

		if (this.player2.body.position.y >= game.world.height - this.player2.body.height) {
			this.die(this.player2);
		}

		if (this.player2.body.position.y <= 0) {
			this.die(this.player2);
		}

		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.stars, this.platforms);
		game.physics.arcade.collide(this.player2, this.platforms);

		game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
		game.physics.arcade.overlap(this.player2, this.stars, this.collectStar, null, this);

		game.physics.arcade.overlap(this.player, this.diamonds, this.collectDiamond, null, this);
		game.physics.arcade.overlap(this.player2, this.diamonds, this.collectDiamond, null, this);

		game.physics.arcade.overlap(this.player, this.bombs, this.hitBomb, null, this);
		game.physics.arcade.overlap(this.player2, this.bombs, this.hitBomb, null, this);

		//  Reset the players velocity (movement)
		this.player.body.velocity.x = 0;

		if (this.cursors.left.isDown) {
				//  Move to the left
				this.player.body.velocity.x = -150;

				this.player.animations.play('left');
		} else if (this.cursors.right.isDown) {
			//  Move to the right
			this.player.body.velocity.x = 150;

			this.player.animations.play('right');
		} else {
			//  Stand still
			this.player.animations.stop();
			this.player.frame = 4;
		}

		//  Allow the player to jump if they are touching the ground.
		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -400;
		}

		// Player 2 controls
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

		if (this.stars.countLiving() === 0) {
			this.addStars();
		}
	},

	addPlatform: function() {
		let ledgeX = game.rnd.integerInRange(35,465);
		let ledgeY = game.rnd.integerInRange(600, 630);

		let ledge = this.platforms.create(ledgeX, ledgeY, 'platform');
		ledge.body.immovable = true;
		ledge.body.velocity.y = -40;
	},

	addStars: function() {
		this.stars = game.add.group();
		this.stars.enableBody = true;

		for (var i = 0; i < 5; i++) {
				var star = this.stars.create(game.rnd.integerInRange(40,760), game.rnd.integerInRange(0,400), 'star');

				star.body.gravity.y = game.rnd.integerInRange(40,200);
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
			} else if (player === this.player2) {
				this.score2 += 5;
				this.scoreText2.text = `${this.player2name}: ` + this.score2;
			}

			if (this.score >= 100) {
				game.state.start('win', true, false, { 'winner': `${this.player1name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}` });
			} else if (this.score2 >= 100) {
				game.state.start('win', true, false, { 'winner': `${this.player2name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}` });
			}
	},

	addDiamond: function() {
		this.diamonds = game.add.group();
		this.diamonds.enableBody = true;

		var diamond = this.diamonds.create(game.rnd.integerInRange(40,760), game.rnd.integerInRange(0,400), 'diamond');

		diamond.body.gravity.y = 100;

		diamond.checkWorldBounds = true;
		diamond.outOfBoundsKill = true;
	},

	collectDiamond: function(player, diamond) {
		diamond.kill();

		if (player === this.player) {
			this.score += 10;
			this.scoreText.text = `${this.player1name}: ` + this.score;
		} else if (player === this.player2) {
			this.score2 += 10;
			this.scoreText2.text = `${this.player2name}: ` + this.score2;
		}

		if (this.score >= 100) {
			game.state.start('win', true, false, { 'winner': `${this.player1name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}` });
		} else if (this.score2 >= 100) {
			game.state.start('win', true, false, { 'winner': `${this.player2name}`, 'player1': `${this.player1name}`, 'player2': `${this.player2name}` });
		}
	},

	addBomb: function() {
		this.bombs = game.add.group();
		this.bombs.enableBody = true;

		var bomb = this.bombs.create(game.rnd.integerInRange(40,760), game.rnd.integerInRange(0,400), 'bomb');

		bomb.body.gravity.y = 100;

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
		} else if (player === this.player2) {
			this.scoreText2.text = `${this.player2name}: DEAD`;
		}

		if (!this.player.alive && !this.player2.alive) {
			this.gameOver();
		};
	},

	gameOver: function() {
		game.state.start('gameOver');
	}
}
