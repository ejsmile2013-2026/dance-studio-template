import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  CalendarCheck,
  BookOpen,
  FileText,
  GraduationCap,
  Star,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { STUDIO_CONFIG } from "../data";

// ── Data ─────────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  label: string;
  Icon: typeof ShieldCheck;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  items: FaqItem[];
}

const CATEGORIES: FaqCategory[] = [
  {
    id: "first-visit",
    label: "First Visit",
    Icon: CalendarCheck,
    accentBg: "bg-sky-100",
    accentText: "text-sky-700",
    accentBorder: "border-sky-200",
    items: [
      {
        q: "What happens during the free trial class?",
        a: "Your child joins a real class with their age group — no separate \"visitor session.\" The instructor introduces them to the group, keeps the warm-up playful, and gives them just enough to do so they feel included from minute one. Afterward, you'll get a quick debrief on what style and level would be the best fit. The whole visit takes about one hour.",
      },
      {
        q: "My child is shy. What if they freeze up or refuse to go in?",
        a: "It happens more than you'd think — and our instructors are experienced at it. We never push a hesitant child into the room. Instead, we invite them to stand at the door and watch, and almost every time, curiosity wins within a few minutes. The warm-up is designed to feel like a game, not a drill, so even the shyest kids find a way in.",
      },
      {
        q: "What should my child wear to the trial class?",
        a: "Comfortable athletic wear — leggings, shorts, and a fitted top — is all you need for the trial. Bare feet or socks work for most classes. If you enroll afterward, we'll let you know what shoes or attire are required for that specific program. No purchase is needed before the trial.",
      },
      {
        q: "Can I watch the trial class?",
        a: "Yes, for the trial class parents are welcome to observe. Once enrolled, regular classes are closed to observers so children stay focused and build confidence without feeling watched — it makes a real difference in the early weeks. We host quarterly open classes and two full recitals per year so every family gets to see the progress up close.",
      },
    ],
  },
  {
    id: "classes",
    label: "During Classes",
    Icon: BookOpen,
    accentBg: "bg-violet-100",
    accentText: "text-violet-700",
    accentBorder: "border-violet-200",
    items: [
      {
        q: "Do parents stay and watch during regular classes?",
        a: "Parents are welcome to wait in our comfortable lobby. We keep regular classes closed to observers so children stay focused and build confidence without feeling watched. We host quarterly open classes and two full recitals per year so every family gets to see the progress up close.",
      },
      {
        q: "How big are the classes?",
        a: "We cap all classes at 8–12 students depending on the program — Baby Dance at 8, Ballet and Contemporary at 10, Hip-Hop at 12. Small groups mean every child receives real attention and personal feedback every class, not just when it's their turn.",
      },
      {
        q: "What if my child misses a class?",
        a: "Life happens — we get it. For occasional absences, we offer one make-up class per month at no extra charge. If you know in advance, just let us know and we'll arrange the best slot. Students who miss more than two consecutive weeks are contacted by their instructor to check in.",
      },
      {
        q: "How do I know if my child is making progress?",
        a: "Our instructors give specific verbal feedback every class — not just \"great job\" but \"your arms held the right shape in that combination.\" At the end of each semester (twice a year), you'll receive a brief written progress note from your child's instructor covering technique, effort, and areas to focus on next.",
      },
    ],
  },
  {
    id: "enrollment",
    label: "Enrollment",
    Icon: FileText,
    accentBg: "bg-rose-100",
    accentText: "text-rose-700",
    accentBorder: "border-rose-200",
    items: [
      {
        q: "Is there any commitment or obligation after the free trial?",
        a: "None. The trial class is completely free with zero strings attached — no pressure to enroll on the day, no auto-billing, and no follow-up calls unless you want them. If your child loves it and wants to continue, enrollment takes about two minutes.",
      },
      {
        q: "When can my child start?",
        a: "We accept new students on a rolling basis — you don't need to wait for the start of a semester. If there's a spot in the right class for your child's age and level, they can start the following week. Book the free trial first and we'll confirm availability during your debrief.",
      },
      {
        q: "How long is the enrollment period?",
        a: "Our standard enrollment runs semester-by-semester (fall and spring, roughly September–January and February–June). Monthly billing is available for families who prefer flexibility. There's no penalty for leaving mid-semester — we just ask for two weeks' notice.",
      },
      {
        q: "Do you offer sibling discounts?",
        a: "Yes — families with two or more enrolled children receive 10% off the second enrollment and 15% off the third and beyond. Discounts are applied automatically when you enroll through our studio portal.",
      },
    ],
  },
  {
    id: "curriculum",
    label: "Curriculum",
    Icon: GraduationCap,
    accentBg: "bg-amber-100",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200",
    items: [
      {
        q: "Which class is right for my child?",
        a: "The best way to know is the free trial — our instructor will give you a specific recommendation based on what they observe. As a rough guide: ages 3–5 belong in Creative Movement regardless of style preference; ages 6 and up can begin Ballet (for disciplined, patient children), Hip-Hop (for energetic, social kids), or Contemporary (for those who want creative freedom). Visit our Classes page for a full breakdown.",
      },
      {
        q: "Can my child switch classes after they start?",
        a: "Yes. If a class isn't the right fit after a few weeks, we'll help you move to a better one at no extra charge. This happens occasionally and we handle it without drama. The goal is for your child to be in the right room — that's all that matters.",
      },
      {
        q: "What ages do you teach?",
        a: "We teach children from ages 3 to 17. Baby Dance and Creative Movement are designed for ages 3–5. Ballet, Hip-Hop, and Contemporary run from age 6 upward with separate age-grouped classes so students are always working alongside their peers.",
      },
      {
        q: "Do you teach boys?",
        a: "Absolutely — boys are welcome in every program. Hip-Hop and Contemporary tend to attract a mix naturally. Ballet is slightly less common for boys at first, but the physical benefits (strength, coordination, spatial awareness) are identical — and boys who stick with it have a real advantage in any physical discipline they pursue later.",
      },
    ],
  },
  {
    id: "recitals",
    label: "Recitals",
    Icon: Star,
    accentBg: "bg-emerald-100",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    items: [
      {
        q: "Do students have to perform in recitals?",
        a: "Recitals are strongly encouraged but never mandatory. That said, most children who are hesitant before their first recital report it as one of their best experiences afterward. If your child is anxious, talk to their instructor — we have strategies for stage nerves that work well even for shy performers.",
      },
      {
        q: "How often are recitals and what do they involve?",
        a: "We hold two recitals per year — one in December and one in June — at Concord Community Theater. Students perform in full costume as part of their class group. Costumes are provided by the studio at no extra charge. Recitals run approximately 90 minutes and are filmed by our production team; the recording is available to all families after the event.",
      },
    ],
  },
  {
    id: "practical",
    label: "Practical",
    Icon: MapPin,
    accentBg: "bg-slate-100",
    accentText: "text-slate-600",
    accentBorder: "border-slate-200",
    items: [
      {
        q: "Where are you located and is there parking?",
        a: `We're at ${STUDIO_CONFIG.address}. There's a free surface lot directly in front of the building with about 30 spaces. Street parking is also available on Concord Blvd. If you're coming during Saturday morning peak hours, we recommend arriving 5–10 minutes early.`,
      },
      {
        q: "What are your studio hours?",
        a: `${STUDIO_CONFIG.workingHours}. Our front desk is staffed during all class hours. For questions outside those hours, email us at ${STUDIO_CONFIG.email} and we'll reply within one business day.`,
      },
      {
        q: "What's the best way to reach you?",
        a: `For quick questions, call or text us at ${STUDIO_CONFIG.phone} — we respond within a few hours during studio hours. For enrollment questions or scheduling, email ${STUDIO_CONFIG.email}. You can also book the free trial directly through the form on our homepage.`,
      },
    ],
  },
];

const ALL_COUNT = CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [filter, setFilter] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleCategories =
    filter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const handleFilterChange = (f: string) => {
    setFilter(f);
    setOpenId(null);
  };

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
                FAQ
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/" className="hover:text-[#2196D9] transition-colors">Home</Link>
            <Link to="/classes" className="hover:text-[#2196D9] transition-colors">Classes</Link>
            <Link to="/about" className="hover:text-[#2196D9] transition-colors">About</Link>
            <Link to="/schedule" className="hover:text-[#2196D9] transition-colors">Schedule</Link>
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
              key="faq-mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg"
            >
              {[
                { label: "Home", to: "/" },
                { label: "Classes", to: "/classes" },
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

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            For Parents
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            Frequently Asked<br className="hidden sm:block" /> Questions
          </h1>
          <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-[#2196D9] rounded-full" />
          <p className="text-slate-500 text-base font-sans max-w-lg pt-1 leading-relaxed">
            {ALL_COUNT} honest answers to the questions parents ask before their child's first class.
          </p>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 flex-wrap"
        >
          <button
            onClick={() => handleFilterChange("all")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer font-sans ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
            }`}
          >
            All Questions
            <span className={`text-[10px] font-mono rounded-full px-1.5 py-0.5 leading-none ${filter === "all" ? "bg-white/15 text-white/70" : "bg-slate-100 text-slate-400"}`}>
              {ALL_COUNT}
            </span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer font-sans ${
                filter === cat.id
                  ? "bg-slate-900 text-white shadow-md"
                  : `bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700`
              }`}
            >
              <cat.Icon className="w-3.5 h-3.5" />
              {cat.label}
              <span className={`text-[10px] font-mono rounded-full px-1.5 py-0.5 leading-none ${filter === cat.id ? "bg-white/15 text-white/70" : "bg-slate-100 text-slate-400"}`}>
                {cat.items.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── FAQ groups ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-8"
          >
            {visibleCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: catIdx * 0.06 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
              >
                {/* Category header */}
                <div className={`flex items-center gap-3 px-6 py-4 border-b border-slate-100 ${cat.accentBg}`}>
                  <div className={`p-1.5 rounded-lg bg-white/60 ${cat.accentText}`}>
                    <cat.Icon className="w-4 h-4" />
                  </div>
                  <span className={`font-display font-black text-sm uppercase tracking-wide ${cat.accentText}`}>
                    {cat.label}
                  </span>
                  <span className={`ml-auto text-[10px] font-mono font-bold ${cat.accentText} opacity-60`}>
                    {cat.items.length} question{cat.items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Questions */}
                <div className="divide-y divide-slate-100">
                  {cat.items.map((item, idx) => {
                    const id = `${cat.id}-${idx}`;
                    const isOpen = openId === id;
                    return (
                      <div key={id}>
                        <button
                          onClick={() => toggle(id)}
                          aria-expanded={isOpen}
                          className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left cursor-pointer group"
                        >
                          <span className="flex items-start gap-3 flex-1">
                            <ShieldCheck className="w-4 h-4 text-[#2196D9] shrink-0 mt-0.5" />
                            <span className="font-bold text-slate-900 font-display text-sm leading-snug group-hover:text-[#2196D9] transition-colors">
                              {item.q}
                            </span>
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 mt-0.5 inline-flex"
                          >
                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#2196D9] transition-colors" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key={`ans-${id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-slate-500 leading-relaxed px-6 pb-6 pl-[52px] font-sans">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Still have questions? ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-display font-black text-slate-900 text-base uppercase tracking-tight">
              Still have a question?
            </p>
            <p className="text-sm text-slate-500 font-sans">
              Call or text us — we reply within a few hours during studio hours.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${STUDIO_CONFIG.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 transform"
            >
              <Phone className="w-3.5 h-3.5" />
              {STUDIO_CONFIG.phone}
            </a>
            <a
              href={`mailto:${STUDIO_CONFIG.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-sm"
            >
              Email us
            </a>
          </div>
        </motion.div>

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
              Ready to see for yourself?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Book a Free Trial Class
            </h2>
            <div className="w-12 h-0.5 bg-white/40 mx-auto rounded-full" />
            <p className="text-white/80 text-base font-sans leading-relaxed">
              No commitment, no credit card. Your child joins a real class and our instructor gives you a personal recommendation afterward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/95 text-[#1264A5] font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
              >
                Book Now — It's Free
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
    </div>
  );
}
