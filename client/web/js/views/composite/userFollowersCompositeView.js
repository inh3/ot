define([    "itemViews/userItemView",
            "handlebars",
            "templates/user-followers-composite-view",
            "marionette"],
function(   UserItemView,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({

        id: "user-followers",
        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["user-followers-composite-view.hbs"],

        // view for each model in the collection
        itemView: UserItemView,
        itemViewContainer: "ul",

        // view for empty collection
        //emptyView: SearchEmptyItemView,

        onClose: function() {
            console.log("userFollowersCompositeView - onClose");
        }
    });
});