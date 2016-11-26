const loadState = {
  preload: function() {
    const loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
    game.load.image('background', 'images/background.png');
    game.load.image('ground', 'images/ground.png');
    game.load.image('platform', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.image('diamond', 'images/diamond.png');
    game.load.image('bomb', 'images/bomb.png');
    game.load.spritesheet('player', 'images/player.png', 32, 32);
    game.load.spritesheet('player2', 'images/player2.png', 32, 32);
    game.load.audio('scream', 'sounds/wilhelm.mp3');
  },

  create: function() {
    game.state.start('menu');
  }
};
