Use ot;

CREATE TABLE `Users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(20) NOT NULL,
	`password` VARCHAR(64) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
	`sound_byte` VARCHAR(140) NULL DEFAULT NULL,
	`num_tweets` INT NOT NULL,
	`num_follows` INT NOT NULL,
	`num_followers` INT NOT NULL,
	`join_date` DATETIME NOT NULL,
	PRIMARY KEY (`Id`)
)