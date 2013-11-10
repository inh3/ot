// NATIVE MODULES ------------------------------------------------------------------------------------------------------
var fs = require('fs');

// MODULE GLOBALS ------------------------------------------------------------------------------------------------------

var indexHtml = fs.readFileSync(__dirname + '/../client/web/static/html/index.html', {
    encoding: 'utf8'
});

// hash-table of responses
var responseHash = {};

// 20 minutes
var sessionTimeoutMs = 60000 * 20;

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
        userObject.authId = userObject.id;

        // set session to indicate logged in
        responseHash[queryKey].req.session.user = userObject;

        // set active cookie
        responseHash[queryKey].res.cookie('isActive', 'yes', {
            maxAge: sessionTimeoutMs
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
userRepository.on('user-repo:response-end:add-user', function(queryKey, newUser) {
    // if user is entered setup session auth
    if(newUser) {
        newUser.authId = newUser.id;

        // set session to indicate logged in
        responseHash[queryKey].req.session.user = newUser;

        // set active cookie
        responseHash[queryKey].res.cookie('isActive', 'yes', {
            maxAge: sessionTimeoutMs
        });
    }

    // respond with user information
    responseHash[queryKey].res.send(newUser);

    // remove query key from hashtable
    delete responseHash[queryKey];
});

// listen for events
userRepository.on('user-repo:response-end:get-user', function(queryKey, userObject) {
    if(userObject) {
        if(userObject.id == responseHash[queryKey].req.session.user.id) {
            userObject.authId = responseHash[queryKey].req.session.user.id;
        }
        responseHash[queryKey].res.send(userObject)
    }
    else {
        responseHash[queryKey].res.send(404);
    }
    delete responseHash[queryKey];
});

userRepository.on('user-repo:response-end:get-user-by-name', function(queryKey, userObject) {
    if(userObject) {
        if(userObject.id == responseHash[queryKey].req.session.user.id) {
            userObject.authId = responseHash[queryKey].req.session.user.id;
        }
        responseHash[queryKey].res.send(userObject)
    }
    else {
        responseHash[queryKey].res.send(404);
    }
    delete responseHash[queryKey];
});

userRepository.on('user-repo:response-end:search-user-by-name', function(queryKey, searchResults) {
    // respond with user information
    responseHash[queryKey].res.send(searchResults);

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

tweetRepository.on('tweet-repo:response-end:get-tweets-for-followed-users', function(queryKey, follwedUserTweets) {
    // respond with user information
    responseHash[queryKey].res.send(follwedUserTweets);

    // remove query key from hashtable
    delete responseHash[queryKey];
});

tweetRepository.on('tweet-repo:response-end:add-tweet', function(queryKey, addedTweet) {
    // respond with follower information
    responseHash[queryKey].res.send(addedTweet);

    // a tweet was successfully added
    if(addedTweet) {
        responseHash[queryKey].io.sockets.emit('tweet', addedTweet);
    }

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

followRepository.on('follow-repo:response-end:add-follow', function(queryKey, addedFollow) {
    // respond with the user that has been unfollowed
    responseHash[queryKey].res.send(addedFollow);

    // a tweet was successfully added
    if(addedFollow) {
        responseHash[queryKey].io.sockets.emit('addFollow', addedFollow);
    }

    // remove query key from hashtable
    delete responseHash[queryKey];
});

followRepository.on('follow-repo:response-end:remove-follow', function(queryKey, unfollowedUser) {
    // respond with the user that has been unfollowed
    responseHash[queryKey].res.send(unfollowedUser);

    // a tweet was successfully added
    if(unfollowedUser) {
        responseHash[queryKey].io.sockets.emit('removeFollow', unfollowedUser);
    }

    // remove query key from hashtable
    delete responseHash[queryKey];
});

// MODULE DEFINITION ---------------------------------------------------------------------------------------------------

module.exports = function(app, io) {

    // default path for debug
    app.get("/*", function(req, res, next) {
        if(sessionIsActive(req)) {
            // extend session on activity
            req.session.touch();

            // send cookie flag to indicate a session is active
            res.cookie('isActive', 'yes', {
                maxAge: sessionTimeoutMs
            });
        }
        // remove client-side cookie if not authenticated
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

    app.get('/signout', function(req, res) {
        req.session.destroy();
        res.clearCookie('isActive');
        res.redirect('');
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

    app.post('/user', function(req, res) {

        // this should only happen if user is not auth'd
        if(!sessionIsActive(req)) {
            var queryKey = userRepository.addUser({
                userName: req.body.userName,
                userPass: req.body.password,
                emailAddress: req.body.email,
                soundByte: req.body.soundByte
            });
            responseHash[queryKey] = { res: res, req: req };
        }
        else {
            res.send(401);
        }
    });

    app.post('/tweet', function(req, res) {
        // this should only work if the user is logged in
        if(sessionIsActive(req) && req.body.tweetText && req.body.userId === req.session.user.id) {
            var queryKey = tweetRepository.addTweet(req.session.user.id, req.body.tweetText);
            responseHash[queryKey] = { res: res, req: req, io: io };
        }
        else {
            res.send(401);
        }
    });

    // get list of tweets
    app.get('/tweets', function(req, res) {
        // this should only work if the user is logged in
        if(sessionIsActive(req)) {
            // get tweets for a user
            var queryKey = null;
            if(req.query.followed === undefined) {
                queryKey = tweetRepository.getTweetsByUserId(req.query.id);
                responseHash[queryKey] = { res: res, req: req };
            }
            // get followed users' tweets
            else if(req.query.id === req.session.user.id) {
                queryKey = tweetRepository.getTweetsFromFollowedUsers(req.query.id);
                responseHash[queryKey] = { res: res, req: req };
            }
            else {
                res.send(401);
            }
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
            var queryKey = null;
            // get list of followed users
            if(req.query.id) {
                queryKey = followRepository.getFollowingByUserId(req.query.id);
                responseHash[queryKey] = { res: res, req: req };
            }
            else {
                res.send(401);
            }
        }
        else {
            res.send(401);
        }
    });

    app.post('/following', function(req, res) {
        // this should only work if the user is logged in
        if(sessionIsActive(req)) {
            if(req.body.userId > 0) {
                if(req.body.addFollow) {
                    queryKey = followRepository.addFollow(req.session.user.id, req.body.userId);
                    responseHash[queryKey] = { res: res, req: req, io: io };
                }
                else {
                    queryKey = followRepository.removeFollow(req.session.user.id, req.body.userId);
                    responseHash[queryKey] = { res: res, req: req, io: io };
                }
            }
            else {
                res.send(401);
            }
        }
        else {
            res.send(401);
        }
    });

    app.get('/search', function(req, res) {
        if(sessionIsActive(req)) {
            if(req.query.queryString && (typeof req.query.queryString === 'string')) {
                var queryKey = userRepository.searchUserByName(req.query.queryString, req.session.user.id);
                responseHash[queryKey] = { res: res, req: req };
            }
            else {
                res.send(404);
            }
        }
        else {
            res.send(401);
        }
    });

    // default
    app.get('/', function(req, res){
        res.send(indexHtml);
    });

    // SOCKET IO -------------------------------------------------------------------------------------------------------

    io.sockets.on('connection', function (socket) {
        console.log("socket.io - client connect (" + socket.id + ")");

        socket.on('disconnect', function () {
            console.log("socket.io - client disconnect (" + socket.id + ")");
        });
    });
};