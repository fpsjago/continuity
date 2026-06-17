# CONTINUITY

A premium, marketplace-ready **Astro 6 + React 19 + Tailwind v4** template for the **B2B network-infrastructure & security-hardware** vertical — structured cabling, fiber, connectors, racks, managed switches, CCTV and access control.

**The signature:** *the Live Signal Pulse* — a single ember pulse rides a cable down the page as you scroll, energizing each section it passes. Built as a warm-paper **engineering monograph** (Blueprint skin) with a dark **Equipment Room** counter-skin.

## Stack
- Astro 6.4 (output: static) · React 19 islands · TypeScript strict
- Tailwind v4 (@theme) · GSAP + Lenis · Content Collections
- Fonts: Bricolage Grotesque + IBM Plex Sans/Mono (self-hosted)
- All visuals are hand-built SVG (no stock photos, no AI imagery) — fully self-contained

## Pages (24 routes)
Home · Solutions (+ detail) · Products (+ spec-sheet PDP) · Case Studies (+ detail) · Insights (+ post) · About · Contact · Request Spec Sheet · Style Guide · 404

## Develop
    bun install
    bun run dev
    bun run build && bun run preview

## Notes
- Spec figures are illustrative; lock them to a real datasheet before publishing.
- Certification marks in the footer are sample placeholders.
- The Request form is a client-side demo; wire it to your endpoint.

Template by Fullstack Evolved LLC

## Internationalization (i18n-ready)
English ships live; Spanish is **wired and ready**:
- `astro.config.mjs` → `i18n` configured (`en` default, `es`, no default prefix).
- `src/i18n/ui.ts` → string dictionary, **EN + ES already filled** for chrome.
- `src/i18n/utils.ts` → `getLangFromUrl()`, `useTranslations(lang)`, `localizedPath()`.
- Components read copy via the dictionary (see `NavBar.tsx`).
- `src/components/LangToggle.tsx` → ready EN|ES switcher (not mounted yet).

**To turn Spanish on:**
1. Finish translating `ui.es` (chrome done) and translate content collections (add `es/` entries or a `lang` field).
2. Create `src/pages/es/` mirrors of the routes you want localized (import the same components, pass `lang="es"`).
3. Mount `<LangToggle lang={lang} path={rel} client:load />` in `NavBar`.
