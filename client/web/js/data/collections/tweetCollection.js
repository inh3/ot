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
            console.log("UserModel - getTweets");

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
                console.log("UserModel - getTweets - Done");
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - getTweets - Error");
                }
            }).always(function () {
                console.log("UserModel - getTweets - Always");

                // remove reference to fetch request because it is done
                delete self.tweetRequest;
            });
        }
    });
});