import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Menu, X, Home, Info, Trophy, Image as ImageIcon, Mail, ShieldAlert } from "lucide-react";
import { useState, useMemo } from "react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

const mobileLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/seasons", label: "Seasons" },
  { to: "/gallery", label: "Media" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = useMemo(() => [
    { title: "Home", icon: Home, to: "/" },
    { title: "About", icon: Info, to: "/about" },
    { title: "Seasons", icon: Trophy, to: "/seasons" },
    { type: "separator" as const },
    { title: "Media", icon: ImageIcon, to: "/gallery" },
    { title: "Contact", icon: Mail, to: "/contact" },
  ], []);

  // Find the index of the currently active route
  const activeIndex = useMemo(() => {
    const index = tabs.findIndex(t => t.type !== "separator" && t.to === location.pathname);
    return index >= 0 ? index : null;
  }, [location.pathname, tabs]);

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tab = tabs[index];
      if (tab && tab.type !== "separator" && tab.to) {
        navigate({ to: tab.to });
      }
    }
  };

  return (
    <nav className="glass sticky top-4 z-50 flex w-full md:w-fit mx-auto items-center justify-between md:justify-center md:gap-12 rounded-full px-4 py-2 sm:px-6 shadow-2xl shadow-black/20">
      
      {/* Left: Logo */}
      <Link to="/" className="flex items-center text-ink shrink-0">
        <img src="/src/assets/logo-nobg.png" alt="Unity Cup Logo" className="h-10 w-auto object-contain" />
      </Link>

      {/* Center: Desktop Animated Tabs */}
      <div className="hidden md:block">
        <ExpandableTabs 
          tabs={tabs as any} 
          defaultSelected={activeIndex} 
          onChange={handleTabChange} 
          activeColor="text-primary font-bold" 
          className="bg-transparent border-none shadow-none backdrop-blur-none p-0"
        />
      </div>

      {/* Right: Register & Mobile Toggle */}
      <div className="flex items-center gap-4 shrink-0">
        <Link
          to="/register"
          className="hidden md:flex rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 shadow-xl shadow-primary/20"
        >
          Register
        </Link>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="glass absolute top-[4.5rem] right-0 left-0 z-50 rounded-2xl p-5 md:hidden shadow-2xl">
          <div className="flex flex-col gap-4">
            {mobileLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-ink/90 font-medium text-lg border-b border-ink/5 pb-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-4 text-center font-bold text-primary-foreground shadow-xl shadow-primary/20"
            >
              Register your team
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
