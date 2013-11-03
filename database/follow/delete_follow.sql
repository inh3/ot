DELIMITER $$
DROP PROCEDURE DeleteFollow$$

CREATE PROCEDURE DeleteFollow(
    IN userId INT,
    IN followedUserId INT)
BEGIN
    DELETE FROM Follow
    WHERE (user_id = userId) AND (followed_user_id = followedUserId);
    
    SELECT * FROM Follow
    WHERE (user_id = userId) AND (followed_user_id = followedUserId);
END$$
DELIMITER ;