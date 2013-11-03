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
    var getUser = this.mariaClient.prepare('CALL GetUser(:id)');
    var getUserLogin = this.mariaClient.prepare('CALL GetUserForLogin(:user_name, :password)');

    // retrieve a user's information via id
    this.getUser = function(userId) {
        // user to return
        var userResult = null;

        // increment and return query key
        var queryKey = this.generateQueryKey();

        // perform the query
        var dbQuery = this.mariaClient.query(getUser({
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
            //console.log('[ user repo ] response end: ');
            self.emit('user-repo:response-end:get-user', queryKey, userResult);
        });

        // return query key to the caller
        return queryKey;
    };

    this.getUserLogin = function(userName, userPass) {

        // user to return
        var userResult = null;

        // increment and return query key
        var queryKey = this.generateQueryKey();

        // perform the query
        var dbQuery = this.mariaClient.query(getUserLogin({
            user_name: userName,
            password: userPass
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
            self.emit('user-repo:response-end:get-user-login', queryKey, userResult);
        });

        // return query key to the caller
        return queryKey;
    };
}

// inherit from the base music service
Util.inherits(UserRepository, BaseRepository);

// export the module as a constructor function
module.exports = UserRepository;