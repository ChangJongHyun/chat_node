var express = require('express');
var app = express();

var path = require('path');

var port = 8080;

app.listen(port, function () {
    console.log('server running at ' + port);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
