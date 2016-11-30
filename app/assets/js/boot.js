const bootState = {
  init: function(data) {
    this.highScore = data.highScore;
  },

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('load', true, false, { 'highScore': this.highScore, currentScores: [] });
  }
};
