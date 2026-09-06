import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-10 sm:py-8 lg:px-12">
        <SiteNav />

        <header className="mx-auto mt-16 max-w-5xl text-center sm:mt-24">
          <p className="reveal text-xs tracking-[0.35em] text-primary uppercase">{eyebrow}</p>
          <h1 className="reveal font-askan mt-4 text-[2.25rem] leading-[1.05] tracking-tight text-white sm:text-[3.5rem] lg:text-[4.25rem]">
            {title}
          </h1>
          {intro && (
            <p className="reveal mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
              {intro}
            </p>
          )}
        </header>

        <main className="mx-auto mt-14 max-w-6xl pb-20">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
