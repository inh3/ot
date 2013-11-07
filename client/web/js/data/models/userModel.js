define([    "collections/tweetCollection",
            "vent",
            "backbone",
            "underscore",
            "cookie"],
function(   TweetCollection,
            EventAggregator,
            Backbone,
            _) {

    "use strict";

    var UserModel = Backbone.Model.extend({

        initialize: function() {

            // create empty set of tweets
            this.set('tweets', new TweetCollection());
        },

        userLogin: function(userCredentials) {
            console.log("UserModel - userLogin");
            console.log(userCredentials);

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.loginRequest !== undefined) {
                this.loginRequest.abort();
            }

            // set url for login
            this.url = '/login';

            // fetch new data (reset collection on result)
            this.loginRequest = this.fetch({
                reset: true,
                data: userCredentials,
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - fetchUser - Done");
                    self.trigger('user:login:success');
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - fetchUser - Error");
                }
            }).always(function () {
                console.log("UserModel - fetchUser - Always");

                // remove reference to fetch request because it is done
                delete self.loginRequest;
            });
        },

        getTweets: function() {
            // get tweets for the user
            this.get('tweets').fetchTweets(this.get('id'));
        }
    });

    return new UserModel();
});