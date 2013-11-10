define([    "itemViews/userItemView",
            "handlebars",
            "templates/search-results-composite-view",
            "marionette"],
function(   UserItemView,
            Handlebars) {

    "use strict";

    return Backbone.Marionette.CompositeView.extend({

        id: "user-tweets",
        tagName: "div",
        className: "panel panel-default",

        template: Handlebars.templates["search-results-composite-view.hbs"],

        // view for each model in the collection
        itemView: UserItemView,
        itemViewContainer: "ul",

        // view for empty collection
        //emptyView: SearchEmptyItemView,

        buildItemView: function(item, ItemViewType, itemViewOptions){

            // build the final list of options for the item view type
            var options = _.extend({model: item}, itemViewOptions);
            options = _.extend(options, {
                search: true,
                searchCollection: this.collection
            });
            if(!item.get('Followed')) {
                options = _.extend(options, {
                    follow: true
                });
            }
            else {
                options = _.extend(options, {
                    unfollow: true
                });
            }

            return new ItemViewType(options);
        },

        updateItemView: function(item){
            var view = this.children.findByModel(item);
            if(!item.get('Followed')) {
                view.options.follow = true;
            }
            else {
                view.options.unfollow = true;
            }
            view.render();
        },

        onShow: function() {
            this.listenTo(this.collection, "change", this.updateItemView, this);
        },

        onClose: function() {
            //console.log("searchResultsCompositeView - onClose");
        }
    });
});
