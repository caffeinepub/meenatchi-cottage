import { type ReactNode, createContext, useContext, useState } from "react";

type Lang = "en" | "ta";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", ta: "முகப்பு" },
  "nav.services": { en: "Services", ta: "சேவைகள்" },
  "nav.gallery": { en: "Gallery", ta: "படங்கள்" },
  "nav.about": { en: "About", ta: "பற்றி" },
  "nav.booking": { en: "Book Now", ta: "இப்போது பதிவு செய்" },
  // Hero
  "hero.headline": {
    en: "Unleash Your Inner Beauty at Alagu Mayil",
    ta: "உங்கள் அழகை வெளிப்படுத்துங்கள்",
  },
  "hero.subtext": {
    en: "Premium beauty salon in Rānipet, Tamil Nadu — where tradition meets elegance",
    ta: "ரானிப்பேட்டில் சிறந்த அழகு நிலையம் — மரபும் நவீனமும் சந்திக்கும் இடம்",
  },
  "hero.cta_primary": { en: "Book Now", ta: "இப்போது பதிவு செய்" },
  "hero.cta_secondary": { en: "View Services", ta: "சேவைகள் காண்க" },
  // Sections
  "section.featured_services": {
    en: "Our Featured Services",
    ta: "சிறப்பு சேவைகள்",
  },
  "section.testimonials": {
    en: "What Our Clients Say",
    ta: "வாடிக்கையாளர் கருத்துக்கள்",
  },
  "section.cta_banner": {
    en: "Ready for Your Transformation?",
    ta: "உங்கள் மாற்றத்திற்கு தயாரா?",
  },
  "section.book_now": {
    en: "Book Your Appointment",
    ta: "உங்கள் சந்திப்பை பதிவு செய்யுங்கள்",
  },
  // Footer
  "footer.tagline": {
    en: "Where Every Woman is a Queen 👑",
    ta: "ஒவ்வொரு பெண்ணும் ஒரு ராணி 👑",
  },
  "footer.made_with": {
    en: "Made with ❤️ in Tamil Nadu",
    ta: "தமிழ்நாட்டில் ❤️ உடன் உருவாக்கப்பட்டது",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "ta" : "en"));
  const t = (key: string) => translations[key]?.[lang] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
