define([    "collections/tweetCollection",
            "collections/followerCollection",
            "vent",
            "backbone",
            "underscore",
            "cookie"],
function(   TweetCollection,
            FollowerCollection,
            EventAggregator,
            Backbone,
            _) {

    "use strict";

    var UserModel = Backbone.Model.extend({

        initialize: function() {

            // create empty set of tweets
            this.set('tweets', new TweetCollection());

            // create empty set of followers
            this.set('followers', new FollowerCollection());
        },

        userLogin: function(userCredentials) {
            console.log("UserModel - userLogin");
            console.log(userCredentials);

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.loginRequest !== undefined) {
                this.loginRequest.abort();
            }

            // set url for login
            this.url = '/login';

            // fetch new data (reset collection on result)
            this.loginRequest = this.fetch({
                reset: true,
                data: userCredentials,
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - fetchUser - Done");
                    self.trigger('user:login:success');
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - fetchUser - Error");
                }
            }).always(function () {
                console.log("UserModel - fetchUser - Always");

                // remove reference to fetch request because it is done
                delete self.loginRequest;
            });
        },

        getUser: function(userId) {
            console.log("UserModel - getUser");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.userRequest !== undefined) {
                this.userRequest.abort();
            }

            // set url for login
            this.url = '/user';

            // fetch new data (reset collection on result)
            this.userRequest = this.fetch({
                reset: true,
                data: {
                    id: userId
                },
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - getUser - Done");
                    self.trigger('user:get:success');
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - getUser - Error");
                }
            }).always(function () {
                console.log("UserModel - getUser - Always");

                // remove reference to fetch request because it is done
                delete self.userRequest;
            });
        },

        getTweets: function() {
            // get tweets for the user
            this.get('tweets').fetchTweets(this.get('id'));
        },

        getFollowers: function() {
            // get followers for the user
            this.get('followers').fetchFollowers(this.get('id'));
        },
    });

    return new UserModel();
});