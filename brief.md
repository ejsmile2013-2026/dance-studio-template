# Dance Studio Template — Project Brief

---

## What This Is

A single-page marketing template for children's dance studios. It serves two distinct audiences on the same page:

1. **Parents** — attracted by the landing page, converted via a 4-step quiz that captures age, style preference, timeline, and contact details.
2. **Studio staff** — served by a built-in lead dashboard (mini-CRM) that lets them view, filter, update, and export submissions with no backend.

The template ships configured for **Clayton Valley Dance Academy** (Concord, CA) but is designed to be white-labelled. All content is centralised in `src/data.ts`.

---

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (transitions)
- Lucide React (icons)
- LocalStorage (no backend)

---

## What Must Work Well

### For parents

| Goal | How |
|---|---|
| Understand the offer instantly | Hero: headline, "First lesson free" trust bullet, two CTAs above the fold |
| Choose the right style without calling | Quiz step 2: visual cards with age-appropriate styles |
| Feel confident after submitting | Success screen: personalised confirmation + 3-step "what happens next" |
| Trust the studio | FAQ section: answers to shy-child anxiety, attire, parental attendance |

### For studio staff

| Goal | How |
|---|---|
| See all leads in one place | Dashboard table: family, contact, direction, timeline, status, date |
| Track follow-up status | One-click status toggle: New → In Progress → Enrolled → Cancelled |
| Hand off to admin | CSV export |
| Know how to reach each lead | Contact preference captured in quiz (WhatsApp / Telegram / Phone call) |

---

## Known Weaknesses to Address

Listed in priority order, derived from the three-perspective evaluation in `research.md`.

### Critical (production blockers)

1. **Dashboard is publicly visible** — any visitor can see other parents' names, phone numbers, and children's names. Needs a password gate before the template can be used commercially.
2. **No backend** — LocalStorage is wiped if the browser cache is cleared or a different device is used. Acceptable for a demo; unacceptable for live use.
3. **No new-lead notification** — studio staff have no way to know a submission arrived without manually checking the page.

### High priority (conversion impact)

4. **No social proof above the fold** — the hero has no testimonials, review score, or enrollment count. A single trust signal here would meaningfully increase conversion.
5. **Urgency is weak** — the quiz teaser mentions a free posture assessment but provides no deadline or scarcity signal.
6. **No pixel or analytics** — the page cannot be connected to paid ad campaigns without GA4 or Meta Pixel event tracking.
7. **Success screen has no immediate next action** — after submitting, the parent waits. A "Message us on WhatsApp now" deep link would enable same-day contact.

### Medium priority (UX polish)

8. **FAQ is buried** — it should appear closer to the quiz, not below the styles showcase.
9. **No focus management between quiz steps** — newly rendered steps don't receive focus; accessibility gap.
10. **No mobile navigation** — the sticky header has no section links, only a call button.
11. **No notes field per lead** — admins cannot log what was discussed in a follow-up call.

---

## Design Direction

- Monospace / uppercase typographic treatment — distinctive, confident.
- Strict two-column grid on desktop (hero text left, image right).
- Single scrollable page — one conversion action throughout.
- Dark high-contrast teaser section before the quiz entry point.
- Consistent visual card system for quiz steps and style showcases.

---

## Scope Boundaries

- **In scope:** landing page, quiz wizard, success screen, lead dashboard.
- **Out of scope (for now):** backend persistence, admin auth, analytics, multi-language support, class scheduling.
- **Content:** all copy and assets configurable via `src/data.ts` — no hardcoded studio-specific strings outside that file.

---

*Brief created: 2026-05-30 — derived from research.md*
