// third-party modules
var _ = require('underscore');

// custom modules
var UserRepository = require(__dirname + './../../server/dal/userRepository.js');

// user repository instance
var userRepository = new UserRepository();

// connect to repository
userRepository.dbConnect();

// get user
userRepository.getUser(1, function(userResult) {
    console.log(userResult);
}, null);
userRepository.dbDisconnect();