/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Clock,
  ChevronDown,
  Phone,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { STUDIO_CONFIG } from "../data";

// ── Types ────────────────────────────────────────────────────────────────────

type BlockType = "p" | "h3" | "ul" | "callout";

interface Block {
  type: BlockType;
  text?: string;
  items?: string[];
}

interface Article {
  id: string;
  num: string;
  category: string;
  badgeBg: string;
  badgeText: string;
  accentFrom: string;
  accentTo: string;
  readTime: string;
  title: string;
  subtitle: string;
  body: Block[];
}

// ── Article content ───────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: "choosing-dance-style",
    num: "01",
    category: "Parent Guide",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-600",
    accentFrom: "from-violet-200",
    accentTo: "to-purple-300",
    readTime: "5 min",
    title: "How to Choose the Right Dance Style for Your Child",
    subtitle:
      "From ballet's precision to hip-hop's energy — a practical guide to matching your child's personality with the perfect class.",
    body: [
      {
        type: "p",
        text: "Choosing a dance style shouldn't feel like a guessing game. Different styles develop different skills — physical, emotional, and social — and the best fit depends on who your child is right now, not who you hope they'll become.",
      },
      { type: "h3", text: "Start with age" },
      {
        type: "p",
        text: "For children ages 3–5, the style matters less than the environment. Creative Movement and Baby Dance focus on body awareness, rhythm, and play — no structure, no uniforms, just joyful exploration. At this age, the goal is a positive first relationship with movement.",
      },
      {
        type: "p",
        text: "From ages 6 and up, children are ready for their first real technique. Ballet and Hip-Hop are both excellent starting points, for very different reasons.",
      },
      { type: "h3", text: "Ballet: for children who love structure" },
      {
        type: "p",
        text: "Ballet builds everything — posture, musicality, coordination, and focus. It moves slowly by design: each element is isolated and repeated until it becomes second nature. Children who are patient and attentive thrive here, and the skills transfer to every other style they ever learn.",
      },
      { type: "h3", text: "Hip-Hop: for children with big energy" },
      {
        type: "p",
        text: "Hip-Hop classes channel physical energy into rhythm, timing, and self-expression. There's more room to experiment, the music is current, and children feel capable quickly. Kids who struggle to sit still often find their best focus in a hip-hop class.",
      },
      { type: "h3", text: "A simple rule of thumb" },
      {
        type: "ul",
        items: [
          "Disciplined and patient → Ballet",
          "Energetic and social → Hip-Hop",
          "Imaginative and expressive → Contemporary",
          "Under 6 → Creative Movement (anything goes)",
        ],
      },
      {
        type: "callout",
        text: "The best way to decide? Come for the free trial. Your child joins a real class, and afterward our instructor gives you a personal recommendation based on what they observed — no guesswork required.",
      },
    ],
  },
  {
    id: "first-class",
    num: "02",
    category: "First Visit",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-600",
    accentFrom: "from-rose-200",
    accentTo: "to-pink-300",
    readTime: "4 min",
    title: "What to Expect at Your Child's First Dance Class",
    subtitle:
      "First-day nerves are normal — for kids and for parents. Here's exactly what happens, minute by minute.",
    body: [
      {
        type: "p",
        text: "The most common thing parents say before a trial class: 'I don't know what to expect.' That uncertainty is exactly what we want to remove. Here's everything that happens during a first visit to Rising Stars.",
      },
      { type: "h3", text: "Before you arrive" },
      {
        type: "p",
        text: "No special gear needed for the trial. Comfortable athletic wear — leggings, shorts, a fitted top — and bare feet or socks are all your child needs. Dance shoes and uniforms come later, if and when you decide to enroll.",
      },
      { type: "h3", text: "When you walk in" },
      {
        type: "p",
        text: "You'll be greeted and shown to our lobby. If your child seems hesitant, our instructors are trained to handle shy arrivals. They'll never push a child into the room before they're ready.",
      },
      { type: "h3", text: "The warm-up: more game than exercise" },
      {
        type: "p",
        text: "For younger children, the warm-up often involves freeze-dancing, animal walks, and follow-the-leader games. For older kids, it shifts to coordinated movement that builds listening and spatial awareness. The goal is comfort first, technique second.",
      },
      { type: "h3", text: "After class: your debrief" },
      {
        type: "p",
        text: "At the end of the trial, the instructor will spend a few minutes with you — sharing observations about your child's strengths, interests, and the best class level for them going forward.",
      },
      {
        type: "callout",
        text: "If your child hesitates, cries, or wants to leave — that doesn't mean dance isn't right for them. Some children stand at the door for the entire first class and come back the next week ready to jump in. We work at your child's pace, always.",
      },
    ],
  },
  {
    id: "confidence-development",
    num: "03",
    category: "Development",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-600",
    accentFrom: "from-sky-200",
    accentTo: "to-blue-300",
    readTime: "6 min",
    title: "5 Ways Dance Builds Confidence in Children",
    subtitle:
      "Dance isn't just movement. Its most powerful effects are emotional — and they show up in school, friendships, and everyday life.",
    body: [
      {
        type: "p",
        text: "Parents often enroll children in dance for the physical benefits. What surprises them — sometimes six months in, sometimes after the first recital — is how much changes emotionally.",
      },
      { type: "h3", text: "1. They learn to try hard things" },
      {
        type: "p",
        text: "Dance involves failing constantly. Steps don't work on the first try. Routines take weeks. Children who dance regularly develop a healthy relationship with difficulty — they learn that effort produces results, and that getting something wrong is part of the process.",
      },
      { type: "h3", text: "2. They perform for others" },
      {
        type: "p",
        text: "Even small in-class performances require courage that most children don't encounter in everyday life. Over time, the discomfort of being watched transforms into confidence. Our spring recital is often the moment parents describe as 'when I saw something different in my child.'",
      },
      { type: "h3", text: "3. They move in sync with others" },
      {
        type: "p",
        text: "Dancing in a group requires listening, spatial awareness, and the ability to adapt. Children in group classes become better at reading social situations — skills that show up in school, on sports teams, and in friendships.",
      },
      { type: "h3", text: "4. They develop ownership of their body" },
      {
        type: "p",
        text: "Good posture, controlled movement, and coordination give children a quiet confidence in how they inhabit the world. Dance students often stand differently — more comfortable in their own skin. This is one of the things parents comment on most after six months.",
      },
      { type: "h3", text: "5. Specific, genuine praise" },
      {
        type: "p",
        text: "In our classes, instructors give real feedback — not 'great job!' but 'your arms held exactly the right shape in that combination.' Children learn to receive praise that means something, and over time they start to notice their own progress. That self-awareness is the foundation of real confidence.",
      },
      {
        type: "callout",
        text: "Most parents don't see the confidence shift until they notice it somewhere else — in a school presentation, a social situation, or just the way their child walks into a room.",
      },
    ],
  },
  {
    id: "ballet-vs-hiphop",
    num: "04",
    category: "Comparison",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-600",
    accentFrom: "from-amber-200",
    accentTo: "to-yellow-300",
    readTime: "4 min",
    title: "Ballet vs. Hip-Hop: Which Is Right for Your Child?",
    subtitle:
      "Two very different worlds, both valuable. An honest breakdown of what each style teaches and who it's best suited for.",
    body: [
      {
        type: "p",
        text: "Ballet and Hip-Hop are two of the most popular classes for children — and two of the most different. Many parents come in already leaning toward one, then change their mind after watching a class. Here's what actually separates them.",
      },
      { type: "h3", text: "Ballet: structure, precision, and long-term foundation" },
      {
        type: "p",
        text: "Ballet is the most technically demanding style we teach. Classes follow a clear, progressive curriculum with a constant emphasis on alignment, posture, and musicality. It moves slowly, and that's the point: every element is isolated and practiced until it's automatic.",
      },
      {
        type: "p",
        text: "The payoff is a physical and musical vocabulary that makes every other style easier to learn. If your child is patient, attentive, and drawn to graceful movement, ballet is a natural starting point.",
      },
      {
        type: "ul",
        items: [
          "Best for: focused, patient children who enjoy precision",
          "Ages: 6 and up — boys and girls equally",
          "Develops: posture, coordination, musicality, discipline",
        ],
      },
      { type: "h3", text: "Hip-Hop: rhythm, energy, and self-expression" },
      {
        type: "p",
        text: "Hip-Hop classes are louder, faster, and more free. The emphasis is on rhythm, timing, and personal style within a structure. Choreography uses current music — children feel capable and confident almost immediately. Kids who struggle with stillness often find their best focus here.",
      },
      {
        type: "ul",
        items: [
          "Best for: energetic, social children who want to feel the music",
          "Ages: 6 and up — especially strong for 9–17",
          "Develops: rhythm, timing, self-expression, confidence",
        ],
      },
      {
        type: "callout",
        text: "Many of our students take both — and the two styles complement each other beautifully. Ballet makes Hip-Hop more controlled; Hip-Hop makes Ballet more musical. If you're not sure, the free trial will tell you which room your child wants to come back to.",
      },
    ],
  },
];

// ── Article body renderer ─────────────────────────────────────────────────────

function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 pt-6 border-t border-slate-100">
      {blocks.map((block, i) => {
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              className="font-display font-black text-slate-900 text-sm uppercase tracking-wide pt-2 first:pt-0"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p key={i} className="text-sm text-slate-600 leading-relaxed font-sans">
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.items?.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600 font-sans">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2196D9] shrink-0 mt-[7px]" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "callout") {
          return (
            <div
              key={i}
              className="bg-gradient-to-br from-[#2196D9]/6 to-[#2196D9]/10 border border-[#2196D9]/15 rounded-xl p-5"
            >
              <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
                {block.text}
              </p>
            </div>
          );
        }
        return null;
      })}

      {/* Book CTA inside article */}
      <div className="pt-4 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-200"
        >
          Book Free Trial
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-xs text-slate-400 font-sans">No commitment · First class free</span>
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export default function Blog() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const [featured, ...rest] = ARTICLES;

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
                Studio Blog
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/" className="hover:text-[#2196D9] transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#2196D9] transition-colors">
              About
            </Link>
            <Link to="/schedule" className="hover:text-[#2196D9] transition-colors">
              Schedule
            </Link>
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
              key="blog-mobile-nav"
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
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">

        {/* ── Blog hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            For Parents
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-tight">
            Studio Blog
          </h1>
          <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-[#2196D9] rounded-full" />
          <p className="text-slate-500 text-base font-sans max-w-lg pt-1 leading-relaxed">
            Honest guides and practical answers for parents navigating the world of children's dance.
          </p>
        </motion.div>

        {/* ── Featured article ── */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Decorative image panel */}
            <div className={`lg:col-span-2 relative h-52 lg:h-auto bg-gradient-to-br ${featured.accentFrom} ${featured.accentTo} overflow-hidden flex items-center justify-center`}>
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full border border-white/30" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-white/25" />
                <div className="absolute w-[120px] h-[120px] rounded-full border border-white/20" />
              </div>
              {/* Large number watermark */}
              <span className="font-display font-black text-[7rem] leading-none text-white/20 select-none relative z-10">
                {featured.num}
              </span>
              {/* Featured pill */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1.5 bg-white/80 backdrop-blur-sm text-violet-700 rounded-full border border-violet-200/50">
                  Featured
                </span>
              </div>
            </div>

            {/* Content panel */}
            <div className="lg:col-span-3 p-8 md:p-10 flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${featured.badgeBg} ${featured.badgeText}`}>
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime} read
                  </span>
                </div>
                <h2 className="font-display font-black text-slate-950 text-xl md:text-2xl uppercase tracking-tight leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-sans max-w-lg">
                  {featured.subtitle}
                </p>
              </div>

              <button
                onClick={() => toggle(featured.id)}
                className="self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2196D9] hover:text-[#1779B8] transition-colors cursor-pointer font-sans"
              >
                {expandedId === featured.id ? "Collapse article" : "Read article"}
                <motion.span
                  animate={{ rotate: expandedId === featured.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
            </div>
          </div>

          {/* Expanded body */}
          <AnimatePresence initial={false}>
            {expandedId === featured.id && (
              <motion.div
                key="featured-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-slate-100"
              >
                <div className="px-8 md:px-10 pb-10 max-w-3xl">
                  <ArticleBody blocks={featured.body} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>

        {/* ── Remaining articles ── */}
        <div className="space-y-5">
          {rest.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`h-1.5 bg-gradient-to-r ${article.accentFrom} ${article.accentTo}`} />

              <div className="p-6 md:p-8">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Number */}
                    <span className="font-display font-black text-slate-100 text-4xl leading-none select-none shrink-0 mt-0.5">
                      {article.num}
                    </span>
                    {/* Text content */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${article.badgeBg} ${article.badgeText}`}>
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-sans">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-slate-950 text-base md:text-lg uppercase tracking-tight leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => toggle(article.id)}
                    aria-expanded={expandedId === article.id}
                    className="shrink-0 w-9 h-9 rounded-xl border border-slate-200 hover:border-[#2196D9]/30 hover:bg-[#2196D9]/5 text-slate-400 hover:text-[#2196D9] flex items-center justify-center transition-all cursor-pointer"
                  >
                    <motion.span
                      animate={{ rotate: expandedId === article.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>
                </div>

                {/* Expanded body */}
                <AnimatePresence initial={false}>
                  {expandedId === article.id && (
                    <motion.div
                      key={`body-${article.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 max-w-3xl">
                        <ArticleBody blocks={article.body} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>

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
              Book a Free Trial Class
            </h2>
            <div className="w-12 h-0.5 bg-white/40 mx-auto rounded-full" />
            <p className="text-white/80 text-base font-sans leading-relaxed">
              No commitment, no credit card. Your child joins a real class with their age group and our instructor gives you a personal recommendation afterward.
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
