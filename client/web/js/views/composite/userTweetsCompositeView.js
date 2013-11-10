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

        onRender: function() {
            var self = this;
            this.timeInterval = setInterval(function() {
                self.collection.forEach(function(model) {
                    self.children.findByModel(model).updateTimeStamp();
                });
            }, 1000);
        },

        onClose: function() {
            console.log("userTweetsCompositeView - onClose");
            clearInterval(this.timeInterval);
        }
    });
});
