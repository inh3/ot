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

tweetRepository.on('tweet-repo:response-end:add-tweet', function(queryKey, addedTweet) {
    console.log('queryId: ' + queryKey);
    console.log(addedTweet);

    // remove tweet
    tweetRepository.removeTweet(addedTweet.id);
});

tweetRepository.on('tweet-repo:response-end:get-tweets-for-followed-users', function(queryKey, follwedUserTweets) {
    console.log('queryId: ' + queryKey);
    console.log(follwedUserTweets);
});

// get tweets by user
tweetRepository.getTweetsByUserId(1);

// get tweets by user
tweetRepository.getTweetsByUserId(5);

// add tweet
tweetRepository.addTweet(5, 'added tweet!');

// get tweets by user
tweetRepository.getTweetsByUserId(5);

// get tweets by user
tweetRepository.getTweetsByUserId(2);

// get tweets of followed users
tweetRepository.getTweetsFromFollowedUsers(5);

tweetRepository.getTweetsFromFollowedUsers(99);

// disconnect
tweetRepository.dbDisconnect();