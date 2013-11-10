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

        template: Handlebars.templates["user-following-layout.hbs"],

        regions: {
            headerRegion: "#user-following-header",
            contentRegion: "#user-following-content"
        },

        onShow: function() {
            console.log("userFollowingLayout - onShow");
            var userFollowingView = new UserFollowingCompositeView({
                collection: this.model.get('following')
            });
            this.contentRegion.show(userFollowingView);
        }
    });
});