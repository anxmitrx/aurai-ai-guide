import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './src/db';
import { seasons, stats } from './src/db/schema';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import path from 'path';

// Run migrations
const sqlite = new Database(path.join(process.cwd(), 'sqlite.db'));
const migrationDb = drizzle(sqlite);

console.log('Running migrations...');
migrate(migrationDb, { migrationsFolder: './drizzle' });
console.log('Migrations complete.');

// Seed data
async function seed() {
  console.log('Seeding data...');
  
  // Seed seasons
  const existingSeasons = await db.select().from(seasons);
  if (existingSeasons.length === 0) {
    await db.insert(seasons).values([
      {
        name: "Season 01",
        year: "2024",
        champion: "Kolkata United",
        runner: "Bengaluru Rovers",
        scorer: "R. Das — 9 goals",
        teams: 8,
        status: "Completed",
        note: "The first edition: eight sides, one week, and a final decided in the 89th minute.",
      },
      {
        name: "Season 02",
        year: "2025",
        champion: "Chennai Coastals",
        runner: "Kolkata United",
        scorer: "S. Iqbal — 12 goals",
        teams: 12,
        status: "Completed",
        note: "Expanded to twelve clubs with full match footage and a floodlit final.",
      },
      {
        name: "Season 03",
        year: "2026",
        champion: "To be decided",
        runner: "—",
        scorer: "—",
        teams: 16,
        status: "Registrations open",
        note: "Sixteen clubs, four groups, and a knockout run across two weekends.",
      }
    ]);
    console.log('Seeded seasons.');
  }

  // Seed stats
  const existingStats = await db.select().from(stats);
  if (existingStats.length === 0) {
    await db.insert(stats).values({
      teamsCount: 10,
      seasonsCount: 2,
      matchesCount: 24,
      trophyCount: 1,
    });
    console.log('Seeded stats.');
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
