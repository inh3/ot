DELIMITER $$
DROP PROCEDURE InsertFollow$$

CREATE PROCEDURE InsertFollow(
    IN userId INT,
    IN followedUserId INT)
BEGIN
    DECLARE followId INT DEFAULT NULL;
    SELECT id INTO followId
    FROM Follow
    WHERE (user_id = userId) AND (followed_user_id = followedUserId);
    
    IF followId is NULL THEN
        INSERT INTO Follow ( user_id, followed_user_id, follow_date )
        VALUES ( userId, followedUserId, NOW() );
        
        UPDATE Users SET num_follows = num_follows + 1 WHERE id = userId;
        UPDATE Users SET num_followers = num_followers + 1 WHERE id = followedUserId;
        
        SELECT followedUserId as followed_user_id, id, user_name, email, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE id = userId;
    END IF;
END$$
DELIMITER ;