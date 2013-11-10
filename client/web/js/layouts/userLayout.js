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

        template: Handlebars.templates["user-layout.hbs"],

        regions: {
            headerRegion: "#user-layout-header",
            contentRegion: "#user-layout-content"
        },

        initialize: function() {
            console.log("userLayout - initialize");
        },

        onRender: function() {
            console.log("userTweetsLayout - onRender");
        },

        onShow: function() {
            console.log("userTweetsLayout - onShow");
            var userTweetsView = new UserTweetsCompositeView({
                collection: this.model.get('followedTweets')
            });
            this.contentRegion.show(userTweetsView);
        }
    });
});