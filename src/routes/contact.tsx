import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Unity Cup — Teams, Media & Sponsors" },
      {
        name: "description",
        content:
          "Get in touch with the Unity Cup organising team about entries, fixtures, media accreditation or sponsorship.",
      },
      { property: "og:title", content: "Contact Unity Cup" },
      {
        property: "og:description",
        content: "Reach the Unity Cup organising team about entries, media or sponsorship.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to the organisers."
      intro="Questions about entries, fixtures, media access or sponsorship? Send a note and we'll reply within two working days."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          {[
            { icon: Mail, label: "Email", value: "hello@unitycup.in" },
            { icon: Phone, label: "Phone", value: "+91 98000 00000" },
            { icon: MapPin, label: "Ground office", value: "Salt Lake Sports Complex, Kolkata" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-card/60 p-5"
            >
              <c.icon className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs tracking-wide text-ink/40 uppercase">{c.label}</p>
                <p className="mt-1 text-sm text-ink">{c.value}</p>
              </div>
            </div>
          ))}
          <p className="text-xs leading-relaxed text-ink/40">
            These contact details are placeholders — send me the real email, phone number and
            address and I'll put them in.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-ink/10 bg-card/60 p-6 sm:p-8"
        >
          {sent ? (
            <div className="py-12 text-center">
              <h2 className="font-askan text-2xl text-ink">Message sent</h2>
              <p className="mt-2 text-sm text-ink/60">Thanks — we'll be in touch shortly.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Field label="Your name" name="name" placeholder="Full name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              <Field label="Subject" name="subject" placeholder="Team entry, media, sponsorship…" />
              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-wide text-ink/50 uppercase">Message</span>
                <textarea
                  required
                  rows={5}
                  className="rounded-2xl border border-ink/10 bg-black/30 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-primary/50 focus:outline-none"
                  placeholder="Tell us a bit more…"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Send message
              </button>
            </div>
          )}
        </form>
      </div>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs tracking-wide text-ink/50 uppercase">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-full border border-ink/10 bg-black/30 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-primary/50 focus:outline-none"
      />
    </label>
  );
}
