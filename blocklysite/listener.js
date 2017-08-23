var http = require('http');
var qs = require('querystring');
var SerialPort = require('serialport');

var serverPort = 3000;  // default port
var serialPort = 'COM3';


var port;
port = new SerialPort(serialPort);
port.on('error', function(err) {
  console.log('Serial Port Error: ', err.message);
  process.exit();
});

http.createServer((request, response) => {
  var data = '';
  rsp = response; // set global rsp to response

  // get all data from request
  request.on('data', function (chunk) {
      data += chunk;
  });

  // parse data and write to serial port
  request.on('end',function() {
    var post = qs.parse(data);
    var cmd = [];
    if(post.command == 'on'){
      cmd = [0xFF, 0x26];
    } else {
      cmd = [0xFF, 0x20];
    }
    port.write(Buffer.from(cmd));
    console.log(post.command);

  });

}).listen(serverPort, function() {
  console.log('Listening on Port: ' + serverPort);
});
