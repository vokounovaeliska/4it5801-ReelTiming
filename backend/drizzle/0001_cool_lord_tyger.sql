CREATE TABLE `project` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`production_company` varchar(255) NOT NULL,
	`start_date` timestamp,
	`end_date` timestamp,
	`create_date` timestamp NOT NULL,
	`create_user_id` varchar(36) NOT NULL,
	`last_update_user_id` varchar(36) NOT NULL,
	`last_update_date` timestamp NOT NULL,
	`is_active` boolean DEFAULT true,
	`description` varchar(255),
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_user` (
	`id` varchar(36) NOT NULL,
	`project_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`group_id` varchar(36),
	`position` varchar(255),
	`rate_id` varchar(36),
	`number_of_people` int,
	`car_numberplate` varchar(255),
	`is_team_leader` boolean NOT NULL DEFAULT false,
	`create_date` timestamp NOT NULL,
	`create_user_id` varchar(36) NOT NULL,
	`last_update_user_id` varchar(36) NOT NULL,
	`last_update_date` timestamp NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `project_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `app_role_id` varchar(36);--> statement-breakpoint
ALTER TABLE `user` ADD `surname` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `phone_number` varchar(13);--> statement-breakpoint
ALTER TABLE `user` ADD `create_date` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `create_user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `last_update_user_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `last_update_date` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `is_active` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `password_reset_token` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD `password_reset_expiration_time` timestamp;--> statement-breakpoint
ALTER TABLE `project_user` ADD CONSTRAINT `project_user_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_user` ADD CONSTRAINT `project_user_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;