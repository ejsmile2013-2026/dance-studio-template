import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { STUDIO_CONFIG } from "../data";

export default function CookiePolicy() {
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
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-2">Cookie Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the website function properly, remember your preferences, and provide analytics data to help us improve your experience.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">2. Cookies We Use</h2>
            <div className="space-y-4 mt-3">
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-1">Essential Cookies</h3>
                <p className="text-sm">Required for the website to function. These cannot be disabled. They store session state and form data while you fill out our booking form.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-1">Analytics Cookies</h3>
                <p className="text-sm">We may use Google Analytics or similar tools to understand how visitors use our site (pages visited, time spent, traffic source). This data is anonymous and aggregated.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-1">Preference Cookies</h3>
                <p className="text-sm">Remember your choices on the site, such as language and region preferences, to improve your experience on return visits.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">3. We Do NOT Use</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Advertising or tracking cookies for third-party ad networks</li>
              <li>Cookies that track you across other websites</li>
              <li>Cookies that collect sensitive personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">4. How to Control Cookies</h2>
            <p>You can control and delete cookies through your browser settings. Here's how for major browsers:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
            </ul>
            <p className="mt-3 text-sm">Please note that disabling cookies may affect the functionality of our website, including the class booking form.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">5. California Residents</h2>
            <p>California residents have the right to opt out of the sale of personal information. We do not sell personal information collected via cookies. For questions about your CCPA rights, see our <Link to="/privacy-policy" className="text-[#2196D9] hover:underline">Privacy Policy</Link>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">6. Changes to This Policy</h2>
            <p>We may update this Cookie Policy from time to time. We will notify you of significant changes by updating the date at the top of this page.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">7. Contact Us</h2>
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
