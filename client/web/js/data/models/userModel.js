define([    "collections/tweetCollection",
            "collections/followerCollection",
            "collections/followingCollection",
            "vent",
            "backbone",
            "underscore",
            "cookie"],
function(   TweetCollection,
            FollowerCollection,
            FollowingCollection,
            EventAggregator,
            Backbone,
            _) {

    "use strict";

    return Backbone.Model.extend({

        initialize: function() {

            // create empty set of tweets
            this.set('tweets', new TweetCollection());

            // create empty set of followers
            this.set('followers', new FollowerCollection());

            // create empty set of followers
            this.set('following', new FollowingCollection());
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
                    console.log("UserModel - userLogin - Done");
                    EventAggregator.trigger('user:login:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - userLogin - Error");
                    EventAggregator.trigger('user:login:complete', false);
                }
            }).always(function () {
                console.log("UserModel - userLogin - Always");

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
                    EventAggregator.trigger('user:get:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - getUser - Error");
                    EventAggregator.trigger('user:get:complete', false);
                }
            }).always(function () {
                console.log("UserModel - getUser - Always");

                // remove reference to fetch request because it is done
                delete self.userRequest;
            });
        },

        getUserByName: function(userName) {
            console.log("UserModel - getUserByName");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.userByNameRequest !== undefined) {
                this.userByNameRequest.abort();
            }

            // set url for login
            this.url = '/user';

            // fetch new data (reset collection on result)
            this.userByNameRequest = this.fetch({
                reset: true,
                data: {
                    userName: userName
                },
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - getUserByName - Done");
                    EventAggregator.trigger('user:get:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - getUserByName - Error");
                    EventAggregator.trigger('user:get:complete', false);
                }
            }).always(function () {
                console.log("UserModel - getUserByName - Always");

                // remove reference to fetch request because it is done
                delete self.userByNameRequest;
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

        getFollowing: function() {
            this.get('following').fetchFollowing(this.get('id'));
        }
    });
});