define([    "controllers/applicationController",
            "marionette"],
function(   ApplicationController) {

    "use strict";

    // return instance of application router
    return Backbone.Marionette.AppRouter.extend({

        // app routes controller
        controller: new ApplicationController(),

        // controller handled routes
        appRoutes: {
            "":         "defaultRoute"
        }
    });
});