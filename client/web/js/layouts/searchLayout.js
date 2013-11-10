define([    "compositeViews/searchResultsCompositeView",
            "vent",
            "handlebars",
            "templates/search-layout",
            "marionette"],
function(   SearchResultsCompositeView,
            EventAggregator,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.Layout.extend({

        template: Handlebars.templates["search-layout.hbs"],

        regions: {
            headerRegion: "#search-layout-header",
            contentRegion: "#search-layout-content"
        },

        initialize: function() {
            console.log("searchLayout - initialize");
        },

        onRender: function() {
            console.log("searchLayout - onRender");
        },

        onShow: function() {
            console.log("searchLayout - onShow");
            var searchModel = new Backbone.Model();
            searchModel.set('queryString', this.options.queryObject.queryString);

            var searchResultsView = new SearchResultsCompositeView({
                model: searchModel,
                collection: this.options.queryObject.searchResults
            });
            this.contentRegion.show(searchResultsView);
        }
    });
});