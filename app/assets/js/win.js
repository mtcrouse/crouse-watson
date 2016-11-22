const winState = {
  create: function() {
    this.game.add.sprite(0, 0, 'background');
    const name = game.add.text(80, 80, 'Congratulations, you won!',
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
