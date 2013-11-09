define([    "controllers/applicationController",
            "appUser",
            "vent",
            "marionette"],
function(   ApplicationController,
            AppUser,
            EventAggregator) {

    "use strict";

    // return instance of application router
    return Backbone.Marionette.AppRouter.extend({

        // app routes controller
        controller: new ApplicationController(),

        // controller handled routes
        appRoutes: {
            "!/:user":              "userDefault",
            "!/:user/following":    "userFollowing",
            "!/:user/followers":    "userFollowers",
            "*path":                "userLogin"
        },

        initialize: function() {
            this.listenTo(EventAggregator, "controller:login", function() {
                this.navigate('', { replace: true });
            });

            this.listenTo(EventAggregator, "controller:user-default", function() {
                this.navigate('!/' + AppUser.get('user_name'), { replace: true });
            });

            this.listenTo(EventAggregator, "user:login:complete", function(loginSuccess) {
                if(loginSuccess === true) {
                    this.navigate('!/' + AppUser.get('user_name'), { trigger: true, replace: true });
                }
            });
        }
    });
});