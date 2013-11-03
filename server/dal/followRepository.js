// native node modules
var Inspect = require('util').inspect;

// maria db client library
var MariaClient = require('mariasql');
var mariaClient = new MariaClient();

function FollowRepository() {

    var getFollowingByUserId = mariaClient.prepare('CALL GetFollowingByUserId(:id)');

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

    this.getFollowingByUserId= function(userId, queryCallback, callbackContext) {
        // followed users to return
        var followedUsers = [];

        // perform the query
        var dbQuery = mariaClient.query(getFollowingByUserId({
            id: userId
        }));
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                followedUsers.push(responseRow);
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

            // return null if zero results
            if(followedUsers.length > 0)
                queryCallback.bind(callbackContext ? callbackContext : this)(followedUsers);
            else
                queryCallback.bind(callbackContext ? callbackContext : this)(null);
        });
    };
}

module.exports = FollowRepository;