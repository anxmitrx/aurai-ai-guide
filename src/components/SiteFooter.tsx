import { Link } from "@tanstack/react-router";
import { UnityLogo } from "./UnityLogo";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-white/10 pt-8 pb-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-white">
          <UnityLogo className="h-5 w-5" />
          <span className="font-askan tracking-wide">Unity Cup</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/50">
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/seasons" className="hover:text-white">
            Seasons
          </Link>
          <Link to="/gallery" className="hover:text-white">
            Media
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
          <span>© {new Date().getFullYear()} Unity Cup India</span>
        </div>
      </div>
    </footer>
  );
}
