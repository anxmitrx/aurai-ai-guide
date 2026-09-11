import { createServerFn } from '@tanstack/react-start';
import { seasons, stats } from './db/schema';
import { eq } from 'drizzle-orm';

// ---- Seasons API ----
export const getSeasons = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { db } = await import('./db');
    return await db.select().from(seasons);
  } catch (error) {
    console.error("Database error in getSeasons:", error);
    return [];
  }
});

export const updateSeason = createServerFn({ method: "POST" })
  .validator((data: { id: number; name: string; year: string; champion: string; runner: string; scorer: string; teams: number; status: string; note: string }) => data)
  .handler(async ({ data }) => {
    const { db } = await import('./db');
    await db.update(seasons).set(data).where(eq(seasons.id, data.id));
    return { success: true };
  });

export const addSeason = createServerFn({ method: "POST" })
  .validator((data: { name: string; year: string; champion: string; runner: string; scorer: string; teams: number; status: string; note: string }) => data)
  .handler(async ({ data }) => {
    const { db } = await import('./db');
    await db.insert(seasons).values(data);
    return { success: true };
  });

export const deleteSeason = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const { db } = await import('./db');
    await db.delete(seasons).where(eq(seasons.id, id));
    return { success: true };
  });

// ---- Stats API ----
export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { db } = await import('./db');
    const result = await db.select().from(stats);
    return result[0];
  } catch (error) {
    console.error("Database error in getStats:", error);
    return null;
  }
});

export const updateStats = createServerFn({ method: "POST" })
  .validator((data: { id: number; teamsCount: number; seasonsCount: number; matchesCount: number; trophyCount: number }) => data)
  .handler(async ({ data }) => {
    const { db } = await import('./db');
    await db.update(stats).set(data).where(eq(stats.id, data.id));
    return { success: true };
  });
