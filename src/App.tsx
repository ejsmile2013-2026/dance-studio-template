/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Heart,
  ShieldCheck,
  Users,
  Menu,
  X,
  Star,
  Camera,
} from "lucide-react";
import { STUDIO_CONFIG, DANCE_STYLES } from "./data";
import { QuizAnswers, Submission } from "./types";
import QuizWizard from "./components/QuizWizard";
import SubmissionsDashboard from "./components/SubmissionsDashboard";

const MOCK_LEADS: Submission[] = [
  {
    id: "lead-1",
    childAge: "Ages 3–5",
    danceDirection: "Creative Movement & Baby Dance",
    startDate: "As soon as possible",
    parentName: "Sarah Johnson",
    childName: "Emma",
    phoneNumber: "(925) 555-0143",
    preferredContact: "whatsapp",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead-2",
    childAge: "Ages 9–12",
    danceDirection: "Hip-Hop & Street Styles",
    startDate: "Within 1–2 weeks",
    parentName: "Michael Torres",
    childName: "Diego",
    phoneNumber: "(925) 555-0187",
    preferredContact: "telegram",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "lead-3",
    childAge: "Ages 6–8",
    danceDirection: "Classical Ballet",
    startDate: "Next month",
    parentName: "Jennifer Lee",
    childName: "Lily",
    phoneNumber: "(925) 555-0209",
    preferredContact: "phone",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
  iconName: "Users" | "Heart" | "Sparkles";
}

function AnimatedCounter({ target, suffix = "", label, iconName }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const steps = 50;
          const intervalMs = 1200 / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += 1;
            setCount(Math.round((target / steps) * current));
            if (current >= steps) {
              setCount(target);
              clearInterval(timer);
            }
          }, intervalMs);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const icons = { Users, Heart, Sparkles } as const;
  const Icon = icons[iconName];

  const iconStyle = {
    Users: { bg: "bg-[#2196D9]/10", border: "border-[#2196D9]/25", text: "text-[#2196D9]" },
    Heart: { bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-500" },
    Sparkles: { bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-500" },
  }[iconName];

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300"
    >
      <div className={`inline-flex p-2 sm:p-3 rounded-xl border mb-3 ${iconStyle.bg} ${iconStyle.border} ${iconStyle.text}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-xs sm:text-sm text-slate-500 mt-1.5 font-sans leading-snug">
        {label}
      </span>
    </div>
  );
}

export default function App() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [showCRM, setShowCRM] = useState<boolean>(false);
  const [latestSubmission, setLatestSubmission] = useState<QuizAnswers | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => {
    const saved = localStorage.getItem("dance_submissions");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch {
        setSubmissions([]);
      }
    } else {
      localStorage.setItem("dance_submissions", JSON.stringify(MOCK_LEADS));
      setSubmissions(MOCK_LEADS);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") setShowCRM(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setShowCRM((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setMobileMenuOpen(false);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const saveToStorage = (newSubs: Submission[]) => {
    localStorage.setItem("dance_submissions", JSON.stringify(newSubs));
    setSubmissions(newSubs);
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    const newLead: Submission = {
      ...answers,
      id: "lead-" + Math.random().toString(36).slice(2, 11),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    saveToStorage([newLead, ...submissions]);
    setLatestSubmission(answers);
    const target = document.getElementById("quiz-section-anchor");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteLead = (id: string) =>
    saveToStorage(submissions.filter((s) => s.id !== id));

  const handleUpdateStatus = (id: string, status: Submission["status"]) =>
    saveToStorage(submissions.map((s) => (s.id === id ? { ...s, status } : s)));

  const handleAddMockLeads = () => {
    const combined = [...MOCK_LEADS, ...submissions].filter(
      (s, i, arr) => arr.findIndex((t) => t.phoneNumber === s.phoneNumber) === i
    );
    saveToStorage(combined);
  };

  const scrollTo = (id: string, startQuiz = false) => {
    setMobileMenuOpen(false);
    if (startQuiz) setQuizStarted(true);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const contactLabel = (method: QuizAnswers["preferredContact"]) => {
    if (method === "telegram") return "Telegram";
    if (method === "whatsapp") return "WhatsApp";
    return "phone";
  };

  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#f8f7f5] selection:bg-blue-100 selection:text-blue-900 text-slate-900 relative">

      {/* ─── Site-wide background watermark ─── */}
      <div
        className="fixed right-0 top-0 bottom-0 w-[65%] z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/brand-girl.png)',
          backgroundSize: 'auto 115%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.14,
          mixBlendMode: 'multiply',
          maskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%)',
        }}
      />

      {/* ─── Sticky Header ─── */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4CB8F2] to-[#1779B8] rotate-45 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-3 h-3 bg-white -rotate-45" />
            </div>
            <div>
              <span className="font-display font-black text-slate-950 text-sm md:text-base tracking-tight uppercase block leading-none">
                {STUDIO_CONFIG.academyName}
              </span>
              <span className="text-[10px] md:text-xs text-slate-400 font-mono font-medium block mt-1 tracking-wider uppercase">
                Concord, California
              </span>
            </div>
          </div>

          {/* Desktop meta */}
          <div className="hidden lg:flex items-center gap-8 text-xs text-slate-500 font-medium uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2196D9]" />
              <span>Concord, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2196D9]" />
              <span>{STUDIO_CONFIG.workingHours}</span>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/classes" className="hover:text-[#2196D9] transition-colors">Classes</Link>
            <Link to="/schedule" className="hover:text-[#2196D9] transition-colors">Schedule</Link>
            <Link to="/about" className="hover:text-[#2196D9] transition-colors">About</Link>
            <Link to="/gallery" className="hover:text-[#2196D9] transition-colors">Gallery</Link>
            <Link to="/faq" className="hover:text-[#2196D9] transition-colors">FAQ</Link>
            <button
              onClick={() => scrollTo("quiz-section-anchor", true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 cursor-pointer"
            >
              Book Free Trial
            </button>
          </nav>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${STUDIO_CONFIG.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-lg border border-slate-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
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

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg"
            >
              {[
                { label: "Classes",  to: "/classes"  },
                { label: "Schedule", to: "/schedule" },
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
              <button
                onClick={() => scrollTo("quiz-section-anchor", true)}
                className="w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white rounded-lg transition-colors cursor-pointer"
              >
                Book Free Trial
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 md:space-y-32">

        {/* ── Hero + Trust Counters — shared full-bleed background ── */}
        <div className="relative rounded-3xl overflow-hidden">

          {/* Background video — spans hero and trust counters */}
          <video
            src="/dancer_hero_bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            style={{ filter: "contrast(1.1) saturate(1.12)" }}
          />

          {/* Left-to-right gradient — text panel readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/22 to-transparent pointer-events-none" />

          {/* Bottom fade — image dissolves into page background */}
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-b from-transparent to-[#f8f7f5] pointer-events-none" />

          {/* ── Hero ── */}
          <motion.section
            id="hero-interactive"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative min-h-[500px] lg:min-h-[580px] flex items-center px-6 sm:px-8 md:px-10 py-10 md:py-14"
          >
            {/* Ballet arc rings — reduced size and weight */}
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[18rem] h-[18rem] rounded-full border border-rose-200/20 pointer-events-none hidden lg:block" />
            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full border border-amber-200/12 pointer-events-none hidden lg:block" />

            {/* Pearl dot cluster */}
            <div className="absolute bottom-14 right-10 pointer-events-none hidden lg:block">
              {[[1,1,0],[1,1,1],[0,1,1]].map((row, r) => (
                <div key={r} className="flex gap-[5px] mb-[5px]">
                  {row.map((show, c) => show ? (
                    <div key={c} className="w-[4px] h-[4px] bg-rose-300 rounded-full opacity-25" />
                  ) : (
                    <div key={c} className="w-[4px] h-[4px]" />
                  ))}
                </div>
              ))}
            </div>

            {/* Floating accent dots — slow elegant movement */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-14 right-[26%] w-3.5 h-3.5 bg-rose-200/20 rounded-full pointer-events-none hidden lg:block"
            />
            <motion.div
              animate={{ y: [7, -7, 7] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              className="absolute top-36 right-[16%] w-2.5 h-2.5 bg-amber-200/15 rounded-full pointer-events-none hidden lg:block"
            />
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
              className="absolute bottom-40 right-[38%] w-3 h-3 bg-violet-200/10 rounded-full pointer-events-none hidden lg:block"
            />

            {/* ── Frosted glass content panel — left side ── */}
            <div className="relative z-10 w-full lg:w-[52%] xl:w-[47%]">
              <div className="bg-white/75 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/80 shadow-[0_20px_60px_-8px_rgba(0,0,0,0.22)] space-y-5">

                <span className="text-rose-500 text-xs font-semibold tracking-wide">Every Child Can Dance</span>

                <div className="space-y-3">
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.05]">
                    {STUDIO_CONFIG.mainTitle}
                  </h1>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-rose-600 to-blue-500 rounded-full" />
                </div>

                <p className="text-slate-600 text-base leading-relaxed font-sans max-w-md">
                  There's something magical about watching your child discover dance — the way they light up, stand a little taller, and find their own rhythm.{" "}
                  <span className="text-slate-700 font-medium">We give every child that gift.</span>
                </p>

                <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-1">
                  {[
                    "No experience required",
                    "Ages 3 – 17 welcome",
                    "Caring, certified teachers",
                    "Small, nurturing groups",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-rose-500 shrink-0 stroke-[2.5]" />
                      <span className="text-sm text-slate-700 font-semibold font-sans leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    id="hero-go-quiz-btn"
                    onClick={() => scrollTo("quiz-section-anchor", true)}
                    className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 cursor-pointer"
                  >
                    <span className="relative z-10">Book Free Trial Class</span>
                    <ChevronRight className="w-4 h-4 relative z-10" />
                    <span className="shimmer-beam-btn" aria-hidden="true" />
                  </button>
                  <button
                    id="hero-scroll-styles-btn"
                    onClick={() => scrollTo("dance-styles-section")}
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 font-bold text-sm uppercase tracking-wide rounded-xl border-2 border-white/80 hover:border-rose-200 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200 cursor-pointer"
                  >
                    <span>View Our Classes</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Trust Counters — inside background wrapper ── */}
          <section
            id="trust-counters"
            className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 px-6 sm:px-8 md:px-10 pt-8 pb-5 md:pt-10 md:pb-6"
          >
            <AnimatedCounter target={10} suffix="+" label="Years Teaching Children" iconName="Users" />
            <AnimatedCounter target={300} suffix="+" label="Happy Families" iconName="Heart" />
            <AnimatedCounter target={4} label="Dance Styles" iconName="Sparkles" />
            <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300">
              <div className="inline-flex p-2 sm:p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-400 mb-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black text-slate-950">4.9</span>
              <span className="text-xs sm:text-sm text-slate-500 mt-1.5 font-sans leading-snug">Google Rating</span>
            </div>
          </section>

        </div>

        {/* Quiz Zone */}
        <section id="quiz-section-anchor" className="mt-4 md:-mt-16 scroll-mt-24">
          <AnimatePresence mode="wait">
            {!quizStarted && !latestSubmission ? (
              <motion.div
                key="quiz-teaser"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative overflow-hidden bg-gradient-to-br from-[#1264A5] via-[#2196D9] to-[#4CB8F2] text-white rounded-2xl pt-14 pb-28 px-8 md:pt-16 md:pb-28 md:px-12 text-center border border-white/20 shadow-[0_20px_60px_-8px_rgba(33,150,217,0.45)]"
              >
                {/* Soft light bloom — top center */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[36rem] h-52 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                {/* Shimmer beam */}
                <div className="shimmer-beam" aria-hidden="true" />
                {/* Dark stripe at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#1264A5]/35 pointer-events-none" />

                {/* Content — badge, heading, text */}
                <div className="relative z-10 max-w-xl mx-auto space-y-6">
                  <div className="inline-flex bg-white/15 border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white">
                    ⚡ 1-Minute Quiz
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                    Find the Perfect Class for Your Child — Online
                  </h2>
                  <div className="w-16 h-0.5 bg-white/50 mx-auto rounded-full" />
                  <p className="text-white/80 text-base leading-relaxed max-w-lg mx-auto font-sans">
                    Answer 4 simple questions to reserve your child's free trial lesson and receive a complimentary posture assessment from our instructor.
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                    {[
                      { num: "01", text: "Answer 4 questions" },
                      { num: "02", text: "We call in 15 min" },
                      { num: "03", text: "Free class — no card" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/40 shrink-0" />}
                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                          <span className="font-mono font-bold text-[10px] text-white/50">{s.num}</span>
                          <span className="text-xs font-semibold text-white/90 font-sans">{s.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button centered in the dark stripe */}
                <div className="absolute bottom-0 left-0 right-0 h-28 flex flex-col items-center justify-center gap-2 z-10">
                  <button
                    id="teaser-start-btn"
                    onClick={() => setQuizStarted(true)}
                    className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/95 text-[#1264A5] font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 cursor-pointer"
                  >
                    <span className="relative z-10">Take the Quiz &amp; Book Now</span>
                    <ChevronRight className="w-4 h-4 relative z-10" />
                    <span className="shimmer-beam-btn" style={{ background: "linear-gradient(to right, transparent 0%, rgba(244,114,182,0.18) 50%, transparent 100%)" }} aria-hidden="true" />
                  </button>
                  <p className="text-white/55 text-[11px] font-sans tracking-wide">New beginner groups forming — limited spots</p>
                </div>
              </motion.div>
            ) : quizStarted && !latestSubmission ? (
              <motion.div
                key="active-wizard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <QuizWizard onComplete={handleQuizComplete} />
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                  className="inline-flex p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-500"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>

                <div className="space-y-3">
                  <h2 className="font-display text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                    You're All Set — Your Spot Is Reserved!
                  </h2>
                  <div className="w-12 h-0.5 bg-emerald-400 mx-auto rounded-full" />
                  <p className="text-slate-600 text-sm max-w-md mx-auto font-sans">
                    Thanks, {latestSubmission?.parentName}! We've reserved a free trial lesson for{" "}
                    <strong className="text-slate-900 font-bold">{latestSubmission?.childName}</strong>{" "}
                    ({latestSubmission?.childAge}).
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-4 max-w-lg mx-auto">
                  <span className="text-xs font-mono uppercase font-bold text-slate-500 tracking-widest block border-b border-slate-200 pb-1.5">
                    What happens next
                  </span>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-[10px] font-mono font-bold shrink-0 mt-0.5 rounded-full">01</span>
                    <p className="text-sm text-slate-600 font-medium font-sans">
                      Within 15 minutes we'll send you a current class schedule via{" "}
                      {contactLabel(latestSubmission?.preferredContact ?? "phone")}.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-[10px] font-mono font-bold shrink-0 mt-0.5 rounded-full">02</span>
                    <p className="text-sm text-slate-600 font-medium font-sans">
                      You'll pick a date and time that works for you. A new introductory group for{" "}
                      <strong className="text-slate-900">{latestSubmission?.danceDirection}</strong> is forming now!
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-[10px] font-mono font-bold shrink-0 mt-0.5 rounded-full">03</span>
                    <p className="text-sm text-slate-600 font-medium font-sans">
                      We'll send a prep checklist — what to wear and bring for the first class.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="submit-another-quiz-btn"
                    onClick={() => { setLatestSubmission(null); setQuizStarted(true); }}
                    className="px-6 py-3 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all cursor-pointer w-full sm:w-auto"
                  >
                    Register Another Child
                  </button>
                  <button
                    id="dismiss-success-btn"
                    onClick={() => { setLatestSubmission(null); setQuizStarted(false); }}
                    className="px-6 py-3 border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-900 font-bold uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer w-full sm:w-auto"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Team strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-2xl border border-slate-100 shadow-md px-8 py-6"
        >
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3 shrink-0">
              {[
                { id: "victoria", bg: "bg-rose-100" },
                { id: "jason",    bg: "bg-blue-100" },
                { id: "maria",    bg: "bg-violet-100" },
              ].map((ins) => (
                <div
                  key={ins.id}
                  className={`w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm ${ins.bg}`}
                >
                  <img
                    src={`/instructors/${ins.id}.png`}
                    alt={ins.id}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-0.5">
              <p className="font-display font-black text-slate-900 text-base uppercase tracking-tight">Our Instructors</p>
              <p className="text-sm text-slate-500 font-sans max-w-sm">
                Certified coaches with 5–10 years of experience teaching children at every level.
              </p>
            </div>
          </div>
          <Link
            to="/about"
            className="relative overflow-hidden shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
          >
            <span className="relative z-10">Meet the Team</span>
            <ChevronRight className="w-4 h-4 relative z-10" />
            <span className="shimmer-beam-btn" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Dance Styles */}
        <section id="dance-styles-section" className="space-y-8 pt-4 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
                What We Teach
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
                Dance Styles in Concord
              </h3>
              <div className="w-12 h-1 bg-[#2196D9] rounded-full mt-1" />
            </div>
            <p className="text-slate-500 text-sm max-w-sm font-sans md:text-right">
              All groups are strictly age-matched. Classes follow a structured, age-appropriate curriculum designed by certified instructors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DANCE_STYLES.map((style, idx) => (
              <Link
                key={style.id}
                to={`/classes#${style.id}`}
                className="block h-full"
              >
                <motion.div
                  id={`style-showcase-${style.id}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.13)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] hover:-translate-y-2 transform transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-56 sm:h-64 overflow-hidden relative bg-slate-100">
                    <img
                      src={style.imageUrl}
                      alt={style.title}
                      className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {style.ageGroups}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-black text-slate-950 text-base uppercase tracking-wide leading-tight">
                        {style.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans">
                        {style.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {style.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#2196D9] uppercase tracking-wider font-sans">
                      Learn More →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Age Group Guide */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
              Find the Right Class
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Which Class Is Right for Your Child?
            </h3>
            <div className="w-12 h-1 bg-[#2196D9] rounded-full mt-1 mx-auto" />
            <p className="text-slate-500 text-sm max-w-lg mx-auto font-sans pt-1">
              Every group is age-matched — your child will always learn with peers at the same stage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                ages: "3 – 5",
                label: "Little Ones",
                emoji: "🌟",
                color: "rose",
                bg: "bg-rose-50",
                border: "border-rose-100",
                badge: "bg-rose-100 text-rose-600",
                accent: "text-rose-500",
                classes: ["Creative Movement", "Baby Dance"],
                desc: "Play-based movement, rhythm, and coordination. No rules — just joy and discovery.",
              },
              {
                ages: "6 – 8",
                label: "Beginners",
                emoji: "💫",
                color: "blue",
                bg: "bg-blue-50",
                border: "border-blue-100",
                badge: "bg-blue-100 text-blue-600",
                accent: "text-blue-500",
                classes: ["Classical Ballet", "Hip-Hop"],
                desc: "First real technique — posture, timing, and listening to music as a group.",
              },
              {
                ages: "9 – 12",
                label: "Developing",
                emoji: "⚡",
                color: "violet",
                bg: "bg-violet-50",
                border: "border-violet-100",
                badge: "bg-violet-100 text-violet-600",
                accent: "text-violet-500",
                classes: ["Hip-Hop", "Contemporary", "Ballet"],
                desc: "Building strength, style, and confidence. Ready for recital performances.",
              },
              {
                ages: "13 – 17",
                label: "Advanced",
                emoji: "🔥",
                color: "amber",
                bg: "bg-amber-50",
                border: "border-amber-100",
                badge: "bg-amber-100 text-amber-600",
                accent: "text-amber-500",
                classes: ["Jazz-Funk", "Contemporary", "Hip-Hop"],
                desc: "Serious training for teens who want to perform, compete, or just get really good.",
              },
            ].map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${group.bg} rounded-2xl border ${group.border} p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1.5 transform transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{group.emoji}</span>
                  <span className={`text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${group.badge}`}>
                    Ages {group.ages}
                  </span>
                </div>
                <div>
                  <p className={`font-display font-black text-sm uppercase tracking-wide ${group.accent}`}>{group.label}</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans mt-1">{group.desc}</p>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  {group.classes.map((cls, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${group.accent.replace("text-", "bg-")}`} />
                      <span className="text-sm font-semibold text-slate-700 font-sans">{cls}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/schedule"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border-2 ${group.border} ${group.accent} hover:bg-white transition-colors font-sans text-center block`}
                >
                  View Schedule →
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Schedule & Pricing teaser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-2xl border border-slate-100 shadow-md px-8 py-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-display font-black text-slate-900 text-lg uppercase tracking-tight">
              Class Schedule &amp; Pricing
            </p>
            <p className="text-sm text-slate-500 font-sans">
              Mon–Sat · Ages 3–17 · Starting from <span className="font-bold text-slate-700">$89/month</span> · First class free · <span className="font-bold text-rose-500">Sibling discount 15%</span>
            </p>
          </div>
          <Link
            to="/schedule"
            className="relative overflow-hidden shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
          >
            <span className="relative z-10">View Full Schedule</span>
            <ChevronRight className="w-4 h-4 relative z-10" />
            <span className="shimmer-beam-btn" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Gallery */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
              Inside Our Studio
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Come See Us in Action
            </h3>
            <div className="w-12 h-1 bg-[#2196D9] rounded-full mt-1" />
            <p className="text-slate-500 text-sm max-w-lg font-sans pt-1">
              A warm, safe space where children discover movement, confidence, and joy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { file: "studio_lobby.jpg",      label: "Lobby & Studio Space"    },
              { file: "class_toddlers.jpg",    label: "Baby Dance — Ages 3–5"   },
              { file: "class_ballet.jpg",      label: "Classical Ballet"         },
              { file: "class_hiphop.jpg",      label: "Hip-Hop Class"            },
              { file: "recital.jpg",           label: "Spring Recital"           },
              { file: "instructor_moment.jpg", label: "Instructor & Student"     },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 group"
              >
                {/* Placeholder visible behind */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200">
                  <Camera className="w-8 h-8 text-slate-300" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">{item.label}</span>
                </div>
                {/* Real photo loads on top, hides on error */}
                <img
                  src={`/gallery/${item.file}`}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Label overlay — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white text-xs font-bold font-mono uppercase tracking-wide">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
                Mark Your Calendar
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
                Upcoming Events
              </h3>
              <div className="w-12 h-1 bg-[#2196D9] rounded-full mt-1" />
            </div>
            <button
              onClick={() => scrollTo("quiz-section-anchor", true)}
              className="shrink-0 text-xs font-bold text-[#2196D9] hover:text-[#1779B8] uppercase tracking-wider font-sans transition-colors cursor-pointer"
            >
              Reserve your spot →
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                day: "13",
                month: "Jun",
                title: "Spring Recital 2026",
                desc: "Our annual showcase — all students perform on stage. Parents and family are welcome. Tickets reserved for enrolled families.",
                badge: "Recital",
                badgeStyle: "bg-rose-100 text-rose-600",
                highlight: true,
              },
              {
                day: "20",
                month: "Jun",
                title: "Open Class Day",
                desc: "Parents are invited in to watch a full 55-minute class and see exactly how we teach. No registration required.",
                badge: "Open Doors",
                badgeStyle: "bg-blue-100 text-blue-600",
                highlight: false,
              },
              {
                day: "05",
                month: "Sep",
                title: "New Season Begins",
                desc: "Fall 2026 groups are now forming. Early registration gets priority class placement. First class is always free.",
                badge: "New Groups",
                badgeStyle: "bg-emerald-100 text-emerald-600",
                highlight: false,
              },
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-2xl border shadow-md hover:shadow-xl hover:-translate-y-1.5 transform transition-all duration-300 p-6 flex gap-5 ${
                  event.highlight ? "border-rose-200 shadow-rose-100/50" : "border-slate-100"
                }`}
              >
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-center ${
                  event.highlight ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-700"
                }`}>
                  <span className="font-display font-black text-xl leading-none">{event.day}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-80">{event.month}</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-black text-slate-900 text-sm uppercase tracking-tight leading-snug">{event.title}</p>
                    <span className={`shrink-0 text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${event.badgeStyle}`}>
                      {event.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-sans">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
              What Parents Say
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Trusted by 300+ Families
            </h3>
            <div className="w-12 h-1 bg-[#2196D9] rounded-full mt-1 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                text: "We tried two other studios before finding Rising Stars. The difference is night and day — small groups, a teacher who actually knows my daughter's name, and Lily comes home humming the music every Tuesday. She asked to go back the same evening after her first class.",
                name: "Sarah M.",
                child: "Mom of Lily, age 5 · Ballet",
                initials: "SM",
                color: "#f43f5e",
              },
              {
                text: "Diego is the shy type — I was honestly worried he'd freeze up and refuse to go in. The instructor let him stand at the door for the first ten minutes. By the end of the class he was in the middle of the room. That told me everything I needed to know.",
                name: "Marcus T.",
                child: "Dad of Diego, age 11 · Hip-Hop",
                initials: "MT",
                color: "#2196D9",
              },
              {
                text: "The spring recital had me in tears — the good kind. Emma performed on a real stage with lighting and everything. Watching her take a bow was one of those moments. We've been here two years and have zero plans to leave.",
                name: "Jennifer K.",
                child: "Mom of Emma, age 9 · Contemporary",
                initials: "JK",
                color: "#10b981",
              },
              {
                text: "Taking two four-year-olds anywhere is chaos. But drop-off at Rising Stars is genuinely easy — the staff is warm, the lobby is comfortable, and both kids sprint to the door every week. That's the best endorsement I can give.",
                name: "David R.",
                child: "Dad of twins Mia & Leo, age 4",
                initials: "DR",
                color: "#f59e0b",
              },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transform transition-all duration-300 p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm font-display">{t.name}</p>
                    <p className="text-xs text-slate-400 font-sans">{t.child}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <motion.section
          id="faq-reviews"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-[0_20px_60px_-8px_rgba(0,0,0,0.28)] space-y-6 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-400">
                <Heart className="w-5 h-5 fill-rose-400 shrink-0" />
              </div>
              <h4 className="font-display text-xl font-black text-slate-950 uppercase tracking-tight">
                Parents Trust Us With Their Kids
              </h4>
              <div className="w-12 h-1 bg-[#2196D9] rounded-full" />
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Common questions from parents before the first visit to the studio.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-slate-100">
              {[
                {
                  q: "What happens during the free trial class?",
                  a: `Your child joins a real class with their age group — no separate "visitor session." The instructor introduces them to the group, keeps the warm-up playful, and gives them just enough to do so they feel included from minute one. Afterward, you'll get a quick debrief on what style and level would be the best fit. The whole visit takes about one hour.`,
                },
                {
                  q: "Do parents stay and watch during class?",
                  a: "Parents are welcome to wait in our comfortable lobby. We keep regular classes closed to observers so children stay focused and build confidence without feeling watched — it makes a real difference in the early weeks. We host quarterly open classes and two full recitals per year so every family gets to see the progress up close.",
                },
                {
                  q: "My child is shy. What if they freeze up or refuse to go in?",
                  a: "It happens more than you'd think — and our instructors are experienced at it. We never push a hesitant child into the room. Instead, we invite them to stand at the door and watch, and almost every time, curiosity wins within a few minutes. The warm-up is designed to feel like a game, not a drill, so even the shyest kids find a way in.",
                },
                {
                  q: "Is there any commitment or obligation after the free trial?",
                  a: "None. The trial class is completely free with zero strings attached — no pressure to enroll on the day, no auto-billing, and no follow-up calls unless you want them. If your child loves it and wants to continue, enrollment takes about two minutes.",
                },
              ].map((item, i) => (
                <div key={i} className={i === 0 ? "pt-0" : ""}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-5 flex items-start justify-between gap-3 text-left cursor-pointer group"
                    aria-expanded={openFaq === i}
                  >
                    <span className="flex items-start gap-2.5 flex-1">
                      <ShieldCheck className="w-4 h-4 text-[#2196D9] shrink-0 mt-0.5" />
                      <span className="font-bold text-slate-900 font-display text-sm group-hover:text-[#2196D9] transition-colors">
                        {item.q}
                      </span>
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 mt-0.5"
                    >
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#2196D9] transition-colors" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-500 leading-relaxed pl-[26px] pb-5 font-sans">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-5 pb-1">
                <Link
                  to="/faq"
                  className="text-xs font-bold text-[#2196D9] hover:text-[#1779B8] uppercase tracking-wider font-sans transition-colors"
                >
                  See all questions →
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Map — Come Visit Us */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 md:p-10 flex flex-col justify-between gap-8"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
                Come Visit Us
              </span>
              <h3 className="font-display text-2xl font-black text-slate-950 uppercase tracking-tight">
                Find the Studio
              </h3>
              <div className="w-12 h-1 bg-[#2196D9] rounded-full" />
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm font-display uppercase tracking-tight">Address</p>
                  <p className="text-sm text-slate-500 font-sans mt-0.5">{STUDIO_CONFIG.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(STUDIO_CONFIG.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold font-sans transition-colors mt-1 block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="inline-flex p-2.5 rounded-xl bg-[#2196D9]/10 border border-[#2196D9]/20 text-[#2196D9] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm font-display uppercase tracking-tight">Working Hours</p>
                  <p className="text-sm text-slate-500 font-sans mt-0.5">Monday – Saturday · 10:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="inline-flex p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm font-display uppercase tracking-tight">Phone</p>
                  <a
                    href={`tel:${STUDIO_CONFIG.phone}`}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold font-sans mt-0.5 block transition-colors"
                  >
                    {STUDIO_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollTo("quiz-section-anchor", true)}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 cursor-pointer"
            >
              <span className="relative z-10">Book Free Trial</span>
              <ChevronRight className="w-4 h-4 relative z-10" />
              <span className="shimmer-beam-btn" aria-hidden="true" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden shadow-md border border-slate-100 min-h-[360px]"
          >
            <iframe
              title="Rising Stars Dance Academy location"
              src="https://maps.google.com/maps?q=4850+Concord+Blvd+Concord+CA+94521&output=embed&z=15"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#1264A5] via-[#2196D9] to-[#4CB8F2] rounded-3xl px-8 py-16 md:px-14 md:py-20 text-white text-center"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[40rem] h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="shimmer-beam" aria-hidden="true" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                4.9 Google Rating
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white">
                300+ Families
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Your Child's First Class<br />
              <span className="text-white/70">Is On Us.</span>
            </h2>
            <div className="w-16 h-0.5 bg-white/40 mx-auto rounded-full" />
            <p className="text-white/80 text-base leading-relaxed max-w-lg mx-auto">
              Answer 4 quick questions and we'll match your child with the perfect class — no card needed, no commitment, first class always free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("quiz-section-anchor", true)}
                className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/95 text-[#1264A5] font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10">Book Free Trial Now</span>
                <ChevronRight className="w-4 h-4 relative z-10" />
                <span className="shimmer-beam-btn" style={{ background: "linear-gradient(to right, transparent 0%, rgba(244,114,182,0.18) 50%, transparent 100%)" }} aria-hidden="true" />
              </button>
              <a
                href={`tel:${STUDIO_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                {STUDIO_CONFIG.phone}
              </a>
            </div>
            <p className="text-white/45 text-xs font-sans tracking-wide pt-1">
              New beginner groups forming — limited spots available
            </p>
          </div>
        </motion.section>

        {/* ─── Admin-only CRM section ─── */}
        {showCRM && (
          <motion.section
            id="crm-dashboard-drawer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white border border-slate-950 rounded-t-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                Admin · Lead Dashboard · {submissions.length} leads
              </span>
              <button
                onClick={() => setShowCRM(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SubmissionsDashboard
              submissions={submissions}
              onDelete={handleDeleteLead}
              onUpdateStatus={handleUpdateStatus}
              onAddMockLeads={handleAddMockLeads}
            />
          </motion.section>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 bg-gradient-to-br from-[#4CB8F2] to-[#1779B8] rotate-45 flex items-center justify-center shrink-0 shadow-sm">
                  <div className="w-2.5 h-2.5 bg-white -rotate-45" />
                </div>
                <span className="font-display font-black text-sm tracking-widest uppercase">
                  {STUDIO_CONFIG.academyName}
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs font-sans">
                Over 10 years of children's dance education, now rooted in Concord, California.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://instagram.com/risingstarsdance"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-[#f43f5e] hover:to-[#f97316] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#25d366] text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.486a.5.5 0 0 0 .611.61l5.757-1.506A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.863 9.863 0 0 1-5.022-1.375l-.36-.214-3.717.972.99-3.617-.235-.372A9.845 9.845 0 0 1 2.118 12C2.118 6.535 6.535 2.118 12 2.118S21.882 6.535 21.882 12 17.465 21.882 12 21.882z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-mono font-bold text-[#2196D9] text-xs uppercase tracking-widest">
                Address &amp; Contact
              </h5>
              <div className="text-sm text-slate-400 space-y-1 font-mono uppercase">
                <span className="block">{STUDIO_CONFIG.address}</span>
                <span className="block">Tel: {STUDIO_CONFIG.phone}</span>
                <span className="block">Email: {STUDIO_CONFIG.email}</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(STUDIO_CONFIG.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#2196D9] hover:text-white font-semibold font-sans transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Get Directions →
              </a>
            </div>

            <div className="space-y-3">
              <h5 className="font-mono font-bold text-[#2196D9] text-xs uppercase tracking-widest">
                For Parents
              </h5>
              <p className="text-sm text-slate-400 font-sans">
                Book your child's free trial class online and receive a complimentary posture assessment — no commitment needed.
              </p>
            </div>
          </div>

          {/* Legal bottom bar */}
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  className="text-xs text-slate-600 hover:text-slate-300 transition-colors font-sans"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-slate-700 font-sans hidden sm:block">
              CA Business · CCPA Compliant
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA bar — appears after scrolling past hero */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-6 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none"
          >
            <button
              onClick={() => scrollTo("quiz-section-anchor", true)}
              className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-sm uppercase tracking-wide rounded-xl shadow-lg cursor-pointer pointer-events-auto"
            >
              <span className="relative z-10">Book Free Trial Class</span>
              <ChevronRight className="w-4 h-4 relative z-10" />
              <span className="shimmer-beam-btn" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp floating button — mobile only */}
      <a
        href={`https://wa.me/${STUDIO_CONFIG.phone.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.486a.5.5 0 0 0 .611.61l5.757-1.506A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.863 9.863 0 0 1-5.022-1.375l-.36-.214-3.717.972.99-3.617-.235-.372A9.845 9.845 0 0 1 2.118 12C2.118 6.535 6.535 2.118 12 2.118S21.882 6.535 21.882 12 17.465 21.882 12 21.882z"/>
        </svg>
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
