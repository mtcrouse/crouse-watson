const gameOver = {
  create: function() {
    const gameOverText = game.add.text(80, 80, 'GAME OVER',
                              { font: '50px Arial', fill: '#ffffff' });
    const startLabel = game.add.text(80, game.world.height-80,
                                    'Press W to play again!',
                                    { font: '25px Arial', fill: '#ffffff'});
    const wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('main');
  }
};
