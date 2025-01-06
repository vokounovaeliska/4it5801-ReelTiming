CREATE TABLE `daily_report` (
	`id` varchar(36) NOT NULL,
	`project_id` varchar(36),
	`shooting_day_id` varchar(36),
	`intro` json,
	`shooting_progress` json,
	`footer` json,
	`create_date` timestamp NOT NULL DEFAULT (now()),
	`last_update_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shift_overview` (
	`id` varchar(36) NOT NULL,
	`project_id` varchar(36),
	`date` date,
	`crew_working` json,
	CONSTRAINT `shift_overview_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shooting_day` (
	`id` varchar(36) NOT NULL,
	`shooting_day_number` int NOT NULL,
	`date` date NOT NULL,
	`project_id` varchar(36),
	`event_type` varchar(50),
	CONSTRAINT `shooting_day_id` PRIMARY KEY(`id`),
	CONSTRAINT `shooting_day_number_project_unique` UNIQUE(`shooting_day_number`,`project_id`),
	CONSTRAINT `shooting_date_project_unique` UNIQUE(`date`,`project_id`)
);
--> statement-breakpoint
DROP TABLE `report`;--> statement-breakpoint
ALTER TABLE `department` ADD `project_id` varchar(36);--> statement-breakpoint
ALTER TABLE `department` ADD `order_index` int;--> statement-breakpoint
ALTER TABLE `department` ADD `is_visible` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `project` ADD `logo` varchar(19845);--> statement-breakpoint
ALTER TABLE `user` ADD `can_create_project` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `daily_report` ADD CONSTRAINT `daily_report_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `daily_report` ADD CONSTRAINT `daily_report_shooting_day_id_shooting_day_id_fk` FOREIGN KEY (`shooting_day_id`) REFERENCES `shooting_day`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shift_overview` ADD CONSTRAINT `shift_overview_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shooting_day` ADD CONSTRAINT `shooting_day_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `department` ADD CONSTRAINT `department_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;