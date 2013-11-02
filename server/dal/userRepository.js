// native node modules
var Inspect = require('util').inspect;

// maria db client library
var MariaClient = require('mariasql');
var mariaClient = new MariaClient();

function UserRepository() {

    var getUserQuery = mariaClient.prepare('CALL GetUser(:id)');

    function dbConnect() {
        mariaClient.connect({
            host: '127.0.0.1',
            user: 'root',
            //password: 'open.care!',
            db: 'ot'
        });
    }

    function dbDisconnect() {
        mariaClient.end();
    }

    this.getUser = function(userId) {

        // create connection to database
        dbConnect();

        // perform the query
        var dbQuery = mariaClient.query(getUserQuery({
                id: userId
        }));
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                console.log('Result row: ' + Inspect(responseRow));
            });
            dbResponse.on('error', function(responseError) {
                console.log('Result error: ' + Inspect(responseError));
            });
            dbResponse.on('end', function(responseInfo) {
                console.log('Result finished: ' + Inspect(responseInfo));
            });
        });
        dbQuery.on('end', function() {
            console.log('Done with all results');
        });

        // end the query and disconnect
        dbDisconnect();
    };
}

module.exports = UserRepository;