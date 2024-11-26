CREATE TABLE `car` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`kilometer_allow` int NOT NULL DEFAULT 0,
	`kilometer_rate` double(10,2) NOT NULL,
	`project_user_id` varchar(36),
	`create_date` timestamp NOT NULL DEFAULT (now()),
	`create_user_id` varchar(36) NOT NULL,
	`last_update_user_id` varchar(36) NOT NULL,
	`last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `car_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `project` ADD `currency` varchar(3) DEFAULT 'CZK' NOT NULL;--> statement-breakpoint
ALTER TABLE `statement` ADD `car_id` varchar(36);--> statement-breakpoint
ALTER TABLE `statement` ADD `kilometers` int;--> statement-breakpoint
ALTER TABLE `car` ADD CONSTRAINT `car_project_user_id_project_user_id_fk` FOREIGN KEY (`project_user_id`) REFERENCES `project_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `statement` ADD CONSTRAINT `statement_car_id_car_id_fk` FOREIGN KEY (`car_id`) REFERENCES `car`(`id`) ON DELETE restrict ON UPDATE no action;