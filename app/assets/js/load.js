const loadState = {
  preload: function() {
    const loadingLabel = this.game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('platform', 'images/platform.png');
    this.game.load.image('star', 'images/star.png');
    this.game.load.image('diamond', 'images/diamond.png');
    this.game.load.image('bomb', 'images/bomb.png');
    this.game.load.spritesheet('player', 'images/player.png', 32, 32);
    this.game.load.spritesheet('player2', 'images/player2.png', 32, 32);
    this.game.load.audio('scream', 'sounds/wilhelm.mp3');
  },

  create: function() {
    this.game.state.start('menu');
  }
};
