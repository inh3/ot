define([    "compositeViews/userTweetsCompositeView",
            "vent",
            "handlebars",
            "templates/user-layout",
            "marionette"],
function(   UserTweetsCompositeView,
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
        },

        onRender: function() {
            this.model.getTweets();

            var userTweetsView = new UserTweetsCompositeView({
                collection: this.model.get('tweets')
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