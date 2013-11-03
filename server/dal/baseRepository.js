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
    this.mariaClient = new MariaClient();

    // generate query key
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    this.generateQueryKey = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };

    // whether or not repository is connected
    this.isConnected = function() {
        return this.mariaClient.connected;
    };

    this.dbConnect = function() {
        this.mariaClient.connect({
            host: '192.168.1.122',
            user: 'ot',
            password: 'open.care!',
            db: 'ot'
        });
        this.mariaClient.on('connect', function() {
            console.log('[ mariasql.connect ] connect');
            self.emit('base-repo:connected');
        });
        this.mariaClient.on('error', function(connectionError) {
            console.log('[ mariasql.connect ] error: ' + connectionError);
            self.emit('base-repo:error', connectionError);
        });
        this.mariaClient.on('close', function(connectionHadError) {
            console.log('[ mariasql.connect ] close: ' + connectionHadError);
            self.emit('base-repo:close', connectionHadError);
        });
    };

    this.dbDisconnect = function() {
        this.mariaClient.end();
    };
}

// inherit from the event emitter
Util.inherits(BaseRepository, EventEmitter);

// export the module as a constructor function
module.exports = BaseRepository;