define([    "vent",
            "handlebars",
            "templates/content-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: 'div',

        template: Handlebars.templates["content-layout.hbs"],

        initialize: function() {
            console.log("contentLayout - initialize")
        },

        onShow: function() {
            console.log("contentLayout - onShow");
        }
    });
});