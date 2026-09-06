import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { UnityLogo } from "./UnityLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/seasons", label: "Seasons" },
  { to: "/gallery", label: "Media" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between">
      <div className="glass flex items-center rounded-2xl px-4 py-2.5 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-center gap-2.5 text-white">
          <UnityLogo className="w-5 h-5 sm:w-7 sm:h-7" />
          <span className="font-askan text-base sm:text-xl tracking-wide">Unity Cup</span>
        </Link>

        <div className="ml-6 hidden items-center gap-6 md:flex">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-white/70 transition-colors hover:text-white"
              activeProps={{ className: "text-sm text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-4 text-white sm:ml-32 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <Link
        to="/register"
        className="hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-transform hover:scale-105 sm:block"
      >
        Register now
      </Link>

      {open && (
        <div className="glass absolute top-[4.5rem] right-4 left-4 z-20 rounded-2xl p-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/90"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-gray-900"
            >
              Register now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
