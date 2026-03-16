import PeacockDivider from "@/components/PeacockDivider";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

type GalleryCategory = "All" | "Bridal" | "Hair" | "Skin" | "Mehendi" | "Nails";

const galleryItems = [
  {
    id: 1,
    src: "/assets/generated/bridal-makeup.dim_600x400.jpg",
    category: "Bridal",
    label: "Bridal Transformation",
    beforeAfter: true,
  },
  {
    id: 2,
    src: "/assets/generated/hair-spa.dim_600x400.jpg",
    category: "Hair",
    label: "Hair Spa Glow",
  },
  {
    id: 3,
    src: "/assets/generated/facial-treatment.dim_600x400.jpg",
    category: "Skin",
    label: "Glow Facial",
    beforeAfter: true,
  },
  {
    id: 4,
    src: "/assets/generated/party-makeup.dim_600x400.jpg",
    category: "Bridal",
    label: "Party Glam",
  },
  {
    id: 5,
    src: "/assets/generated/mehendi-art.dim_600x400.jpg",
    category: "Mehendi",
    label: "Bridal Mehendi",
  },
  {
    id: 6,
    src: "/assets/generated/nail-art.dim_600x400.jpg",
    category: "Nails",
    label: "Floral Nail Art",
  },
  {
    id: 7,
    src: "/assets/generated/hair-styling.dim_600x400.jpg",
    category: "Hair",
    label: "Bridal Updo",
    beforeAfter: true,
  },
  {
    id: 8,
    src: "/assets/generated/salon-interior.dim_800x500.jpg",
    category: "Skin",
    label: "Salon Ambience",
  },
  {
    id: 9,
    src: "/assets/generated/bridal-makeup.dim_600x400.jpg",
    category: "Bridal",
    label: "Reception Look",
  },
  {
    id: 10,
    src: "/assets/generated/hair-spa.dim_600x400.jpg",
    category: "Hair",
    label: "Keratin Treatment",
    beforeAfter: true,
  },
  {
    id: 11,
    src: "/assets/generated/mehendi-art.dim_600x400.jpg",
    category: "Mehendi",
    label: "Arabic Mehendi",
  },
  {
    id: 12,
    src: "/assets/generated/nail-art.dim_600x400.jpg",
    category: "Nails",
    label: "French Manicure",
  },
];

const categories: GalleryCategory[] = [
  "All",
  "Bridal",
  "Hair",
  "Skin",
  "Mehendi",
  "Nails",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const nextImage = () =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-br from-secondary/30 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-sm tracking-[0.2em] uppercase gold-text mb-2">
            🦚 Transformations 🪷
          </p>
          <h1 className="section-title mb-4">Our Gallery</h1>
          <PeacockDivider />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
            Explore our stunning portfolio of transformations and artistry
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

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="masonry-grid">
          {filtered.map((item, idx) => (
            <button
              type="button"
              key={item.id}
              data-ocid={`gallery.item.${idx + 1}`}
              className="masonry-item relative group cursor-pointer overflow-hidden rounded-xl w-full text-left"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-body text-white text-sm font-medium">
                    {item.label}
                  </p>
                  {item.beforeAfter && (
                    <Badge className="text-xs bg-accent text-accent-foreground mt-1">
                      Before &amp; After
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].label}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="absolute top-3 left-3">
              <p className="font-body text-white text-sm font-medium">
                {filtered[lightboxIdx].label}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
