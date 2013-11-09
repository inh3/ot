define([    "compositeViews/userFollowingCompositeView",
            "vent",
            "handlebars",
            "templates/user-following-layout",
            "marionette"],
function(   UserFollowingCompositeView,
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

            // listen for model changes
            this.listenTo(this.model, "change", this.render);
        },

        onRender: function() {
            this.model.getFollowing();
            var userFollowingView = new UserFollowingCompositeView({
                collection: this.model.get('following')
            });
            this.contentRegion.show(userFollowingView);
        },

        onShow: function() {
            console.log("userFollowingLayout - onShow");
        }
    });
});