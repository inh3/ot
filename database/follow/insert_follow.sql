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
        
        SELECT user_id, followed_user_id, follow_date FROM Follow WHERE id = LAST_INSERT_ID();
    END IF;
END$$
DELIMITER ;