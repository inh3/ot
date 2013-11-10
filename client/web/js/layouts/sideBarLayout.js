define([    "appUser",
            "vent",
            "handlebars",
            "templates/side-bar-layout",
            "marionette"],
function(   AppUser,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        tagName: "div",
        className: "list-group",

        template: Handlebars.templates["side-bar-layout.hbs"],

        events: {
            "click #side-bar-heading":      "listItemClick",
            "click #user-tweets-item":      "listItemClick",
            "click #user-followers-item":   "listItemClick",
            "click #user-following-item":   "listItemClick",

            "keyup #tweet-text":            "tweetKeyPress",
            "click #tweet-button":          "tweetClick"
        },

        ui: {
            tweetText:                      "#tweet-text",
            tweetCharCount:                 "#tweet-characters",
            tweetButton:                    "#tweet-button"
        },

        onBeforeRender: function() {
            // listen for model changes
            this.listenTo(this.model, "change", this.render);
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
        },

        tweetKeyPress: function() {
            var charCount = this.ui.tweetText.val().trim().length;
            if(charCount > 140 || charCount < 0) {
                this.ui.tweetButton.attr('disabled', '');
                this.ui.tweetCharCount.html('<span class="text-danger"><strong> ' + charCount + '/ 140</strong></span>');
            }
            else {
                this.ui.tweetButton.removeAttr('disabled');
                this.ui.tweetCharCount.html(charCount + ' / 140');
            }
        },

        tweetClick: function() {
            this.ui.tweetText.attr('disabled', '');
            this.ui.tweetButton.attr('disabled', '');

            var tweetDeferral = new $.Deferred();
            this.listenToOnce(EventAggregator, "user:make-tweet:complete", function(getStatus) {
                    tweetDeferral.resolve();
            });
            AppUser.makeTweet(this.ui.tweetText.val());

            var self = this;
            tweetDeferral.done(function() {
                self.ui.tweetText.val('');
                self.ui.tweetCharCount.html('0 / 140');
                self.ui.tweetText.removeAttr('disabled');
                self.ui.tweetButton.removeAttr('disabled');
            });
        },

        removeSelect: function() {
            var activeItem = this.$el.find('.active');
            if(activeItem) {
                activeItem.removeClass('active');
            }
        },

        selectTweets: function() {
            this.$el.find('#user-tweets-item').addClass('active');
        }
    });
});