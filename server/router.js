// NATIVE MODULES ------------------------------------------------------------------------------------------------------
var fs = require('fs');

// MODULE GLOBALS ------------------------------------------------------------------------------------------------------

var indexHtml = fs.readFileSync(__dirname + '/../client/web/static/html/index.html', {
    encoding: 'utf8'
});

// hash-table of responses
var responseHash = {};

// USER REPOSITORY -----------------------------------------------------------------------------------------------------

var UserRepository = require(__dirname + '/dal/userRepository.js');
var userRepository = new UserRepository();
userRepository.dbConnect();

// getUserLogin
userRepository.on('user-repo:response-end:get-user-login', function(queryKey, repoResult) {
    repoResult ? responseHash[queryKey].send(repoResult) : responseHash[queryKey].send(401);
    delete responseHash[queryKey];
});

// MODULE DEFINITION ---------------------------------------------------------------------------------------------------

module.exports = function(app) {

    app.get('/login', function(req, res){
        var queryKey = userRepository.getUserLogin(req.query.userName, req.query.password);
        responseHash[queryKey] = res;
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


    app.post('/', function(req, res){
        console.log(req.body);
        var minute = 60000;
        if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
        res.redirect('save');
    });
};