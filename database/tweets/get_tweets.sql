DELIMITER $$
DROP PROCEDURE GetTweetsByUserId$$

CREATE PROCEDURE GetTweetsByUserId(IN userId INT)
BEGIN
    SELECT id, user_id, user_name, message, timestamp
    FROM Tweets
    WHERE user_id = userId
    ORDER BY timestamp DESC;
END$$
DELIMITER ;