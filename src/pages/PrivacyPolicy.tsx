import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { STUDIO_CONFIG } from "../data";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors font-semibold">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">1. Who We Are</h2>
            <p>{STUDIO_CONFIG.name} ("we," "our," or "us") is a children's dance academy located at {STUDIO_CONFIG.address}. We are committed to protecting the privacy of parents, guardians, and their children who use our website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <p>When you complete our trial class booking form, we collect:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Parent or guardian's first name</li>
              <li>Child's full name</li>
              <li>Mobile phone number</li>
              <li>Preferred contact method (WhatsApp, Telegram, or phone call)</li>
              <li>Child's age group and dance style interest</li>
              <li>Preferred start date</li>
            </ul>
            <p className="mt-3">We do not collect sensitive personal information, financial data, Social Security numbers, or any government-issued identifiers.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <p>We use the information collected solely to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Contact you to schedule your child's free trial class</li>
              <li>Send you class schedules and relevant studio information</li>
              <li>Match your child with the appropriate class group</li>
              <li>Respond to your inquiries</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">4. Children's Privacy (COPPA)</h2>
            <p>Our website is intended for parents and guardians. We do not knowingly collect personal information directly from children under the age of 13. All information about minor students is collected from their parents or legal guardians, in compliance with the Children's Online Privacy Protection Act (COPPA).</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">5. California Residents — Your CCPA Rights</h2>
            <p>If you are a California resident, under the California Consumer Privacy Act (CCPA), you have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Know</strong> what personal information we collect, use, disclose, or sell</li>
              <li><strong>Delete</strong> personal information we have collected about you</li>
              <li><strong>Opt-out</strong> of the sale of your personal information (we do not sell personal information)</li>
              <li><strong>Non-discrimination</strong> for exercising your CCPA rights</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at <a href={`mailto:${STUDIO_CONFIG.email}`} className="text-[#2196D9] hover:underline">{STUDIO_CONFIG.email}</a> or call {STUDIO_CONFIG.phone}.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">6. Data Retention</h2>
            <p>We retain your information for as long as your child is enrolled or actively inquiring about classes, and for up to 2 years after last contact. You may request deletion at any time.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">7. Contact Us</h2>
            <p>For any privacy-related questions or requests:</p>
            <div className="mt-3 bg-slate-50 rounded-xl p-5 text-sm space-y-1">
              <p className="font-semibold text-slate-800">{STUDIO_CONFIG.name}</p>
              <p>{STUDIO_CONFIG.address}</p>
              <p>Email: <a href={`mailto:${STUDIO_CONFIG.email}`} className="text-[#2196D9] hover:underline">{STUDIO_CONFIG.email}</a></p>
              <p>Phone: {STUDIO_CONFIG.phone}</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
