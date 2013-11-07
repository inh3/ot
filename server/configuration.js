module.exports = function(app, express) {

    app.use(express.favicon());

    // static files
    app.use(express.compress()); // use gzip
    app.use('/lib', express.static(__dirname + '/../client/web/static/lib'));
    app.use('/css', express.static(__dirname + '/../client/web/static/css'));
    app.use('/templates', express.static(__dirname + '/../client/web/static/templates'));
    app.use('/js', express.static(__dirname + '/../client/web/js'));

    // custom log format
    if ('test' != process.env.NODE_ENV)
        app.use(express.logger(':method :url'));

    // parses request cookies, populating
    // req.cookies and req.signedCookies
    // when the secret is passed, used
    // for signing the cookies.
    //app.use(express.cookieParser('open-tweet-secret'));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'open-tweet-secret'}));

    // parses json, x-www-form-urlencoded
    app.use(express.json());
    app.use(express.urlencoded());
};