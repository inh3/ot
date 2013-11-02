DELIMITER $$
DROP PROCEDURE GetFollowingByUserId$$

CREATE PROCEDURE GetFollowingByUserId(IN userId INT)
BEGIN
    SELECT Users.id, Users.user_name, Users.email, Users.sound_byte, Users.num_tweets, Users.num_follows, Users.num_followers
    FROM Follow
    INNER JOIN Users ON Users.id = Follow.followed_user_id
    WHERE Follow.user_id = userId;
END$$
DELIMITER ;