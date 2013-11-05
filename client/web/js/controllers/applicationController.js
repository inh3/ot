define([    "vent",
            "cookie",
            "backbone",
            "marionette"],
function(   EventAggregator,
            Cookie,
            Backbone) {

    "use strict";

    return Backbone.Marionette.Controller.extend({

        defaultRoute: function() {
            console.log("applicationRouter - defaultRoute");
            EventAggregator.trigger("router:default-route");
        },

        saveRoute: function() {
            console.log("applicationRouter - saveRoute");
        }
    });
});