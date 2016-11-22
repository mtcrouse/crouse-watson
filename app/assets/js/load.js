const loadState = {
  preload: function() {
    const loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
    game.load.image('background', 'images/background.png');
    game.load.image('ground', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('dude', 'images/dude.png', 32, 32);
  },

  create: function() {
    game.state.start('menu');
  }
};
