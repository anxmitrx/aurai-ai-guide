import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

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

      <section className="relative px-4 py-20 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl">
          <h2 className="font-askan text-3xl tracking-tight text-white sm:text-5xl">
            The season at a glance
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Group Stage",
                d: "Twelve clubs, four groups, played across weekends on full-size turf.",
              },
              { t: "Knockouts", d: "Single-leg quarters and semis, decided under the lights." },
              { t: "The Final", d: "One night, one trophy, and a city that shows up for it." },
            ].map((c) => (
              <article
                key={c.t}
                className="rounded-2xl border border-white/10 bg-card/60 p-6 transition-colors hover:border-primary/40"
              >
                <h3 className="font-askan text-xl text-white">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.d}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/seasons"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white hover:bg-white/5"
            >
              Browse seasons
            </Link>
            <Link
              to="/gallery"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white hover:bg-white/5"
            >
              Photos & videos
            </Link>
          </div>
        </div>
        <SiteFooter />
      </section>
    </div>
  );
}
