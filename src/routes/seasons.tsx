import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/seasons")({
  head: () => ({
    meta: [
      { title: "Seasons — Unity Cup Results & Champions" },
      {
        name: "description",
        content:
          "Season by season history of Unity Cup: champions, runners-up, top scorers and the road to each final.",
      },
      { property: "og:title", content: "Unity Cup Seasons" },
      {
        property: "og:description",
        content: "Champions, top scorers and finals from every Unity Cup season.",
      },
    ],
  }),
  component: Seasons,
});

const seasons = [
  {
    n: "Season 01",
    year: "2024",
    champion: "Kolkata United",
    runner: "Bengaluru Rovers",
    scorer: "R. Das — 9 goals",
    teams: 8,
    status: "Completed",
    note: "The first edition: eight sides, one week, and a final decided in the 89th minute.",
  },
  {
    n: "Season 02",
    year: "2025",
    champion: "Chennai Coastals",
    runner: "Kolkata United",
    scorer: "S. Iqbal — 12 goals",
    teams: 12,
    status: "Completed",
    note: "Expanded to twelve clubs with full match footage and a floodlit final.",
  },
  {
    n: "Season 03",
    year: "2026",
    champion: "To be decided",
    runner: "—",
    scorer: "—",
    teams: 16,
    status: "Registrations open",
    note: "Sixteen clubs, four groups, and a knockout run across two weekends.",
  },
];

function Seasons() {
  return (
    <PageShell
      eyebrow="Seasons"
      title="Every season, on the record."
      intro="Results, champions and scorers from each edition of Unity Cup — plus the season you can still enter."
    >
      <div className="flex flex-col gap-5">
        {seasons.map((s) => (
          <article
            key={s.n}
            className="rounded-3xl border border-ink/10 bg-card/60 p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.3em] text-primary uppercase">{s.year}</p>
                <h2 className="font-askan mt-1 text-3xl text-ink sm:text-4xl">{s.n}</h2>
              </div>
              <span
                className={`rounded-full border px-4 py-1.5 text-xs ${
                  s.status === "Completed"
                    ? "border-ink/15 text-ink/60"
                    : "border-accent/40 text-accent"
                }`}
              >
                {s.status}
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/60">{s.note}</p>

            <dl className="mt-6 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-4">
              {[
                ["Champion", s.champion],
                ["Runner-up", s.runner],
                ["Top scorer", s.scorer],
                ["Teams", String(s.teams)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs tracking-wide text-ink/40 uppercase">{k}</dt>
                  <dd className="mt-1 text-sm text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            {s.status !== "Completed" && (
              <Link
                to="/register"
                className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                Register now
              </Link>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
