import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin, Phone, Calendar, Star, Menu, X } from "lucide-react";
import { STUDIO_CONFIG } from "../data";

const SCHEDULE = [
  { day: "Monday",    classes: [
    { time: "10:00 AM", name: "Creative Movement", ages: "3–5",   style: "bg-rose-50 text-rose-600 border-rose-100" },
    { time: "4:00 PM",  name: "Classical Ballet",  ages: "6–10",  style: "bg-blue-50 text-blue-600 border-blue-100" },
    { time: "5:30 PM",  name: "Hip-Hop",           ages: "11–17", style: "bg-violet-50 text-violet-600 border-violet-100" },
  ]},
  { day: "Tuesday",   classes: [
    { time: "10:00 AM", name: "Baby Dance",         ages: "3–5",  style: "bg-rose-50 text-rose-600 border-rose-100" },
    { time: "4:00 PM",  name: "Classical Ballet",   ages: "6–10", style: "bg-blue-50 text-blue-600 border-blue-100" },
    { time: "5:30 PM",  name: "Contemporary",       ages: "9–15", style: "bg-teal-50 text-teal-600 border-teal-100" },
  ]},
  { day: "Wednesday", classes: [
    { time: "4:00 PM",  name: "Hip-Hop",            ages: "6–12", style: "bg-violet-50 text-violet-600 border-violet-100" },
    { time: "5:30 PM",  name: "Jazz-Funk",          ages: "13–17",style: "bg-amber-50 text-amber-600 border-amber-100" },
  ]},
  { day: "Thursday",  classes: [
    { time: "10:00 AM", name: "Creative Movement",  ages: "3–5",  style: "bg-rose-50 text-rose-600 border-rose-100" },
    { time: "4:00 PM",  name: "Classical Ballet",   ages: "6–10", style: "bg-blue-50 text-blue-600 border-blue-100" },
    { time: "5:30 PM",  name: "Contemporary",       ages: "7–15", style: "bg-teal-50 text-teal-600 border-teal-100" },
  ]},
  { day: "Friday",    classes: [
    { time: "4:00 PM",  name: "Hip-Hop",            ages: "6–17", style: "bg-violet-50 text-violet-600 border-violet-100" },
    { time: "5:30 PM",  name: "Classical Ballet",   ages: "6–10", style: "bg-blue-50 text-blue-600 border-blue-100" },
  ]},
  { day: "Saturday",  classes: [
    { time: "10:00 AM", name: "Baby Dance",         ages: "3–5",  style: "bg-rose-50 text-rose-600 border-rose-100" },
    { time: "11:30 AM", name: "Classical Ballet",   ages: "3–10", style: "bg-blue-50 text-blue-600 border-blue-100" },
    { time: "1:00 PM",  name: "Hip-Hop",            ages: "6–17", style: "bg-violet-50 text-violet-600 border-violet-100" },
    { time: "2:30 PM",  name: "Contemporary",       ages: "9–15", style: "bg-teal-50 text-teal-600 border-teal-100" },
  ]},
];

const PRICING = [
  {
    label: "Trial Class",
    price: "Free",
    period: "one time",
    highlight: false,
    features: [
      "Full 55-minute class",
      "Age-matched group",
      "Instructor debrief after",
      "No commitment required",
    ],
    cta: "Book Free Trial",
    ctaStyle: "border-2 border-[#2196D9] text-[#2196D9] hover:bg-[#2196D9] hover:text-white",
  },
  {
    label: "Monthly — 1×/week",
    price: "$89",
    period: "per month",
    highlight: false,
    features: [
      "4 classes per month",
      "Progress reports each term",
      "Access to open rehearsals",
      "Cancel anytime",
    ],
    cta: "Get Started",
    ctaStyle: "border-2 border-slate-200 text-slate-700 hover:border-slate-400",
  },
  {
    label: "Monthly — 2×/week",
    price: "$149",
    period: "per month",
    highlight: true,
    features: [
      "8 classes per month",
      "Priority recital placement",
      "Progress reports each term",
      "Sibling discount 15%",
    ],
    cta: "Most Popular",
    ctaStyle: "bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white",
  },
  {
    label: "10-Class Pack",
    price: "$199",
    period: "pack",
    highlight: false,
    features: [
      "Use across any style",
      "Valid 4 months",
      "Great for flexible schedules",
      "No monthly commitment",
    ],
    cta: "Buy Pack",
    ctaStyle: "border-2 border-slate-200 text-slate-700 hover:border-slate-400",
  },
];

export default function Schedule() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans flex flex-col">

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
                Schedule & Pricing
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/classes" className="hover:text-[#2196D9] transition-colors">Classes</Link>
            <Link to="/about" className="hover:text-[#2196D9] transition-colors">About</Link>
            <Link to="/gallery" className="hover:text-[#2196D9] transition-colors">Gallery</Link>
            <Link to="/faq" className="hover:text-[#2196D9] transition-colors">FAQ</Link>
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
              key="schedule-mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg"
            >
              {[
                { label: "Classes",  to: "/classes"  },
                { label: "About",    to: "/about"    },
                { label: "Gallery",  to: "/gallery"  },
                { label: "FAQ",      to: "/faq"      },
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">

        {/* Heading */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
            Rising Stars Dance Academy · Concord, CA
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Class Schedule &amp; Pricing
          </h1>
          <div className="w-12 h-1 bg-[#2196D9] rounded-full" />
          <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
            All classes run 55 minutes. Groups are strictly age-matched — your child will always train with peers at the same stage.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400 font-mono uppercase">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Mon–Sat: 10 AM – 8 PM</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {STUDIO_CONFIG.address}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {STUDIO_CONFIG.phone}</span>
          </div>
        </div>

        {/* Schedule */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#2196D9]" />
            <h2 className="font-display text-xl font-black text-slate-900 uppercase tracking-tight">Weekly Schedule</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCHEDULE.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                  <span className="font-display font-black text-slate-900 text-sm uppercase tracking-wide">{day.day}</span>
                </div>
                <div className="p-4 space-y-2">
                  {day.classes.map((cls, i) => (
                    <div key={i} className={`flex items-center justify-between rounded-xl px-4 py-2.5 border ${cls.style}`}>
                      <div>
                        <span className="font-bold text-sm">{cls.name}</span>
                        <span className="text-xs ml-2 opacity-70">Ages {cls.ages}</span>
                      </div>
                      <span className="text-xs font-mono font-bold opacity-80">{cls.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 font-sans italic">
            * Schedule is subject to change. Contact us to confirm availability before your first visit.
          </p>
        </section>

        {/* Pricing */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-black text-slate-900 uppercase tracking-tight">Pricing</h2>
            <p className="text-sm text-slate-500">Start with a free trial — no card required, no obligation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING.map((plan) => (
              <div
                key={plan.label}
                className={`bg-white rounded-2xl border shadow-sm flex flex-col p-6 gap-4 ${
                  plan.highlight ? "border-[#2196D9] shadow-[0_8px_32px_rgba(33,150,217,0.18)]" : "border-slate-100"
                }`}
              >
                {plan.highlight && (
                  <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-[#2196D9]/10 text-[#2196D9] px-2.5 py-1 rounded-full border border-[#2196D9]/20">
                    Most Popular
                  </span>
                )}
                <div>
                  <p className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-1">{plan.label}</p>
                  <p className="font-display font-black text-3xl text-slate-900">{plan.price}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{plan.period}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                      <Star className="w-3.5 h-3.5 text-[#2196D9] shrink-0 mt-0.5 fill-[#2196D9]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/"
                  className={`inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center ${plan.ctaStyle}`}
                >
                  {plan.highlight ? "Get Started" : plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#1264A5] via-[#2196D9] to-[#4CB8F2] rounded-2xl p-8 md:p-10 text-center text-white space-y-4">
          <h3 className="font-display text-2xl font-black tracking-tight">Ready to Start?</h3>
          <p className="text-white/80 text-sm max-w-md mx-auto">
            Book your child's free trial class — answer 4 quick questions and we'll match them with the perfect group.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#1264A5] font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
          >
            Book Free Trial Class
          </Link>
        </section>

      </main>

      <footer className="border-t border-slate-100 mt-8 py-8 text-center text-xs text-slate-400 font-sans">
        © {new Date().getFullYear()} {STUDIO_CONFIG.name} · {STUDIO_CONFIG.address}
      </footer>
    </div>
  );
}
