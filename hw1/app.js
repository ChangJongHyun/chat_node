var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var port = 8080;

var server = http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname;

    if (pathname === "/")
        pathname = "/index.html";

    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // 페이지를 찾을 수 없음
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            // 페이지를 찾음
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'});

            // 파일을 읽어와서 responseBody 에 작성
            res.write(data.toString());
        }
        // responseBody 전송
        res.end();
    });
}).listen(8080, function() {
    console.log('Server is running');
});

