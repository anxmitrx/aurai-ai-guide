import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register Now — Unity Cup Season 03 Entry" },
      {
        name: "description",
        content:
          "Enter your team in Unity Cup Season 03. Share your name, phone number, email and upload the payment receipt to confirm your slot.",
      },
      { property: "og:title", content: "Register for Unity Cup" },
      {
        property: "og:description",
        content: "Submit your details and payment receipt to confirm your Unity Cup entry.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const [receipt, setReceipt] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <PageShell
      eyebrow="Register"
      title="Claim your slot in Season 03."
      intro="Fill in your details, upload the payment receipt, and we'll confirm your team's entry by email."
    >
      <div className="mx-auto max-w-2xl">
        {done ? (
          <div className="rounded-3xl border border-accent/30 bg-card/60 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-7 w-7 text-accent" />
            </div>
            <h2 className="font-askan mt-5 text-3xl text-ink">Entry received</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/60">
              Thanks for registering. We'll verify the receipt and email your confirmation with
              fixture dates.
            </p>
            <Link
              to="/"
              className="mt-7 inline-block rounded-full border border-ink/15 px-6 py-3 text-sm text-ink hover:bg-primary/5"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="rounded-3xl border border-ink/10 bg-card/60 p-6 sm:p-9"
          >
            <div className="flex flex-col gap-5">
              <Input label="Full name" placeholder="Your name" />
              <Input label="Team / club name" placeholder="e.g. Kolkata United" />
              <Input label="Phone number" type="tel" placeholder="+91 98XXXXXXXX" />
              <Input label="Email ID" type="email" placeholder="you@example.com" />

              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-wide text-ink/50 uppercase">
                  Payment receipt
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-black/30 px-4 py-5 transition-colors hover:border-primary/50">
                  <Upload className="h-5 w-5 text-primary" />
                  <input
                    required
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setReceipt(e.target.files?.[0]?.name ?? null)}
                    className="w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-medium file:text-primary-foreground"
                  />
                </div>
                <span className="text-xs text-ink/40">
                  {receipt ? `Attached: ${receipt}` : "Screenshot or PDF of your entry fee payment"}
                </span>
              </label>

              <button
                type="submit"
                className="mt-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Submit registration
              </button>
              <p className="text-xs leading-relaxed text-ink/40">
                Entries are reviewed manually right now — nothing is stored online yet. Say the word
                and I'll connect a database so every registration and receipt is saved for you.
              </p>
            </div>
          </form>
        )}
      </div>
    </PageShell>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs tracking-wide text-ink/50 uppercase">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="rounded-full border border-ink/10 bg-black/30 px-5 py-3.5 text-sm text-ink placeholder:text-ink/40 focus:border-primary/50 focus:outline-none"
      />
    </label>
  );
}
