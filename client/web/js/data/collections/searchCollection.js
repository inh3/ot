define([    "vent",
            "backbone"],
function(   EventAggregator,
            Backbone) {

    "use strict";

    return Backbone.Collection.extend({

        url: '/search',

        performQuery: function(queryString) {
            console.log("SearchCollection - performQuery");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.queryRequest !== undefined) {
                this.queryRequest.abort();
            }

            // fetch new data (reset collection on result)
            this.queryRequest = this.fetch({
                data: {
                    queryString: queryString
                },
                dataType: 'json'
            }).done(function () {
                    console.log("SearchCollection - performQuery - Done");
                    EventAggregator.trigger('search:query:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("SearchCollection - performQuery - Error");
                    // error with 200 means no results
                    if(jqXhr.status === 200) {
                        EventAggregator.trigger('search:query:complete', true);
                    }
                    else {
                        EventAggregator.trigger('search:query:complete', false);
                    }
                }
            }).always(function () {
                console.log("SearchCollection - performQuery - Always");

                // remove reference to fetch request because it is done
                delete self.queryRequest;
            });
        }
    });
});