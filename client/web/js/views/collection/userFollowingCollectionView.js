define([    "itemViews/userItemView",
        "marionette"],
function(   UserItemView) {

    "use strict";

    return Backbone.Marionette.CollectionView.extend({

        tagName: "div",
        className: "user-following-list",

        // view for each model in the collection
        itemView: UserItemView,

        // view for empty collection
        //emptyView: SearchEmptyItemView,

        onClose: function() {
            console.log("userFollowingCollectionView - onClose");
        }
    });
});