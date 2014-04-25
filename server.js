var express = require('express'),
    http = require('http'),
    path = require('path');

var port = process.env.PORT || 3000;

var app = express();
app.use('/jenkins-style', express.static(__dirname));

var server = http.createServer(app).listen(port);
console.log('Express app started on port ' + port);