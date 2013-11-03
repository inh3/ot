// native node modules
var Inspect = require('util').inspect;

// maria db client library
var MariaClient = require('mariasql');
var mariaClient = new MariaClient();

function UserRepository() {

    var getUser = mariaClient.prepare('CALL GetUser(:id)');

    this.isConnected = function() {
        return mariaClient.connected;
    };

    this.dbConnect = function() {
        mariaClient.connect({
            host: '192.168.1.122',
            user: 'ot',
            password: 'open.care!',
            db: 'ot'
        });
        mariaClient.on('connect', function() {
            console.log('Client Connected');
        });
        mariaClient.on('error', function(connectionError) {
            console.log('Client Error: ' + connectionError);
        });
        mariaClient.on('close', function(connectionHadError) {
            console.log('Client Closed: ' + connectionHadError);
        });
    };

    this.dbDisconnect = function() {
        mariaClient.end();
    };

    this.getUser = function(userId, queryCallback, callbackContext) {
        // user to return
        var userResult = null;

        // perform the query
        var dbQuery = mariaClient.query(getUser({
                id: userId
        }));
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                userResult = responseRow;
            });
            dbResponse.on('error', function(responseError) {
                console.log('Result error: ' + Inspect(responseError));
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
            });
        });
        dbQuery.on('end', function() {
            console.log('Done with all results');
            queryCallback.bind(callbackContext ? callbackContext : this)(userResult);
        });
    };
}

module.exports = UserRepository;