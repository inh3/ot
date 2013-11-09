define([    "vent",
            "handlebars",
            "templates/side-bar-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["side-bar-layout.hbs"],

        initialize: function() {
            console.log("sideBarNavLayout - initialize")
        },

        onShow: function() {
            console.log("sideBarNavLayout - onShow");
        }
    });
});