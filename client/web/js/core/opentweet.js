define([    "layouts/titleBarLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "marionette"],
function(   TitleBarLayout,
            ApplicationRouter,
            Backbone,
            EventAggregator) {

    "use strict";

    // set up the app instance
    var OpenTweet = new Backbone.Marionette.Application();

    // add regions to application
    OpenTweet.addRegions({
        titleBarRegion: "#title-bar"
    });

    // configuration, setting up regions, etc ...
    OpenTweet.addInitializer(function(options) {
        console.log("OpenTweet - addInitializer");

        // attach main router and controller to application
        OpenTweet.appRouter = new ApplicationRouter();

        // add and show the main region of the application
        OpenTweet.titleBarRegion.layout = new TitleBarLayout();
        OpenTweet.titleBarRegion.show(OpenTweet.titleBarRegion.layout);
    });

    OpenTweet.on("initialize:before", function(options) {
        console.log("OpenTweet - initialize:before");
        options.moreData = "Application options..."
    });

    OpenTweet.on("initialize:after", function(options) {
        console.log("OpenTweet - initialize:after");

        if(Backbone.history) {
            Backbone.history.start();
        }
    });

    // export the app from this module
    return OpenTweet;
});