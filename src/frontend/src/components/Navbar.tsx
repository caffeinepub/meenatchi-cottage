import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();
  const location = useLocation();

  const links = [
    { to: "/", label: t("nav.home"), ocid: "nav.home_link" },
    { to: "/services", label: t("nav.services"), ocid: "nav.services_link" },
    { to: "/gallery", label: t("nav.gallery"), ocid: "nav.gallery_link" },
    { to: "/about", label: t("nav.about"), ocid: "nav.about_link" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/salon-logo-transparent.dim_300x300.png"
              alt="Alagu Mayil Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold maroon-text">
                Alagu Mayil
              </div>
              <div className="font-body text-xs text-muted-foreground tracking-widest uppercase">
                Beauty Parlour
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-ocid={l.ocid}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === l.to
                    ? "maroon-text border-b-2 border-primary"
                    : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              data-ocid="nav.language_toggle"
              onClick={toggleLang}
              className="font-body text-xs font-semibold border border-accent rounded-full px-3 py-1 gold-text hover:bg-accent hover:text-accent-foreground transition-all"
            >
              {lang === "en" ? "தமிழ்" : "EN"}
            </button>
            <Link to="/booking" data-ocid="nav.booking_link">
              <Button className="btn-primary text-xs px-5 py-2 h-auto">
                {t("nav.booking")}
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              data-ocid="nav.language_toggle"
              onClick={toggleLang}
              className="font-body text-xs font-semibold border border-accent rounded-full px-2 py-1 gold-text"
            >
              {lang === "en" ? "தமிழ்" : "EN"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-ocid={l.ocid}
              onClick={() => setOpen(false)}
              className="font-body text-sm font-medium text-foreground hover:text-primary py-2 border-b border-border last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/booking"
            data-ocid="nav.booking_link"
            onClick={() => setOpen(false)}
          >
            <Button className="btn-primary w-full mt-2">
              {t("nav.booking")}
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
