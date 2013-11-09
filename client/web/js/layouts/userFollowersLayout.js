define([    "collectionViews/userFollowersCollectionView",
            "vent",
            "handlebars",
            "templates/user-followers-layout",
            "marionette"],
function(   UserFollowersCollectionView,
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
        },

        onRender: function() {
            this.model.getFollowers();
            var userFollowersView = new UserFollowersCollectionView({
                collection: this.model.get('followers')
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