# Dance Studio Template — Research Document

---

## Project Purpose

A single-page marketing template for a children's dance studio designed to do three things simultaneously:

1. **Attract and convert parents** via a hero landing page with clear value propositions.
2. **Capture qualified leads** through a 4-step quiz wizard that collects age, dance style preference, enrollment timeline, and contact details.
3. **Manage those leads** through a built-in mini-CRM dashboard that lets studio staff view, filter, update status, and export submissions — all without a backend.

The template is currently configured for **Clayton Valley Dance Academy** in Concord, California, but is clearly designed to be rebranded for any children's dance studio. All content lives in `src/data.ts`, making white-labeling straightforward.

---

## Target Audience

### Primary — Parents

- Parents of children aged 3–17 living near a local dance studio.
- Actively or passively considering extracurricular activities for their child.
- Likely discovery path: Google search, local Facebook/Instagram ad, or word of mouth.
- Device: predominantly mobile (scheduling-related searches skew mobile).

### Secondary — Dance Studio Owners / Admins

- Small-to-mid-size independent dance studios without a dedicated CRM or lead management system.
- Studio owners who run the business themselves or with a small front-desk team.
- May be using spreadsheets, WhatsApp, or nothing at all to track inquiries.

---

## Parent Pain Points

| Pain Point | How the Template Addresses It |
|---|---|
| "I don't know which dance style is right for my child's age" | Quiz step 2 presents age-appropriate dance styles visually |
| "I don't want to sit on hold or play phone tag to get basic info" | The quiz replaces the inquiry call — parent commits on their own time |
| "I'm worried my child won't like it and I'll waste money" | "First lesson free" offer is prominently featured in the hero |
| "I don't know what to expect or what to bring" | Post-submission success screen promises a prep checklist by message |
| "I'm not ready to commit yet" | "Just browsing" option in the quiz (start date: "still deciding") |
| "Is this studio trustworthy?" | FAQ section addresses common concerns: attire, child nervousness, parental attendance |
| "What if my shy child refuses to go in?" | FAQ explicitly addresses this with a reassuring, specific answer |

---

## Dance Studio Owner Pain Points

| Pain Point | How the Template Addresses It |
|---|---|
| "Inquiries come in and I forget to follow up" | Submissions are persisted in localStorage, visible in the CRM panel |
| "I have no idea where my leads are in the funnel" | Status badges: New → In Progress → Enrolled → Cancelled |
| "I need to hand leads to my admin" | CSV export button generates a download instantly |
| "I can't tell which channel the parent prefers" | Quiz captures preferred contact: WhatsApp, Telegram, or phone call |
| "I don't know which classes have the most demand" | Lead data includes age group and dance direction per submission |
| "I need to demo the system to my team" | Mock leads button instantly populates the dashboard with realistic data |

---

## Current Features

### Landing Page

- **Sticky header** — academy name, location, working hours, and a phone call CTA button.
- **Hero section** — full-width layout with headline, description, two trust bullets ("First lesson free", "Experienced team"), two CTA buttons, and a hero image.
- **Quiz teaser banner** — dark, high-contrast section that appears before the quiz starts, with urgency copy and a single start CTA.
- **4-step quiz wizard** with animated step transitions:
  - Step 1: Child's age group (4 options with group descriptions)
  - Step 2: Dance style preference (with thumbnails, or "Help me choose")
  - Step 3: Enrollment timeline (4 options)
  - Step 4: Contact form (parent name, child name, phone, preferred contact method)
- **Post-submission success screen** — personalized confirmation with a 3-step "what happens next" breakdown.
- **Benefits section** — 3 cards: small group sizes, professional flooring, recitals.
- **Dance styles showcase** — 4 cards with photos, age tags, and style tags.
- **FAQ section** — 3 common parent questions with thorough answers.
- **Footer** — address, phone, email, copyright.

### Lead Dashboard (Mini-CRM)

- Togglable panel (show/hide) with an animated entrance.
- Live lead count in the trigger bar.
- Search across parent name, child name, phone, and dance direction.
- Status filter dropdown (All / New / In Progress / Enrolled / Cancelled).
- Lead table columns: Family/Child, Contact, Direction/Age, Start Timeline, Date/Status, Actions.
- Per-lead status management (inline toggle buttons).
- Per-lead delete button.
- CSV export of all submissions.
- Mock data loader for demo/testing.
- LocalStorage persistence (survives page refresh, no backend needed).

### Technical

- React + TypeScript + Vite.
- Tailwind CSS v4 for all styling (no CSS modules).
- Framer Motion for page and step transitions.
- Lucide React for all icons.
- No backend, no authentication, no external API dependencies.

---

## Competitor Observations

Based on how typical dance studio websites operate in the local services space:

| Observation | Implication for This Template |
|---|---|
| Most studio sites use a generic contact form or a "call us" CTA | The quiz wizard is a meaningful differentiator — it pre-qualifies leads and reduces inbound call volume |
| Mindbody and similar SaaS platforms dominate scheduling | This template fills the gap *before* the CRM: capturing interest before the parent is ready to book |
| Competitor landing pages are typically image-heavy with little conversion structure | The quiz funnel approach is more aligned with performance marketing (Meta Ads, Google LSA) landing page best practices |
| Most local studio sites are not mobile-optimized | This template uses a fully responsive grid — a real competitive advantage for mobile ad traffic |
| Testimonial sections are common but often consist of generic 5-star quotes | The FAQ section is used as a trust-builder here — unusual, but practical and more credible than fabricated reviews |
| None offer a built-in lead management tool | The CRM dashboard is unique to this template — most studios manage leads in WhatsApp or a spreadsheet |

---

## Future Improvements

### High Priority

- **Backend persistence** — LocalStorage is fragile: clearing browser data wipes all leads. A lightweight serverless backend (Supabase, Firebase, or a simple API route) would make this production-ready.
- **Email / SMS notification on new lead** — studio owner has no way of knowing a lead came in unless they check the dashboard manually.
- **Admin authentication** — the CRM dashboard is currently publicly visible to anyone who visits the page. It needs a password gate or a separate admin route.
- **Real testimonials section** — the current FAQ doubles as a trust block, but actual parent quotes with names and child ages would perform significantly better.

### Medium Priority

- **Google Maps embed** — parents heavily rely on proximity for studio decisions; a visible map increases confidence.
- **Class schedule or sample timetable** — even a rough schedule reduces friction before the quiz.
- **WhatsApp / Telegram deep link on success screen** — instead of saying "we'll contact you," offer a direct link so the parent can initiate the conversation immediately.
- **Analytics integration** — no event tracking exists. Adding GA4 or Meta Pixel events (quiz start, quiz step completion, form submit) would allow ad campaign optimization.
- **Lead source tracking** — UTM parameter capture at form submission, so the studio knows which ad or channel generated each lead.

### Lower Priority

- **Multi-language support** — the template is currently Russian-language despite being for a California studio. A proper i18n layer would make switching languages maintainable.
- **Progress auto-save** — if a parent closes the tab mid-quiz, all answers are lost. Saving partial answers to sessionStorage would recover the funnel.
- **Duplicate lead detection** — currently a parent can submit the same phone number multiple times; a check on submission would reduce noise in the dashboard.
- **Notes field per lead** — studio admins need a place to log what was discussed during a follow-up call.

---

## Evaluation by Perspective

---

### 1. UX Designer

**What works well:**

The quiz wizard is the strongest UX element. Using selection cards instead of a traditional form for steps 1–3 is the right call — it eliminates typing friction and makes the interaction feel conversational. The auto-advance behavior (selecting an option moves to the next step after 300ms) is a well-known pattern from Typeform that significantly improves completion rates. Animated step transitions add polish without slowing the user down.

The visual design system is consistent and clean. The monospace/uppercase typographic treatment gives the brand a distinctive, confident personality. The strict two-column grid on desktop (hero text left, image right) is classic and effective. The decision to keep all sections on a single scrollable page is appropriate for a local services landing page where the goal is one conversion action.

The post-submission success screen is properly designed — it names the parent, names the child, specifies the dance direction they chose, and explains the next three steps. This is precisely what a user needs after submitting a form to feel confident their action was processed.

**What needs work:**

The CRM dashboard is surfaced at the very bottom of the page with a subtle toggle button. A parent visiting the page would scroll past it but might notice it — the "Local Lead Database: X leads" label and the pulsing dot feel out of place on a public-facing page. There is no separation between the customer-facing landing experience and the admin tool.

The hero image is a local asset (`/src/assets/images/`) that may not render in all deployment contexts without proper static file handling — a fragile dependency for a template.

There are no loading states. If localStorage is slow (unlikely but possible on older devices), the dashboard flashes empty before populating. Similarly, the quiz has no disabled state on the submit button during processing, creating a risk of double submission.

Mobile navigation is missing. On scroll, there is no way to jump back to the quiz or to a specific section — the sticky header only shows the phone button.

**Accessibility gaps:** No `aria-live` region for the quiz progress bar, no focus management between steps (the newly rendered step doesn't receive focus), and the color contrast on some slate-500 text over white backgrounds is borderline.

---

### 2. Conversion Marketing Specialist

**What works well:**

The quiz funnel is the right mechanism for a local services lead generation page. Research consistently shows that interactive quizzes outperform static contact forms by 30–50% in lead capture rate, primarily because they create micro-commitments — by the time a user reaches the contact form on step 4, they have already invested effort and are far more likely to complete it.

The "First Lesson Free" offer is correctly placed in the hero (above the fold) and reinforced in the success screen. This is the strongest conversion lever available to a local dance studio and it is given appropriate prominence.

The quiz teaser section (dark background, high-contrast blue button, "1-minute quiz" copy) is a well-constructed pre-click experience. The specificity of "4 simple questions" reduces perceived effort. The mention of a bonus gift (posture assessment) adds tangible value to submitting.

The contact preference capture (WhatsApp / Telegram / Phone) is a smart inclusion. In markets where WhatsApp and Telegram are primary communication channels, this reduces the friction of follow-up and increases answer rates dramatically. A studio that calls someone who wanted a WhatsApp message will lose the lead.

**What needs work:**

There is no social proof above the fold. The hero has zero testimonials, star ratings, or enrollment numbers. A single line like "Join 200+ families in Concord" or a Google review score (4.9 ★, 87 reviews) next to the CTA button would meaningfully increase trust and conversion at the most critical moment.

The urgency signals are weak. The quiz teaser mentions a free posture diagnostic as a gift, but there is no scarcity or deadline attached to it ("this week only", "only 3 spots left in the 6–8 age group"). Without urgency, the incentive to submit now vs. later is low.

The page has no pixel or tracking code. Running paid ads to this page without conversion tracking means spending in the dark — the studio would have no data on cost per lead, which ad creative converts best, or which audience segment has the highest intent.

The FAQ section is buried below the dance styles grid. FAQ content tends to address the final objections a near-converted parent has. Moving it above the dance styles showcase — or immediately below the quiz — would put it in the path of users who hesitate before submitting.

The success screen is strong, but it misses an immediate next action. After a parent submits, offering a direct "Message us on WhatsApp now" button (pre-filled with the studio's number and a greeting) would dramatically increase the chance of same-day contact, rather than waiting for the studio to follow up.

---

### 3. Dance Studio Owner

**What works well:**

The mini-CRM dashboard solves a real, daily problem for small studio operators. Most independently owned studios manage inquiries through a mix of DMs, phone notes, and spreadsheets — having a centralized view of every lead, their age group, dance preference, and follow-up status is a genuine operational improvement.

The status pipeline (New → In Progress → Enrolled → Cancelled) maps directly to how a studio front desk actually works. The one-click status toggle is fast enough to use during a phone call.

The CSV export is a practical escape hatch. Whether the studio moves to a dedicated CRM later (e.g., Mindbody, HubSpot, or even a Google Sheet), they can export and migrate their data at any time.

The contact method field (WhatsApp, Telegram, Phone) is highly practical. Knowing before you pick up the phone that a parent prefers Telegram avoids awkward calls and increases response rates.

The mock leads feature is useful for onboarding staff. A new admin can explore the full dashboard experience without waiting for real submissions.

**What needs work:**

There is no notification when a new lead arrives. A studio owner would have to remember to check the dashboard manually, which will not happen consistently. The very first improvement needed for production use is an email or SMS alert on form submission — even a simple webhook to an email service (Resend, Mailgun) or a Zapier integration would solve this.

There is no backend. If the person who submitted the quiz opens the page in a different browser, on a different device, or clears their cache, the leads are gone. For a real studio this is unacceptable — a single lost lead at $150/month enrollment value is a significant cost. The template needs a backend before going live.

The dashboard is publicly visible. Any parent who scrolls far enough will see other parents' names, children's names, and phone numbers. This is a GDPR / CCPA violation in most jurisdictions and a serious trust and legal risk. The CRM panel must be hidden behind authentication before the template is used commercially.

There is no way for the admin to add notes to a lead. After a follow-up call, the studio needs to record what was discussed, what was agreed, and the next follow-up date. Without this, the dashboard is useful for intake but fails to support the full follow-up workflow.

Pricing information is entirely absent from the page. While this is a deliberate choice in many lead-gen funnels (to force a conversation), it creates a filtering problem: some parents will submit without any idea of cost, only to disengage when they hear the price. Adding a "starting from $X/month" signal somewhere on the page would pre-qualify leads and reduce wasted follow-up time.

---

*Document created: 2026-05-30*
