const menuState = {
  create: function() {
    this.game.stage.backgroundColor = '479cde';
    const name = game.add.text(80, 80, 'Platform Game',
                              { font: '50px Arial', fill: '#ffffff' });
    const directions = game.add.text(80, 300, 'Use the arrow keys to navigate and the up arrow to jump',
                                    { font: '25px Arial', fill: '#ffffff'});
    const starDirections = game.add.text(80, 400, 'Collect the stars to get points, but don\'t hit the bottom or top of the screen!',
                                    { font: '20px Arial', fill: '#ffffff'});
    const startLabel = game.add.text(80, game.world.height-80,
                                    'Press W to start',
                                    { font: '25px Arial', fill: '#ffffff'});
    const wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('main', true, false, { 'player1': 'Metta', 'player2': 'Liz' });
  }
};
