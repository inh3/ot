DELIMITER $$
DROP PROCEDURE InsertTweet$$

CREATE PROCEDURE InsertTweet(
    IN userId INT,
    IN userName VARCHAR(20),
    IN tweetMessage VARCHAR(140))
BEGIN
    INSERT INTO Tweets ( user_id, user_name, message, timestamp )
    VALUES ( userId, userName, tweetMessage, NOW() );
    
    SELECT user_id, user_name, message, timestamp FROM Tweets WHERE id = LAST_INSERT_ID();
END$$
DELIMITER ;