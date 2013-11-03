var _ = require('underscore');

// REPOSITORIES

var FollowRepository = require(__dirname + './../../server/dal/followRepository.js');
var followRepository = new FollowRepository();

var TweetRepository = require(__dirname + './../../server/dal/tweetRepository.js');
var tweetRepository = new TweetRepository();

var UserRepository = require(__dirname + './../../server/dal/userRepository.js');
var userRepository = new UserRepository();

// CONNECT TO REPOSITORIES

followRepository.dbConnect();
tweetRepository.dbConnect();
userRepository.dbConnect();

// SETUP ENVIRONMENT

// insert users
userRepository.addUser({
    userName: 'ivan',
    userPass: 'test1',
    emailAddress: 'ivan@ot.com',
    soundByte: 'ivan sound byte'
});
userRepository.addUser({
    userName: 'rita',
    userPass: 'test2',
    emailAddress: 'rita@ot.com',
    soundByte: 'rita sound byte'
});
userRepository.addUser({
    userName: 'test',
    userPass: 'test3',
    emailAddress: 'test@ot.com',
    soundByte: 'test sound byte'
});

// insert

// CONNECT FROM REPOSITORIES

followRepository.dbDisconnect();
tweetRepository.dbDisconnect();
userRepository.dbConnect();
