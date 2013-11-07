define([    "itemViews/tweetItemView",
            "marionette"],
function(   TweetItemView) {

    "use strict";

    return Backbone.Marionette.CollectionView.extend({

        tagName: "div",
        className: "user-tweet-list",

        // view for each model in the collection
        itemView: TweetItemView,

        // view for empty collection
        //emptyView: SearchEmptyItemView,

        onClose: function() {
            console.log("userTweetsCollectionView - onClose");
        }
    });
});
