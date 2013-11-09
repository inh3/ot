define([    "layouts/navigationBarLayout",
            "layouts/sideBarLayout",
            "layouts/loginLayout",
            "layouts/userLayout",
            "layouts/userFollowersLayout",
            "layouts/userFollowingLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "appUser",
            "marionette"],
function(   NavigationBarLayout,
            SideBarLayout,
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
        navigationBarRegion: "#navigation-bar",
        sideBarRegion: "#side-bar",
        contentRegion: "#content"
    });

    // configuration, setting up regions, etc ...
    OpenTweet.addInitializer(function(options) {
        //console.log("OpenTweet - addInitializer");

        // attach main router and controller to application
        OpenTweet.appRouter = new ApplicationRouter();

        // show navigation bar
        this.navigationBarLayout = new NavigationBarLayout();
        OpenTweet.navigationBarRegion.show(this.navigationBarLayout);

        // create other views

        this.sideBarLayout = new SideBarLayout({ model: AppUser });
        this.loginLayout = new LoginLayout();
        this.userLayout = new UserLayout({ model: AppUser });
        this.userFollowers = new UserFollowersLayout({ model: AppUser });
        this.userFollowing = new UserFollowingLayout({ model: AppUser });
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
        OpenTweet.navigationBarRegion.reset();
        OpenTweet.sideBarRegion.reset();
        OpenTweet.contentRegion.reset();
    };

    OpenTweet.userLogin = function() {

        // hide side-bar navigation
        $('#side-bar').addClass('hidden');
        OpenTweet.sideBarRegion.reset();

        OpenTweet.contentRegion.show(this.loginLayout);
    };

    OpenTweet.userDefault = function() {

        // show side bar
        $('#side-bar').removeClass('hidden');
        OpenTweet.sideBarRegion.show(this.sideBarLayout);

        // show the user layout
        OpenTweet.contentRegion.attachView(this.userLayout);
        OpenTweet.contentRegion.show(this.userLayout);
    };

    OpenTweet.userFollowers = function() {
        // show side bar
        $('#side-bar').removeClass('hidden');
        OpenTweet.sideBarRegion.show(this.sideBarLayout);

        // show the followers tweet view
        OpenTweet.contentRegion.attachView(this.userFollowers);
        OpenTweet.contentRegion.show(this.userFollowers);
    };

    OpenTweet.userFollowing = function() {
        // show side bar
        $('#side-bar').removeClass('hidden');
        OpenTweet.sideBarRegion.show(this.sideBarLayout);

        // show the followers tweet view
        OpenTweet.contentRegion.attachView(this.userFollowing);
        OpenTweet.contentRegion.show(this.userFollowing);
    };

    // controller events
    OpenTweet.listenTo(EventAggregator, "controller:login", OpenTweet.userLogin);
    OpenTweet.listenTo(EventAggregator, "controller:user-default", OpenTweet.userDefault);
    OpenTweet.listenTo(EventAggregator, "controller:user-followers", OpenTweet.userFollowers);
    OpenTweet.listenTo(EventAggregator, "controller:user-following", OpenTweet.userFollowing);

    // export the app from this module
    return OpenTweet;
});