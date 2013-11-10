define([    "collections/tweetCollection",
            "collections/followerCollection",
            "collections/followingCollection",
            "vent",
            "backbone",
            "underscore",
            "cookie"],
function(   TweetCollection,
            FollowerCollection,
            FollowingCollection,
            EventAggregator,
            Backbone,
            _) {

    "use strict";

    return Backbone.Model.extend({

        initialize: function() {

            // create empty set of tweets
            this.set('tweets', new TweetCollection());

            // create empty set of followed user tweets
            this.set('followedTweets', new TweetCollection());

            // create empty set of followers
            this.set('followers', new FollowerCollection());

            // create empty set of followers
            this.set('following', new FollowingCollection());
        },

        parse: function(response, options) {

            // convert integer fields from strings
            if(response !== null && response !== undefined) {
                response.id = parseInt(response.id, 10);
                response.num_tweets = parseInt(response.num_tweets, 10);
                response.num_follows = parseInt(response.num_follows, 10);
                response.num_followers = parseInt(response.num_followers, 10);
            }
            return response;
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
                    console.log("UserModel - userLogin - Done");
                    EventAggregator.trigger('user:login:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - userLogin - Error");
                    EventAggregator.trigger('user:login:complete', false);
                }
            }).always(function () {
                console.log("UserModel - userLogin - Always");

                // remove reference to fetch request because it is done
                delete self.loginRequest;
            });
        },

        addUser: function(userObject) {
            console.log("UserModel - addUser");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.addUserRequest !== undefined) {
                this.addUserRequest.abort();
            }

            // set url for login
            this.url = '/user';

            // fetch new data (reset collection on result)
            this.addUserRequest = this.fetch({
                type: 'POST',
                reset: true,
                data: userObject,
                dataType: 'json'
            }).done(function () {
                console.log("UserModel - addUser - Done");
                EventAggregator.trigger('user:add:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - addUser - Error");
                    EventAggregator.trigger('user:add:complete', false);
                }
            }).always(function () {
                console.log("UserModel - addUser - Always");

                // remove reference to fetch request because it is done
                delete self.addUserRequest;
            });
        },

        getUser: function(userId) {
            console.log("UserModel - getUser");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.userRequest !== undefined) {
                this.userRequest.abort();
            }

            // set url for login
            this.url = '/user';

            // fetch new data (reset collection on result)
            this.userRequest = this.fetch({
                data: {
                    id: userId
                },
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - getUser - Done");
                    EventAggregator.trigger('user:get:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - getUser - Error");
                    EventAggregator.trigger('user:get:complete', false);
                }
            }).always(function () {
                console.log("UserModel - getUser - Always");

                // remove reference to fetch request because it is done
                delete self.userRequest;
            });
        },

        getUserByName: function(userName) {
            console.log("UserModel - getUserByName");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.userByNameRequest !== undefined) {
                this.userByNameRequest.abort();
            }

            // set url for login
            this.url = '/user';

            // fetch new data (reset collection on result)
            this.userByNameRequest = this.fetch({
                data: {
                    userName: userName
                },
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - getUserByName - Done");
                    EventAggregator.trigger('user:get:complete', true);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - getUserByName - Error");
                    EventAggregator.trigger('user:get:complete', false);
                }
            }).always(function () {
                console.log("UserModel - getUserByName - Always");

                // remove reference to fetch request because it is done
                delete self.userByNameRequest;
            });
        },

        getTweets: function() {
            // get tweets for the user
            this.get('tweets').fetchTweets(this.get('id'));
        },

        makeTweet: function(tweetText) {

            console.log("UserModel - makeTweet");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.makeTweetPost !== undefined) {
                this.makeTweetPost.abort();
            }

            // fetch new data (reset collection on result)
            var tweetModel = new Backbone.Model();
            tweetModel.url = '/tweet';
            this.makeTweetPost = tweetModel.fetch({
                type: 'POST',
                data: {
                    userId: this.get('id'),
                    tweetText: tweetText
                },
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - makeTweet - Done");
                    EventAggregator.trigger('user:make-tweet:complete', true);
                    self.get('tweets').add(tweetModel, { at: 0, silent: true });
                    self.get('tweets').trigger("reset");
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - makeTweet - Error");
                    EventAggregator.trigger('user:make-tweet:complete', false);
                }
            }).always(function () {
                console.log("UserModel - makeTweet - Always");

                // remove reference to fetch request because it is done
                delete self.makeTweetPost;
            });
        },

        getFollowers: function() {
            // get followers for the user
            this.get('followers').fetchFollowers(this.get('id'));
        },

        removeFollower: function(followedUserId) {
            console.log("UserModel - removeFollower");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.removeFollowerPost !== undefined) {
                this.removeFollowerPost.abort();
            }

            // fetch new data (reset collection on result)
            var followModel = new Backbone.Model();
            followModel.url = '/following';
            this.removeFollowerPost = followModel.fetch({
                type: 'POST',
                data: {
                    userId: followedUserId
                },
                dataType: 'json'
            }).done(function () {
                console.log("UserModel - removeFollower - Done");
                // remove the user locally
                var unfollowedUserModel = self.get('following').where({ id: followModel.get('followed_user_id') });
                if(unfollowedUserModel.length > 0) {
                    self.get('following').remove(unfollowedUserModel[0]);
                }
                if(self.get('num_follows') > 0) {
                    self.set('num_follows', self.get('num_follows') - 1);
                }
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - removeFollower - Error");
                }
            }).always(function () {
                console.log("UserModel - removeFollower - Always");

                // remove reference to fetch request because it is done
                delete self.removeFollowerPost;
            });
        },

        addFollower: function(followedUserId) {
            console.log("UserModel - addFollower");

            // store reference to self
            var self = this;

            // cancel previous fetch if it exists
            if (this.addFollowerPost !== undefined) {
                this.addFollowerPost.abort();
            }

            // fetch new data (reset collection on result)
            var followModel = new Backbone.Model();
            followModel.url = '/following';
            this.addFollowerPost = followModel.fetch({
                type: 'POST',
                data: {
                    addFollow: true,
                    userId: followedUserId
                },
                dataType: 'json'
            }).done(function () {
                    console.log("UserModel - addFollower - Done");
                    self.set('num_follows', self.get('num_follows') + 1);
            }).fail(function (jqXhr) {
                // don't trigger error if abort
                if (jqXhr.statusText !== "abort") {
                    console.log("UserModel - addFollower - Error");
                }
            }).always(function () {
                console.log("UserModel - addFollower - Always");

                // remove reference to fetch request because it is done
                delete self.addFollowerPost;
            });
        },

        getFollowedTweets: function() {
            var self = this;
            this.listenToOnce(EventAggregator, 'following-collection:fetch-following:complete', function() {
                self.get('followedTweets').fetchFollowedTweets(self.get('id'));
            });
            this.getFollowing();
        },

        getFollowing: function() {
            this.get('following').fetchFollowing(this.get('id'));
        }
    });
});