DELIMITER $$
DROP PROCEDURE GetUserForLogin$$

CREATE PROCEDURE GetUserForLogin(
    IN userName VARCHAR(20),
    IN userPass VARCHAR(64))
BEGIN
    DECLARE foundId INT DEFAULT NULL;
    DECLARE foundName VARCHAR(20) DEFAULT NULL;
    
    SELECT id, user_name INTO foundId, foundName
    FROM Users
    WHERE (user_name = userName) AND (password = SHA2(userPass, 256));
    
    IF foundId IS NOT NULL THEN
        SELECT id, user_name, email, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE id = foundId;
    END IF;

END$$
DELIMITER ;