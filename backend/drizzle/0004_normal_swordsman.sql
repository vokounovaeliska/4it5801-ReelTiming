ALTER TABLE `project_user` MODIFY COLUMN `user_id` varchar(36);--> statement-breakpoint
ALTER TABLE `project_user` ADD `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `project_user` ADD `surname` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `project_user` ADD `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `phone_number` varchar(13);