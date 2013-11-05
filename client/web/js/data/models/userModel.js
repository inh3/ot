define([    "vent",
            "backbone",
            "underscore"],
function(   EventAggregator,
            Backbone,
            _) {

    "use strict";

    return Backbone.Model.extend({

        url: "/user"
    });
});