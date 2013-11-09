define([    "models/userModel",
            "controllers/applicationController",
            "vent",
            "marionette"],
function(   UserModel,
            ApplicationController,
            EventAggregator) {

    "use strict";

    // return instance of application router
    return Backbone.Marionette.AppRouter.extend({

        // app routes controller
        controller: new ApplicationController(),

        // controller handled routes
        appRoutes: {
            "!/:user":              "userRoute",
            "!/:user/following":    "userFollowing",
            "!/:user/followers":    "userFollowers",
            "*path":                "defaultRoute"
        },

        initialize: function() {
            console.log("applicationRouter - initialize");

            // listen for controller to set blank path
            this.listenTo(EventAggregator, "controller:default-route", function() {
                this.navigate('', { replace: true });
            });

            // listen for controller to set blank path
            this.listenTo(EventAggregator, "controller:user-active", function() {
                this.navigate('!/' + UserModel.get('user_name'), { replace: true });
            });

            this.listenTo(UserModel, "user:login:success", function() {
                this.navigate("!/" + UserModel.get("user_name"), { replace: true });
            });

            this.listenTo(UserModel, "user:get:success", function() {
                this.navigate('!/' + UserModel.get('user_name'), { replace: true });
            });
        }
    });
});