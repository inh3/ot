DELIMITER $$
DROP PROCEDURE SearchForUser$$

CREATE PROCEDURE SearchForUser(IN userName VARCHAR(20), IN userId INT)
BEGIN
    SELECT id, user_name, email, sound_byte, num_tweets, num_follows, num_followers,
      (SELECT user_id FROM Follow WHERE Follow.user_id = userId AND Follow.followed_user_id = Users.id) as Followed
    FROM Users
    WHERE user_name
    LIKE CONCAT('%', userName, '%')
    ORDER BY user_name ASC;
END$$
DELIMITER ;