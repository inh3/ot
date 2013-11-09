define([    "handlebars",
            "templates/user-item-view",
            "marionette"],
function(   Handlebars) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({

        tagName: "div",
        className: "list-group-item",

        template: Handlebars.templates["user-item-view.hbs"],

        onShow: function() {
            console.log("userItemView - onShow");
        }
    });
});