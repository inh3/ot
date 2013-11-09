// NATIVE MODULES ------------------------------------------------------------------------------------------------------
var fs = require('fs');

// MODULE GLOBALS ------------------------------------------------------------------------------------------------------

var indexHtml = fs.readFileSync(__dirname + '/../client/web/static/html/index.html', {
    encoding: 'utf8'
});

// hash-table of responses
var responseHash = {};

function sessionIsActive(httpRequest) {

    // there is a session and there is a user associated with it
    return (httpRequest.session !== undefined) && (httpRequest.session.user !== undefined);
}

// USER REPOSITORY -----------------------------------------------------------------------------------------------------

var UserRepository = require(__dirname + '/dal/userRepository.js');
var userRepository = new UserRepository();
userRepository.dbConnect();

// getUserLogin
userRepository.on('user-repo:response-end:get-user-login', function(queryKey, userObject) {
    if(userObject) {
        // set session to indicate logged in
        responseHash[queryKey].req.session.user = userObject;

        // set active cookie
        responseHash[queryKey].res.cookie('isActive', 'yes', {
            maxAge: 60000 * 5
        });

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

// listen for events
userRepository.on('user-repo:response-end:get-user', function(queryKey, userObject) {
    userObject ? responseHash[queryKey].res.send(userObject) : responseHash[queryKey].res.send(404);
    delete responseHash[queryKey];
});

userRepository.on('user-repo:response-end:get-user-by-name', function(queryKey, userObject) {
    userObject ? responseHash[queryKey].res.send(userObject) : responseHash[queryKey].res.send(404);
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

// FOLLOW REPOSITORY ---------------------------------------------------------------------------------------------------

var FollowRepository = require(__dirname + '/dal/followRepository.js');
var followRepository = new FollowRepository();
followRepository.dbConnect();

followRepository.on('follow-repo:response-end:get-followers-by-user-id', function(queryKey, userFollowers) {
    // respond with follower information
    responseHash[queryKey].res.send(userFollowers);

    // remove query key from hashtable
    delete responseHash[queryKey];
});

followRepository.on('follow-repo:response-end:get-following-by-user-id', function(queryKey, followingUsers) {
    // respond with following information
    responseHash[queryKey].res.send(followingUsers);

    // remove query key from hashtable
    delete responseHash[queryKey];
});

// MODULE DEFINITION ---------------------------------------------------------------------------------------------------

module.exports = function(app) {

    // default path for debug
    app.get("/*", function(req, res, next) {
        if(req.session !== undefined) {
            //console.log(req.session);
        }

        // send cookie flag to indicate a session is active
        if(sessionIsActive(req)) {
            if(!req.cookies.isActive) {
                console.log("* ACTIVE");
                res.cookie('isActive', 'yes', {
                    maxAge: 60000 * 5
                });
            }
        }
        // remove cookie if not authenticated
        else {
            res.clearCookie('isActive');
        }

        next();
    });

    // user login
    app.get('/login', function(req, res) {
        var queryKey = userRepository.getUserLogin(req.query.userName, req.query.password);
        responseHash[queryKey] = { res: res, req: req };
    });

    // get user by id or logged in user
    app.get('/user', function(req, res) {
        if(sessionIsActive(req) && (req.query.id || req.query.userName)) {
            requestValid = true;

            var queryKey = null;
            if(req.query.id) {
                var userId = (req.query.id === 'user') ? req.session.user.id : req.query.id;
                queryKey = userRepository.getUser(userId);
            }
            // req.query.userName
            else {
                queryKey = userRepository.getUserByName(req.query.userName);
            }
            responseHash[queryKey] = { res: res, req: req };
        }
        else {
            res.send(401);
        }
    });

    // get list of tweets
    app.get('/tweets', function(req, res) {
        // this should only work if the user is logged in
        if(sessionIsActive(req)) {
            var queryKey = tweetRepository.getTweetsByUserId(req.query.id);
            responseHash[queryKey] = { res: res, req: req };
        }
        else {
            res.send(401);
        }
    });

    // get list of followers
    app.get('/followers', function(req, res) {
        // this should only work if the user is logged in
        if(sessionIsActive(req)) {
            var queryKey = followRepository.getFollowersByUserId(req.query.id);
            responseHash[queryKey] = { res: res, req: req };
        }
        else {
            res.send(401);
        }
    });

    // get list of following
    app.get('/following', function(req, res) {
        // this should only work if the user is logged in
        if(sessionIsActive(req)) {
            var queryKey = followRepository.getFollowingByUserId(req.query.id);
            responseHash[queryKey] = { res: res, req: req };
        }
        else {
            res.send(401);
        }
    });

    // default
    app.get('/', function(req, res){
        res.send(indexHtml);
    });
};