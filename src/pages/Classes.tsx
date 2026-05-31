import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Phone,
  Menu,
  X,
  Users,
  Calendar,
  CheckCircle2,
  Backpack,
  Star,
} from "lucide-react";
import { STUDIO_CONFIG, DANCE_STYLES } from "../data";

// ── Enrichment data ───────────────────────────────────────────────────────────

interface ClassDetail {
  id: string;
  num: string;
  accentFrom: string;
  accentTo: string;
  accentBorder: string;
  accentText: string;
  accentBg: string;
  accentDot: string;
  instructor: { id: string; name: string; title: string };
  schedule: string[];
  groupSize: string;
  whatYouLearn: string[];
  whatToBring: string;
  bestFor: string;
}

const DETAILS: ClassDetail[] = [
  {
    id: "ballet",
    num: "01",
    accentFrom: "from-violet-100",
    accentTo: "to-purple-200",
    accentBorder: "border-violet-300",
    accentText: "text-violet-700",
    accentBg: "bg-violet-100",
    accentDot: "bg-violet-400",
    instructor: { id: "victoria", name: "Victoria Reyes", title: "Studio Director & Lead Instructor" },
    schedule: ["Mon & Wed — 4:30 PM", "Saturday — 10:00 AM"],
    groupSize: "Max 10 students",
    whatYouLearn: [
      "Barre exercises — posture, turnout, and alignment from day one",
      "Core ballet vocabulary: plié, relevé, tendu, arabesque",
      "Musicality — listening, counting, and moving with the music",
      "Stage confidence built through twice-yearly recitals",
    ],
    whatToBring:
      "Comfortable athletic wear. Enrolled students wear pink ballet slippers — no purchase needed for the trial.",
    bestFor:
      "Patient, disciplined children who love graceful movement. Ballet skills transfer directly to every other style.",
  },
  {
    id: "contemporary",
    num: "02",
    accentFrom: "from-sky-100",
    accentTo: "to-teal-200",
    accentBorder: "border-sky-300",
    accentText: "text-sky-700",
    accentBg: "bg-sky-100",
    accentDot: "bg-sky-400",
    instructor: { id: "victoria", name: "Victoria Reyes", title: "Studio Director & Lead Instructor" },
    schedule: ["Tuesday & Thursday — 5:00 PM"],
    groupSize: "Max 10 students",
    whatYouLearn: [
      "Floorwork — rolling, spiraling, and weight transfer with control",
      "Improvisation: responding to music, space, and fellow dancers",
      "Spatial awareness across levels (floor, mid-level, aerial)",
      "Partnering basics and ensemble dynamics",
    ],
    whatToBring: "Comfortable athletic wear, bare feet or socks. No special shoes needed.",
    bestFor:
      "Children who feel constrained by rigid technique and want room to experiment. Best entered with some prior movement experience.",
  },
  {
    id: "hiphop",
    num: "03",
    accentFrom: "from-rose-100",
    accentTo: "to-pink-200",
    accentBorder: "border-rose-300",
    accentText: "text-rose-700",
    accentBg: "bg-rose-100",
    accentDot: "bg-rose-400",
    instructor: { id: "jason", name: "Jason Park", title: "Hip-Hop & Street Styles" },
    schedule: ["Mon & Wed — 5:30 PM", "Saturday — 11:30 AM"],
    groupSize: "Max 12 students",
    whatYouLearn: [
      "Rhythm and timing — breaking movement down to the beat",
      "Breaking foundations: toprock, downrock, and freezes",
      "Popping, locking, and wave technique",
      "Choreography and performance presence in a group setting",
    ],
    whatToBring:
      "Clean athletic shoes (no heels, no cleats), comfortable clothes you can move freely in.",
    bestFor:
      "Energetic, social kids who want to feel capable quickly. Children who struggle with stillness often find their best focus here.",
  },
  {
    id: "rhythmics",
    num: "04",
    accentFrom: "from-amber-100",
    accentTo: "to-yellow-200",
    accentBorder: "border-amber-300",
    accentText: "text-amber-700",
    accentBg: "bg-amber-100",
    accentDot: "bg-amber-400",
    instructor: { id: "maria", name: "Maria Santos", title: "Creative Movement & Baby Dance" },
    schedule: ["Tuesday — 4:00 PM", "Saturday — 9:00 AM"],
    groupSize: "Max 8 students",
    whatYouLearn: [
      "Body awareness through play — understanding how the body moves",
      "Listening skills: following rhythm, instruction, and musical cues",
      "Basic coordination: jumping, spinning, balancing, and skipping",
      "Imagination and creativity through themed movement games",
    ],
    whatToBring: "Comfortable clothes, bare feet or socks. No shoes needed.",
    bestFor:
      "The youngest dancers, ages 3–5. No experience needed, no structure expected — just joy, music, and movement.",
  },
];

// Merge DANCE_STYLES data with enriched details
const CLASSES = DANCE_STYLES.map((style) => ({
  ...style,
  ...DETAILS.find((d) => d.id === style.id)!,
}));

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Classes() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#f8f7f5] text-slate-900">

      {/* ─── Sticky Header ─── */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center gap-4">

          <Link to="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4CB8F2] to-[#1779B8] rotate-45 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-3 h-3 bg-white -rotate-45" />
            </div>
            <div>
              <span className="font-display font-black text-slate-950 text-sm md:text-base tracking-tight uppercase block leading-none">
                {STUDIO_CONFIG.academyName}
              </span>
              <span className="text-[10px] md:text-xs text-slate-400 font-mono font-medium block mt-1 tracking-wider uppercase">
                Classes
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/" className="hover:text-[#2196D9] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#2196D9] transition-colors">About</Link>
            <Link to="/schedule" className="hover:text-[#2196D9] transition-colors">Schedule</Link>
            <Link to="/gallery" className="hover:text-[#2196D9] transition-colors">Gallery</Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200"
            >
              Book Free Trial
            </Link>
          </nav>

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

          <a
            href={`tel:${STUDIO_CONFIG.phone}`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase rounded-xl border border-slate-900 transition-all hover:shadow-md hover:-translate-y-0.5 transform"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{STUDIO_CONFIG.phone}</span>
          </a>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="classes-mobile-nav"
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
                { label: "Gallery", to: "/gallery" },
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
      <main className="flex-1">

        {/* ── Page hero ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
              <Star className="w-3.5 h-3.5" />
              Our Programs
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              Classes
            </h1>
            <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-[#2196D9] rounded-full" />
            <p className="text-slate-500 text-base font-sans max-w-xl pt-1 leading-relaxed">
              Four programs for ages 3–17. Every class is capped at 8–12 students so every child gets direct attention.
            </p>
          </motion.div>

          {/* Quick-jump anchor pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex items-center gap-2 flex-wrap mt-8"
          >
            {CLASSES.map((cls) => (
              <a
                key={cls.id}
                href={`#${cls.id}`}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 hover:-translate-y-0.5 transform font-sans ${cls.accentBg} ${cls.accentText} ${cls.accentBorder}`}
              >
                <span className="font-mono text-[10px] opacity-60">{cls.num}</span>
                {cls.title}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Class sections ── */}
        <div className="space-y-0">
          {CLASSES.map((cls, idx) => {
            const imageRight = idx % 2 !== 0;
            return (
              <section
                key={cls.id}
                id={cls.id}
                className="scroll-mt-24 border-t border-slate-200"
              >
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55 }}
                  className={`flex flex-col ${imageRight ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[540px]`}
                >
                  {/* ── Image half ── */}
                  <div className="lg:w-1/2 relative overflow-hidden min-h-[280px] lg:min-h-[540px]">
                    <img
                      src={cls.imageUrl}
                      alt={cls.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    {/* Subtle gradient vignette */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-${imageRight ? "r" : "l"} from-transparent to-slate-950/20`}
                    />
                    {/* Number watermark */}
                    <div className="absolute bottom-4 right-5 font-display font-black text-[5rem] leading-none text-white/15 select-none pointer-events-none">
                      {cls.num}
                    </div>
                  </div>

                  {/* ── Content half ── */}
                  <div className={`lg:w-1/2 bg-white px-8 py-10 md:px-12 md:py-14 flex flex-col gap-7 ${imageRight ? "border-r border-slate-100" : "border-l border-slate-100"}`}>

                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-xs font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-full ${cls.accentBg} ${cls.accentText}`}>
                          {cls.ageGroups}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {cls.tags.map((tag) => (
                            <span key={tag} className="text-[11px] text-slate-500 font-sans bg-slate-100 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="font-display font-black text-slate-950 text-2xl md:text-3xl uppercase tracking-tight leading-tight">
                        {cls.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed font-sans max-w-md">
                        {cls.description}
                      </p>
                    </div>

                    {/* What you'll learn */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold font-mono uppercase tracking-widest text-slate-400">
                        What your child will learn
                      </p>
                      <ul className="space-y-2.5">
                        {cls.whatYouLearn.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-sans leading-snug">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${cls.accentText}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Class details grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-4 space-y-1.5 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold font-mono uppercase tracking-wider">Schedule</span>
                        </div>
                        {cls.schedule.map((s, i) => (
                          <p key={i} className="text-xs text-slate-700 font-sans font-medium leading-snug">{s}</p>
                        ))}
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 space-y-1.5 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold font-mono uppercase tracking-wider">Group size</span>
                        </div>
                        <p className="text-xs text-slate-700 font-sans font-medium">{cls.groupSize}</p>
                        <p className="text-[11px] text-slate-400 font-sans">Personal attention every class</p>
                      </div>
                    </div>

                    {/* What to bring */}
                    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <Backpack className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">What to bring</p>
                        <p className="text-xs text-slate-600 font-sans leading-snug">{cls.whatToBring}</p>
                      </div>
                    </div>

                    {/* Best for */}
                    <div className={`rounded-xl p-4 border ${cls.accentBg} ${cls.accentBorder}`}>
                      <p className={`text-[10px] font-bold font-mono uppercase tracking-wider mb-1 ${cls.accentText}`}>
                        Best for
                      </p>
                      <p className="text-xs text-slate-700 font-sans leading-snug">{cls.bestFor}</p>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className={`w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 ${cls.accentBg}`}>
                        <img
                          src={`/instructors/${cls.instructor.id}.png`}
                          alt={cls.instructor.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold font-sans text-slate-800 leading-tight">{cls.instructor.name}</p>
                        <p className="text-xs text-slate-400 font-sans">{cls.instructor.title}</p>
                      </div>
                      <Link
                        to="/about"
                        className="ml-auto text-xs text-[#2196D9] hover:text-[#1779B8] font-bold uppercase tracking-wider transition-colors font-sans shrink-0"
                      >
                        Meet the team →
                      </Link>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4 pt-1">
                      <Link
                        to="/"
                        className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
                      >
                        <span className="relative z-10">Book Free Trial</span>
                        <ChevronRight className="w-3.5 h-3.5 relative z-10" />
                        <span className="shimmer-beam-btn" aria-hidden="true" />
                      </Link>
                      <span className="text-xs text-slate-400 font-sans">No commitment · First class free</span>
                    </div>

                  </div>
                </motion.div>
              </section>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
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
                Not sure which class?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Try First, Decide After
              </h2>
              <div className="w-12 h-0.5 bg-white/40 mx-auto rounded-full" />
              <p className="text-white/80 text-base font-sans leading-relaxed">
                Book a free trial and our instructor will give you a personal recommendation after the class — based on what they actually observe about your child.
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
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 font-sans">
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
    </div>
  );
}
