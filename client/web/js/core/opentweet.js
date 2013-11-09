define([    "layouts/titleBarLayout",
            "layouts/sideBarNavLayout",
            "layouts/loginLayout",
            "layouts/userLayout",
            "layouts/userFollowersLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "models/userModel",
            "marionette"],
function(   TitleBarLayout,
            SideBarNavLayout,
            LoginLayout,
            UserLayout,
            UserFollowersLayout,
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
        //console.log("OpenTweet - addInitializer");

        // attach main router and controller to application
        OpenTweet.appRouter = new ApplicationRouter();

        // show title bar
        var titleBarLayout = new TitleBarLayout();
        OpenTweet.titleBarRegion.attachView(titleBarLayout);
        OpenTweet.titleBarRegion.show(titleBarLayout);
    });

    OpenTweet.on("initialize:before", function(options) {
        //console.log("OpenTweet - initialize:before");
        options.moreData = "Application options..."
    });

    OpenTweet.on("initialize:after", function(options) {
        //console.log("OpenTweet - initialize:after");

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

        // hide side-bar navigation
        $('#side-bar-nav').addClass('hidden');
        OpenTweet.sideBarNavRegion.reset();

        var loginLayout = new LoginLayout();
        OpenTweet.contentRegion.attachView(loginLayout);
        OpenTweet.contentRegion.show(loginLayout);
    };

    OpenTweet.userContent = function() {

        // show side bar
        var sideBarNavLayout = new SideBarNavLayout({
            model: UserModel
        });
        $('#side-bar-nav').removeClass('hidden');
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        // show the user layout
        var userLayout = new UserLayout();
        OpenTweet.contentRegion.attachView(userLayout);
        OpenTweet.contentRegion.show(userLayout);
    };

    OpenTweet.userFollowing = function() {
        // show side bar
        var sideBarNavLayout = new SideBarNavLayout({
            model: UserModel
        });
        $('#side-bar-nav').removeClass('hidden');
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        // show the followers tweet view
        var userFollowers = new UserFollowersLayout();
        OpenTweet.contentRegion.attachView(userFollowers);
        OpenTweet.contentRegion.show(userFollowers);
        OpenTweet.contentRegion.$el.removeClass('sign-up');
        OpenTweet.contentRegion.$el.removeClass('hidden');
    };

    OpenTweet.userFollowers = function() {

    };

    // controller events
    OpenTweet.listenTo(EventAggregator, "controller:default-route", OpenTweet.defaultRoute);
    OpenTweet.listenTo(EventAggregator, "controller:user-followers", OpenTweet.userFollowing);

    // login events
    OpenTweet.listenTo(UserModel, "user:login:success", OpenTweet.userContent);
    OpenTweet.listenTo(UserModel, "user:get:success", OpenTweet.userContent);

    // export the app from this module
    return OpenTweet;
});