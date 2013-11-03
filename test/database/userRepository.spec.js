// third-party modules
var _ = require('underscore');

// custom modules
var UserRepository = require(__dirname + './../../server/dal/userRepository.js');

// user repository instance
var userRepository = new UserRepository();

// connect to repository
userRepository.dbConnect();

// listen for events
userRepository.on('user-repo:response-end:get-user', function(queryKey, repoResult) {
    console.log('queryId: ' + queryKey);
    console.log(repoResult);
});

// listen for events
userRepository.on('user-repo:response-end:get-user-login', function(queryKey, repoResult) {
    console.log('queryId: ' + queryKey);
    console.log(repoResult);
});

// get user
userRepository.getUser(1);
userRepository.getUserLogin('rita', 'test');
// get user
userRepository.getUser(5);

// disconnect
userRepository.dbDisconnect();