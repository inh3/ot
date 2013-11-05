define([    "vent",
            "backbone",
            "underscore"],
function(   EventAggregator,
            Backbone,
            _) {

    "use strict";

    var UserModel = Backbone.Model.extend({

        userLogin: function(userCredentials) {
            console.log("UserModel - fetchQueryResults");
            console.log(userCredentials);

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.fetchRequest !== undefined) {
                this.fetchRequest.abort();
            }

            // set url for login
            this.url = '/login';

            // fetch new data (reset collection on result)
            this.fetchRequest = this.fetch({
                reset: true,
                data: userCredentials,
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - fetchUser - Done");
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - fetchUser - Error");
                }
            }).always(function () {
                console.log("UserModel - fetchUser - Always");

                // remove reference to fetch request because it is done
                delete self.fetchRequest;
            });
        }
    });

    return new UserModel();
});