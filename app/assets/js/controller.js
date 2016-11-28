// Decide if we are on a touch device or using the mouse (e.g. in the AirConsole simulator)
var event_down = isMobile() ? 'touchstart' : 'mousedown';
var event_up = isMobile() ? 'touchend' : 'mouseup';

// Reference to our two buttons in the controller
var joy = $('#left');
var right = $('#middle');
var jump  = $('#right');

// =======================================
// Create the AirConsole instance
// =======================================
var airconsole = new AirConsole({
  orientation: AirConsole.ORIENTATION_LANDSCAPE
});

// airconsole.onReady = function() {};

// airconsole.onMessage = function(device_id, data) {
//
//   if (data.action === 'SET_ROLE') {
//     var txt = "You are the " + data.role;
//     if (data.role === "SHOOTER") {
//       txt += "<br>Press BOTH buttons to shoot";
//     } else {
//       txt += "<br>Press BOTH buttons to toggle velocity";
//     }
//     jump.html(txt);
//   }
//
// };

// =======================================
// Bind touch events
// =======================================
// jump.on(event_down, function() {
//   // Send the AirConsole Screen that we PRESSED the left button
//   console.log(jump);
//
//   airconsole.message(AirConsole.SCREEN, {
//     action: 'jump'
//   });
// });
//
// jump.on(event_up, function() {
//   // Send the AirConsole Screen that we RELEASED the left button
//   airconsole.message(AirConsole.SCREEN, {
//     action: 'jump'
//   });
// });
// joy.on(event_down, function() {
//   console.log(joy);
//   // console.log(joy);
//   // console.log(event_down);
//   // Send the AirConsole Screen that we PRESSED the left button
//   airconsole.message(AirConsole.SCREEN, {
//     action: 'joy',
//     pressed: true,
//     message:{}
//   });
// });
//
// joy.on(event_up, function() {
//   // Send the AirConsole Screen that we RELEASED the left button
//   airconsole.message(AirConsole.SCREEN, {
//     action: 'joy',
//     pressed: false,
//     message:{}
//   });
// });

// right.on(event_down, function() {
//   airconsole.message(AirConsole.SCREEN, {
//     action: 'right',
//     pressed: true
//   });
// });
//
// right.on(event_up, function() {
//   airconsole.message(AirConsole.SCREEN, {
//     action: 'right',
//     pressed: false
//   });
// });
