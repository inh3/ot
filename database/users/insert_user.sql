DELIMITER $$
DROP PROCEDURE InsertUser$$

CREATE PROCEDURE InsertUser(
    IN userName VARCHAR(20),
    IN userPass VARCHAR(64),
    IN emailAddress VARCHAR(254),
    IN soundByte VARCHAR(140))
BEGIN
    DECLARE userId INT DEFAULT NULL;
    SELECT id INTO userId FROM Users WHERE user_name LIKE userName;
    
    IF userId IS NULL THEN
        INSERT INTO Users ( user_name, password, email, sound_byte, num_tweets, num_follows, num_followers, join_date )
        VALUES ( userName, SHA2(userPass, 256), emailAddress, soundByte, 0, 0, 0, NOW() );
        
        SELECT id, user_name, email, sound_byte, num_tweets, num_follows, num_followers FROM Users WHERE id = LAST_INSERT_ID();
    END IF;

END$$
DELIMITER ;