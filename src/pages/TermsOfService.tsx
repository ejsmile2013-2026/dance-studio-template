import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { STUDIO_CONFIG } from "../data";

export default function TermsOfService() {
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
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the {STUDIO_CONFIG.name} website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use this website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">2. Website Use</h2>
            <p>This website is provided for informational purposes and to allow parents and guardians to inquire about and book trial classes at {STUDIO_CONFIG.name}. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">3. Free Trial Class</h2>
            <p>The free trial class offer is subject to availability and limited to one trial per child. We reserve the right to schedule trial classes based on instructor availability and class capacity. Booking a trial class through this website does not guarantee enrollment.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">4. Accuracy of Information</h2>
            <p>We strive to keep all information on this website accurate and up to date, including class schedules, pricing, and instructor information. However, we do not warrant that all information is complete or error-free. Class schedules, pricing, and availability are subject to change without notice.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">5. Intellectual Property</h2>
            <p>All content on this website — including text, images, logos, and design — is the property of {STUDIO_CONFIG.name} and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
            <p>{STUDIO_CONFIG.name} shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website. Our total liability for any claims arising from these terms shall not exceed $100 USD.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">7. Third-Party Links</h2>
            <p>This website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites and encourage you to review their policies independently.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">8. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Contra Costa County, California.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">9. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the revised Terms. We encourage you to review this page periodically.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
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
