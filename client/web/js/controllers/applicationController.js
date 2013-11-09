define([    "models/userModel",
            "vent",
            "cookie",
            "backbone",
            "marionette"],
function(   UserModel,
            EventAggregator,
            Cookie,
            Backbone) {

    "use strict";

    // check if a session is active
    function sessionIsActive() {
        if(Cookie.get('isActive') == 'yes') {
            // don't need to get user if already has it
            if(!UserModel.get('id')) {
                UserModel.getUser('user');
            }
            return true;
        }
        return false;
    }

    return Backbone.Marionette.Controller.extend({

        defaultRoute: function() {
            console.log("applicationRouter - defaultRoute");

            if(!sessionIsActive()) {
                EventAggregator.trigger("controller:default-route");
            }
            else {
                EventAggregator.trigger("controller:user-active");
            }
        },

        userRoute: function() {
            console.log("applicationRouter - userRoute");

            if(!sessionIsActive()) {
                EventAggregator.trigger("controller:default-route");
            }
        },

        userFollowing: function() {
            console.log("applicationRouter - userFollowing");
        },

        userFollowers: function() {
            console.log("applicationRouter - userFollowers");

            if(!sessionIsActive()) {
                EventAggregator.trigger("controller:default-route");
            }
            else {
                EventAggregator.trigger("controller:user-followers");
            }
        }
    });
});