import PeacockDivider from "@/components/PeacockDivider";

const team = [
  {
    name: "Kavitha Devi",
    role: "Head Stylist & Founder",
    experience: "15+ years",
    color: "bg-secondary",
    initials: "KD",
    bio: "Trained in Mumbai and Chennai, Kavitha brings Bollywood glamour to every look.",
  },
  {
    name: "Priya Lakshmi",
    role: "Bridal Specialist",
    experience: "10+ years",
    color: "bg-accent/20",
    initials: "PL",
    bio: "Priya's bridal creations have graced 500+ weddings across Tamil Nadu.",
  },
  {
    name: "Meena Rajagopal",
    role: "Skin Care Expert",
    experience: "8+ years",
    color: "bg-primary/10",
    initials: "MR",
    bio: "Certified dermal therapist specializing in natural, ayurvedic skin treatments.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative py-32 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('/assets/generated/salon-interior.dim_800x500.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <div className="relative z-10 px-4">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-accent mb-2">
            🦚 Our Story 🪷
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white font-bold mb-4">
            About Us
          </h1>
          <p className="font-body text-white/80 max-w-xl mx-auto">
            Family-run with love since 2009
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Our Story</h2>
            <PeacockDivider />
          </div>
          <div className="font-body text-muted-foreground leading-relaxed space-y-4 text-center">
            <p>
              Founded in 2009 by Kavitha Devi, Alagu Mayil Beauty Parlour began
              as a small neighborhood salon with a big dream — to make every
              woman in Rānipet feel beautiful and confident.
            </p>
            <p>
              Over 15 years, we have grown into the most trusted beauty
              destination in the region, serving over 1,000 brides and thousands
              of loyal clients. Our team of 50+ expert stylists are trained in
              the latest Bollywood and Kollywood techniques, while honoring the
              rich traditions of Tamil Nadu.
            </p>
            <p>
              The name <em>Alagu Mayil</em> — "Beautiful Peacock" in Tamil —
              reflects our belief that beauty is bold, colorful, and uniquely
              personal. Like the peacock's feathers, we help every woman reveal
              her true brilliance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 bg-secondary/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: "🦚",
                title: "Our Mission",
                text: "To make every woman feel like royalty on her most special days and every day.",
              },
              {
                icon: "🪷",
                title: "Our Vision",
                text: "To be Tamil Nadu's most celebrated beauty destination, blending tradition with modern artistry.",
              },
              {
                icon: "✨",
                title: "Our Promise",
                text: "Premium quality, hygienic practices, and personalized service for every client.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-display text-xl font-semibold maroon-text mb-2">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-primary">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "1000+", label: "Happy Brides" },
            { stat: "15", label: "Years of Excellence" },
            { stat: "50+", label: "Services Offered" },
            { stat: "4.9 ★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl font-bold gold-text">
                {s.stat}
              </div>
              <div className="font-body text-sm text-white/70 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
              The Experts
            </p>
            <h2 className="section-title">Meet Our Team</h2>
            <PeacockDivider className="mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden shadow-md text-center"
              >
                <div
                  className={`${member.color} h-32 flex items-center justify-center`}
                >
                  <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold maroon-text">
                      {member.initials}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">
                    {member.name}
                  </h3>
                  <p className="font-body text-sm gold-text font-medium mb-1">
                    {member.role}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mb-3">
                    {member.experience}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-title">Find Us</h2>
            <p className="font-body text-muted-foreground mt-2">
              123 Main Street, Rānipet, Tamil Nadu 632401
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9!2d79.3!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3OcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Salon location map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
