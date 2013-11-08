define([    "layouts/titleBarLayout",
            "layouts/sideBarNavLayout",
            "layouts/loginLayout",
            "layouts/userLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "models/userModel",
            "marionette"],
function(   TitleBarLayout,
            SideBarNavLayout,
            LoginLayout,
            UserLayout,
            ApplicationRouter,
            Backbone,
            EventAggregator,
            UserModel) {

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

        // show title bar
        var titleBarLayout = new TitleBarLayout();
        OpenTweet.titleBarRegion.attachView(titleBarLayout);
        OpenTweet.titleBarRegion.show(titleBarLayout);
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

    OpenTweet.resetRegions = function() {
        OpenTweet.titleBarRegion.reset();
        OpenTweet.sideBarNavRegion.reset();
        OpenTweet.contentRegion.reset();
    };

    OpenTweet.defaultRoute = function() {

        // update regions and layouts
        var sideBarNavLayout = new SideBarNavLayout();
        $('#side-bar-nav').addClass('hidden');
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        var loginLayout = new LoginLayout();
        OpenTweet.contentRegion.attachView(loginLayout);
        OpenTweet.contentRegion.show(loginLayout);
        OpenTweet.contentRegion.$el.addClass('sign-up');
        OpenTweet.contentRegion.$el.removeClass('hidden');
    };

    OpenTweet.userContent = function() {

        // show the user layout
        var userLayout = new UserLayout();
        OpenTweet.contentRegion.attachView(userLayout);
        OpenTweet.contentRegion.show(userLayout);
        OpenTweet.contentRegion.$el.addClass('sign-up');
        OpenTweet.contentRegion.$el.removeClass('hidden');
    };

    // router events
    OpenTweet.listenTo(EventAggregator, "controller:default-route", OpenTweet.defaultRoute);

    // login events
    OpenTweet.listenTo(UserModel, "user:login:success", OpenTweet.userContent);
    OpenTweet.listenTo(UserModel, "user:get:success", OpenTweet.userContent);

    // export the app from this module
    return OpenTweet;
});