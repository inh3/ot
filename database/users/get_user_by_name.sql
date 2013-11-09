DELIMITER $$
DROP PROCEDURE GetUserByName$$

CREATE PROCEDURE GetUserByName(IN userName VARCHAR(20))
BEGIN
    SELECT id, user_name, email, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE user_name LIKE userName;
END$$
DELIMITER ;