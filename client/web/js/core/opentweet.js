define([    "layouts/titleBarLayout",
            "layouts/sideBarNavLayout",
            "layouts/contentLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "marionette"],
function(   TitleBarLayout,
            SideBarNavLayout,
            ContentLayout,
            ApplicationRouter,
            Backbone,
            EventAggregator) {

    "use strict";

    // set up the app instance
    var OpenTweet = new Backbone.Marionette.Application();

    // add regions to application
    OpenTweet.addRegions({
        titleBarRegion: "#title-bar",
        sideBarNavRegion: "#side-bar-nav",
        contentRegion: "#content"
    });

    // configuration, setting up regions, etc ...
    OpenTweet.addInitializer(function(options) {
        console.log("OpenTweet - addInitializer");

        // attach main router and controller to application
        OpenTweet.appRouter = new ApplicationRouter();

        // update regions and layouts
        var titleBarLayout = new TitleBarLayout();
        OpenTweet.titleBarRegion.attachView(titleBarLayout);
        OpenTweet.titleBarRegion.show(titleBarLayout);

        var sideBarNavLayout = new SideBarNavLayout();
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        var contentLayout = new ContentLayout();
        OpenTweet.contentRegion.attachView(contentLayout);
        OpenTweet.contentRegion.show(contentLayout);
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