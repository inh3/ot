define([    "itemViews/userItemView",
            "handlebars",
            "templates/user-following-composite-view",
            "marionette"],
function(   UserItemView,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({

        id: "user-following",
        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["user-following-composite-view.hbs"],

        // view for each model in the collection
        itemView: UserItemView,
        itemViewContainer: "ul",

        // view for empty collection
        //emptyView: SearchEmptyItemView,

        onClose: function() {
            console.log("userFollowingCompositeView - onClose");
        }
    });
});