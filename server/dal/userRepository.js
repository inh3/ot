// native node modules
var Util = require('util');
var Inspect = Util.inspect;

// base music service
var BaseRepository = require(__dirname + '/baseRepository.js');

function UserRepository() {

    // inherit from the base repository
    BaseRepository.call(this);

    // reference to self
    var self = this;

    // prepared sql statements
    var getUser = this.maraClient.prepare('CALL GetUser(:id)');

    // retrieve a user's information via id
    this.getUser = function(userId) {
        // user to return
        var userResult = null;

        // perform the query
        var dbQuery = this.maraClient.query(getUser({
                id: userId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                userResult = responseRow;
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ user repo ] error: ' + Inspect(responseError));
                self.emit('user-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('user-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            console.log('Done with all results');
            self.emit('user-repo:response-end', userResult);
        });
    };
}

// inherit from the base music service
Util.inherits(UserRepository, BaseRepository);

// export the module as a constructor function
module.exports = UserRepository;