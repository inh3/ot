var UserRepository = require(__dirname + './../../server/dal/userRepository.js');
var userRepository = new UserRepository();

userRepository.getUser(1);