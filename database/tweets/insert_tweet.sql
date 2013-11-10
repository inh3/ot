DELIMITER $$
DROP PROCEDURE InsertTweet$$

CREATE PROCEDURE InsertTweet(
    IN userId INT,
    IN tweetMessage VARCHAR(140))
BEGIN
    DECLARE tweetUserId INT DEFAULT NULL;
    DECLARE tweetUserName VARCHAR(20) DEFAULT NULL;
    
    SELECT id, user_name INTO tweetUserId, tweetUserName 
    FROM Users WHERE id = userId;

    IF tweetUserId IS NOT NULL THEN
        INSERT INTO Tweets ( user_id, user_name, message, timestamp )
        VALUES ( tweetUserId, tweetUserName, tweetMessage, UTC_TIMESTAMP() );
        
        UPDATE Users SET num_tweets = num_tweets + 1 WHERE id = tweetUserId;

        SELECT id, user_id, user_name, message, timestamp FROM Tweets WHERE id = LAST_INSERT_ID();
    END IF;
END$$
DELIMITER ;