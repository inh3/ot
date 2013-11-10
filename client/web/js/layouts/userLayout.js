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

        onBeforeRender: function() {
            // listen for model changes
            this.listenTo(this.model, "change", this.render);
        },

        onRender: function() {
            var userTweetsView = new UserTweetsCompositeView({
                collection: this.model.get('followedTweets')
            });
            this.contentRegion.show(userTweetsView);
        },

        onShow: function() {
            console.log("userTweetsLayout - onShow");
        }
    });
});