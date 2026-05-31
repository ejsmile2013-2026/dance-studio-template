# Dance Studio Template — Project Rules

## Stack
- React 19 + TypeScript, Vite 6, Tailwind CSS v4
- `motion/react` for animations (AnimatePresence, motion.div)
- Lucide-react for icons
- Fonts: **Nunito** (body, `font-sans`) + **Outfit** (headings, `font-display`)

## Key files
- `src/App.tsx` — main page layout, all sections
- `src/components/QuizWizard.tsx` — 4-step lead capture quiz
- `src/data.ts` — studio config, dance styles, quiz options
- `src/types.ts` — TypeScript types
- `src/index.css` — global styles, Tailwind theme tokens
- `public/class-images/` — dance style thumbnails (URL strings, not imports)
- `src/assets/images/` — hero images (ES module imports)

## Brand colors
- Primary blue: `#2196D9`
- Gradient: `linear-gradient(135deg, #2196D9, #1058A0)`
- Progress bar: `linear-gradient(to right, #f472b6, #2196D9)`
- Accent rose: `rose-500` (#f43f5e)

## Rules
- Do not change quiz logic, steps, validation, or form fields — visual only
- Images in `public/` → use as URL string (e.g. `/class-images/hiphop_street.png`)
- Images in `src/assets/` → import as ES module
- No `import React` needed — project uses `react-jsx` transform
- Use `SyntheticEvent` not `React.FormEvent` (deprecated in React 19)
