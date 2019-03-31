var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');

var port = 8080;

server.listen(port, function () {
    console.log('server running at ' + port);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
    socket.on('login', function (id) {
        io.emit('enter', id);
    });
    socket.on('logout', function (id) {
        io.emit('exit', id);
    });
    socket.on('send msg', function (id, msg) {
        var text = id + ": " + msg + "\n";
        io.emit('receive msg', text);
    });
});
