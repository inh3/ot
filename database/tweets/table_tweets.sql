CREATE TABLE IF NOT EXISTS `Tweets` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `user_name` VARCHAR(64) NOT NULL,
    `message` VARCHAR(140) NOT NULL,
    `timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`),
    CONSTRAINT `users_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
)