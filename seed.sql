-- Seed seasons
INSERT INTO "seasons" ("name", "year", "champion", "runner", "scorer", "teams", "status", "note") VALUES
  ('Season 01', '2024', 'Kolkata United', 'Bengaluru Rovers', 'R. Das — 9 goals', 8, 'Completed', 'The first edition: eight sides, one week, and a final decided in the 89th minute.'),
  ('Season 02', '2025', 'Chennai Coastals', 'Kolkata United', 'S. Iqbal — 12 goals', 12, 'Completed', 'Expanded to twelve clubs with full match footage and a floodlit final.'),
  ('Season 03', '2026', 'To be decided', '—', '—', 16, 'Registrations open', 'Sixteen clubs, four groups, and a knockout run across two weekends.');

-- Seed stats
INSERT INTO "stats" ("teams_count", "seasons_count", "matches_count", "trophy_count") VALUES
  (10, 2, 24, 1);
