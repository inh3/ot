define([    "models/userModel",
            "appUser",
            "vent",
            "cookie",
            "backbone",
            "marionette"],
function(   UserModel,
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

            userPromise.done(function() {
                EventAggregator.trigger("controller:user-default", AppUser);
            });
            userPromise.fail(function() {
                EventAggregator.trigger("controller:login");
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

            userPromise.done(function() {
                EventAggregator.trigger("controller:user-following", AppUser);
            });
            userPromise.fail(function() {
                EventAggregator.trigger("controller:login");
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

            userPromise.done(function() {
                EventAggregator.trigger("controller:user-followers", AppUser);
            });
            userPromise.fail(function() {
                EventAggregator.trigger("controller:login");
            });
        }
    });
});