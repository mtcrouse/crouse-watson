const directionsState = {
  init: function(data) {
    this.mode = data.mode;
    this.usingAirconsole = data.usingAirconsole;
    this.highScore = data.highScore;
    this.currentScores = data.currentScores;
  },

  create: function() {
    this.game.add.sprite(0, 0, 'background');

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
    const coinDirections = this.game.add.text(80, 300, 'Collect the coins!',
                                    { font: '20px Arial', fill: '#ffffff'});
    let gold = this.game.add.sprite(250, 300, 'gold');
    gold.scale.setTo(.04, .04);

    const goldDirections = this.game.add.text(280, 300, '= 5 points',
                                    { font: '20px Arial', fill: '#ffffff'});

    let silver = this.game.add.sprite(400, 300, 'silver');
    silver.scale.setTo(.04, .04);

    const silverDirections = this.game.add.text(430, 300, '= 10 points',
                                    { font: '20px Arial', fill: '#ffffff'});

    let bronze = this.game.add.sprite(550, 300, 'bronze');
    bronze.scale.setTo(.04, .04);

    const bronzeDirections = this.game.add.text(580, 300, '= 20 points',
                                    { font: '20px Arial', fill: '#ffffff'});

    const bombs = this.game.add.text(80, 350,
                                    'Avoid the bottom and top of the map, and don\'t hit the bombs!',
                                    { font: '20px Arial', fill: '#ffffff'});
    const startDirections = this.game.add.text(80, 400,
                                    'Press W to start!',
                                    { font: '20px Arial', fill: '#ffffff'});
    const wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    this.game.state.start('main', true, false, { 'player1': 'Player 1', 'player2': 'Player 2', 'mode': this.mode, 'usingAirconsole': this.usingAirconsole, 'highScore': this.highScore, 'currentScores': this.currentScores });
  },
};
