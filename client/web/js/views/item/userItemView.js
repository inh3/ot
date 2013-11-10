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
            "click .unfollow-button":   "unfollowClick",
            "click .follow-button":     "followClick"
        },

        ui: {
            unfollowButton:             ".unfollow-button",
            followButton:               ".follow-button"
        },

        initialize: function(options) {
            if(options.unfollow === true) {
                this.model.set('unfollow', true);
            }
            if(options.follow === true) {
                this.model.set('follow', true);
            }
        },

        unfollowClick: function() {
            var unfollowUserId = this.ui.unfollowButton.attr('id');

            // update button dynamically if within search results
            if(this.options.search === true) {
                var unfollowedUser = this.options.searchCollection.get(unfollowUserId);
                unfollowedUser.unset('Followed').unset('unfollow').set('follow', true);
                this.options.searchCollection.set(unfollowedUser, {
                    remove: false,
                    add: false
                });
            }

            AppUser.removeFollower(unfollowUserId);
        },

        followClick: function() {
            var followUserId = this.ui.followButton.attr('id');

            // update button dynamically if within search results
            if(this.options.search === true) {
                var followedUser = this.options.searchCollection.get(followUserId);
                followedUser.set('Followed', true).unset('follow').set('unfollow', true);
                this.options.searchCollection.set(followedUser, {
                    remove: false,
                    add: false
                });
            }

            AppUser.addFollower(followUserId);
        }
    });
});