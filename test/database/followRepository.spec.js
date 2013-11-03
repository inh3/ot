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

followRepository.on('follow-repo:response-end:get-followers-by-user-id', function(queryKey, followerUsers) {
    console.log('queryId: ' + queryKey);
    console.log(followerUsers);
});

followRepository.on('follow-repo:response-end:add-follow', function(queryKey, addedFollow) {
    console.log('queryId: ' + queryKey);
    console.log(addedFollow);
});


// get users following a user by id
followRepository.getFollowingByUserId(5);

// get the who a user is following by user id
followRepository.getFollowersByUserId(1);

// get the who a user is following by user id
followRepository.getFollowersByUserId(2);

// add follows
followRepository.addFollow(1, 5);
followRepository.addFollow(2, 5);

// get the who a user is following by user id
followRepository.getFollowersByUserId(5);

// failures
followRepository.getFollowingByUserId(9999);
followRepository.getFollowersByUserId(9999);

// disconnect
followRepository.dbDisconnect();