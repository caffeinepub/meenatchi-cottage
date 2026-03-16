import PeacockDivider from "@/components/PeacockDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const featuredServices = [
  {
    name: "Bridal Makeup",
    price: "From ₹5,000",
    image: "/assets/generated/bridal-makeup.dim_600x400.jpg",
    icon: "👰",
  },
  {
    name: "Hair Spa",
    price: "From ₹800",
    image: "/assets/generated/hair-spa.dim_600x400.jpg",
    icon: "💆",
  },
  {
    name: "Facial",
    price: "From ₹1,200",
    image: "/assets/generated/facial-treatment.dim_600x400.jpg",
    icon: "✨",
  },
  {
    name: "Party Makeup",
    price: "From ₹2,000",
    image: "/assets/generated/party-makeup.dim_600x400.jpg",
    icon: "🎉",
  },
];

const testimonials = [
  {
    name: "Preethi Rajan",
    service: "Bridal Makeup",
    rating: 5,
    text: "Absolutely stunning bridal makeup! The team made my wedding day unforgettable. Every detail was perfect — I felt like a queen!",
  },
  {
    name: "Kavya Krishnan",
    service: "Hair Spa",
    rating: 5,
    text: "My hair has never felt this healthy and beautiful. The hair spa treatment was deeply relaxing and the results are amazing.",
  },
  {
    name: "Anitha Subramani",
    service: "Party Makeup",
    rating: 5,
    text: "Went for my sister's reception and got such beautiful makeup done. The artists are so talented and professional!",
  },
  {
    name: "Deepa Murugan",
    service: "Mehendi Design",
    rating: 5,
    text: "Intricate and beautiful mehendi patterns. The design lasted for weeks and I received so many compliments. Highly recommend!",
  },
];

function FadeSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setTestimonialIdx((i) => (i + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Promo Banner */}
      {!promoDismissed && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-accent text-accent-foreground text-center text-sm py-2 px-4 flex items-center justify-center gap-2">
          <span className="font-body font-medium">
            ✨ Diwali Special: 20% off all Bridal packages! Book before Nov 15
          </span>
          <button
            type="button"
            data-ocid="promo.close_button"
            onClick={() => setPromoDismissed(true)}
            className="ml-4 p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ marginTop: promoDismissed ? "4rem" : "6.5rem" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/peacock-hero.dim_1200x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <p className="font-body text-accent text-sm tracking-[0.3em] uppercase mb-4">
              🦚 Premium Beauty Salon 🪷
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6">
              {t("hero.headline")}
            </h1>
            <p className="font-body text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {t("hero.subtext")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <button
                  type="button"
                  data-ocid="hero.primary_button"
                  className="btn-primary bg-primary text-primary-foreground px-10 py-4 text-base"
                >
                  {t("hero.cta_primary")}
                </button>
              </Link>
              <Link to="/services">
                <button
                  type="button"
                  data-ocid="hero.secondary_button"
                  className="btn-gold border-white text-white hover:bg-white hover:text-foreground px-10 py-4 text-base"
                >
                  {t("hero.cta_secondary")}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-background peacock-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
              What We Offer
            </p>
            <h2 className="section-title">{t("section.featured_services")}</h2>
            <PeacockDivider className="mt-4" />
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((svc, i) => (
              <FadeSection key={svc.name} className={`delay-[${i * 100}ms]`}>
                <div className="service-card group cursor-pointer">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-lg">
                      {svc.icon}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {svc.name}
                    </h3>
                    <p className="font-body text-sm gold-text font-medium mb-3">
                      {svc.price}
                    </p>
                    <Link to="/booking">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary maroon-text hover:bg-primary hover:text-primary-foreground text-xs"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <FadeSection>
        <section className="py-16 bg-secondary/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
              Our Legacy
            </p>
            <h2 className="section-title mb-4">
              Trusted Beauty Experts Since 2009
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-10">
              Alagu Mayil Beauty Parlour has been the bridal and beauty
              destination of choice in Rānipet for over 15 years. Our expertly
              trained stylists specialize in Bollywood and Kollywood-inspired
              looks.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { stat: "1000+", label: "Happy Brides" },
                { stat: "15+", label: "Years Experience" },
                { stat: "50+", label: "Expert Stylists" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold maroon-text">
                    {item.stat}
                  </div>
                  <div className="font-body text-sm text-muted-foreground mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeSection className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
              Client Stories
            </p>
            <h2 className="section-title">{t("section.testimonials")}</h2>
            <PeacockDivider className="mt-4" />
          </FadeSection>
          <div className="relative">
            <Card className="border-0 shadow-card-hover bg-gradient-to-br from-secondary/20 to-background">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({
                    length: testimonials[testimonialIdx].rating,
                  }).map((_, i) => (
                    <Star
                      key={`star-${testimonials[testimonialIdx].name}-${i}`}
                      size={18}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
                <blockquote className="font-display text-xl md:text-2xl italic text-foreground leading-relaxed mb-6">
                  "{testimonials[testimonialIdx].text}"
                </blockquote>
                <div className="font-body font-semibold maroon-text">
                  {testimonials[testimonialIdx].name}
                </div>
                <div className="font-body text-sm text-muted-foreground">
                  {testimonials[testimonialIdx].service}
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((t2) => (
                <button
                  type="button"
                  key={t2.name}
                  onClick={() => setTestimonialIdx(testimonials.indexOf(t2))}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    testimonials[testimonialIdx].name === t2.name
                      ? "bg-primary w-6"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setTestimonialIdx(
                  (i) => (i - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() =>
                setTestimonialIdx((i) => (i + 1) % testimonials.length)
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary">
        <FadeSection className="text-center px-4">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-accent mb-2">
            ✨ Limited Slots Available
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">
            {t("section.cta_banner")}
          </h2>
          <p className="font-body text-white/70 mb-8 max-w-xl mx-auto">
            Book your appointment today and let our expert stylists create your
            perfect look.
          </p>
          <Link to="/booking">
            <button
              type="button"
              className="btn-gold border-accent gold-text hover:bg-accent hover:text-accent-foreground px-10 py-4 text-base"
            >
              {t("hero.cta_primary")}
            </button>
          </Link>
        </FadeSection>
      </section>
    </div>
  );
}
