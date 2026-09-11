CREATE TABLE `seasons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`year` text NOT NULL,
	`champion` text NOT NULL,
	`runner` text NOT NULL,
	`scorer` text NOT NULL,
	`teams` integer NOT NULL,
	`status` text NOT NULL,
	`note` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`teams_count` integer NOT NULL,
	`seasons_count` integer NOT NULL,
	`matches_count` integer NOT NULL,
	`trophy_count` integer NOT NULL
);
