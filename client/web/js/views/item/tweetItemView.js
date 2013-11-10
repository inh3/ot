define([    "moment",
            "handlebars",
            "templates/tweet-item-view",
            "marionette"],
function(   Moment,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.ItemView.extend({

        tagName: "div",
        className: "list-group-item",

        template: Handlebars.templates["tweet-item-view.hbs"],

        initialize: function() {
            this.updateTimeStamp();

            // listen for model changes
            this.listenTo(this.model, "change", this.render);
        },

        onClose: function() {
            console.log("tweetItemView - onClose");
        },

        onShow: function() {
            console.log("tweetItemView - onShow");
        },

        updateTimeStamp: function() {
            var tweetTime = Moment.utc(this.model.get('timestamp'));
            var currTime = Moment.utc(new Date());

            var dayDiff = currTime.diff(tweetTime, 'days');
            currTime.subtract(dayDiff, 'days');

            var hoursDiff = currTime.diff(tweetTime, 'hours');
            currTime.subtract(hoursDiff, 'hours');

            var minutesDiff = currTime.diff(tweetTime, 'minutes');
            currTime.subtract(minutesDiff, 'minutes');

            var secDiff = currTime.diff(tweetTime, 'seconds');

            var timeString = '';
            if(dayDiff > 0) {
                timeString += dayDiff + ' days, ';
            }
            if(hoursDiff > 0) {
                timeString += hoursDiff + ' hrs, ';
            }
            if(minutesDiff > 0) {
                timeString += minutesDiff + ' min, ';
            }
            timeString += secDiff + ' sec ago';
            this.model.set('displayTime', timeString);
        }
    });
});