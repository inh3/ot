var _ = require('underscore');

var UserRepository = require(__dirname + './../../server/dal/userRepository.js');
var userRepository = new UserRepository();

userRepository.dbConnect();

console.log('User Repo Connected: ' + userRepository.isConnected());

userRepository.getUser(1, function(userResult) {
    console.log(userResult);
}, this);

userRepository.dbDisconnect();