DELIMITER $$
DROP PROCEDURE DeleteTweet$$

CREATE PROCEDURE DeleteTweet(IN tweetId INT)
BEGIN
    DELETE FROM Tweets
    WHERE id = tweetId;
    
    SELECT * FROM Tweets WHERE id = tweetId;
END$$
DELIMITER ;