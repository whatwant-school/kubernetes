const http = require('http');
const os = require('os');

console.log("node-web v2 server starting...");

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  response.writeHead(200);
  response.end("You've hit " + os.hostname() + " for v2\n");
};

var www = http.createServer(handler);
www.listen(8080);
