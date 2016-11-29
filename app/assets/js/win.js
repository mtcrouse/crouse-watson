const winState = {
  init: function(playerNames) {
    this.winnerName = playerNames.winner;
    this.player1name = playerNames.player1;
    this.player2name = playerNames.player2;
  },

  create: function() {
    this.game.add.sprite(0, 0, 'background');
    const name = this.game.add.text(80, 80, `${this.winnerName} is the winner!`,
                              { font: '50px Arial', fill: '#ffffff' });
    const startLabel = this.game.add.text(80, this.game.world.height-80,
                                    'Press C to return to the main menu!',
                                    { font: '25px Arial', fill: '#ffffff'});
    const cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    cKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    this.game.state.start('boot', true, true);
  }
};
