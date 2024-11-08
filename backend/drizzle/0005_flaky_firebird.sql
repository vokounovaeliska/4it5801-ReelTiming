CREATE TABLE `report` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`path` varchar(500) NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`project_user_id` varchar(36),
	`project_id` varchar(36),
	`create_date` timestamp NOT NULL DEFAULT (now()),
	`create_user_id` varchar(36) NOT NULL,
	CONSTRAINT `report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `statement` (
	`id` varchar(36) NOT NULL,
	`project_user_id` varchar(36) NOT NULL,
	`start_date` date NOT NULL,
	`from` timestamp NOT NULL,
	`to` timestamp NOT NULL,
	`shift_lenght` int NOT NULL,
	`calculated_overtime` int,
	`claimed_overtime` int,
	`create_date` timestamp NOT NULL DEFAULT (now()),
	`create_user_id` varchar(36) NOT NULL,
	`last_update_user_id` varchar(36) NOT NULL,
	`last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `statement_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `report` ADD CONSTRAINT `report_project_user_id_project_user_id_fk` FOREIGN KEY (`project_user_id`) REFERENCES `project_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `report` ADD CONSTRAINT `report_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `statement` ADD CONSTRAINT `statement_project_user_id_project_user_id_fk` FOREIGN KEY (`project_user_id`) REFERENCES `project_user`(`id`) ON DELETE cascade ON UPDATE no action;