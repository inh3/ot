var _ = require('underscore');

var UserRepository = require(__dirname + './../../server/dal/userRepository.js');
var userRepository = new UserRepository();

userRepository.dbConnect();

console.log('User Repo Connected: ' + userRepository.isConnected());

userRepository.getUser(1, function(userResult) {
    console.log(userResult);
}, this);

userRepository.getFollowingByUserId(5, function(followedUsers) {
    _.forEach(followedUsers, function(user) {
        console.log(user);
    });
    if(!followedUsers) {
        console.log("No Followed Users!");
    }
}, this);

userRepository.getFollowingByUserId(1, function(followedUsers) {
    _.forEach(followedUsers, function(user) {
        console.log(user);
    });
    if(!followedUsers) {
        console.log("No Followed Users!");
    }
}, this);

userRepository.getFollowingByUserId(99, function(followedUsers) {
    _.forEach(followedUsers, function(user) {
        console.log(user);
    });
    if(!followedUsers) {
        console.log("No Followed Users!");
    }
}, this);

userRepository.dbDisconnect();