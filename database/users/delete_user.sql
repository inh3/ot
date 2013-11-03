DELIMITER $$
DROP PROCEDURE DeleteUser$$

CREATE PROCEDURE DeleteUser(
    IN userName VARCHAR(20))
BEGIN
    DECLARE foundId INT DEFAULT NULL;
    DECLARE foundName VARCHAR(20) DEFAULT NULL;
    
    SELECT id INTO foundId
    FROM Users
    WHERE user_name LIKE userName;
    
    IF foundId IS NOT NULL THEN
        DELETE FROM Users WHERE id = foundId;
    END IF;
    
    SELECT id FROM Users Where id = foundId;
END$$
DELIMITER ;