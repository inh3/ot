DELIMITER $$
DROP PROCEDURE DeleteFollow$$

CREATE PROCEDURE DeleteFollow(
    IN userId INT,
    IN followedUserId INT)
BEGIN
    SELECT * FROM Follow
    WHERE (user_id = userId) AND (followed_user_id = followedUserId);

    DELETE FROM Follow
    WHERE (user_id = userId) AND (followed_user_id = followedUserId);
    
    IF ROW_COUNT() > 0 THEN
        UPDATE Users SET num_follows = num_follows - 1 WHERE id = userId;
        UPDATE Users SET num_followers = num_followers - 1 WHERE id = followedUserId;
    END IF;
END$$
DELIMITER ;