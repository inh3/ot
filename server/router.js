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

// MODULE DEFINITION ---------------------------------------------------------------------------------------------------

module.exports = function(app) {
    // default path for debug
    app.get("/*", function(req, res, next){
        if(req.session !== undefined) {
            console.log(req.session);
        }
        next();
    });

    app.get('/login', function(req, res){
        var queryKey = userRepository.getUserLogin(req.query.userName, req.query.password);
        responseHash[queryKey] = { res: res, req: req };
    });

    app.get('/save', function(req, res){
        if (req.cookies.remember) {
            res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
        } else {
            res.redirect('/');
        }
    });

    app.get('/forget', function(req, res){
        res.clearCookie('remember');
        res.redirect('/');
    });


    app.get('/', function(req, res){
        if (req.cookies.remember) {
            res.redirect('save');
        } else {
            res.send(indexHtml);
        }
    });


    /*app.post('/', function(req, res){
        console.log(req.body);
        var minute = 60000;
        if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
        res.redirect('save');
    });*/
};