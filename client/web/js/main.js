require.config({

    // base location of javascript files
    baseUrl:                "./js",

    // cache-busting for development environment
    //urlArgs:                "bust=" + (new Date()).getTime(),

    // global dependencies
    deps:                   [ "cookie", "jquery", "bootstrap" ],

    // paths to modules and libraries
    // .js is included automatically
    paths: {

        // application user
        appUser:            "core/appUser",

        // real-time (socketio)
        realTime:           "core/realTime",

        // event manager
        vent:               "core/vent",

        // application
        opentweet:          "core/opentweet",

        // modules
        modules:            "modules",

        // data
        collections:        "data/collections",
        models:             "data/models",

        // controller and router
        controllers:        "controllers",
        routers:            "routers",

        // layouts and regions
        layouts:            "layouts",
        regions:            "regions",

        // views
        views:              "views",
        collectionViews:    "views/collection",
        compositeViews:     "views/composite",
        itemViews:          "views/item",

        // cookie
        cookie:             "./../lib/cookie-js/cookie-js-0.3.0/cookie",

        // backbone
        backbone:           "./../lib/backbone/backbone-1.0.0/backbone.min",
        underscore:         "./../lib/underscore/underscore-1.5.2/underscore-min",
        json2:              "./../lib/json2/json2",

        // jquery
        jquery:             "./../lib/jquery/jquery-1.10.2/jquery-1.10.2.min",

        // bootstrap
        bootstrap:          "./../lib/bootstrap/bootstrap-dist-3.0.0/js/bootstrap.min",

        // marionette
        marionette:         "./../lib/marionette/marionette-1.1.0/marionette-1.1.0.min",

        // handlebars
        handlebars:         "./../lib/handlebars/handlebars-1.0.0/handlebars.runtime",

        // templates
        templates:          "./../templates",

        // socket.io
        socketio:           "./../lib/socketio/socket.io.min",

        // moment
        moment:             "./../lib/moment/moment.min"
    },
    // support for non-amd libraries
    shim: {
        bootstrap: {
            exports:        'bootstrap',
            deps:           ['jquery']
        },
        cookie: {
            exports:        'Cookie'
        },
        json2: {
            exports:        'JSON'
        },
        underscore: {
            exports:        '_'
        },
        backbone: {
            exports:        'Backbone',
            deps:           ['json2', 'jquery', 'underscore']
        },
        marionette: {
            exports:        'Backbone.Marionette',
            deps:           ['json2', 'jquery', 'underscore', 'backbone']
        },
        handlebars: {
            exports:        'Handlebars'
        },
        socketio: {
            exports:        'io'
        },
        moment: {
            exports:        'moment'
        }
    }
});

// application entry point
require([   "jquery",
            "vent",
            "opentweet",
            "realTime",
            "marionette",
            "handlebars",
            "cookie"],
function(   $,
            EventAggregator,
            OpenTweet) {

    // initialize marionette renderer to support pre-compiled templates
    // https://github.com/marionettejs/backbone.marionette/wiki/Using-pre-compiled-templates
    Backbone.Marionette.Renderer.render = function(template, data){
        return template(data);
    };

    // start the application with options
    var options = {};
    OpenTweet.start(options);
});