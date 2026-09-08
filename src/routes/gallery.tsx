import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import stadium from "@/assets/hero-stadium.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photos & Videos — Unity Cup Media" },
      {
        name: "description",
        content:
          "Match photography and video highlights from Unity Cup seasons — floodlit finals, celebrations and matchday atmosphere.",
      },
      { property: "og:title", content: "Unity Cup Photos & Videos" },
      {
        property: "og:description",
        content: "Match photography and highlight films from Unity Cup.",
      },
    ],
  }),
  component: Gallery,
});

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260618_174853_aac61aa2-0f3f-4cf1-bc78-7f657dd11164.mp4";

const shots = [
  { caption: "Season 02 final — kick-off", span: "sm:col-span-2 sm:row-span-2" },
  { caption: "Matchday crowd, north stand", span: "" },
  { caption: "Semi-final, extra time", span: "" },
  { caption: "Trophy night", span: "sm:col-span-2" },
];

function Gallery() {
  return (
    <PageShell
      eyebrow="Media"
      title="Photos and videos from the pitch."
      intro="A look at how Unity Cup matchdays actually feel — the noise, the lights and the long walk to the final whistle."
    >
      <div className="overflow-hidden rounded-3xl border border-ink/10">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={VIDEO}
          className="h-[45vh] w-full object-cover sm:h-[60vh]"
        />
      </div>
      <p className="mt-3 text-xs text-ink/40">Season highlight film</p>

      <div className="mt-12 grid auto-rows-[180px] gap-4 sm:grid-cols-4 sm:auto-rows-[200px]">
        {shots.map((s) => (
          <figure
            key={s.caption}
            className={`group relative overflow-hidden rounded-2xl border border-ink/10 ${s.span}`}
          >
            <img
              src={stadium}
              alt={s.caption}
              loading="lazy"
              width={1920}
              height={1080}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-ink">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </PageShell>
  );
}
