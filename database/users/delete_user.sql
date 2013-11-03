DELIMITER $$
DROP PROCEDURE DeleteUser$$

CREATE PROCEDURE DeleteUser(
    IN userId INT)
BEGIN
    DELETE FROM Users WHERE id = userId;
    SELECT id FROM Users Where id = userId;
END$$
DELIMITER ;