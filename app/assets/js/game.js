const game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('directions', directionsState);
game.state.add('main', mainState);
game.state.add('gameOver', gameOver);
game.state.add('win', winState);

game.state.start('boot');
