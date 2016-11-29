const menuState = {
  create: function() {
    this.game.stage.backgroundColor = '479cde';
    const name = game.add.text(80, 80, 'Platform Game',
                              { font: '50px Arial', fill: '#ffffff' });
    const chooseMode = game.add.text(80, game.world.height-80,
                                    'Press S to play single player or M to play multiplayer',
                                    { font: '25px Arial', fill: '#ffffff'});
    const sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.addOnce(this.start, this);
    airconsole0.onMessage = function(device_id, data) {
      if (data.start) {
        if (data.start.pressed) {
          player_control_map[0].move.start = data.start.pressed;
          game.state.start('main', true, false, { 'player1': 'Player 1', 'player2': 'Player 2', 'mode': 'multiplayer' });
        }
      }
  };

  },

  start: function() {
    game.state.start('directions', true, false, { 'mode': 'single' });
  },

  startMultiplayer: function() {
    game.state.start('directions', true, false, { 'mode': 'multi' });
  }
};
