define([    "layouts/navigationBarLayout",
            "layouts/sideBarLayout",
            "layouts/landingPageLayout",
            "layouts/userLayout",
            "layouts/userTweetsLayout",
            "layouts/userFollowersLayout",
            "layouts/userFollowingLayout",
            "layouts/searchLayout",
            "routers/applicationRouter",
            "backbone",
            "vent",
            "appUser",
            "marionette"],
function(   NavigationBarLayout,
            SideBarLayout,
            LandingPageLayout,
            UserDefaultLayout,
            UserTweetsLayout,
            UserFollowersLayout,
            UserFollowingLayout,
            SearchLayout,
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
    OpenTweet.addInitializer(function() {
        // attach main router and controller to application
        OpenTweet.appRouter = new ApplicationRouter();

        // show navigation bar
        this.navigationBarLayout = new NavigationBarLayout();
        OpenTweet.navigationBarRegion.show(this.navigationBarLayout);

        // show and hide side-bar
        this.sideBarLayout = new SideBarLayout({ model: AppUser });
        OpenTweet.sideBarRegion.show(this.sideBarLayout);

        // create other views
        this.landingPageLayout = new LandingPageLayout();
        this.userDefaultLayout = new UserDefaultLayout({ model: AppUser });
        this.userTweetsLayout = new UserTweetsLayout({ model: AppUser });
        this.userFollowersLayout = new UserFollowersLayout({ model: AppUser });
        this.userFollowingLayout = new UserFollowingLayout({ model: AppUser });
    });

    OpenTweet.on("initialize:after", function() {
        if(Backbone.history) {
            Backbone.history.start();
        }
    });

    OpenTweet.userLogin = function() {

        // hide side-bar navigation
        $('#side-bar').addClass('hidden');

        OpenTweet.contentRegion.show(this.landingPageLayout);
    };

    OpenTweet.userDefault = function() {
        $('#side-bar').removeClass('hidden');
        OpenTweet.navigationBarLayout.showQuery();

        // show the default user layout
        if(AppUser.get('authId') == AppUser.get('id')) {
            showTweetText();
            AppUser.get('followedTweets').reset();
            AppUser.getFollowedTweets();
            this.sideBarLayout.removeSelect();
            OpenTweet.contentRegion.show(this.userDefaultLayout);
        }
        else {
            this.userTweets(true);
        }
    };

    OpenTweet.userTweets = function(updateRoute) {
        $('#side-bar').removeClass('hidden');
        OpenTweet.navigationBarLayout.showQuery();

        // show the user tweet layout
        showTweetText();
        AppUser.get('tweets').reset();
        AppUser.getTweets();
        OpenTweet.contentRegion.show(this.userTweetsLayout);
        this.sideBarLayout.selectTweets();
        if(updateRoute === true) {
            OpenTweet.appRouter.navigate('!/' + AppUser.get('user_name'), { replace: true });
        }
    };

    OpenTweet.userFollowers = function() {
        $('#side-bar').removeClass('hidden');
        OpenTweet.navigationBarLayout.showQuery();

        // show the followers tweet view
        showTweetText();
        AppUser.get('followers').reset();
        AppUser.getFollowers();
        OpenTweet.contentRegion.show(this.userFollowersLayout);
        this.sideBarLayout.selectFollowers();
    };

    OpenTweet.userFollowing = function() {
        $('#side-bar').removeClass('hidden');
        OpenTweet.navigationBarLayout.showQuery();

        // show the followers tweet view
        showTweetText();
        AppUser.get('following').reset();
        AppUser.getFollowing();
        OpenTweet.contentRegion.show(this.userFollowingLayout);
        this.sideBarLayout.selectFollowing();
    };

    OpenTweet.searchResults = function(queryObject) {
        $('#side-bar').removeClass('hidden');
        OpenTweet.navigationBarLayout.showQuery();

        // show the search results
        showTweetText();
        var searchLayout = new SearchLayout({ queryObject: queryObject });
        OpenTweet.contentRegion.show(searchLayout);
        this.sideBarLayout.removeSelect();
    };

    // controller events
    OpenTweet.listenTo(EventAggregator, "controller:login", OpenTweet.userLogin);
    OpenTweet.listenTo(EventAggregator, "controller:user-default", OpenTweet.userDefault);

    OpenTweet.listenTo(EventAggregator, "controller:search-results", OpenTweet.searchResults);

    OpenTweet.listenTo(EventAggregator, "controller:user-tweets", OpenTweet.userTweets);
    OpenTweet.listenTo(EventAggregator, "controller:user-followers", OpenTweet.userFollowers);
    OpenTweet.listenTo(EventAggregator, "controller:user-following", OpenTweet.userFollowing);

    // login complete event
    OpenTweet.listenTo(EventAggregator, "user:login:complete", function(loginSuccess) {
        if(loginSuccess == true) {
            OpenTweet.navigationBarLayout.showQuery();
        }
    });

    // add user complete event
    OpenTweet.listenTo(EventAggregator, "user:add:complete", function(addSuccess) {
        if(addSuccess == true) {
            OpenTweet.navigationBarLayout.showQuery();
        }
    });

    // export the app from this module
    return OpenTweet;
});