const menuState = {
  create: function() {
    this.game.stage.backgroundColor = '479cde';
    const name = this.game.add.text(80, 80, 'Platform Game',
                              { font: '50px Arial', fill: '#ffffff' });
    const chooseMode = this.game.add.text(80, this.game.world.height-80,
                                    'Press S to play single player or M to play multiplayer',
                                    { font: '25px Arial', fill: '#ffffff'});

    const sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.addOnce(this.start, this);

    const mKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    mKey.onDown.addOnce(this.startMultiplayer, this);

    // AirConsole

    try {
      airconsole0.onMessage = function(device_id, data) {
        if (data.start) {
          if (data.start.pressed) {
            player_control_map[0].move.start = data.start.pressed;
            game.state.start('main', true, false, { 'player1': 'Player 1', 'player2': 'Player 2', 'mode': 'multiplayer', 'usingAirconsole': true });
          }
        }
      }
    } catch (error) {
      console.log('no airconsole');
    }
  },

  start: function() {
    this.game.state.start('directions', true, false, { 'mode': 'singleplayer', 'usingAirconsole': false });
  },

  startMultiplayer: function() {
    this.game.state.start('directions', true, false, { 'mode': 'multiplayer', 'usingAirconsole': false });
  }
};
