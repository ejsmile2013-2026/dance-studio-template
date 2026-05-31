import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  X,
  ArrowLeft,
  ArrowRight,
  Phone,
  Menu,
  Images,
} from "lucide-react";
import { STUDIO_CONFIG } from "../data";

// ── Types ────────────────────────────────────────────────────────────────────

type Filter = "all" | "classes" | "events" | "studio";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  filter: Exclude<Filter, "all">;
  /** span 2 cols in the "all" editorial grid */
  wide?: boolean;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const PHOTOS: GalleryItem[] = [
  {
    id: "recital",
    src: "/gallery/recital.jpg",
    title: "Spring Recital",
    caption: "Our annual recital at Concord Community Theater — over 300 families in the audience",
    filter: "events",
    wide: true,
  },
  {
    id: "class_ballet",
    src: "/gallery/class_ballet.jpg",
    title: "Ballet Fundamentals",
    caption: "Ages 6–12 working through barre exercises in our main studio",
    filter: "classes",
  },
  {
    id: "class_hiphop",
    src: "/gallery/class_hiphop.jpg",
    title: "Hip-Hop & Street",
    caption: "Energy and rhythm — Jason's hip-hop class for ages 9–15",
    filter: "classes",
  },
  {
    id: "class_toddlers",
    src: "/gallery/class_toddlers.jpg",
    title: "Baby Dance",
    caption: "Creative movement for ages 3–5, led by Maria Santos",
    filter: "classes",
  },
  {
    id: "studio_lobby",
    src: "/gallery/studio_lobby.jpg",
    title: "Studio Lobby",
    caption: "The front lobby at 4850 Concord Blvd — warm, open, designed for families",
    filter: "studio",
  },
  {
    id: "instructor_moment",
    src: "/gallery/instructor_moment.jpg",
    title: "One-on-One Moment",
    caption: "Real instruction — our coaches work closely with every student",
    filter: "studio",
  },
];

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All Photos", value: "all" },
  { label: "Classes", value: "classes" },
  { label: "Events", value: "events" },
  { label: "Studio", value: "studio" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visible = filter === "all" ? PHOTOS : PHOTOS.filter((p) => p.filter === filter);
  const lightboxIdx = lightboxId ? visible.findIndex((p) => p.id === lightboxId) : -1;
  const lightboxItem = lightboxIdx >= 0 ? visible[lightboxIdx] : null;

  const closeLightbox = useCallback(() => setLightboxId(null), []);

  const goPrev = useCallback(() => {
    if (lightboxIdx > 0) setLightboxId(visible[lightboxIdx - 1].id);
  }, [lightboxIdx, visible]);

  const goNext = useCallback(() => {
    if (lightboxIdx < visible.length - 1) setLightboxId(visible[lightboxIdx + 1].id);
  }, [lightboxIdx, visible]);

  useEffect(() => {
    if (!lightboxId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxId, closeLightbox, goPrev, goNext]);

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setLightboxId(null);
  };

  const countFor = (f: Filter) =>
    f === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.filter === f).length;

  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#f8f7f5] text-slate-900">

      {/* ─── Sticky Header ─── */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4CB8F2] to-[#1779B8] rotate-45 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-3 h-3 bg-white -rotate-45" />
            </div>
            <div>
              <span className="font-display font-black text-slate-950 text-sm md:text-base tracking-tight uppercase block leading-none">
                {STUDIO_CONFIG.academyName}
              </span>
              <span className="text-[10px] md:text-xs text-slate-400 font-mono font-medium block mt-1 tracking-wider uppercase">
                Photo Gallery
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/" className="hover:text-[#2196D9] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#2196D9] transition-colors">About</Link>
            <Link to="/schedule" className="hover:text-[#2196D9] transition-colors">Schedule</Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200"
            >
              Book Free Trial
            </Link>
          </nav>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${STUDIO_CONFIG.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop phone */}
          <a
            href={`tel:${STUDIO_CONFIG.phone}`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase rounded-xl border border-slate-900 transition-all hover:shadow-md hover:-translate-y-0.5 transform"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{STUDIO_CONFIG.phone}</span>
          </a>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="gallery-mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg"
            >
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Schedule", to: "/schedule" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="w-full block px-4 py-3 text-sm font-medium uppercase tracking-wider text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/"
                className="w-full block px-4 py-3 text-sm font-bold uppercase tracking-wider bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white rounded-lg"
              >
                Book Free Trial
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Main ─── */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">

        {/* ── Page hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
            <Images className="w-3.5 h-3.5" />
            Studio Gallery
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            Gallery
          </h1>
          <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-[#2196D9] rounded-full" />
          <p className="text-slate-500 text-base font-sans max-w-lg pt-1 leading-relaxed">
            A glimpse inside our studio — classes, recitals, and the moments in between.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer font-sans ${
                filter === f.value
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] font-mono rounded-full px-1.5 py-0.5 leading-none ${
                  filter === f.value ? "bg-white/15 text-white/70" : "bg-slate-100 text-slate-400"
                }`}
              >
                {countFor(f.value)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Photo grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {visible.map((photo, idx) => {
              const isWide = filter === "all" && photo.wide;
              return (
                <motion.button
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  onClick={() => setLightboxId(photo.id)}
                  className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer text-left ${
                    isWide ? "sm:col-span-2 aspect-[16/7]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay — always slightly visible, stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-display font-black text-sm uppercase tracking-tight leading-tight drop-shadow">
                      {photo.title}
                    </p>
                    <p className="text-white/70 text-xs font-sans mt-0.5 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {photo.caption}
                    </p>
                  </div>
                  {/* Category pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 bg-white/90 text-slate-700 rounded-full">
                      {photo.filter}
                    </span>
                  </div>
                  {/* Expand icon hint */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Images className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#1264A5] via-[#2196D9] to-[#4CB8F2] rounded-3xl px-8 py-16 md:px-14 md:py-20 text-white text-center"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[36rem] h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <span className="inline-flex bg-white/15 border border-white/25 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white">
              Ready to start?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Join the Studio
            </h2>
            <div className="w-12 h-0.5 bg-white/40 mx-auto rounded-full" />
            <p className="text-white/80 text-base font-sans leading-relaxed">
              Your child's first class is free. No commitment, no credit card — just come in and see if it fits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/95 text-[#1264A5] font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
              >
                Book Free Trial
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${STUDIO_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {STUDIO_CONFIG.phone}
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 font-sans">
              © {new Date().getFullYear()} {STUDIO_CONFIG.name}. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Legal">
              {[
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Terms of Service", to: "/terms-of-service" },
                { label: "Cookie Policy", to: "/cookie-policy" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-slate-600 hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image frame */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxItem.id}
                    src={lightboxItem.src}
                    alt={lightboxItem.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="w-full max-h-[65vh] object-contain"
                  />
                </AnimatePresence>
              </div>

              {/* Caption bar */}
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-white font-display font-black text-base uppercase tracking-tight">
                    {lightboxItem.title}
                  </p>
                  <p className="text-white/55 text-sm font-sans mt-1 leading-snug max-w-lg">
                    {lightboxItem.caption}
                  </p>
                </div>
                <span className="shrink-0 text-white/35 text-xs font-mono tabular-nums">
                  {lightboxIdx + 1}&thinsp;/&thinsp;{visible.length}
                </span>
              </div>

              {/* Prev / Next arrows */}
              {visible.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    disabled={lightboxIdx <= 0}
                    aria-label="Previous photo"
                    className="absolute top-1/2 -translate-y-1/2 -left-14 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={lightboxIdx >= visible.length - 1}
                    aria-label="Next photo"
                    className="absolute top-1/2 -translate-y-1/2 -right-14 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dot strip */}
              {visible.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-5">
                  {visible.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setLightboxId(p.id)}
                      aria-label={`Go to photo ${i + 1}`}
                      className={`rounded-full transition-all duration-200 cursor-pointer ${
                        i === lightboxIdx
                          ? "w-5 h-1.5 bg-white"
                          : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
