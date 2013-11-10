define([    "layouts/navigationBarLayout",
            "layouts/sideBarLayout",
            "layouts/loginLayout",
            "layouts/userTweetsLayout",
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
            UserTweetsLayout,
            UserFollowersLayout,
            UserFollowingLayout,
            ApplicationRouter,
            Backbone,
            EventAggregator,
            AppUser) {

    "use strict";

    function showTweetText() {
        if(AppUser.get('authId') == AppUser.get('id')) {
            AppUser.set('showTweetText', true);
        }
        else {
            AppUser.set('showTweetText', false);
        }
    }

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

        // show and hide side-bar
        this.sideBarLayout = new SideBarLayout({ model: AppUser });
        OpenTweet.sideBarRegion.show(this.sideBarLayout);

        // create other views
        this.loginLayout = new LoginLayout();
        this.userTweetsLayout = new UserTweetsLayout({ model: AppUser });
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

    OpenTweet.userLogin = function() {

        // hide side-bar navigation
        $('#side-bar').addClass('hidden');

        OpenTweet.contentRegion.show(this.loginLayout);
    };

    OpenTweet.userTweets = function() {
        $('#side-bar').removeClass('hidden');

        // show the user layout
        showTweetText();
        OpenTweet.contentRegion.show(this.userTweetsLayout);
    };

    OpenTweet.userFollowers = function() {
        $('#side-bar').removeClass('hidden');

        // show the followers tweet view
        showTweetText();
        OpenTweet.contentRegion.show(this.userFollowers);
    };

    OpenTweet.userFollowing = function() {
        $('#side-bar').removeClass('hidden');

        // show the followers tweet view
        showTweetText();
        OpenTweet.contentRegion.show(this.userFollowing);
    };

    // controller events
    OpenTweet.listenTo(EventAggregator, "controller:login", OpenTweet.userLogin);
    OpenTweet.listenTo(EventAggregator, "controller:user-default", OpenTweet.userTweets);

    OpenTweet.listenTo(EventAggregator, "controller:user-tweets", OpenTweet.userTweets);
    OpenTweet.listenTo(EventAggregator, "controller:user-followers", OpenTweet.userFollowers);
    OpenTweet.listenTo(EventAggregator, "controller:user-following", OpenTweet.userFollowing);

    // export the app from this module
    return OpenTweet;
});