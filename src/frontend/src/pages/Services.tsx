import PeacockDivider from "@/components/PeacockDivider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Clock, IndianRupee } from "lucide-react";
import { useState } from "react";

type Category = "All" | "Bridal" | "Hair" | "Skin Care" | "Nails" | "Mehendi";

const services = [
  {
    id: 1,
    name: "Bridal Makeup",
    category: "Bridal",
    price: "₹5,000–15,000",
    duration: "3–5 hrs",
    image: "/assets/generated/bridal-makeup.dim_600x400.jpg",
    description: "Complete bridal look with traditional and modern techniques",
  },
  {
    id: 2,
    name: "Royal Bridal Package",
    category: "Bridal",
    price: "₹20,000–35,000",
    duration: "Full Day",
    image: "/assets/generated/bridal-makeup.dim_600x400.jpg",
    description: "Full day pampering — makeup, hair, mehendi & more",
    featured: true,
  },
  {
    id: 3,
    name: "Hair Spa",
    category: "Hair",
    price: "₹800–2,000",
    duration: "1–2 hrs",
    image: "/assets/generated/hair-spa.dim_600x400.jpg",
    description: "Deep conditioning & nourishing hair spa treatments",
  },
  {
    id: 4,
    name: "Hair Styling",
    category: "Hair",
    price: "₹500–1,500",
    duration: "45 min–1 hr",
    image: "/assets/generated/hair-styling.dim_600x400.jpg",
    description: "Updos, braids, blow-dry & event-ready styles",
  },
  {
    id: 5,
    name: "Glow-Up Facial",
    category: "Skin Care",
    price: "₹1,200–3,500",
    duration: "1–1.5 hrs",
    image: "/assets/generated/facial-treatment.dim_600x400.jpg",
    description: "Radiance-boosting facial with natural extracts",
    featured: true,
  },
  {
    id: 6,
    name: "Party Makeup",
    category: "Bridal",
    price: "₹2,000–5,000",
    duration: "1–2 hrs",
    image: "/assets/generated/party-makeup.dim_600x400.jpg",
    description: "Glamorous looks for parties, receptions & events",
  },
  {
    id: 7,
    name: "Mehendi Design",
    category: "Mehendi",
    price: "₹500–3,000",
    duration: "1–4 hrs",
    image: "/assets/generated/mehendi-art.dim_600x400.jpg",
    description: "Intricate bridal & designer mehendi patterns",
  },
  {
    id: 8,
    name: "Nail Art",
    category: "Nails",
    price: "₹300–1,200",
    duration: "30–60 min",
    image: "/assets/generated/nail-art.dim_600x400.jpg",
    description: "Creative nail art, gel manicure & nail extensions",
  },
  {
    id: 9,
    name: "Hair Coloring",
    category: "Hair",
    price: "₹1,500–5,000",
    duration: "2–3 hrs",
    image: "/assets/generated/hair-styling.dim_600x400.jpg",
    description: "Global color, highlights, balayage & more",
  },
  {
    id: 10,
    name: "Waxing & Threading",
    category: "Skin Care",
    price: "₹200–800",
    duration: "30–45 min",
    image: "/assets/generated/facial-treatment.dim_600x400.jpg",
    description: "Full body waxing & eyebrow/facial threading",
  },
];

const categories: Category[] = [
  "All",
  "Bridal",
  "Hair",
  "Skin Care",
  "Nails",
  "Mehendi",
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);
  const featured = services.filter((s) => s.featured);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-br from-secondary/30 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
            🦚 Our Expertise 🪷
          </p>
          <h1 className="section-title mb-4">Our Services</h1>
          <PeacockDivider />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
            From everyday beauty to your most special occasions — we have
            everything you need
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid="services.filter.tab"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 font-body text-sm px-4 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc) => (
              <div key={svc.id} className="service-card group">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="font-body text-xs bg-white/90 text-foreground border-0">
                      {svc.category}
                    </Badge>
                  </div>
                  {svc.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="font-body text-xs bg-accent text-accent-foreground border-0">
                        ⭐ Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold mb-1">
                    {svc.name}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mb-3">
                    {svc.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-sm gold-text font-semibold flex items-center gap-1">
                      <IndianRupee size={12} />
                      {svc.price.replace("₹", "")}
                    </span>
                    <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} />
                      {svc.duration}
                    </span>
                  </div>
                  <Link to="/booking">
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:opacity-90 text-xs"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
              Exclusive Offers
            </p>
            <h2 className="section-title">Special Packages</h2>
            <PeacockDivider className="mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((pkg) => (
              <div
                key={pkg.id}
                className="relative overflow-hidden rounded-2xl border-2 border-accent bg-gradient-to-br from-secondary/30 to-background p-6 shadow-glow"
              >
                <div className="absolute top-4 right-4 text-2xl">🦚</div>
                <h3 className="font-display text-2xl font-bold maroon-text mb-2">
                  {pkg.name}
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-body font-bold text-lg gold-text">
                    {pkg.price}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    • {pkg.duration}
                  </span>
                </div>
                <Link to="/booking">
                  <Button className="bg-primary text-primary-foreground hover:opacity-90">
                    Book This Package
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
