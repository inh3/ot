define([    "collectionViews/userFollowingCollectionView",
            "vent",
            "handlebars",
            "templates/user-following-layout",
            "marionette"],
function(   UserFollowingCollectionView,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#content',

        template: Handlebars.templates["user-following-layout.hbs"],

        regions: {
            headerRegion: "#user-following-header",
            contentRegion: "#user-following-content"
        },

        initialize: function() {
            console.log("userFollowingLayout - initialize");
        },

        onRender: function() {
            this.model.getFollowing();
            var userFollowingView = new UserFollowingCollectionView({
                collection: this.model.get('following')
            });
            this.contentRegion.show(userFollowingView);
            this.$el.removeClass('sign-up');
            this.$el.removeClass('hidden');
        },

        onShow: function() {
            console.log("userFollowingLayout - onShow");
        }
    });
});