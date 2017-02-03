let airconsole0;
let airconsole1;
let airconsole2;
let airPlayer1;
let airPlayer2;
let player_control_map;
let start;

airconsole0 = new AirConsole();
airconsole1 = new AirConsole();
airconsole2 = new AirConsole();

function checkTwoPlayers() {
  let active_players = airconsole0.getActivePlayerDeviceIds();
  let connected_controllers = airconsole0.getControllerDeviceIds();
  // Only update if the game didn't have active players.
  if (active_players.length == 0) {
    if (connected_controllers.length >= 2) {
      // Enough controller devices connected to start the game.
      // Setting the first 2 controllers to active players.
      airconsole0.setActivePlayers(2);
      airPlayer1 = airconsole0.convertDeviceIdToPlayerNumber(connected_controllers[0]);
      airPlayer2 = airconsole0.convertDeviceIdToPlayerNumber(connected_controllers[1]);
      player_control_map[0].player = airPlayer1;
      player_control_map[1].player = airPlayer2;
  }
  }
}

airconsole0.onConnect = function(device_id) {
				checkTwoPlayers();
			};

airconsole0.onDisconnect = function(device_id) {
  var player = airconsole0.convertDeviceIdToPlayerNumber(device_id);
    if (player != undefined) {
      	// Player that was in game left the game.
      	// Setting active players to length 0.
      	airconsole0.setActivePlayers(0);
    }
  checkTwoPlayers();
}



airPlayer1Move = {
	left: false,
	right: false,
	jump: false,
  start:false
};
airPlayer2Move = {
  left: false,
  right: false,
  jump: false,
  start:false
};
player_control_map = [];
player_control_map.push({move: airPlayer1Move},{move: airPlayer2Move });

// onMessage is called everytime a device sends a message with the .message() method
airconsole1.onMessage = function(device_id, data) {
  let player = player_control_map[airconsole1.convertDeviceIdToPlayerNumber(device_id)];
	if (player.player === player_control_map[0].player) {
		if (data.jump) {
			if (data.jump.pressed) {
				player_control_map[0].move.jump = data.jump.pressed;
			} else {
				player_control_map[0].move.jump = data.jump.pressed;
			}
		} else if (data['joystick-left']) {
			if (data['joystick-left'].message.x < 0) {
				player_control_map[0].move.left = true;
			} else {
				player_control_map[0].move.left = false;
			}
			if(data['joystick-left'].message.x > 0) {
				player_control_map[0].move.right = true;
			} else {
				player_control_map[0].move.right = false;
			}
		} else {	}
  } else if (player.player === player_control_map[1].player) {
		if(data.jump){
			if (data.jump.pressed) {
				player_control_map[1].move.jump = data.jump.pressed;
			} else {
				player_control_map[1].move.jump = data.jump.pressed;
			}
		} else if (data['joystick-left']) {
			if (data['joystick-left'].message.x < 0) {
				player_control_map[1].move.left = true;
      } else {
				player_control_map[1].move.left = false;
      }
      if (data['joystick-left'].message.x > 0) {
				player_control_map[1].move.right = true;
			} else {
				player_control_map[1].move.right = false;
			}
    }
	}
};
