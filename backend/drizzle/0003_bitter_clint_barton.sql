ALTER TABLE `rate` MODIFY COLUMN `standard_rate` int;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `standard_rate` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour1` int;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour1` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour2` int;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour2` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour3` int;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour3` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour4` int;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `overtime_hour4` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `compensation_rate` int;--> statement-breakpoint
ALTER TABLE `rate` MODIFY COLUMN `compensation_rate` int DEFAULT 0;