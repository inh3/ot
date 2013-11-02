DELIMITER $$
DROP PROCEDURE GetFollowersByUserId$$

CREATE PROCEDURE GetFollowersByUserId(IN userId INT)
BEGIN
    -- total number of followers for given user id
    DECLARE followerCount INT DEFAULT NULL;
    
    -- contains the list of foller ids
    CREATE TEMPORARY TABLE IF NOT EXISTS FollowerIdTable (user_id INT);
    
    -- table of each followers data
    CREATE TEMPORARY TABLE IF NOT EXISTS FollowersTable (
      user_id INT,
      user_name VARCHAR(20),
      email VARCHAR(254),
      sound_byte VARCHAR(140),
      num_tweets INT,
      num_follows INT,
      num_followers INT);
    
    -- get all the follower ids
    INSERT INTO FollowerIdTable
    SELECT followed_user_id FROM Follow
    WHERE user_id = userId;
    
    -- count the total number of inserts
    SET followerCount := ROW_COUNT();
    
    -- count the total number of inserts
    WHILE followerCount > 0 DO
        -- get one follower id
        SELECT user_id INTO @followerId FROM FollowerIdTable LIMIT 1;
        
        -- insert the follower user information into return table
        INSERT INTO FollowersTable 
        SELECT id, user_name, email, sound_byte, num_tweets, num_follows, num_followers
        FROM Users WHERE id = @followerId;
        
        -- delete the follower from the temporary table
        DELETE FROM FollowerIdTable WHERE user_id = @followerId;
        
        -- update the loop variable
        SET followerCount := followerCount - ROW_COUNT();
    END WHILE;
    
    -- return result set of followers
    SELECT * FROM FollowersTable;
    
    -- drop temporary tables
    DROP TABLE FollowerIdTable;
    DROP TABLE FollowersTable;
END$$
DELIMITER ;