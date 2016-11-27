const directionsState = {
  init: function(mode) {
    this.mode = mode.mode;
  },

  create: function() {
    this.game.stage.backgroundColor = '479cde';
    const name = game.add.text(80, 80, `${this.mode} Directions:`,
                              { font: '50px Arial', fill: '#ffffff' });
    const directions = game.add.text(80, 300, 'Use the arrow keys to navigate and the up arrow to jump',
                                    { font: '25px Arial', fill: '#ffffff'});
    const starDirections = game.add.text(80, 400, 'Collect items to get points, but don\'t hit the bottom or top of the screen',
                                    { font: '20px Arial', fill: '#ffffff'});
    const startLabel = game.add.text(80, 500,
                                    'Stars are worth 5 points and diamonds are worth 10 points',
                                    { font: '25px Arial', fill: '#ffffff'});
    const bombDirections = game.add.text(80, game.world.height-80,
                                    'Watch out for bombs! Press W to start!',
                                    { font: '25px Arial', fill: '#ffffff'});
    const wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    game.state.start('main', true, false, { 'player1': 'Player 1', 'player2': 'Player 2', 'mode': this.mode });
  },
};
