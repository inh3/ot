define([    "appUser",
            "handlebars",
            "templates/user-item-view",
            "marionette"],
function(   AppUser,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({

        tagName: "div",
        className: "list-group-item",

        template: Handlebars.templates["user-item-view.hbs"],

        events: {
            "click .unfollow-button":   "unfollowClick"
        },

        ui: {
            unfollowButton:             ".unfollow-button"
        },

        initialize: function(options) {
            if(options.unfollow === true) {
                this.model.set('unfollow', true);
            }
        },

        onShow: function() {
            console.log("userItemView - onShow");
        },

        unfollowClick: function() {
            console.log(this.ui.unfollowButton.attr('id'));
            AppUser.removeFollower(this.ui.unfollowButton.attr('id'));
        }
    });
});