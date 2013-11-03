// third-party modules
var _ = require('underscore');

// custom modules
var UserRepository = require(__dirname + './../../server/dal/userRepository.js');

// user repository instance
var userRepository = new UserRepository();

// connect to repository
userRepository.dbConnect();

// listen for events
userRepository.on('user-repo:response-end', function(repoResult) {
    console.log(repoResult);
});

// get user
userRepository.getUser(1);

// disconnect
userRepository.dbDisconnect();