define([    "controllers/applicationController",
            "vent",
            "marionette"],
function(   ApplicationController,
            EventAggregator) {

    "use strict";

    // return instance of application router
    return Backbone.Marionette.AppRouter.extend({

        // app routes controller
        controller: new ApplicationController(),

        // controller handled routes
        appRoutes: {
            "save":     "saveRoute",
            "*path":    "defaultRoute"
        },

        initialize: function() {
            console.log("applicationRouter - initialize");

            // reset the url to base (silently)
            this.listenTo(EventAggregator, "router:default-route", function() {
                this.navigate('', { replace: true });
            });
        }
    });
});