const gameOver = {
  create: function() {
    const gameOverText = game.add.text(80, 80, 'GAME OVER',
                              { font: '50px Arial', fill: '#ffffff' });
    const startLabel = game.add.text(80, game.world.height-80,
                                    'Press C to return to the main menu!',
                                    { font: '25px Arial', fill: '#ffffff'});
    const cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    cKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('boot', true, true);
  }
};
