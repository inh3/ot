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
            else {
                EventAggregator.trigger("controller:user-active");
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
        },

        userRoute: function() {
            console.log("applicationRouter - userRoute");

            if(!sessionIsActive()) {
                EventAggregator.trigger("controller:default-route");
            }
        }
    });
});