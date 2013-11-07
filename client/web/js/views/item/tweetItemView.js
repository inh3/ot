define([    "handlebars",
            "templates/tweet-item-view",
            "marionette"],
function(   Handlebars) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({

        template: Handlebars.templates["tweet-item-view.hbs"],

        onShow: function() {
            console.log("tweetItemView - onShow");
        }
    });
});