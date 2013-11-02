DELIMITER $$
DROP PROCEDURE GetTweetsByUserId$$

CREATE PROCEDURE GetTweetsByUserId(IN userId INT)
BEGIN
    SELECT user_id, user_name, message, timestamp FROM Tweets WHERE user_id = userId;
END$$
DELIMITER ;