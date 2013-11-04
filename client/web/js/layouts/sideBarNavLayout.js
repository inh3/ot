define([    "vent",
            "handlebars",
            "templates/sidebar-nav-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#side-bar-nav',

        template: Handlebars.templates["sidebar-nav-layout.hbs"],

        initialize: function() {
            console.log("sideBarNavLayout - initialize")
        },

        onShow: function() {
            console.log("sideBarNavLayout - onShow");
        }
    });
});