var _ = require('underscore');

var TweetRepository = require(__dirname + './../../server/dal/tweetRepository.js');
var tweetRepository = new TweetRepository();

// connect to repository
tweetRepository.dbConnect();

// listen for events
tweetRepository.on('tweet-repo:response-end:get-tweets-by-user-id', function(queryKey, userTweets) {
    console.log('queryId: ' + queryKey);
    console.log(userTweets);
});

// get users following a user by id
tweetRepository.getTweetsByUserId(1);

// disconnect
tweetRepository.dbDisconnect();