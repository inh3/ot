define([    "vent",
            "handlebars",
            "templates/navigation-bar-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: "div",
        className: "container",

        template: Handlebars.templates["navigation-bar-layout.hbs"],

        initialize: function() {
            //console.log("titleBarLayout - initialize")
        },

        onShow: function() {
            //console.log("titleBarLayout - onShow");
        }
    });
});