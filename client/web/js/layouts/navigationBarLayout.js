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

        events: {
            "keyup #user-query":       "userQueryKeyPress"
        },

        ui: {
            "userQuery": "#user-query"
        },

        userQueryKeyPress: function(event) {
            // enter has been pressed
            if (event.which == 13 || event.keyCode == 13) {
                var queryString = this.ui.userQuery.val().trim();
                // something has been entered
                if(queryString.length > 0) {
                    // lose focus on the input field
                    this.ui.userQuery.blur();
                    this.ui.userQuery.val('');

                    // trigger route for search results
                    EventAggregator.trigger("nav-bar-layout:query", queryString);
                }
            }
        },

        showQuery: function() {
            this.$el.find('.navbar-toggle').removeClass('hidden');
            this.$el.find('#navbar-collapse-element').removeClass('hidden');
        }
    });
});