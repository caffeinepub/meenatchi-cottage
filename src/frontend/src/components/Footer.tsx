import { useLang } from "@/contexts/LanguageContext";
import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/salon-logo-transparent.dim_300x300.png"
                alt="Alagu Mayil Logo"
                className="h-12 w-12 object-contain brightness-200"
              />
              <div>
                <div className="font-display text-xl font-bold">
                  Alagu Mayil
                </div>
                <div className="text-xs opacity-70 tracking-widest uppercase">
                  Beauty Parlour
                </div>
              </div>
            </div>
            <p className="font-body text-sm opacity-80 mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 gold-text">
              Quick Links
            </h4>
            <ul className="space-y-2 font-body text-sm opacity-80">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/about", label: "About Us" },
                { to: "/booking", label: "Book Appointment" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:opacity-100 hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 gold-text">
              Services
            </h4>
            <ul className="space-y-2 font-body text-sm opacity-80">
              {[
                "Bridal Makeup",
                "Hair Styling",
                "Facial",
                "Mehendi",
                "Nail Art",
                "Hair Spa",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 gold-text">
              Contact Us
            </h4>
            <ul className="space-y-3 font-body text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>123 Main Street, Rānipet, Tamil Nadu 632401</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                <a href="tel:+919876543210" className="hover:text-accent">
                  +91-98765-43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={14} className="shrink-0" />
                <span>Mon–Sun: 9 AM – 9 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs opacity-60">
            {t("footer.made_with")}
          </p>
          <p className="font-body text-xs opacity-60">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
