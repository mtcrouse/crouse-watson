const mainState = {
	create: function() {
			this.score = 0;

			this.game.add.sprite(0, 0, 'background');

			this.game.stage.backgroundColor = '479cde';

			this.platforms = game.add.group();
			this.platforms.enableBody = true;

			this.ground = this.platforms.create(0, game.world.height - 64, 'ground');

			//  Scale the ground to fit the width of the game (the original sprite is 400x32 in size)
			this.ground.scale.setTo(2, 2);
			this.ground.body.immovable = true;
			this.ground.body.velocity.y = 10;

			game.time.events.loop(4000, this.addPlatform, this);

			this.player = game.add.sprite(32, game.world.height - 150, 'player');

			game.physics.arcade.enable(this.player);

			this.player.body.bounce.y = 0.2;
			this.player.body.gravity.y = 400;
			this.player.body.collideWorldBounds = true;

			this.player.animations.add('left', [0, 1, 2, 3], 10, true);
			this.player.animations.add('right', [5, 6, 7, 8], 10, true);

			this.addStars();

			this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
			this.levelText = game.add.text(650, 16, 'Level 1', { fontSize: '32px', fill: '#fff' });

			this.cursors = game.input.keyboard.createCursorKeys();
	},

	update: function() {
			// End game if player hits the bottom
			if (this.player.body.position.y >= game.world.height - this.player.body.height) {
				this.gameOver();
			}

			// End game if player hits the top
			if (this.player.body.position.y <= 0) {
				this.gameOver();
			}

			//  Collide the player with the platforms
			game.physics.arcade.collide(this.player, this.platforms);
			game.physics.arcade.collide(this.stars, this.platforms);

			//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
			game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

			//  Reset the players velocity (movement)
			this.player.body.velocity.x = 0;

			if (this.cursors.left.isDown)
			{
					//  Move to the left
					this.player.body.velocity.x = -150;

					this.player.animations.play('left');
			}
			else if (this.cursors.right.isDown)
			{
					//  Move to the right
					this.player.body.velocity.x = 150;

					this.player.animations.play('right');
			}
			else
			{
					//  Stand still
					this.player.animations.stop();

					this.player.frame = 4;
			}

			//  Allow the player to jump if they are touching the ground.
			if (this.cursors.up.isDown && this.player.body.touching.down)
			{
					this.player.body.velocity.y = -350;
			}

			if (this.stars.countLiving() === 0) {
				this.addStars();
			}
	},

	addPlatform: function() {
		let ledgeX = game.rnd.integerInRange(0,600);
		let ledgeY = game.rnd.integerInRange(600,650);

		let ledge = this.platforms.create(ledgeX, ledgeY, 'ground');
		ledge.body.immovable = true;
		ledge.body.velocity.y = -40;
	},

	addStars: function() {
		this.stars = game.add.group();
		this.stars.enableBody = true;

		for (var i = 0; i < 10; i++)
		{
				var star = this.stars.create(game.rnd.integerInRange(10,800), game.rnd.integerInRange(0,500), 'star');

				star.body.gravity.y = game.rnd.integerInRange(40,200);
				star.body.bounce.y = 0.7 + Math.random() * 0.2;

				star.checkWorldBounds = true;
    		star.outOfBoundsKill = true;
		}
	},

	collectStar: function(player, star) {
			star.kill();

			this.score += 10;
			this.scoreText.text = 'Score: ' + this.score;

			if (this.score === 200) {
				game.state.start('win');
			}
	},

	gameOver: function() {
		game.state.start('gameOver');
	}
}
