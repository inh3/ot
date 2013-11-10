define([    "compositeViews/userTweetsCompositeView",
            "vent",
            "handlebars",
            "templates/user-tweets-layout",
            "marionette"],
function(   UserTweetsCompositeView,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        template: Handlebars.templates["user-tweets-layout.hbs"],

        regions: {
            headerRegion: "#user-tweets-layout-header",
            contentRegion: "#user-tweets-layout-content"
        },

        initialize: function() {
            console.log("userTweetsLayout - initialize");
        },

        onRender: function() {
            console.log("userTweetsLayout - onRender");
        },

        onShow: function() {
            console.log("userTweetsLayout - onShow");
            var userTweetsView = new UserTweetsCompositeView({
                collection: this.model.get('tweets')
            });
            this.contentRegion.show(userTweetsView);
        }
    });
});