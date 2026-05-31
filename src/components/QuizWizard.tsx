/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, ChangeEvent, SyntheticEvent, ElementType } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  User,
  Phone,
  Calendar,
  Baby,
  Smile,
  Send,
  MessageCircle,
} from "lucide-react";
import { DANCE_STYLES, AGE_QUESTIONS, START_QUESTIONS } from "../data";
import { QuizAnswers } from "../types";

interface QuizWizardProps {
  onComplete: (answers: QuizAnswers) => void;
}

// ─── Shared token values ────────────────────────────────────────────────────
const BLUE = "#2196D9";
const BLUE_LIGHT = "#2196D9";
const BLUE_DARK = "#1058A0";
const GRADIENT = `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE_DARK})`;
const PROGRESS_GRADIENT = `linear-gradient(to right, #f472b6, #2196D9)`;

const optionBase =
  "flex flex-col text-left p-4 md:p-5 border-2 rounded-2xl transition-all duration-200 outline-none cursor-pointer w-full";

const optionIdle = "border-slate-200/80 bg-white/85 hover:border-[#2196D9]/50 hover:bg-white/95";
const optionActive = "border-[#2196D9] bg-white/95 shadow-sm";

const optionWithImageBase =
  "flex items-start gap-4 text-left p-4 border-2 rounded-2xl transition-all duration-200 outline-none cursor-pointer w-full bg-white/85";

// ─── Component ──────────────────────────────────────────────────────────────
export default function QuizWizard({ onComplete }: QuizWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    childAge: "",
    danceDirection: "",
    startDate: "",
    parentName: "",
    childName: "",
    phoneNumber: "",
    preferredContact: "whatsapp",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    stepRef.current?.focus({ preventScroll: true });
  }, [step]);

  const handleSelect = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 4) {
      setTimeout(() => setStep((prev) => prev + 1), 300);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const num = value.replace(/\D/g, "");
    if (num.length <= 3) return num;
    if (num.length <= 6) return `(${num.slice(0, 3)}) ${num.slice(3)}`;
    return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setAnswers((prev) => ({ ...prev, phoneNumber: formatted }));
    if (errors.phoneNumber) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.phoneNumber;
        return copy;
      });
    }
  };

  const validateFinalStep = () => {
    const errs: Record<string, string> = {};
    if (!answers.parentName?.trim()) errs.parentName = "Please enter your name";
    if (!answers.childName?.trim()) errs.childName = "Please enter your child's name";
    if (!answers.phoneNumber?.trim() || answers.phoneNumber.replace(/\D/g, "").length < 10) {
      errs.phoneNumber = "Please enter a valid phone number (at least 10 digits)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateFinalStep()) return;

    setIsSubmitting(true);
    onComplete(answers as QuizAnswers);

    setTimeout(() => {
      setStep(1);
      setAnswers({
        childAge: "",
        danceDirection: "",
        startDate: "",
        parentName: "",
        childName: "",
        phoneNumber: "",
        preferredContact: "whatsapp",
      });
      setIsSubmitting(false);
    }, 800);
  };

  const nextStepAvailable = () => {
    if (step === 1 && !answers.childAge) return false;
    if (step === 2 && !answers.danceDirection) return false;
    if (step === 3 && !answers.startDate) return false;
    return true;
  };

  const progressPercent = (step / 4) * 100;

  // ─── Shared sub-components ─────────────────────────────────────────────────

  const StepHeader = ({
    icon: Icon,
    title,
    subtitle,
  }: {
    icon: ElementType;
    title: string;
    subtitle: string;
  }) => (
    <>
      <div className="flex items-center gap-2.5 mb-3">
        <Icon className="w-5 h-5 shrink-0" style={{ color: BLUE }} />
        <h3 className="font-display text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
          {title}
        </h3>
      </div>
      <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: BLUE }} />
      <p className="text-[15px] text-slate-500 mb-6 font-sans leading-relaxed">{subtitle}</p>
    </>
  );

  const CheckBadge = () => (
    <span className="text-white p-0.5 rounded-full shrink-0" style={{ background: BLUE }}>
      <Check className="w-3.5 h-3.5" />
    </span>
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      id="quiz-wizard-container"
      className="relative rounded-3xl border border-slate-200/80 shadow-[0_32px_80px_-4px_rgba(0,0,0,0.22),0_8px_32px_-8px_rgba(33,150,217,0.18)] max-w-2xl mx-auto overflow-hidden"
    >
      {/* ── Background image layer — full image visible, subtle watermark ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
        <img
          src="/class-images/hiphop_street.png"
          alt=""
          className="absolute object-contain object-center w-full h-full select-none opacity-[0.10]"
          style={{ filter: "blur(1px)" }}
        />
      </div>

      {/* ── All content sits above the background ── */}
      <div className="relative z-10 p-7 md:p-10">

      {/* ── Progress bar ── */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-sans font-semibold mb-2.5">
          <span className="text-slate-500">Step {step} of 4</span>
          <span style={{ color: BLUE }}>{Math.round(progressPercent)}% complete</span>
        </div>
        <div className="w-full bg-slate-100 h-2 overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{ background: PROGRESS_GRADIENT }}
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Step 1: Age ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            ref={stepRef}
            tabIndex={-1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="outline-none"
          >
            <StepHeader
              icon={Baby}
              title="How old is your child?"
              subtitle="We group students by age so every child develops alongside peers at the same stage."
            />
            <div className="grid gap-3">
              {AGE_QUESTIONS.map((opt) => {
                const selected = answers.childAge === opt.label;
                return (
                  <button
                    id={`age-btn-${opt.id}`}
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect("childAge", opt.label)}
                    className={`${optionBase} ${selected ? optionActive : optionIdle}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-display font-bold text-slate-900 text-sm md:text-base">
                        {opt.label}
                      </span>
                      {selected && <CheckBadge />}
                    </div>
                    <span className="text-sm text-slate-500 mt-1.5 font-sans leading-snug">
                      {opt.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Dance style ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            ref={stepRef}
            tabIndex={-1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="outline-none"
          >
            <StepHeader
              icon={Sparkles}
              title="Which style interests you?"
              subtitle="Not sure yet? Choose the last option — our instructor will help you find the right fit."
            />
            <div className="grid gap-3">
              {DANCE_STYLES.map((style) => {
                const selected = answers.danceDirection === style.title;
                return (
                  <button
                    id={`style-btn-${style.id}`}
                    key={style.id}
                    type="button"
                    onClick={() => handleSelect("danceDirection", style.title)}
                    className={`${optionWithImageBase} ${selected ? optionActive : optionIdle}`}
                  >
                    <img
                      src={style.imageUrl}
                      alt={style.title}
                      className="w-16 h-16 object-cover border border-slate-200 rounded-xl shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-display font-bold text-slate-900 text-sm md:text-base leading-snug">
                          {style.title}
                        </span>
                        {selected && <CheckBadge />}
                      </div>
                      <span className="text-sm text-slate-500 block font-sans leading-snug mt-1">
                        {style.description}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Help me choose */}
              {(() => {
                const selected = answers.danceDirection === "Help me choose (needs advice)";
                return (
                  <button
                    id="style-btn-not-sure"
                    type="button"
                    onClick={() => handleSelect("danceDirection", "Help me choose (needs advice)")}
                    className={`${optionWithImageBase} ${selected ? optionActive : optionIdle}`}
                  >
                    <div
                      className="w-16 h-16 flex items-center justify-center shrink-0 border border-slate-200 rounded-xl text-2xl font-black"
                      style={{ background: "#f1f5f9", color: BLUE }}
                    >
                      ?
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-display font-bold text-slate-900 text-sm md:text-base leading-snug">
                          Help me choose
                        </span>
                        {selected && <CheckBadge />}
                      </div>
                      <span className="text-sm text-slate-500 block font-sans leading-snug mt-1">
                        We'll discuss your child's interests and personality on the call
                      </span>
                    </div>
                  </button>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Start date ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            ref={stepRef}
            tabIndex={-1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="outline-none"
          >
            <StepHeader
              icon={Calendar}
              title="When would you like to start?"
              subtitle="This helps us reserve a spot — class groups fill on a rolling basis."
            />
            <div className="grid gap-3">
              {START_QUESTIONS.map((opt) => {
                const selected = answers.startDate === opt.label;
                return (
                  <button
                    id={`start-btn-${opt.id}`}
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect("startDate", opt.label)}
                    className={`${optionBase} ${selected ? optionActive : optionIdle}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-display font-bold text-slate-900 text-sm md:text-base">
                        {opt.label}
                      </span>
                      {selected && <CheckBadge />}
                    </div>
                    <span className="text-sm text-slate-500 mt-1.5 font-sans leading-snug">
                      {opt.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Contact details ── */}
        {step === 4 && (
          <motion.div
            key="step4"
            ref={stepRef}
            tabIndex={-1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="outline-none"
          >
            <StepHeader
              icon={Smile}
              title="Your contact details"
              subtitle="We'll use your answers to reserve a free trial lesson and send a class schedule to your preferred contact."
            />

            <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>

              {/* Parent name */}
              <div>
                <label
                  htmlFor="input-parent-name"
                  className="block text-xs font-semibold text-slate-600 font-sans mb-1.5"
                >
                  Your name (parent / guardian)
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    id="input-parent-name"
                    type="text"
                    name="parentName"
                    value={answers.parentName}
                    onChange={handleTextChange}
                    placeholder="e.g. Sarah"
                    autoComplete="given-name"
                    className={`w-full pl-10 pr-4 py-3.5 text-[15px] border-2 rounded-xl bg-white/85 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-sans ${
                      errors.parentName
                        ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : "border-slate-200 focus:border-[#2196D9] focus:shadow-[0_0_0_3px_rgba(33,150,217,0.18),0_0_12px_rgba(33,150,217,0.08)]"
                    }`}
                  />
                </div>
                {errors.parentName && (
                  <span className="text-xs text-red-500 mt-1.5 block font-sans">
                    {errors.parentName}
                  </span>
                )}
              </div>

              {/* Child name */}
              <div>
                <label
                  htmlFor="input-child-name"
                  className="block text-xs font-semibold text-slate-600 font-sans mb-1.5"
                >
                  Child's full name
                </label>
                <div className="relative">
                  <Baby className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    id="input-child-name"
                    type="text"
                    name="childName"
                    value={answers.childName}
                    onChange={handleTextChange}
                    placeholder="e.g. Emma Johnson"
                    autoComplete="name"
                    className={`w-full pl-10 pr-4 py-3.5 text-[15px] border-2 rounded-xl bg-white/85 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-sans ${
                      errors.childName
                        ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : "border-slate-200 focus:border-[#2196D9] focus:shadow-[0_0_0_3px_rgba(33,150,217,0.18),0_0_12px_rgba(33,150,217,0.08)]"
                    }`}
                  />
                </div>
                {errors.childName && (
                  <span className="text-xs text-red-500 mt-1.5 block font-sans">
                    {errors.childName}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="input-phone"
                  className="block text-xs font-semibold text-slate-600 font-sans mb-1.5"
                >
                  Mobile phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    id="input-phone"
                    type="tel"
                    name="phoneNumber"
                    value={answers.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="(925) 555-0100"
                    autoComplete="tel"
                    className={`w-full pl-10 pr-4 py-3.5 text-[15px] border-2 rounded-xl bg-white/85 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-sans ${
                      errors.phoneNumber
                        ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : "border-slate-200 focus:border-[#2196D9] focus:shadow-[0_0_0_3px_rgba(33,150,217,0.18),0_0_12px_rgba(33,150,217,0.08)]"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <span className="text-xs text-red-500 mt-1.5 block font-sans">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>

              {/* Contact method */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 font-sans mb-2.5">
                  Where should we send the class schedule?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["whatsapp", "telegram", "phone"] as const).map((method) => {
                    const selected = answers.preferredContact === method;
                    return (
                      <button
                        id={`contact-method-${method}`}
                        key={method}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, preferredContact: method }))
                        }
                        className={`py-3.5 px-2 border-2 rounded-xl flex flex-col items-center justify-center gap-2 transition-all outline-none cursor-pointer font-sans font-semibold text-xs ${
                          selected
                            ? "border-[#2196D9] bg-[#2196D9]/[0.07] text-[#2196D9] shadow-[0_0_0_3px_rgba(33,150,217,0.18),0_1px_6px_rgba(33,150,217,0.12)]"
                            : "border-slate-200 bg-white/70 text-slate-500 hover:border-[#2196D9]/50 hover:bg-[#2196D9]/[0.04]"
                        }`}
                      >
                        {method === "whatsapp" && <MessageCircle className="w-4 h-4" />}
                        {method === "telegram" && <Send className="w-4 h-4" />}
                        {method === "phone" && <Phone className="w-4 h-4" />}
                        <span>
                          {method === "whatsapp"
                            ? "WhatsApp"
                            : method === "telegram"
                            ? "Telegram"
                            : "Phone call"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                id="submit-record-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 px-6 text-white font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: GRADIENT }}
              >
                {isSubmitting ? (
                  <span>Submitting…</span>
                ) : (
                  <>
                    <span>Reserve My Free Lesson</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back / Next toolbar (steps 1–3) ── */}
      {step < 4 && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
          <button
            id="quiz-back-btn"
            type="button"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-all font-sans font-semibold text-xs uppercase tracking-wider border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            id="quiz-next-btn"
            type="button"
            onClick={() => setStep((prev) => Math.min(4, prev + 1))}
            disabled={!nextStepAvailable()}
            className="flex items-center gap-1.5 px-5 py-2.5 text-white disabled:opacity-50 transition-all font-sans font-semibold text-xs uppercase tracking-wider shrink-0 cursor-pointer rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform"
            style={{ background: GRADIENT }}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      </div>{/* end relative z-10 content wrapper */}
    </div>
  );
}
