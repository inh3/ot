define([    "vent",
            "backbone",
            "underscore"],
function(   EventAggregator,
            Backbone,
            _) {

    "use strict";

    return Backbone.Collection.extend({

        url: "/follow",

        fetchFollowers: function(userId) {
            console.log("followerCollection - fetchFollowers");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.followerRequest !== undefined) {
                this.followerRequest.abort();
            }

            // set url for login
            this.url = '/tweets';

            // fetch new data (reset collection on result)
            this.followerRequest = this.fetch({
                reset: true,
                data: { id: userId },
                dataType: 'json'
            }).done(function () {
                    console.log("followerCollection - fetchFollowers - Done");
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("followerCollection - fetchFollowers - Error");
                }
            }).always(function () {
                console.log("followerCollection - fetchFollowers - Always");

                // remove reference to fetch request because it is done
                delete self.followerRequest;
            });
        }
    });
});