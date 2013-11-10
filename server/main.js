var express = require('express');
var app = express();

require('./configuration.js')(app, express);

if (!module.parent){

    var server = require('http').createServer(app);

    var io = require('socket.io').listen(server);
    io.set('log level', 1);

    server.listen(80);
    console.log('Express started on port 80');
}

require('./router.js')(app, io);