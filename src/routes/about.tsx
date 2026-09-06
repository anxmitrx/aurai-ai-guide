import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import organizer1 from "@/assets/organizer-1.jpg";
import organizer2 from "@/assets/organizer-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Unity Cup — Our Story & Organisers" },
      {
        name: "description",
        content:
          "What Unity Cup is about, how the Indian football tournament runs, and the two organisers behind it.",
      },
      { property: "og:title", content: "About Unity Cup" },
      {
        property: "og:description",
        content: "The story behind Unity Cup and the people who organise it.",
      },
    ],
  }),
  component: About,
});

const organisers = [
  {
    name: "Arjun Mehta",
    role: "Tournament Director",
    img: organizer1,
    bio: "A former state-level midfielder who started Unity Cup with two borrowed goalposts and a WhatsApp group.",
  },
  {
    name: "Priya Nair",
    role: "Operations & Partnerships",
    img: organizer2,
    bio: "Runs scheduling, referees and club relations, and makes sure every match kicks off on time.",
  },
];

function About() {
  return (
    <PageShell
      eyebrow="About"
      title="A tournament built by players, for players."
      intro="Unity Cup began as a single weekend fixture between neighbourhood clubs. Today it is a full season of competitive Indian football with proper officiating, live coverage and a final worth travelling for."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            t: "What it is",
            d: "An open, invitational football tournament for clubs, colleges and community teams across India — group stage, knockouts and a floodlit final.",
          },
          {
            t: "Why it exists",
            d: "Good players are everywhere; good competitions are not. Unity Cup gives local sides a real stage, honest refereeing and a record of their season.",
          },
          {
            t: "How teams join",
            d: "Squads register online, pay the entry fee and upload their receipt. Fixtures are published once groups are drawn.",
          },
          {
            t: "What players get",
            d: "Certified referees, match footage, photography, medical cover on site and a shot at the trophy.",
          },
        ].map((c) => (
          <article
            key={c.t}
            className="rounded-2xl border border-white/10 bg-card/60 p-6 transition-colors hover:border-primary/40"
          >
            <h2 className="font-askan text-xl text-white">{c.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{c.d}</p>
          </article>
        ))}
      </div>

      <h2 className="font-askan mt-20 text-center text-3xl tracking-tight text-white sm:text-4xl">
        The organising members
      </h2>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
        {organisers.map((o) => (
          <article
            key={o.name}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-card/60"
          >
            <img
              src={o.img}
              alt={`${o.name}, ${o.role} of Unity Cup`}
              loading="lazy"
              width={800}
              height={1000}
              className="h-80 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="p-6">
              <h3 className="font-askan text-2xl text-white">{o.name}</h3>
              <p className="mt-1 text-xs tracking-[0.2em] text-primary uppercase">{o.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{o.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
