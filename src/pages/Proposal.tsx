import { motion } from "motion/react";
import {
  CheckCircle2,
  MessageCircle,
  Zap,
  TrendingUp,
  Users,
  Star,
  Clock,
  Shield,
  Smartphone,
  BarChart3,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const WA_NUMBER = "14156139969";
const WA_MESSAGE = encodeURIComponent(
  "Hi Njasik! I saw your proposal and I'm interested in a website for my dance studio. Can we talk?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const INCLUDED = [
  { icon: Smartphone,    text: "Mobile-first design — perfect on any device" },
  { icon: Zap,           text: "Free Trial booking quiz — converts visitors to leads" },
  { icon: Users,         text: "Class schedule & age-group matching" },
  { icon: BarChart3,     text: "Pricing section that justifies your rates" },
  { icon: Star,          text: "Instructor profiles & gallery page" },
  { icon: Shield,        text: "FAQ, Privacy Policy, Terms of Service" },
  { icon: TrendingUp,    text: "SEO-ready structure & page speed optimized" },
  { icon: Clock,         text: "Ready to launch in 7 days" },
];

const PROBLEMS = [
  "Parents can't find you on Google",
  "No online booking — leads go to competitors",
  "Your Instagram bio can't answer questions at 11 PM",
  "Enrollment stays flat even when your classes are great",
];

const STEPS = [
  { n: "01", title: "You fill in a short form",      desc: "Studio name, schedule, instructor bios — I handle the rest." },
  { n: "02", title: "I build your custom site",      desc: "7 days. Your colors, your photos, your story." },
  { n: "03", title: "You review & approve",          desc: "One round of revisions included — no surprises." },
  { n: "04", title: "Launch & start getting leads",  desc: "I deploy to your domain. Parents start booking." },
];

export default function Proposal() {
  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans text-slate-900 antialiased">

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0d2240] to-[#1264A5] text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2196D9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4CB8F2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4CB8F2] mb-6 border border-[#4CB8F2]/30 px-3 py-1.5 rounded-full bg-[#4CB8F2]/10">
              Proposal for Dance Studios · 2026
            </span>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6">
              Your studio deserves a website that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CB8F2] to-[#a8e6ff]">
                actually fills classes
              </span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
              A professionally built landing page — designed to turn parents into booked trial classes.
              No templates. No page builders. Ready in 7 days.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <a
                href="#prototype"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
              >
                See the live demo below
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Pain Points ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          <div>
            <span className="text-xs font-mono font-bold text-[#2196D9] uppercase tracking-widest">The Problem</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mt-2 mb-4 tracking-tight">
              Great teaching.<br />
              <span className="text-slate-400">Invisible online.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm">
              Most dance studios rely on word-of-mouth and social media — and leave dozens of potential students on the table every month because there's no website to capture them.
            </p>
          </div>

          <div className="space-y-3">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3.5 shadow-sm"
              >
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span className="text-sm text-slate-600 leading-snug">{p}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="bg-white border-y border-slate-100 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-mono font-bold text-[#2196D9] uppercase tracking-widest">The Solution</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mt-2 tracking-tight">
              Everything your studio needs — nothing it doesn't
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INCLUDED.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 bg-[#f8f7f5] rounded-xl border border-slate-100"
              >
                <div className="w-8 h-8 bg-[#2196D9]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#2196D9]" />
                </div>
                <span className="text-sm text-slate-600 leading-snug">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Live Prototype ─── */}
      <section id="prototype" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="text-xs font-mono font-bold text-[#2196D9] uppercase tracking-widest">Live Demo</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mt-2 tracking-tight">
            This is what your site will look like
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
            Scroll, click, and explore — this is a fully working prototype, not a mockup.
          </p>
        </motion.div>

        {/* Browser chrome frame */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65 }}
          className="rounded-2xl overflow-hidden shadow-[0_32px_80px_-8px_rgba(0,0,0,0.22)] border border-slate-200"
        >
          {/* Browser top bar */}
          <div className="bg-[#e8e8e8] border-b border-slate-300 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono flex items-center gap-2 max-w-sm mx-auto border border-slate-200">
              <Shield className="w-3 h-3 text-[#28c840] shrink-0" />
              dance-studio-template.vercel.app
            </div>
            <a
              href="https://dance-studio-template.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* iframe */}
          <div className="relative bg-white" style={{ height: "70vh", minHeight: "500px" }}>
            <iframe
              src="https://dance-studio-template.vercel.app"
              title="Dance Studio Website Prototype"
              className="w-full h-full border-0"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-400 mt-4 font-mono">
          ↑ This is a real, working site — not a screenshot. Scroll and interact.
        </p>
      </section>

      {/* ─── How it Works ─── */}
      <section className="bg-white border-y border-slate-100 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-mono font-bold text-[#2196D9] uppercase tracking-widest">Process</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mt-2 tracking-tight">
              From handshake to live site — 7 days
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <span className="font-display font-black text-5xl text-[#2196D9]/30 leading-none block mb-3">
                  {step.n}
                </span>
                <h3 className="font-display font-black text-base text-slate-900 tracking-tight mb-1">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-snug">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-bold text-[#2196D9] uppercase tracking-widest">Investment</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mt-2 mb-4 tracking-tight">
              One student pays for the whole site
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              At $89–149/month per student, a single new enrollment covers your site in 3–4 months.
              Most studios see 5–10 new leads in the first month alone.
            </p>

            <div className="mt-6 space-y-2.5">
              {[
                "Custom design matching your brand",
                "All pages: Home, Classes, Schedule, Gallery, FAQ, About",
                "Hosted & deployed — no technical knowledge needed",
                "1 free revision round",
                "30-day support after launch",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#2196D9] shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#0d2240] to-[#1264A5] rounded-2xl p-8 text-white shadow-[0_24px_60px_rgba(18,100,165,0.35)]"
          >
            <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-2">Starting from</p>
            <p className="font-display font-black text-6xl tracking-tight mb-1">$500</p>
            <p className="text-white/60 text-sm mb-8">one-time, flat fee · no surprises</p>

            <div className="space-y-3 mb-8">
              {["7-day delivery", "Mobile-optimized", "Hosted on Vercel (free tier)", "Domain setup included"].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4CB8F2] shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              I'm interested — let's talk
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gradient-to-br from-[#0a1628] via-[#0d2240] to-[#1264A5] py-20 md:py-28 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-[#2196D9]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
              Ready to fill your classes?
            </h2>
            <p className="text-white/65 text-base leading-relaxed">
              Message me on WhatsApp and we'll have your site live within a week.
              No commitment — let's just talk.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              Message Njasik on WhatsApp
            </a>
            <p className="text-white/30 text-xs font-mono">
              +1 (415) 613-9969 · Usually replies within a few hours
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
