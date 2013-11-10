define([    "socketio"],
function(   io) {

    function RealTime() {

        var socket = io.connect('http://192.168.1.135');
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
    }

    return new RealTime();
});