var SerialPort = require('serialport');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// settings
var serverPort = 3000; // default to 3000
var serialPort = 'COM3';

// serial port
var port;
port = new SerialPort(serialPort);
port.on('error', function(err) {
  console.log('Serial Port Error: ', err.message);
  process.exit();
});

http.listen((process.env.PORT || serverPort), function() {
  console.log('Listening on Port: ' + (process.env.PORT || serverPort));
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/blockly_en.html');
});
app.get('/blockly_zh.html', function(req, res) {
  res.sendFile(__dirname + '/blockly_zh.html');
});
app.get('/blockly_en.html', function(req, res) {
  res.sendFile(__dirname + '/blockly_en.html');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});
app.get('../blockly_compressed.js', function(req, res) {
  res.sendFile(__dirname + '../blockly_compressed.js');
});
app.get('../blocks_compressed.js', function(req, res) {
  res.sendFile(__dirname + '../blocks_compressed.js');
});
app.get('../msg/js/en.js', function(req, res) {
  res.sendFile(__dirname + '../msg/js/en.js');
});
app.get('../javascript_compressed.js', function(req, res) {
  res.sendFile(__dirname + '../javascript_compressed.js');
});
app.get('../python_compressed.js', function(req, res) {
  res.sendFile(__dirname + '../python_compressed.js');
});
app.get('../demos/prettify.js', function(req, res) {
  res.sendFile(__dirname + '../demos/prettify.js');
});
app.get('../demos/interpreter/acorn_interpreter.js', function(req, res) {
  res.sendFile(__dirname + '../demos/interpreter/acorn_interpreter.js');
});
app.get('../common.js', function(req, res) {
  res.sendFile(__dirname + '../common.js');
});
app.get('../demos/prettify.css', function(req, res) {
  res.sendFile(__dirname + '../demos/prettify.css');
});

io.on('connection', function(socket) {
  socket.on('led', function(msg) {
    if( msg == 'on'){
      port.write(Buffer.from([0xFF, 0x26]));
    }else{
      port.write(Buffer.from([0xFF, 0x20]));
    }
  });
});
