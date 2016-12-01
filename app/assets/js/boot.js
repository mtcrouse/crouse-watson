const bootState = {
  init: function(data) {
    try {
      this.highScore = data.highScore;
    } catch (err) {
      console.log(err);
      this.highScore = null;
    }
  },

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.state.start('load', true, false, { 'highScore': this.highScore, currentScores: [] });
  }
};
