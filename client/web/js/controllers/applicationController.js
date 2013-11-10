define([    "models/userModel",
            "collections/SearchCollection",
            "appUser",
            "vent",
            "cookie",
            "backbone",
            "marionette"],
function(   UserModel,
            SearchCollection,
            AppUser,
            EventAggregator,
            Cookie,
            Backbone) {

    "use strict";

    // check if a session is active
    function sessionIsActive() {
        return (Cookie.get('isActive') == 'yes');
    }

    return Backbone.Marionette.Controller.extend({

        userLogin: function() {
            console.log("applicationController - userLogin");

            var userPromise = new $.Deferred();
            this.listenToOnce(EventAggregator, "user:get:complete", function(getStatus) {
                getStatus === true ? userPromise.resolve() : userPromise.reject();
            });
            AppUser.getUser('user');

            userPromise.done(function() {
                EventAggregator.trigger("controller:user-default", AppUser);
            });
            userPromise.fail(function() {
                EventAggregator.trigger("controller:login");
            });
        },

        userDefault: function(userName) {
            console.log("applicationController - userDefault");

            var userPromise = new $.Deferred();
            if(AppUser.get('user_name') !== userName) {
                this.listenToOnce(EventAggregator, "user:get:complete", function(getStatus) {
                    getStatus === true ? userPromise.resolve() : userPromise.reject();
                });
                AppUser.getUserByName(userName);
            }
            else {
                userPromise.resolve();
            }

            var self = this;
            userPromise.done(function() {
                EventAggregator.trigger("controller:user-default", AppUser);
            });
            userPromise.fail(function() {
                self.userLogin();
            });
        },

        userTweets: function(userName) {

            console.log("applicationController - userTweets");

            var userPromise = new $.Deferred();
            if(AppUser.get('user_name') !== userName) {
                this.listenToOnce(EventAggregator, "user:get:complete", function(getStatus) {
                    getStatus === true ? userPromise.resolve() : userPromise.reject();
                });
                AppUser.getUserByName(userName);
            }
            else {
                userPromise.resolve();
            }

            var self = this;
            userPromise.done(function() {
                EventAggregator.trigger("controller:user-tweets", AppUser);
            });
            userPromise.fail(function() {
                self.userLogin();
            });
        },

        userFollowing: function(userName) {
            console.log("applicationController - userFollowing");

            var userPromise = new $.Deferred();
            if(AppUser.get('user_name') !== userName) {
                this.listenToOnce(EventAggregator, "user:get:complete", function(getStatus) {
                    getStatus === true ? userPromise.resolve() : userPromise.reject();
                });
                AppUser.getUserByName(userName);
            }
            else {
                userPromise.resolve();
            }

            var self = this;
            userPromise.done(function() {
                EventAggregator.trigger("controller:user-following", AppUser);
            });
            userPromise.fail(function() {
                self.userLogin();
            });
        },

        userFollowers: function(userName) {
            console.log("applicationController - userFollowers");

            var userPromise = new $.Deferred();
            if(AppUser.get('user_name') !== userName) {
                this.listenToOnce(EventAggregator, "user:get:complete", function(getStatus) {
                    getStatus === true ? userPromise.resolve() : userPromise.reject();
                });
                AppUser.getUserByName(userName);
            }
            else {
                userPromise.resolve();
            }

            var self = this;
            userPromise.done(function() {
                EventAggregator.trigger("controller:user-followers", AppUser);
            });
            userPromise.fail(function() {
                self.userLogin();
            });
        },

        userSearch: function(queryString) {

            var searchCollection = new SearchCollection();
            searchCollection.performQuery(queryString);

            var userPromise = new $.Deferred();
            this.listenToOnce(EventAggregator, "search:query:complete", function(getStatus) {
                getStatus === true ? userPromise.resolve() : userPromise.reject();
            });

            var self = this;
            userPromise.done(function() {
                EventAggregator.trigger("controller:search-results", {
                    queryString: queryString,
                    searchResults: searchCollection
                });
            });
            userPromise.fail(function() {
                self.userLogin();
            });
        }
    });
});