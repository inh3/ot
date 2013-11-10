define([    "vent",
        "backbone",
        "underscore"],
function(   EventAggregator,
            Backbone,
            _) {

    "use strict";

    return Backbone.Collection.extend({

        url: "/follow",

        fetchFollowing: function(userId) {
            console.log("followingCollection - fetchFollowers");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.followingRequest !== undefined) {
                this.followingRequest.abort();
            }

            // set url for login
            this.url = '/following';

            // fetch new data (reset collection on result)
            this.followingRequest = this.fetch({
                reset: true,
                data: { id: userId },
                dataType: 'json'
            }).done(function () {
                    console.log("followingCollection - fetchFollowers - Done");
                    EventAggregator.trigger('following-collection:fetch-following:complete');
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("followingCollection - fetchFollowers - Error");
                }
            }).always(function () {
                console.log("followingCollection - fetchFollowers - Always");

                // remove reference to fetch request because it is done
                delete self.followingRequest;
            });
        }
    });
});