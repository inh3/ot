// native
var fs = require('fs');
var indexHtml = fs.readFileSync(__dirname + '/../client/web/html/index.html', {
    encoding: 'utf8'
});
console.log(indexHtml);

var express = require('express');
var app = express();

// add favicon() before logger() so
// GET /favicon.ico requests are not
// logged, because this middleware
// reponds to /favicon.ico and does not
// call next()
app.use(express.favicon());

// custom log format
if ('test' != process.env.NODE_ENV)
    app.use(express.logger(':method :url'));

// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used 
// for signing the cookies.
app.use(express.cookieParser());

// parses json, x-www-form-urlencoded, and multipart/form-data
app.use(express.json());
app.use(express.urlencoded());

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

if (!module.parent){
    app.listen(80);
    console.log('Express started on port 80');
}