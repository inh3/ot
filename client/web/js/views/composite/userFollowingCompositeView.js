define([    "itemViews/userItemView",
            "appUser",
            "handlebars",
            "templates/user-following-composite-view",
            "marionette"],
function(   UserItemView,
            AppUser,
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

        buildItemView: function(item, ItemViewType, itemViewOptions){

            // build the final list of options for the item view type
            var options = _.extend({model: item}, itemViewOptions);

            if(AppUser.get('authId') == AppUser.get('id')) {
                options = _.extend({model: item}, {
                    unfollow: true
                });
            }

            return new ItemViewType(options);
        },

        onClose: function() {
            //console.log("userFollowingCompositeView - onClose");
        }
    });
});