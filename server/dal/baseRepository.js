// native node module
var Util = require('util');
var EventEmitter = require('events').EventEmitter;

// maria db client library
var MariaClient = require('mariasql');

function BaseRepository() {

    // inherit from event emitter
    EventEmitter.call(this);

    // reference to self
    var self = this;

    // client for this repository
    this.maraClient = new MariaClient();

    // whether or not repository is connected
    this.isConnected = function() {
        return this.maraClient.connected;
    };

    this.dbConnect = function() {
        this.maraClient.connect({
            host: '192.168.1.122',
            user: 'ot',
            password: 'open.care!',
            db: 'ot'
        });
        this.maraClient.on('connect', function() {
            console.log('[ mariasql.connect ] connect');
            self.emit('user-repo:connected');
        });
        this.maraClient.on('error', function(connectionError) {
            console.log('[ mariasql.connect ] error: ' + connectionError);
            self.emit('user-repo:error', connectionError);
        });
        this.maraClient.on('close', function(connectionHadError) {
            console.log('[ mariasql.connect ] close: ' + connectionHadError);
            self.emit('user-repo:close', connectionHadError);
        });
    };

    this.dbDisconnect = function() {
        this.maraClient.end();
    };
}

// inherit from the event emitter
Util.inherits(BaseRepository, EventEmitter);

// export the module as a constructor function
module.exports = BaseRepository;