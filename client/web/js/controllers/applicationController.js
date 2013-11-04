define([    "vent",
            "marionette"],
function(   EventAggregator) {

    "use strict";

    return Backbone.Marionette.Controller.extend({

        defaultRoute: function() {
            console.log("applicationRouter - defaultRoute");
        }
    });
});