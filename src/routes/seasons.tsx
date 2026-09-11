import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getSeasons } from "@/api";

export const Route = createFileRoute("/seasons")({
  loader: async () => {
    const seasonsList = await getSeasons();
    return { seasonsList };
  },
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

function Seasons() {
  const { seasonsList } = Route.useLoaderData();

  return (
    <PageShell
      eyebrow="Seasons"
      title="Every season, on the record."
      intro="Results, champions and scorers from each edition of Unity Cup — plus the season you can still enter."
    >
      <div className="flex flex-col gap-5">
        {(seasonsList || []).map((s) => (
          <article
            key={s.id}
            className="rounded-3xl border border-ink/10 bg-card/60 p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.3em] text-primary uppercase">{s.year}</p>
                <h2 className="font-askan mt-1 text-3xl text-ink sm:text-4xl">{s.name}</h2>
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
