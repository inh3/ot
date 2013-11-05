define([    "vent",
            "handlebars",
            "templates/login-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#content',

        template: Handlebars.templates["login-layout.hbs"],

        initialize: function() {
            console.log("loginLayout - initialize")
        },

        onShow: function() {
            console.log("loginLayout - onShow");
        }
    });
});