var app = require('http').createServer(handler);
var path = require('path');
var url = require('url');
var fs = require('fs');

var io = require('socket.io')(app);

var port = 8080;

app.listen(port, function (req, res) {
    console.log('server running at ' + port);
});

function handler (req, res) {

    var pathname = url.parse(req.url).pathname;

    if (pathname === "/")
        pathname = "/index.html";

    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});

            // 파일을 읽어와서 responseBody 에 작성
            res.write(data.toString());
        }
        // responseBody 전송
        res.end();
    });}

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

