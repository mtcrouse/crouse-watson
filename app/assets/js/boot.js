const bootState = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    if (airconsole0.getControllerDeviceIds() === []) {
      var usingAirconsole = true;
    } else {
      var usingAirconsole = false;
    }

    console.log(usingAirconsole);

    this.game.state.start('load');
  }
};
