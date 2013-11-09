define([    "collectionViews/userFollowersCollectionView",
            "models/userModel",
            "vent",
            "handlebars",
            "templates/user-followers-layout",
            "marionette"],
function(   UserFollowersCollectionView,
            UserModel,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#content',

        template: Handlebars.templates["user-followers-layout.hbs"],

        regions: {
            headerRegion: "#user-followers-header",
            contentRegion: "#user-followers-content"
        },

        initialize: function() {
            console.log("userFollowersLayout - initialize");
            UserModel.getFollowers();
        },

        onRender: function() {
            var userFollowersView = new UserFollowersCollectionView({
                collection: UserModel.get('followers')
            });
            this.contentRegion.show(userFollowersView);
            this.$el.removeClass('sign-up');
            this.$el.removeClass('hidden');
        },

        onShow: function() {
            console.log("userFollowersLayout - onShow");
        }
    });
});