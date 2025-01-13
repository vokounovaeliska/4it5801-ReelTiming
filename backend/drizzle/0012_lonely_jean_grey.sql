ALTER TABLE `statement` DROP FOREIGN KEY `statement_car_id_car_id_fk`;
--> statement-breakpoint
ALTER TABLE `statement` ADD CONSTRAINT `statement_car_id_car_id_fk` FOREIGN KEY (`car_id`) REFERENCES `car`(`id`) ON DELETE set null ON UPDATE no action;