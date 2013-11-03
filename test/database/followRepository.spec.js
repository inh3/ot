var _ = require('underscore');

var FollowRepository = require(__dirname + './../../server/dal/followRepository.js');
var followRepository = new FollowRepository();

// connect to repository
followRepository.dbConnect();

// listen for events
followRepository.on('follow-repo:response-end:get-following-by-user-id', function(queryKey, followedUsers) {
    console.log('queryId: ' + queryKey);
    console.log(followedUsers);
});

// get user
followRepository.getFollowingByUserId(5);

// disconnect
followRepository.dbDisconnect();