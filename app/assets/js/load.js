const loadState = {
  init: function(data) {
    this.highScore = data.highScore;
    this.currentScores = data.currentScores;
  },

  preload: function() {
    const loadingLabel = this.game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
    this.game.load.image('background', 'images/background.png');
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('platform', 'images/platform.png');
    this.game.load.image('bomb', 'images/bomb.png');
    this.game.load.image('gold', 'images/gold.png');
    this.game.load.image('silver', 'images/silver.png');
    this.game.load.image('bronze', 'images/bronze.png');
    this.game.load.spritesheet('player', 'images/player.png', 32, 32);
    this.game.load.spritesheet('player2', 'images/player2.png', 32, 32);
    this.game.load.audio('scream', 'sounds/wilhelm.mp3');
    this.game.load.audio('goldsound', 'sounds/goldsound.mp3');
    this.game.load.audio('bombsound', 'sounds/bombsound.mp3');
    this.game.load.audio('silversound', 'sounds/silversound.mp3');
    this.game.load.audio('chopin', 'sounds/chopin.mp3');
  },

  create: function() {
    // this.chopin = this.game.add.audio('chopin');
    // this.chopin.loop = true;
    // this.chopin.play();

    this.game.state.start('menu', true, false, { 'highScore': this.highScore, 'currentScores': this.currentScores });
  }
};
