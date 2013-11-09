define([    "vent",
            "handlebars",
            "underscore",
            "templates/side-bar-layout",
            "marionette"],
function(   EventAggregator,
            Handlebars,
            _) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["side-bar-layout.hbs"],

        events: {
            "click #side-bar-heading":      "listItemClick",
            "click #user-tweets-item":      "listItemClick",
            "click #user-followers-item":   "listItemClick",
            "click #user-following-item":   "listItemClick"
        },

        initialize: function() {
            console.log("sideBarNavLayout - initialize");

            // listen for model changes
            this.listenTo(this.model, "change", this.render);
        },

        onShow: function() {
            console.log("sideBarNavLayout - onShow");
        },

        listItemClick: function(eventTarget) {
            var activeItem = this.$el.find('.active');
            if(activeItem) {
                activeItem.removeClass('active');
            }

            var $elTarget = $(eventTarget.currentTarget);

            if($elTarget.attr('id') != 'side-bar-heading') {
                $elTarget.addClass('active');
            }
        }
    });
});