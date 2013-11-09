define([    "layouts/titleBarLayout",
            "layouts/sideBarNavLayout",
            "layouts/loginLayout",
            "layouts/userLayout",
            "layouts/userFollowersLayout",
            "layouts/userFollowingLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "appUser",
            "marionette"],
function(   TitleBarLayout,
            SideBarNavLayout,
            LoginLayout,
            UserLayout,
            UserFollowersLayout,
            UserFollowingLayout,
            ApplicationRouter,
            Backbone,
            EventAggregator,
            AppUser) {

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

    OpenTweet.userLogin = function() {

        // hide side-bar navigation
        $('#side-bar-nav').addClass('hidden');
        OpenTweet.sideBarNavRegion.reset();

        var loginLayout = new LoginLayout();
        OpenTweet.contentRegion.attachView(loginLayout);
        OpenTweet.contentRegion.show(loginLayout);
    };

    OpenTweet.userDefault = function() {

        // show side bar
        var sideBarNavLayout = new SideBarNavLayout({
            model: AppUser
        });
        $('#side-bar-nav').removeClass('hidden');
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        // show the user layout
        var userLayout = new UserLayout({
            model: AppUser
        });
        OpenTweet.contentRegion.attachView(userLayout);
        OpenTweet.contentRegion.show(userLayout);
    };

    OpenTweet.userFollowers = function() {
        // show side bar
        var sideBarNavLayout = new SideBarNavLayout({
            model: AppUser
        });
        $('#side-bar-nav').removeClass('hidden');
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        // show the followers tweet view
        var userFollowers = new UserFollowersLayout({
            model: AppUser
        });
        OpenTweet.contentRegion.attachView(userFollowers);
        OpenTweet.contentRegion.show(userFollowers);
    };

    OpenTweet.userFollowing = function() {
        // show side bar
        var sideBarNavLayout = new SideBarNavLayout({
            model: AppUser
        });
        $('#side-bar-nav').removeClass('hidden');
        OpenTweet.sideBarNavRegion.attachView(sideBarNavLayout);
        OpenTweet.sideBarNavRegion.show(sideBarNavLayout);

        // show the followers tweet view
        var userFollowing = new UserFollowingLayout({
            model: AppUser
        });
        OpenTweet.contentRegion.attachView(userFollowing);
        OpenTweet.contentRegion.show(userFollowing);
    };

    // controller events
    OpenTweet.listenTo(EventAggregator, "controller:login", OpenTweet.userLogin);
    OpenTweet.listenTo(EventAggregator, "controller:user-default", OpenTweet.userDefault);
    OpenTweet.listenTo(EventAggregator, "controller:user-followers", OpenTweet.userFollowers);
    OpenTweet.listenTo(EventAggregator, "controller:user-following", OpenTweet.userFollowing);

    // export the app from this module
    return OpenTweet;
});