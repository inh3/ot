DELIMITER $$
DROP PROCEDURE GetUser$$

CREATE PROCEDURE GetUser(
    IN userName VARCHAR(20),
    IN userPass VARCHAR(64))
BEGIN
    DECLARE foundId INT DEFAULT NULL;
    DECLARE foundName VARCHAR(20) DEFAULT NULL;
    
    SELECT id, user_name INTO foundId, foundName
    FROM Users
    WHERE (user_name = userName) AND (password = SHA2(userPass, 256));
    
    IF foundId IS NOT NULL THEN
        SELECT user_name, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE user_name = userName;
    END IF;

END$$
DELIMITER ;