DELIMITER $$
DROP PROCEDURE GetTweetsFromFollowedUsers$$

CREATE PROCEDURE GetTweetsFromFollowedUsers(IN userId INT)
BEGIN
  SELECT Tweets.user_name, Tweets.message, Tweets.timestamp
  FROM Tweets
  INNER JOIN Follow ON Follow.followed_user_id = Tweets.user_id
  INNER JOIN Users ON Users.id = Follow.followed_user_id
  WHERE Follow.user_id = userId
  ORDER BY Tweets.timestamp DESC;
END$$
DELIMITER ;