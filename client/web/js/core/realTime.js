define([    "appUser",
            "socketio"],
function(   AppUser,
            io) {

    function updateTweets(tweetData) {

        var addedTweet = false;
        if(AppUser.get('followedTweets')) {
            var foundUserByTweet = AppUser.get('followedTweets').findWhere( {
                user_name: tweetData.user_name
            });

            if(foundUserByTweet) {
                addedTweet = true;
                AppUser.get('followedTweets').add(tweetData, { at: 0, silent: true });
                AppUser.get('followedTweets').trigger("reset");
            }
        }

        if(addedTweet === false && AppUser.get('following')) {
            var foundFollowingUser = AppUser.get('following').findWhere( {
                id: tweetData.user_id
            });

            if(foundFollowingUser) {
                AppUser.get('followedTweets').add(tweetData, { at: 0, silent: true });
                AppUser.get('followedTweets').trigger("reset");
            }
        }

        if(AppUser.get('user_name') == tweetData.user_name) {
            var foundTweet = AppUser.get('tweets').findWhere({
                id: tweetData.id
            });
            if(!foundTweet) {
                AppUser.get('tweets').add(tweetData, { at: 0, silent: true });
                AppUser.get('tweets').trigger('reset');
                AppUser.set('num_tweets', AppUser.get('num_tweets') + 1);
            }
        }
    }

    function addFollow(followData) {
        // user has a new follower
        if(AppUser.get('id') == followData.followed_user_id) {
            // user has followers
            if(AppUser.get('followers')) {

                var foundUser = AppUser.get('followers').findWhere( {
                    id: followData.id
                });

                if(!foundUser) {
                    delete followData.followed_user_id;
                    AppUser.get('followers').add(followData, { at: 0, silent: true });
                    AppUser.get('followers').trigger("reset");
                }
            }
            AppUser.set('num_followers', AppUser.get('num_followers') + 1);
        }
    }

    function removeFollow(followData) {
        // user has a new follower
        if(AppUser.get('id') == followData.followed_user_id) {
            // user has followers
            if(AppUser.get('followers')) {
                var foundUser = AppUser.get('followers').findWhere( {
                    id: followData.id
                });

                if(foundUser) {
                    AppUser.get('followers').remove(foundUser);
                }
            }
            AppUser.set('num_followers', AppUser.get('num_followers') - 1);
        }
    }

    function RealTime() {

        //var socket = io.connect('http://192.168.1.135:80');
        var socket = io.connect('http://216.80.103.168:80');

        socket.on('tweet', function (tweetData) {
            updateTweets(tweetData);
        });

        socket.on('addFollow', function (followData) {
            //console.log("* addFollow");
            //console.log(followData);
            addFollow(followData);
        });

        socket.on('removeFollow', function (followData) {
            //console.log("* removeFollow");
            //console.log(followData);
            removeFollow(followData);
        });
    }

    return new RealTime();
});