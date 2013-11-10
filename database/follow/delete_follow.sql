DELIMITER $$
DROP PROCEDURE DeleteFollow$$

CREATE PROCEDURE DeleteFollow(
    IN userId INT,
    IN followedUserId INT)
BEGIN

    DELETE FROM Follow
    WHERE (user_id = userId) AND (followed_user_id = followedUserId);
    
    IF ROW_COUNT() > 0 THEN
        UPDATE Users SET num_follows = num_follows - 1 WHERE id = userId;
        UPDATE Users SET num_followers = num_followers - 1 WHERE id = followedUserId;
        
        SELECT followedUserId as followed_user_id, id, user_name, email, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE id = userId;
    END IF;
END$$
DELIMITER ;