CREATE TABLE `department` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `department_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rate` (
	`id` varchar(36) NOT NULL,
	`standard_rate` decimal(10,2),
	`overtime_hour1` decimal(10,2),
	`overtime_hour2` decimal(10,2),
	`overtime_hour3` decimal(10,2),
	`overtime_hour4` decimal(10,2),
	`compensation_rate` decimal(10,2),
	`create_date` timestamp NOT NULL DEFAULT (now()),
	`create_user_id` varchar(36) NOT NULL,
	`last_update_user_id` varchar(36) NOT NULL,
	`last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rate_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `project_user` RENAME COLUMN `group_id` TO `department_id`;--> statement-breakpoint
ALTER TABLE `project` MODIFY COLUMN `create_date` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `project` MODIFY COLUMN `last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `project` MODIFY COLUMN `description` varchar(500);--> statement-breakpoint
ALTER TABLE `project_user` MODIFY COLUMN `create_date` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `project_user` MODIFY COLUMN `last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `project_user` MODIFY COLUMN `is_active` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `create_date` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `project_user` ADD CONSTRAINT `project_user_unique` UNIQUE(`project_id`,`user_id`);--> statement-breakpoint
ALTER TABLE `project_user` ADD `role` varchar(10) DEFAULT 'CREW';--> statement-breakpoint
ALTER TABLE `project_user` ADD `invitation` varchar(255);--> statement-breakpoint
ALTER TABLE `project_user` ADD `phone_number` varchar(13);--> statement-breakpoint
ALTER TABLE `project_user` ADD CONSTRAINT `project_user_department_id_department_id_fk` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_user` ADD CONSTRAINT `project_user_rate_id_rate_id_fk` FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_user` DROP COLUMN `car_numberplate`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `app_role_id`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `phone_number`;