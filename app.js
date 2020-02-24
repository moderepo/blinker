var ModeDevice = require('mode-device');
var gpio = require('onoff').Gpio;
var led = new gpio(4, 'out');

//
// Device information settings.
// You have to change these params according to your device register information.
//

var DEVICE_ID = 1;
var API_KEY = 'v1.cccc.bbbbbbbbbbbbbbbbbb.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

//
// Output debug message
//
ModeDevice.debug = true;

var device = new ModeDevice(DEVICE_ID, API_KEY);

//
// Send first event to Mode cloud.
//
device.triggerEvent('first_event', {'eventItem': 1});

device.commandCallback = function(msg, flags) {
  if (msg['action'] == 'light') {
    var v = msg['parameters']['switch'] ? 1 : 0;
    led.writeSync(v);
  }
}

device.listenCommands();

