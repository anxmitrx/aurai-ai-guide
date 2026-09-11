import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Preloader } from "@/components/Preloader";
import actionNight from "@/assets/action-night.jpg";
import fansNight from "@/assets/fans-night.jpg";
import trophyNight from "@/assets/trophy-night.jpg";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { getSeasons, getStats } from "@/api";

export const Route = createFileRoute("/")({
  loader: async () => {
    const stats = await getStats();
    const seasonsList = await getSeasons();
    return { stats, seasonsList };
  },
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
const slideImages = [hero1, hero2, hero3];

function Home() {
  const { stats, seasonsList } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations & Parallax
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          duration: 1.2, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: 0.5
        }
      );

      gsap.to(".hero-bg-img", {
        scale: 1.05,
        duration: 10,
        ease: "none",
        yoyo: true,
        repeat: -1
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background overflow-x-hidden">
      <Preloader />
      
      {/* Main Content Area (Z-10 over the fixed footer) */}
      <div className="relative z-10 bg-background shadow-2xl pb-10">
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-background flex flex-col items-center">
          
          {/* Cinematic Background: Horizontal Split Screen (Triptych) */}
          <div className="absolute inset-0 z-0 bg-background flex w-full h-full">
            {slideImages.map((src, i) => (
              <div key={i} className="flex-1 h-full relative overflow-hidden border-r border-ink/5 last:border-r-0">
                <img
                  src={src}
                  alt={`Elite Football Player ${i}`}
                  className="hero-bg-img h-full w-full object-cover opacity-80"
                />
              </div>
            ))}
            
            {/* Subtle dark overlay so text is readable, but images remain highly visible */}
            <div className="absolute inset-0 bg-background/50 z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90 z-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-[50%] bg-primary/20 blur-[120px] pointer-events-none mix-blend-screen z-20" />
            <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none z-20" />
          </div>

          <div className="absolute inset-x-0 top-0 z-20 flex flex-col px-4 py-4 sm:px-10 sm:py-8 lg:px-12">
            <SiteNav />
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 w-full max-w-5xl mt-20">
            <h1 className="hero-reveal font-askan text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.9] tracking-tighter text-ink uppercase text-glow mb-6 drop-shadow-2xl">
              Not to be <span className="text-gradient-gold">known</span>,<br /> 
              but to be <span className="text-gradient-gold">remembered</span>.
            </h1>
            
            <p className="hero-reveal max-w-[600px] text-sm sm:text-base md:text-lg text-ink/80 leading-relaxed mb-10 font-medium drop-shadow-md">
              Unity Cup is the elite tournament built for India's clubs and colleges. 
              Real pitches, massive crowds, and a season decided under the lights.
            </p>

            <Link
              to="/register"
              className="hero-reveal flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm sm:text-base font-bold text-primary-foreground transition-all hover:scale-105 shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary),0.5)]"
            >
              <span>Register Your Squad</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Bottom Dock Stats */}
          <div className="hero-reveal absolute bottom-12 z-20 hidden md:flex items-center gap-8 glass rounded-full px-8 py-4 shadow-2xl">
            {pills.map((p, i) => (
              <div key={p} className="flex items-center gap-8">
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-ink/80">{p}</span>
                {i !== pills.length - 1 && <span className="text-primary/40 text-xl">✦</span>}
              </div>
            ))}
          </div>
          
          {/* Mobile Bottom Stats (Simpler format) */}
          <div className="hero-reveal absolute bottom-8 z-20 flex md:hidden flex-wrap justify-center gap-3 w-full px-4">
            {pills.map((p) => (
              <span key={p} className="glass rounded-full px-4 py-2 text-xs font-bold tracking-wider text-ink/90 uppercase">
                {p}
              </span>
            ))}
          </div>

        </section>

        {/* marquee ticker */}
        <div className="relative overflow-hidden border-y border-primary bg-primary py-4 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
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
                  className="font-askan flex items-center gap-10 text-sm tracking-[0.25em] text-background uppercase font-bold sm:text-base"
                >
                  {t}
                  <span className="text-background/50">◆</span>
                </span>
              )),
            )}
          </div>
        </div>

        {/* stats */}
        <section className="relative px-4 py-16 sm:px-10 lg:px-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-primary/10 sm:grid-cols-4">
            {[
              { n: stats?.teamsCount?.toString() ?? "10", l: "Teams" },
              { n: stats?.seasonsCount?.toString() ?? "2", l: "Seasons" },
              { n: stats?.matchesCount?.toString() ?? "24", l: "Matches" },
              { n: stats?.trophyCount?.toString() ?? "1", l: "Trophy" },
            ].map((s) => (
              <div key={s.l} className="bg-background px-6 py-8 text-center">
                <p className="font-askan text-gradient-gold text-4xl sm:text-5xl">{s.n}</p>
                <p className="mt-2 text-xs tracking-[0.2em] text-ink/50 uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* season at a glance */}
        <section className="relative px-4 pb-20 sm:px-10 lg:px-12">
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className="relative mx-auto max-w-6xl">
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">The format</p>
            <h2 className="font-askan mt-3 text-3xl tracking-tight text-ink sm:text-5xl">
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
                  className="group lift hover:lift-hover relative overflow-hidden rounded-2xl border border-ink/10 bg-card/60 p-6 hover:border-primary/40"
                >
                  <span className="font-askan absolute -top-2 right-4 text-6xl text-ink/5">
                    {c.n}
                  </span>
                  <h3 className="font-askan relative text-xl text-ink">{c.t}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-ink/60">{c.d}</p>
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
                <h2 className="font-askan mt-3 text-3xl tracking-tight text-ink sm:text-5xl">
                  Scenes from the pitch
                </h2>
              </div>
              <Link
                to="/gallery"
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink transition-colors hover:bg-primary/5"
              >
                View all media
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { src: actionNight, t: "Under the lights", s: "Group stage, Season 02" },
                { src: fansNight, t: "The twelfth man", s: "Home end, semi-final night" },
                { src: trophyNight, t: "Champions", s: "Season 02 final" },
              ].map((img, i) => (
                <figure
                  key={img.t}
                  className={`group lift hover:lift-hover relative overflow-hidden rounded-3xl border border-ink/10 ${
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
                    <p className="font-askan text-xl text-ink">{img.t}</p>
                    <p className="text-xs text-ink/60">{img.s}</p>
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
            <div className="rounded-3xl border border-ink/10 bg-card/60 p-8 sm:p-10">
              <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">Why play</p>
              <h2 className="font-askan mt-3 text-3xl tracking-tight text-ink sm:text-4xl">
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
                    <p className="font-askan text-lg text-ink">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-card/60 p-8 sm:p-10">
              <p className="text-xs tracking-[0.3em] text-primary/80 uppercase">Roll of honour</p>
              <div className="mt-6 divide-y divide-ink/10">
                {(seasonsList || []).map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-4">
                    <span className="text-sm text-ink/50">{s.name}</span>
                    <span className="font-askan text-right text-lg text-ink">
                      {s.champion !== "To be decided" ? s.champion : "Registration open"}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/seasons"
                className="mt-6 inline-block rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink transition-colors hover:bg-primary/5"
              >
                Browse seasons
              </Link>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="relative px-4 pb-10 sm:px-10 lg:px-12">
          <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-primary/25 bg-gradient-to-br from-primary/20 via-card/70 to-accent/15 px-6 py-14 text-center sm:px-12 sm:py-20">
            <h2 className="font-askan text-3xl tracking-tight text-ink sm:text-5xl">
              Your team. Your season. <span className="text-gradient-gold">One trophy.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-ink/70 sm:text-base">
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
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm text-ink transition-colors hover:bg-primary/5"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}

