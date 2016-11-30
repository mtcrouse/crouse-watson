const directionsState = {
  init: function(data) {
    this.mode = data.mode;
    this.usingAirconsole = data.usingAirconsole;
    this.highScore = data.highScore;
    console.log(`directions ${this.highScore}`);
  },

  create: function() {
    this.game.stage.backgroundColor = '479cde';

    if (this.mode === 'singleplayer') {
      var mode = 'Single Player';
    } else {
      var mode = 'Multiplayer';
    }

    const name = this.game.add.text(80, 100, `${mode} Directions:`,
                              { font: '50px Arial', fill: '#ffffff' });
    const directions = this.game.add.text(80, 200, 'Player 1: Use A and D to move left and right and W to jump',
                                    { font: '20px Arial', fill: '#ffffff'});
    if (mode === 'Multiplayer') {
      const directions2 = this.game.add.text(80, 250, 'Player 2: Use the arrow keys to navigate and the up arrow to jump',
                                      { font: '20px Arial', fill: '#ffffff'});
    }
    const starDirections = this.game.add.text(80, 300, 'Collect items to get points, but don\'t hit the bottom or top of the screen',
                                    { font: '20px Arial', fill: '#ffffff'});
    const points = this.game.add.text(80, 350,
                                    'Stars are worth 5 points and diamonds are worth 10 points',
                                    { font: '20px Arial', fill: '#ffffff'});
    const startDirections = this.game.add.text(80, 400,
                                    'Press W to start!',
                                    { font: '20px Arial', fill: '#ffffff'});
    const wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    this.game.state.start('main', true, false, { 'player1': 'Player 1', 'player2': 'Player 2', 'mode': this.mode, 'usingAirconsole': this.usingAirconsole, 'highScore': this.highScore });
  },
};
