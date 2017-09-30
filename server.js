var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(8888, function() {
  console.log('listening on 8888');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(e) {
    console.log('a user disconnect');
  });
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  })
});
