DELIMITER $$
DROP PROCEDURE GetUser$$

CREATE PROCEDURE GetUser(IN userId INT)
BEGIN
    SELECT id, user_name, email, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE id = userId;
END$$
DELIMITER ;