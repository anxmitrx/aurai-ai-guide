import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import actionNight from "@/assets/action-night.jpg";
import fansNight from "@/assets/fans-night.jpg";
import trophyNight from "@/assets/trophy-night.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unity Cup — Indian Football Tournament" },
      {
        name: "description",
        content:
          "Unity Cup is India's grassroots football tournament — floodlit nights, fierce rivalries and one trophy. Register your team for the new season.",
      },
      { property: "og:title", content: "Unity Cup — Indian Football Tournament" },
      {
        property: "og:description",
        content: "Floodlit nights, fierce rivalries, one trophy. Register your team for Unity Cup.",
      },
    ],
  }),
  component: Home,
});

const pills = ["10 teams", "Floodlit Nights", "One Trophy"];

function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-background">
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:object-right lg:object-center"
          src="/__l5e/assets-v1/19f3988e-87e9-49f3-bf1f-680b8d2aac4c/hero-football.mp4"
        />

        <div className="absolute inset-0 z-10 flex flex-col px-4 py-4 sm:px-10 sm:py-8 lg:px-12">
          <SiteNav />

          <div className="flex-1 sm:hidden" />

          <div className="flex flex-col pb-4 sm:mt-auto sm:flex-1 sm:flex-row sm:items-end sm:pb-12 lg:pb-16">
            <div className="flex flex-col gap-4 sm:gap-6">
              <h1 className="reveal font-askan max-w-[700px] text-[2rem] leading-[1.05] tracking-tight text-white sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]">
                Not to be known but to be heard
              </h1>
              <p className="reveal max-w-[520px] text-xs leading-relaxed text-white/70 sm:text-base md:text-lg">
                Unity Cup is the football tournament built for India's clubs, colleges and
                neighbourhood sides. Real pitches, real crowds, and a season that ends under
                floodlights.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Thanks! We'll keep you posted at ${email}`);
                }}
                className="relative max-w-[420px]"
              >
                <div className="glass rounded-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none sm:px-6 sm:py-4"
                  />
                </div>
                <button
                  type="submit"
                  className="absolute top-1.5 right-1.5 rounded-full bg-white px-3 py-2 text-xs font-medium text-gray-900 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Get updates
                </button>
              </form>

              <Link
                to="/register"
                className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                Register now
              </Link>

              <div className="mt-2 flex flex-wrap gap-2 sm:hidden">
                {pills.map((p) => (
                  <span key={p} className="glass rounded-full px-3 py-1.5 text-xs text-white">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden flex-col items-end gap-2 self-end sm:ml-auto sm:flex">
              {pills.map((p) => (
                <span
                  key={p}
                  className="glass float-slow rounded-full px-4 py-2 text-xs text-white sm:text-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* marquee ticker */}
      <div className="relative overflow-hidden border-y border-white/10 bg-card/40 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, i) =>
            [
              "Unity Cup Season 03",
              "10 Teams",
              "Floodlit Nights",
              "Open Registration",
              "One Trophy",
              "Played Across India",
            ].map((t) => (
              <span
                key={`${i}-${t}`}
                className="font-askan flex items-center gap-10 text-sm tracking-[0.25em] text-white/45 uppercase sm:text-base"
              >
                {t}
                <span className="text-primary">◆</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* stats */}
      <section className="relative px-4 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            { n: "10", l: "Teams" },
            { n: "3", l: "Seasons" },
            { n: "24", l: "Matches" },
            { n: "1", l: "Trophy" },
          ].map((s) => (
            <div key={s.l} className="bg-background px-6 py-8 text-center">
              <p className="font-askan text-gradient-gold text-4xl sm:text-5xl">{s.n}</p>
              <p className="mt-2 text-xs tracking-[0.2em] text-white/50 uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* season at a glance */}
      <section className="relative px-4 pb-20 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">The format</p>
          <h2 className="font-askan mt-3 text-3xl tracking-tight text-white sm:text-5xl">
            The season at a glance
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Group Stage",
                d: "Ten teams, two groups, played across weekends on full-size turf.",
              },
              {
                n: "02",
                t: "Knockouts",
                d: "Single-leg quarters and semis, decided under the lights.",
              },
              { n: "03", t: "The Final", d: "One night, one trophy, and a city that shows up." },
            ].map((c) => (
              <article
                key={c.t}
                className="group lift hover:lift-hover relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 hover:border-primary/40"
              >
                <span className="font-askan absolute -top-2 right-4 text-6xl text-white/5">
                  {c.n}
                </span>
                <h3 className="font-askan relative text-xl text-white">{c.t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/60">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* image showcase */}
      <section className="relative px-4 pb-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">Match nights</p>
              <h2 className="font-askan mt-3 text-3xl tracking-tight text-white sm:text-5xl">
                Scenes from the pitch
              </h2>
            </div>
            <Link
              to="/gallery"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
            >
              View all media
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { src: actionNight, t: "Under the lights", s: "Group stage, Season 03" },
              { src: fansNight, t: "The twelfth man", s: "Home end, semi-final night" },
              { src: trophyNight, t: "Champions", s: "Season 02 final" },
            ].map((img, i) => (
              <figure
                key={img.t}
                className={`group lift hover:lift-hover relative overflow-hidden rounded-3xl border border-white/10 ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={`${img.t} — Unity Cup football`}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 p-6">
                  <p className="font-askan text-xl text-white">{img.t}</p>
                  <p className="text-xs text-white/60">{img.s}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* why play + champions */}
      <section className="relative px-4 pb-20 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-card/60 p-8 sm:p-10">
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">Why play</p>
            <h2 className="font-askan mt-3 text-3xl tracking-tight text-white sm:text-4xl">
              Built for clubs, colleges and neighbourhood sides
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                ["Full-size turf", "Every match on proper pitches with certified referees."],
                ["Fair draw", "Open group draw, published fixtures, no favourites."],
                ["Player records", "Goals, assists and clean sheets tracked all season."],
                ["Media coverage", "Photos and match videos from every round."],
              ].map(([t, d]) => (
                <li key={t} className="border-l border-primary/40 pl-4">
                  <p className="font-askan text-lg text-white">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-card/60 p-8 sm:p-10">
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">Roll of honour</p>
            <div className="mt-6 divide-y divide-white/10">
              {[
                ["Season 01", "Kolkata United"],
                ["Season 02", "Deccan Rangers"],
                ["Season 03", "Registration open"],
              ].map(([s, w]) => (
                <div key={s} className="flex items-center justify-between py-4">
                  <span className="text-sm text-white/50">{s}</span>
                  <span className="font-askan text-right text-lg text-white">{w}</span>
                </div>
              ))}
            </div>
            <Link
              to="/seasons"
              className="mt-6 inline-block rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/5"
            >
              Browse seasons
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative px-4 pb-20 sm:px-10 lg:px-12">
        <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/20 via-card/70 to-accent/15 px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="font-askan text-3xl tracking-tight text-white sm:text-5xl">
            Your team. Your season. <span className="text-gradient-gold">One trophy.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-white/70 sm:text-base">
            Entries for Season 03 are open. Send your squad details and the payment receipt to lock
            your slot.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              Register now
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm text-white transition-colors hover:bg-white/5"
            >
              Talk to us
            </Link>
          </div>
        </div>
        <SiteFooter />
      </section>
    </div>
  );
}

