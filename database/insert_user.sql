DELIMITER $$
DROP PROCEDURE InsertUser$$

CREATE PROCEDURE InsertUser(
    IN userName VARCHAR(20),
    IN userPass VARCHAR(64),
    IN soundByte VARCHAR(140),
    IN numTweets INT,
    IN numFollows INT,
    IN numFollowers INT)
BEGIN
    DECLARE userId INT DEFAULT NULL;
    SELECT id INTO userId FROM Users WHERE user_name = userName;
    
    IF userId IS NULL THEN
        INSERT INTO Users ( user_name, password, sound_byte, num_tweets, num_follows, num_followers, join_date )
        VALUES ( userName, userPass, soundByte, numTweets, numFollows, numFollowers, NOW() );
        
        SELECT user_name, password, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE user_name = userName;
    END IF;

END$$
DELIMITER ;