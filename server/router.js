// NATIVE MODULES ------------------------------------------------------------------------------------------------------
var fs = require('fs');

// MODULE GLOBALS ------------------------------------------------------------------------------------------------------

var indexHtml = fs.readFileSync(__dirname + '/../client/web/static/html/index.html', {
    encoding: 'utf8'
});

// hash-table of responses
var responseHash = {};

// default cookie time (10 minutes)
var cookieExpireMs = 60000 * 10;

// USER REPOSITORY -----------------------------------------------------------------------------------------------------

var UserRepository = require(__dirname + '/dal/userRepository.js');
var userRepository = new UserRepository();
userRepository.dbConnect();

// getUserLogin
userRepository.on('user-repo:response-end:get-user-login', function(queryKey, userObject) {
    if(userObject) {
        // set session to indicate logged in
        responseHash[queryKey].req.session.user = userObject;

        // respond with user information
        responseHash[queryKey].res.send(userObject);
    }
    else {
        // clear the session user
        delete responseHash[queryKey].req.session.user;

        // send unauthorized login
        responseHash[queryKey].res.send(401);
    }

    // remove query key from hashtable
    delete responseHash[queryKey];
});

// TWEET REPOSITORY ----------------------------------------------------------------------------------------------------

var TweetRepository = require(__dirname + '/dal/tweetRepository.js');
var tweetRepository = new TweetRepository();
tweetRepository.dbConnect();

// getTweetsByUserId
tweetRepository.on('tweet-repo:response-end:get-tweets-by-user-id', function(queryKey, userTweets) {
    // respond with user information
    responseHash[queryKey].res.send(userTweets);

    // remove query key from hashtable
    delete responseHash[queryKey];
});

// MODULE DEFINITION ---------------------------------------------------------------------------------------------------

module.exports = function(app) {
    // default path for debug
    app.get("/*", function(req, res, next) {
        if(req.session !== undefined) {
            console.log(req.session);
        }
        next();
    });

    // user login
    app.get('/login', function(req, res) {
        var queryKey = userRepository.getUserLogin(req.query.userName, req.query.password);
        responseHash[queryKey] = { res: res, req: req };
    });

    // get list of tweets
    app.get('/tweets', function(req, res) {
        // this should only work if the user is logged in
        if((req.session !== undefined) && (req.session.user !== undefined)) {
            var queryKey = tweetRepository.getTweetsByUserId(req.query.id);
            responseHash[queryKey] = { res: res, req: req };
        }
        else {
            res.send(401);
        }
    });

    app.get('/', function(req, res){
        res.send(indexHtml);
    });
};