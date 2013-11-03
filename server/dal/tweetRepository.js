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
}

// inherit from the base music service
Util.inherits(TweetRepository, BaseRepository);

// export the module as a constructor function
module.exports = TweetRepository;