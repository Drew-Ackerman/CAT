CREATE TABLE `stg-cypress-project_account` (
	`user_id` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`provider_account_id` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `provider_account_id`),
	FOREIGN KEY (`user_id`) REFERENCES `stg-cypress-project_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stg-cypress-project_cat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`tag` text(15) NOT NULL,
	`color` text(15),
	`sex` integer,
	`researcherId` integer,
	FOREIGN KEY (`researcherId`) REFERENCES `stg-cypress-project_notes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stg-cypress-project_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stg-cypress-project_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`created_by` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`created_by`) REFERENCES `stg-cypress-project_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stg-cypress-project_session` (
	`session_token` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `stg-cypress-project_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stg-cypress-project_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`email_verified` integer DEFAULT (unixepoch()),
	`image` text(255)
);
--> statement-breakpoint
CREATE TABLE `stg-cypress-project_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `stg-cypress-project_account` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stg-cypress-project_cat_tag_unique` ON `stg-cypress-project_cat` (`tag`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `stg-cypress-project_post` (`created_by`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `stg-cypress-project_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `stg-cypress-project_session` (`userId`);