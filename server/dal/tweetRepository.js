// native node modules
var Util = require('util');
var Inspect = Util.inspect;

// base music service
var BaseRepository = require(__dirname + '/baseRepository.js');

function TweetRepository() {

    // inherit from the base repository
    BaseRepository.call(this);

    // reference to self
    var self = this;

    // prepared sql statements
    var getTweetsId = this.mariaClient.prepare('CALL GetTweetsByUserId(:id)');
    var getTweetsFromFollowedUsers = this.mariaClient.prepare('CALL GetTweetsFromFollowedUsers(:id)');

    var insertTweet = this.mariaClient.prepare('CALL InsertTweet(:user_id, :tweet_message)');
    var deleteTweet = this.mariaClient.prepare('CALL DeleteTweet(:id)');

    // retrieve a user's tweets by id
    this.getTweetsByUserId = function(userId) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // followed users to return
        var userTweets = [];

        // perform the query
        var dbQuery = this.mariaClient.query(getTweetsId({
            id: userId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                userTweets.push(responseRow);
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ tweet repo ] error: ' + Inspect(responseError));
                self.emit('tweet-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('tweet-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ tweet repo ] response end: ');
            if(userTweets.length > 0) {
                self.emit('tweet-repo:response-end:get-tweets-by-user-id', queryKey, userTweets);
            }
            else {
                self.emit('tweet-repo:response-end:get-tweets-by-user-id', queryKey, null);
            }
        });

        // return query key to the caller
        return queryKey;
    };

    this.getTweetsFromFollowedUsers = function(userId) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // followed user tweets to return
        var followedUserTweets = [];

        // perform the query
        var dbQuery = this.mariaClient.query(getTweetsFromFollowedUsers({
            id: userId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                followedUserTweets.push(responseRow);
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ tweet repo ] error: ' + Inspect(responseError));
                self.emit('tweet-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('tweet-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ tweet repo ] response end: ');
            if(followedUserTweets.length > 0) {
                self.emit('tweet-repo:response-end:get-tweets-for-followed-users', queryKey, followedUserTweets);
            }
            else {
                self.emit('tweet-repo:response-end:get-tweets-for-followed-users', queryKey, null);
            }
        });

        // return query key to the caller
        return queryKey;
    };

    // add a follow
    this.addTweet = function(userId, tweetMessage) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // tweet to return
        var addedTweet = null;

        // perform the query
        var dbQuery = this.mariaClient.query(insertTweet({
            user_id: userId,
            tweet_message: tweetMessage
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                addedTweet = responseRow;
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ tweet repo ] error: ' + Inspect(responseError));
                self.emit('tweet-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('tweet-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ follow repo ] response end: ');
            self.emit('tweet-repo:response-end:add-tweet', queryKey, addedTweet);
        });

        // return query key to the caller
        return queryKey;
    };

    // add a follow
    this.removeTweet = function(tweetId) {
        // increment and return query key
        var queryKey = this.generateQueryKey();

        // deleted tweet to return
        var deletedTweet = null;

        // perform the query
        var dbQuery = this.mariaClient.query(deleteTweet({
            id: tweetId
        }));

        // response to query
        dbQuery.on('result', function(dbResponse) {
            dbResponse.on('row', function(responseRow) {
                //console.log('Result row: ' + Inspect(responseRow));
                deletedTweet = responseRow;
            });
            dbResponse.on('error', function(responseError) {
                console.log('[ tweet repo ] error: ' + Inspect(responseError));
                self.emit('tweet-repo:result-error', responseError);
            });
            dbResponse.on('end', function(responseInfo) {
                //console.log('Result finished: ' + Inspect(responseInfo));
                self.emit('tweet-repo:result-end', responseInfo);
            });
        });
        // end of response
        dbQuery.on('end', function() {
            //console.log('[ follow repo ] response end: ');
            self.emit('tweet-repo:response-end:remove-tweet', queryKey, deletedTweet);
        });

        // return query key to the caller
        return queryKey;
    };
}

// inherit from the base music service
Util.inherits(TweetRepository, BaseRepository);

// export the module as a constructor function
module.exports = TweetRepository;