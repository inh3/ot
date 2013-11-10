define([    "compositeViews/userFollowersCompositeView",
            "vent",
            "handlebars",
            "templates/user-followers-layout",
            "marionette"],
function(   UserFollowersCompositeView,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        template: Handlebars.templates["user-followers-layout.hbs"],

        regions: {
            headerRegion: "#user-followers-header",
            contentRegion: "#user-followers-content"
        },

        initialize: function() {
            console.log("userFollowersLayout - initialize");
        },

        onBeforeRender: function() {
            // listen for model changes
            this.listenTo(this.model, "change", this.render);
        },

        onRender: function() {
            var userFollowersView = new UserFollowersCompositeView({
                collection: this.model.get('followers')
            });
            this.contentRegion.show(userFollowersView);
        },

        onShow: function() {
            console.log("userFollowersLayout - onShow");
        }
    });
});