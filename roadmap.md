# Dance Studio Template — Product Roadmap

*Created: 2026-05-30 — derived from research.md and brief.md*

---

## Phase 1 — MVP
**Goal:** A demo-ready template with no obvious red flags when shown to a prospective dance studio client.

The current build has a functional landing page, quiz, and CRM dashboard. Phase 1 is about fixing the issues that would cause a studio owner to distrust or dismiss the product before a business conversation even begins.

| # | Task | Priority | Effort | Business Impact |
|---|------|----------|--------|-----------------|
| 1.1 | Fix language consistency — the template copy is Russian-language but the studio is in California; all visible text must be coherent English | High | S (2–4 h) | Critical — a Russian-language page shown to an English-speaking studio owner ends the demo immediately |
| 1.2 | Hide the CRM dashboard from public view — replace the always-visible toggle with a hidden trigger (e.g. keyboard shortcut or secret URL param) so it cannot be stumbled upon by a parent during a demo | High | S (2–4 h) | High — publicly exposed names and phone numbers of children is the first thing a studio owner will notice and object to |
| 1.3 | Fix double-submit risk — disable the submit button after the first click and show a loading state until the success screen renders | High | XS (< 1 h) | Medium — prevents duplicate leads and looks professional |
| 1.4 | Stabilise the hero image — ensure the local asset renders reliably across all demo environments and deployment contexts | High | S (2–4 h) | High — a broken image above the fold destroys first impressions |
| 1.5 | Add basic mobile navigation — include section anchor links in the sticky header so users on mobile can jump to the quiz or FAQ without scrolling from the top | Medium | M (4–8 h) | Medium — the majority of target parents are on mobile; dead navigation hurts the demo's credibility |
| 1.6 | Add quiz focus management — newly rendered quiz steps must receive keyboard focus so the interaction works without a mouse | Medium | S (2–4 h) | Low immediate impact, but signals code quality to a technical evaluator |
| 1.7 | Verify and document the white-labelling path — confirm that changing `src/data.ts` is sufficient to rebrand the template, and note any exceptions | High | S (2–4 h) | High — this is the core sales proposition and it must be demonstrably easy |

**Phase 1 exit criterion:** The template can be opened on a mobile phone in front of a studio owner with no broken assets, no visible Russian text, no exposed parent data, and a complete quiz-to-success flow.

---

## Phase 2 — First Client Version
**Goal:** A version that a paying client can deploy and use as their live lead generation and management tool.

Phase 2 addresses the three production blockers from the brief — no backend, no auth, no notifications — plus the highest-impact conversion improvements.

| # | Task | Priority | Effort | Business Impact |
|---|------|----------|--------|-----------------|
| 2.1 | Backend persistence — replace localStorage with a serverless database (Supabase recommended: free tier, real-time, Postgres, built-in auth) so leads survive across devices, browsers, and cache clears | High | L (2–3 days) | Critical — a single lost lead at $150/month enrollment value is a material cost; no studio will use a tool that loses data |
| 2.2 | Admin authentication — add a password gate to the CRM dashboard route; no parent data should be visible to unauthenticated visitors | High | M (4–8 h) | Critical — GDPR/CCPA compliance issue; also a commercial liability before launch |
| 2.3 | New lead email notification — send an email to the studio's configured address every time a quiz is submitted; use Resend or a Supabase edge function | High | M (4–8 h) | High — without this, the studio must remember to check the dashboard manually; most will not; leads decay fast |
| 2.4 | Analytics integration — add GA4 events for quiz start, each step completion, and form submit; add Meta Pixel for studios running Facebook/Instagram ads | High | M (4–8 h) | High — without tracking, paid ad spend is unmeasurable; this is often a dealbreaker for studios running ads |
| 2.5 | Social proof above the fold — add a Google review score or enrollment count (e.g. "Join 200+ families") next to the hero CTA; configurable via `src/data.ts` | High | S (2–4 h) | High — research shows trust signals above the fold increase conversion meaningfully; currently the hero has none |
| 2.6 | WhatsApp / Telegram deep link on success screen — replace "we'll contact you" with a pre-filled message link so the parent can initiate contact immediately after submitting | High | S (2–4 h) | High — same-day contact dramatically increases lead conversion rate; this removes the studio from the critical path |
| 2.7 | Reposition FAQ section — move it above the dance styles showcase so it appears in the path of a hesitating parent, closer to the quiz entry point | Medium | XS (< 1 h) | Medium — FAQ content resolves final objections; its current position buries it below information-seeking content |

**Phase 2 exit criterion:** A studio can deploy the template to a real domain, receive a lead, get an email notification, log in to the dashboard to view it, and update its status — all from a mobile phone.

---

## Phase 3 — Production Version
**Goal:** A fully hardened, legally compliant, conversion-optimised product that a studio can run without ongoing technical support.

Phase 3 closes the remaining UX gaps, adds operational tools the studio needs for sustained use, and ensures legal compliance.

| # | Task | Priority | Effort | Business Impact |
|---|------|----------|--------|-----------------|
| 3.1 | GDPR / CCPA compliance — add a cookie consent banner, a privacy policy page, and ensure all lead data collection meets the regulatory requirements for the studio's jurisdiction | High | M (4–8 h) | Critical — publicly collecting children's data (via parent forms) without a privacy policy is a legal exposure for both the studio and the template vendor |
| 3.2 | Notes field per lead — allow admins to add a timestamped note to each lead record to log what was discussed on a call and what the agreed next step is | High | M (4–8 h) | High — the CRM is currently useful for intake but fails the full follow-up workflow; studios will revert to spreadsheets without this |
| 3.3 | UTM and lead source tracking — capture UTM parameters at quiz submission and store them with the lead so the studio knows which ad or channel generated each inquiry | High | S (2–4 h) | High — studios spending on ads need channel-level ROI data to know where to invest; this is often a requirement, not a nice-to-have |
| 3.4 | Urgency and scarcity signals — add a deadline or limited spots message to the quiz teaser section (configurable per studio in `src/data.ts`) | Medium | S (2–4 h) | Medium — the current teaser mentions a free bonus but provides no time pressure; urgency is a proven driver of same-session conversion |
| 3.5 | Duplicate lead detection — check for existing submissions with the same phone number on form submit; show a contextual message rather than creating a duplicate record | Medium | S (2–4 h) | Medium — reduces noise in the dashboard and prevents the studio from calling the same parent twice |
| 3.6 | Quiz progress auto-save — persist partial quiz answers to sessionStorage so a parent who navigates away mid-quiz can return and continue where they left off | Medium | S (2–4 h) | Medium — mid-quiz abandonment is a real loss; recovery costs the studio nothing and can be meaningful at volume |
| 3.7 | Pricing signal on page — add an optional "starting from $X/month" line or "classes from $Y" label, configurable per studio, to pre-qualify leads before they submit | Medium | S (2–4 h) | Medium — unqualified leads who disengage on price waste studio follow-up time; a pricing signal filters intent without requiring a conversation |
| 3.8 | Google Maps embed — add a map of the studio location to the footer or a dedicated "Find Us" section | Medium | S (2–4 h) | Medium — proximity is a primary factor in studio selection for parents; a visible map increases confidence and reduces "where is this?" friction |
| 3.9 | Class schedule or sample timetable — add a configurable schedule block showing which classes run on which days and times | Low | M (4–8 h) | Medium — reduces inbound calls asking about schedule; helps parents self-qualify before submitting |
| 3.10 | Real testimonials section — add a configurable testimonials block with parent name, child age, and quote; replace the FAQ as the primary trust mechanism | Low | M (4–8 h) | Medium — authentic testimonials with names outperform generic FAQ answers as social proof; the FAQ should remain but not carry the trust-building load alone |

**Phase 3 exit criterion:** The template passes a basic legal checklist (privacy policy, consent, data handling), handles the full studio follow-up workflow end-to-end, and is connected to at least one paid ad channel with working conversion tracking.

---

## Phase 4 — Scalable Template Version
**Goal:** A productised, resaleable template that can be deployed for multiple studios with minimal setup time and no developer involvement for content changes.

Phase 4 transforms the template from a one-studio tool into a licensable product.

| # | Task | Priority | Effort | Business Impact |
|---|------|----------|--------|-----------------|
| 4.1 | Internationalisation (i18n) — implement a proper i18n layer (e.g. `i18next`) so the template can be switched to any language by changing a config file, not by editing component strings | High | L (2–3 days) | High — the current architecture makes multi-language support a manual find-and-replace; an i18n system is required to serve non-English-speaking markets at scale |
| 4.2 | Automated brand configuration — extend `src/data.ts` into a full theme config covering primary colour, logo, font, and social links; generate a branded CSS layer at build time so studios can be onboarded without touching component code | High | L (2–3 days) | High — the faster a new studio can go live, the lower the cost of each deployment and the more studios can be served |
| 4.3 | Multi-tenant backend — extend the Supabase schema to support multiple studio accounts, each with their own isolated lead data, admin credentials, and configuration | High | XL (1+ week) | Critical — a shared backend with per-studio isolation is the foundation of a scalable business; without it, each client requires a separate deployment |
| 4.4 | Studio onboarding wizard — a web-based setup flow where a new studio enters their name, location, phone, classes, and colours; the system generates and deploys their configured instance | Medium | XL (1+ week) | High — this removes the manual work of configuring each studio and is the step that makes the template a product, not a service |
| 4.5 | Admin portal for template operator — a separate dashboard for the template vendor to manage all deployed studio instances, view aggregate stats, and push updates | Medium | XL (1+ week) | Medium — necessary once more than 3–4 studios are live; without it, managing clients becomes unscalable |
| 4.6 | Documentation and setup guide — written and/or video guide for a non-technical studio owner or their web person to white-label, configure, and deploy the template | High | M (4–8 h) | High — documentation directly reduces support burden and is often a purchase decision factor for small business buyers |
| 4.7 | Deployment pipeline — automated build and deploy workflow (e.g. Vercel per-studio deployment via API) so new studio instances can be spun up from the onboarding wizard without manual configuration | Medium | L (2–3 days) | High — manual deployment does not scale; automating it is the operational unlock for growth |

**Phase 4 exit criterion:** A new dance studio can be onboarded, configured, and deployed to a live URL in under one hour with no code changes required.

---

## Effort Reference

| Label | Range |
|-------|-------|
| XS | Under 1 hour |
| S | 2–4 hours |
| M | Half day to 1 day |
| L | 2–3 days |
| XL | 1 week or more |
