import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const seasons = sqliteTable('seasons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  year: text('year').notNull(),
  champion: text('champion').notNull(),
  runner: text('runner').notNull(),
  scorer: text('scorer').notNull(),
  teams: integer('teams').notNull(),
  status: text('status').notNull(),
  note: text('note').notNull(),
});

export const stats = sqliteTable('stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  teamsCount: integer('teams_count').notNull(),
  seasonsCount: integer('seasons_count').notNull(),
  matchesCount: integer('matches_count').notNull(),
  trophyCount: integer('trophy_count').notNull(),
});
