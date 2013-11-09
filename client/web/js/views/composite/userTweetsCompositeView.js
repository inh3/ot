define([    "itemViews/tweetItemView",
            "handlebars",
            "templates/user-tweets-composite-view",
            "marionette"],
function(   TweetItemView,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({

        id: "user-tweets",
        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["user-tweets-composite-view.hbs"],

        // view for each model in the collection
        itemView: TweetItemView,
        itemViewContainer: "ul",

        // view for empty collection
        //emptyView: SearchEmptyItemView,

        onClose: function() {
            console.log("userTweetsCompositeView - onClose");
        }
    });
});
