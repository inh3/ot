define([    "vent",
            "backbone",
            "underscore"],
function(   EventAggregator,
            Backbone,
            _) {

    "use strict";

    return Backbone.Collection.extend({

        url: "/tweets",

        fetchTweets: function(userId) {
            console.log("tweetCollection - fetchTweets");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.tweetRequest !== undefined) {
                this.tweetRequest.abort();
            }

            // set url for login
            this.url = '/tweets';

            // fetch new data (reset collection on result)
            this.tweetRequest = this.fetch({
                reset: true,
                data: { id: userId },
                dataType: 'json'
            }).done(function () {
                console.log("tweetCollection - fetchTweets - Done");
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("tweetCollection - fetchTweets - Error");
                }
            }).always(function () {
                console.log("tweetCollection - fetchTweets - Always");

                // remove reference to fetch request because it is done
                delete self.tweetRequest;
            });
        },

        fetchFollowedTweets: function(userId) {
            console.log("tweetCollection - fetchFollowedTweets");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.tweetRequest !== undefined) {
                this.tweetRequest.abort();
            }

            // set url for login
            this.url = '/tweets';

            // fetch new data (reset collection on result)
            this.tweetRequest = this.fetch({
                reset: true,
                data: {
                    id: userId,
                    followed: true
                },
                dataType: 'json'
            }).done(function () {
                    console.log("tweetCollection - fetchFollowedTweets - Done");
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("tweetCollection - fetchFollowedTweets - Error");
                }
            }).always(function () {
                console.log("tweetCollection - fetchFollowedTweets - Always");

                // remove reference to fetch request because it is done
                delete self.tweetRequest;
            });
        }
    });
});