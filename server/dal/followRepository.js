// native node modules
var Util = require('util');
var Inspect = Util.inspect;

// base music service
var BaseRepository = require(__dirname + '/baseRepository.js');

function FollowRepository() {

    // inherit from the base repository
    BaseRepository.call(this);

    // reference to self
    var self = this;

    // prepared sql statements
    var getFollowingByUserId = this.mariaClient.prepare('CALL GetFollowingByUserId(:id)');
    var getFollowersByUserId = this.mariaClient.prepare('CALL GetFollowersByUserId(:id)');

    var insertFollow = this.mariaClient.prepare('CALL InsertFollow(:id, :follow_id)');
    var deleteFollow = this.mariaClient.prepare('CALL DeleteFollow(:id, :follow_id)');

    // retrieve a user's information via id
    this.getFollowingByUserId = function(userId) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // followed users to return
        var followedUsers = [];

        // perform the query
        var dbQuery = this.mariaClient.query(getFollowingByUserId({
            id: userId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                followedUsers.push(responseRow);
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ follow repo ] error: ' + Inspect(responseError));
                self.emit('follow-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('follow-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ follow repo ] response end: ');
            if(followedUsers.length > 0) {
                self.emit('follow-repo:response-end:get-following-by-user-id', queryKey, followedUsers);
            }
            else {
                self.emit('follow-repo:response-end:get-following-by-user-id', queryKey, null);
            }
        });

        // return query key to the caller
        return queryKey;
    };

    // retrieve followers of a user via id
    this.getFollowersByUserId = function(userId) {

        // increment and return query key
        var queryKey = this.generateQueryKey();

        // followed users to return
        var followerUsers = [];

        // perform the query
        var dbQuery = this.mariaClient.query(getFollowersByUserId({
            id: userId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                followerUsers.push(responseRow);
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ follow repo ] error: ' + Inspect(responseError));
                self.emit('follow-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('follow-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ follow repo ] response end: ');
            if(followerUsers.length > 0) {
                self.emit('follow-repo:response-end:get-followers-by-user-id', queryKey, followerUsers);
            }
            else {
                self.emit('follow-repo:response-end:get-followers-by-user-id', queryKey, null);
            }
        });

        // return query key to the caller
        return queryKey;
    };

    // add a follow
    this.addFollow = function(userId, followedUserId) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // followed users to return
        var addedFollow = null;

        // perform the query
        var dbQuery = this.mariaClient.query(insertFollow({
            id: userId,
            follow_id: followedUserId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                addedFollow = responseRow;
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ follow repo ] error: ' + Inspect(responseError));
                self.emit('follow-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('follow-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ follow repo ] response end: ');
            self.emit('follow-repo:response-end:add-follow', queryKey, addedFollow);
        });

        // return query key to the caller
        return queryKey;
    };

    // add a follow
    this.removeFollow = function(userId, followedUserId) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // followed users to return
        var deletedFollow = null;

        // perform the query
        var dbQuery = this.mariaClient.query(deleteFollow({
            id: userId,
            follow_id: followedUserId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                deletedFollow = responseRow;
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ follow repo ] error: ' + Inspect(responseError));
                self.emit('follow-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('follow-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ follow repo ] response end: ');
            self.emit('follow-repo:response-end:remove-follow', queryKey, deletedFollow);
        });

        // return query key to the caller
        return queryKey;
    };
}

// inherit from the base music service
Util.inherits(FollowRepository, BaseRepository);

// export the module as a constructor function
module.exports = FollowRepository;