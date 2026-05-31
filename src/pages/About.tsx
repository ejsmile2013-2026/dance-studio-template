import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  Users,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { STUDIO_CONFIG } from "../data";

const TEAM = [
  {
    id: "victoria",
    name: "Victoria Reyes",
    title: "Studio Director & Lead Instructor",
    styles: ["Ballet", "Contemporary"],
    ages: "Ages 3–12",
    exp: "10 years",
    certifications: ["RAD Certified", "Child Development Specialist"],
    bio: "Victoria started dancing at age 5 and began teaching at 18. After performing with regional companies in California and Oregon, she shifted her focus entirely to education — and hasn't looked back. She built Rising Stars around one principle: every child deserves to feel at home in their body before technique ever enters the picture. She leads all curriculum development and teaches the foundational Ballet and Contemporary programs.",
  },
  {
    id: "jason",
    name: "Jason Park",
    title: "Hip-Hop & Street Styles",
    styles: ["Hip-Hop", "Jazz-Funk", "Breaking"],
    ages: "Ages 6–17",
    exp: "6 years",
    certifications: ["YPAD Certified", "Background Checked"],
    bio: "Jason competed and performed professionally for seven years before switching his focus to teaching. He came to Rising Stars after a stint at a community youth program, where he discovered that teaching kids is harder — and more rewarding — than any stage performance he'd done. His classes are loud, physical, and full of real technique. Students leave knowing exactly what they worked on and why.",
  },
  {
    id: "maria",
    name: "Maria Santos",
    title: "Creative Movement & Baby Dance",
    styles: ["Baby Dance", "Creative Movement"],
    ages: "Ages 3–5",
    exp: "5 years",
    certifications: ["Early Childhood Education Degree", "First Aid Certified"],
    bio: "Maria studied Early Childhood Education at UC Davis before discovering movement as the most natural learning tool for young children. Her classes for the littlest dancers are built entirely around play, music, and imagination — no pressure, no drills, just joy. Parents routinely report that their kids start humming the warm-up songs at breakfast. Maria also runs our parent-orientation sessions for new families.",
  },
];

const MILESTONES = [
  { year: "2014", text: "Rising Stars founded by Victoria Reyes in a rented church hall — 12 students, one instructor." },
  { year: "2017", text: "Moved to our permanent studio at 4850 Concord Blvd. Added Hip-Hop and Contemporary programs." },
  { year: "2019", text: "First Spring Recital at Concord Community Theater. 80 students performed to a sold-out house." },
  { year: "2021", text: "Expanded to 6 weekly class slots. Introduced the free trial program — now our most powerful tool for new families." },
  { year: "2024", text: "Reached 300+ enrolled families. Added Baby Dance program for ages 3–5 with Maria Santos." },
];

const VALUES = [
  {
    icon: Heart,
    color: "rose",
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-500",
    title: "Confidence Before Technique",
    desc: "We don't rush children into correct positions. We build the relationship with movement first — technique follows naturally from there.",
  },
  {
    icon: ShieldCheck,
    color: "emerald",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
    title: "Safe, Background-Checked Staff",
    desc: "Every instructor at Rising Stars is background-checked, first-aid certified, and trained to work specifically with children.",
  },
  {
    icon: Users,
    color: "blue",
    bg: "bg-[#2196D9]/10",
    border: "border-[#2196D9]/20",
    text: "text-[#2196D9]",
    title: "Small Groups, Real Attention",
    desc: "10 students maximum per class. Your child will always be seen, heard, and given personal feedback — not lost in a crowd.",
  },
  {
    icon: Sparkles,
    color: "violet",
    bg: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-500",
    title: "Age-Matched From Day One",
    desc: "Every group is strictly age-appropriate. A 5-year-old never trains alongside a 10-year-old. The curriculum is built for that specific stage.",
  },
  {
    icon: Award,
    color: "amber",
    bg: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-500",
    title: "Twice-Yearly Recitals",
    desc: "Students perform on a real stage twice a year in full costume. This milestone builds public confidence that lasts well beyond dance.",
  },
  {
    icon: Star,
    color: "rose",
    bg: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-500",
    title: "No Pressure, Ever",
    desc: "We don't push hesitant children. We don't compare students. We don't run elimination-style competitions. We just teach.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link to="/schedule" className="hover:text-[#2196D9] transition-colors">Schedule</Link>
          </div>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById("quiz-section-anchor")?.scrollIntoView({ behavior: "smooth" }), 100)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-b from-[#4CB8F2] to-[#1779B8] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            Book Free Trial
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-20">

        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1264A5] via-[#2196D9] to-[#4CB8F2] rounded-3xl px-8 py-16 md:px-14 md:py-20 text-white text-center">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[40rem] h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-white/60">
              Rising Stars Dance Academy · Est. 2014
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Ten Years of Teaching<br />Children to Dance
            </h1>
            <div className="w-16 h-0.5 bg-white/40 mx-auto rounded-full" />
            <p className="text-white/80 text-base leading-relaxed max-w-lg mx-auto">
              We started with 12 kids and a borrowed hall. Today we're home to 300+ families in Concord — and the mission hasn't changed one bit.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "10+", label: "Years Teaching" },
            { value: "300+", label: "Families Enrolled" },
            { value: "4.9", label: "Google Rating" },
            { value: "2×", label: "Recitals Per Year" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center"
            >
              <p className="font-display font-black text-3xl text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 font-sans mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">Our Story</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                How Rising Stars Began
              </h2>
              <div className="w-12 h-1 bg-[#2196D9] rounded-full" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              In 2014, Victoria Reyes was a professional dancer who kept noticing the same problem: children's dance education was either too competitive, too expensive, or taught by people who understood dance but not kids.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              She started Rising Stars in a church hall in Concord with 12 students and one simple idea — put the child's confidence ahead of everything else. No pressure, no comparisons, no performance anxiety. Just a warm room, good music, and an instructor who genuinely cared.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ten years later, the studio has grown to 300+ enrolled families, three full-time instructors, and twice-yearly recitals at a real theater. The idea hasn't changed.
            </p>
            <Link
              to="/"
              onClick={() => setTimeout(() => document.getElementById("quiz-section-anchor")?.scrollIntoView({ behavior: "smooth" }), 100)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2196D9] hover:text-[#1779B8] transition-colors"
            >
              Book your child's free trial <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-0"
          >
            {MILESTONES.map((m, i) => {
              const isRose = i % 2 === 0;
              return (
                <div key={i} className="flex gap-5 pb-8 last:pb-0 relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm ${isRose ? "bg-rose-400" : "bg-[#2196D9]"}`}>
                      <span className="text-[10px] font-mono font-black">{m.year.slice(2)}</span>
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200 mt-2" />
                    )}
                  </div>
                  <div className="pt-1.5 pb-2">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isRose ? "text-rose-400" : "text-[#2196D9]"}`}>{m.year}</span>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{m.text}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* Values */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">What We Stand For</span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Our Values
            </h2>
            <div className="w-12 h-1 bg-[#2196D9] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl border ${v.bg} ${v.border} ${v.text}`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-xs font-bold text-[#2196D9] uppercase tracking-widest font-mono">The People</span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Meet the Full Team
            </h2>
            <div className="w-12 h-1 bg-[#2196D9] rounded-full" />
            <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
              Three instructors. Combined 21 years of experience with children. Every one of them background-checked and certified.
            </p>
          </motion.div>

          <div className="space-y-6">
            {TEAM.map((instructor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start"
              >
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md bg-slate-100 shrink-0">
                    <img
                      src={`/instructors/${instructor.id}.png`}
                      alt={instructor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">{instructor.name}</p>
                    <p className="text-xs text-[#2196D9] font-semibold mt-0.5">{instructor.title}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{instructor.exp} experience</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">{instructor.bio}</p>
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
                    {instructor.certifications.map((cert, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-500">{instructor.ages}</span>
                    {instructor.styles.map((s, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-500">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Studio info strip */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {/* Address — rose */}
            <div className="relative bg-gradient-to-br from-rose-50 to-white p-7 border-b sm:border-b-0 sm:border-r border-slate-100 flex flex-col gap-4">
              <div className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-rose-100 border border-rose-200 text-rose-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">Studio Address</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{STUDIO_CONFIG.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(STUDIO_CONFIG.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 mt-2 transition-colors"
                >
                  Get Directions <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
            {/* Hours — blue */}
            <div className="relative bg-gradient-to-br from-sky-50 to-white p-7 border-b sm:border-b-0 sm:border-r border-slate-100 flex flex-col gap-4">
              <div className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-[#2196D9]/10 border border-[#2196D9]/20 text-[#2196D9] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">Working Hours</p>
                <div className="mt-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">Mon – Sat</p>
                    <p className="text-sm font-semibold text-slate-700">10 AM – 8 PM</p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-400">Sunday</p>
                    <p className="text-sm text-slate-400">Closed</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact — emerald */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-white p-7 flex flex-col gap-4">
              <div className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-black text-slate-900 text-sm uppercase tracking-tight">Contact</p>
                <a href={`tel:${STUDIO_CONFIG.phone}`} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 mt-1 block transition-colors">
                  {STUDIO_CONFIG.phone}
                </a>
                <a href={`mailto:${STUDIO_CONFIG.email}`} className="text-xs text-slate-400 hover:text-slate-600 mt-0.5 block transition-colors break-all">
                  {STUDIO_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#1264A5] via-[#2196D9] to-[#4CB8F2] rounded-2xl p-8 md:p-12 text-center text-white space-y-5">
          <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight">
            Ready to See It for Yourself?
          </h3>
          <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
            The best way to know if Rising Stars is right for your child is to come in. First class is always free — no commitment, no card required.
          </p>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById("quiz-section-anchor")?.scrollIntoView({ behavior: "smooth" }), 100)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1264A5] font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
          >
            Book Free Trial Class
            <ChevronRight className="w-4 h-4" />
          </Link>
        </section>

      </main>

      <footer className="border-t border-slate-100 mt-8 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {STUDIO_CONFIG.name} · {STUDIO_CONFIG.address}
      </footer>
    </div>
  );
}
