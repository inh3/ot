CREATE TABLE IF NOT EXISTS `Follow` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `followed_user_id` INT NOT NULL,
    `follow_date` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`),
    CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE,
    CONSTRAINT `followed_user_id_fk` FOREIGN KEY (`followed_user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
)