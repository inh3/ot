define([    "handlebars",
            "templates/user-item-view",
            "marionette"],
function(   Handlebars) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({

        template: Handlebars.templates["user-item-view.hbs"],

        onShow: function() {
            console.log("userItemView - onShow");
        }
    });
});