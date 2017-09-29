var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

var echo = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'});
echo.on('connection', function(conn) {
  conn.on('data', function(message) {
    conn.write(message);
  });
  conn.on('close', function() {});
});
console.log(__dirname)
var static_directory = new node_static.Server(__dirname);

var server = http.createServer();
server.addListener('request', function(req, res) {
  console.log('requesting');
  static_directory.serve(req, res);
});
server.addListener('upgrade', function(req, res) {
  console.log('upgrade');
  res.end();
})
echo.installHandlers(server, {prefix: '/my-server'});
server.listen(9999);

console.log('Listening on 9999');
