var _ = require('underscore');

var FollowRepository = require(__dirname + './../../server/dal/followRepository.js');
var followRepository = new FollowRepository();

followRepository.dbConnect();

console.log('User Repo Connected: ' + followRepository.isConnected());

followRepository.getFollowingByUserId(5, function(followedUsers) {
    _.forEach(followedUsers, function(user) {
        console.log(user);
    });
    if(!followedUsers) {
        console.log("No Followed Users!");
    }
}, this);

followRepository.getFollowingByUserId(1, function(followedUsers) {
    _.forEach(followedUsers, function(user) {
        console.log(user);
    });
    if(!followedUsers) {
        console.log("No Followed Users!");
    }
}, this);

followRepository.getFollowingByUserId(99, function(followedUsers) {
    _.forEach(followedUsers, function(user) {
        console.log(user);
    });
    if(!followedUsers) {
        console.log("No Followed Users!");
    }
}, this);

followRepository.dbDisconnect();