var SerialPort = require('serialport');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// settings
var serverPort = 3000; // default to 3000
var serialPort = 'COM3';

// serial port
var port;
port = new SerialPort(serialPort);
// Exits process if connection to serial port failed.
port.on('error', function(err) {
  console.log('Serial Port Error: ', err.message);
  process.exit();
});

// Create new server port
http.listen((process.env.PORT || serverPort), function() {
  console.log('Listening on Port: ' + (process.env.PORT || serverPort));
});

// Set home page to blockly_en.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Import necessary static files from http
app.use(express.static('../../blockly'));
app.use(express.static(__dirname));

// Send appropriate commands to the robot using port.write
io.on('connection', function(socket) {

  socket.on('led', function(msg) {
    if( msg == 'on'){
      port.write(Buffer.from([0xFF, 0x26]));
    }else{
      port.write(Buffer.from([0xFF, 0x20]));
    }
    console.log('LED is ' + data); // debug purposes
  });

  socket.on('gpio', function(msg) {
    if(msg.type == 'write GPIO') {
      data = [0xFF, 0x41, parseInt(msg.command)];
      port.write(Buffer.from(data));
      console.log('GPIO is ' + data ); // debug purposes
    }
  });

  socket.on('motor', function(msg) {
    if( msg.num == '1'){
    }else if( msg.num == '2'){
    }else if( msg.num == '3'){
    }else if( msg.num == '4'){
    }else if( msg.num == '5'){
    }else if( msg.num == '6'){
    }else if( msg.num == '7'){
    }else if( msg.num == '8'){
    }else if( msg.num == '9'){
    }else if( msg.num == '10'){
    }else if( msg.num == '11'){
    }else if( msg.num == '12'){
    }else if( msg.num == '13'){
    }else if( msg.num == '14'){
    }else if( msg.num == '15'){
    }else if( msg.num == '16'){
    }else {
      console.log('motor is ERRORRRRRRRRRRR LOL'); // debug purposes
    }
    console.log('motor is ' + msg.num); // debug purposes
    console.log('degree is ' + msg.deg); // debug purposes
  });
});
