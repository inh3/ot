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
    console.log('');
    console.log('queryId: ' + queryKey);
    console.log(repoResult);
});

// listen for events
userRepository.on('user-repo:response-end:get-user-login', function(queryKey, repoResult) {
    console.log('');
    console.log('queryId: ' + queryKey);
    console.log(repoResult);
});

// listen for events
userRepository.on('user-repo:response-end:add-user', function(queryKey, newUser) {
    console.log('');
    console.log('queryId: ' + queryKey);
    console.log(newUser);

    userRepository.getUser(newUser.id);

    // delete user
    userRepository.removeUser(newUser.id);
});

// listen for events
userRepository.on('user-repo:response-end:remove-user', function(queryKey, newUser) {
    console.log('');
    console.log('queryId: ' + queryKey);
    if(!newUser) {
        console.log('DELETE successful.')
    }
    console.log(newUser);
});

// get user
userRepository.getUser(1);

// get user for login
userRepository.getUserLogin('rita', 'test');
userRepository.getUserLogin('ritax', 'test');

// get user
userRepository.getUser(5);
userRepository.getUser(12345);

// insert user
userRepository.addUser({
    userName: 'userRepo',
    userPass: 'test1',
    emailAddress: 'user@repo.com',
    soundByte: 'user repo sound byte'
});


// disconnect
userRepository.dbDisconnect();