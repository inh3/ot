define([    "vent",
            "handlebars",
            "templates/title-bar-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#title-bar',

        template: Handlebars.templates["title-bar-layout.hbs"],

        initialize: function() {
            //console.log("titleBarLayout - initialize")
        },

        onShow: function() {
            //console.log("titleBarLayout - onShow");
        }
    });
});