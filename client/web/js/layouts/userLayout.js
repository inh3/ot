define([    "collectionViews/userTweetsCollectionView",
            "models/userModel",
            "vent",
            "handlebars",
            "templates/user-layout",
            "marionette"],
function(   UserTweetsCollectionView,
            UserModel,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        el: '#content',

        template: Handlebars.templates["user-layout.hbs"],

        regions: {
            headerRegion: "#user-layout-header",
            contentRegion: "#user-layout-content"
        },

        initialize: function() {
            console.log("contentLayout - initialize");
            UserModel.getTweets();
        },

        onRender: function() {
            var userTweetsView = new UserTweetsCollectionView({
                collection: UserModel.get('tweets')
            });
            this.contentRegion.show(userTweetsView);

            this.$el.removeClass('sign-up');
            this.$el.removeClass('hidden');
        },

        onShow: function() {
            console.log("contentLayout - onShow");
        }
    });
});