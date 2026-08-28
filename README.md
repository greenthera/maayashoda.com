# Maa Yashoda

Marketing site for the Maa Yashoda Human Milk Bank initiative. Vite + React + TypeScript + Tailwind CSS v4, statically generated with [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) — every route is pre-rendered to real HTML at build time, then hydrated.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, no config file needed — tokens live in `src/styles/index.css`)
- **react-router-dom v6** for routing
- **vite-react-ssg** for static site generation (one `index.html` per route in `dist/`)

## Getting started

```bash
npm install
npm run dev       # dev server with SSR-in-dev (matches prod behaviour)
npm run build     # type-check-free production SSG build -> dist/
npm run preview   # serve the built dist/ locally
npm run typecheck # tsc --noEmit
```

## Structure

```
src/
  content/           English/Hindi/Gujarati copy decks (typed against en.ts) + language registry
  i18n/               LanguageProvider — current language, persisted to localStorage
  lib/paths.ts        Canonical route paths (single source of truth for links + routes.tsx)
  components/
    layout/           Layout, Header (incl. language switcher + mobile nav), Footer, PageHead
    ui/                Reusable primitives: Section, Button, Eyebrow, Accordion, StepList, Marquee, ImageSlot
    forms/             Field primitives + EnquiryForm (donor / support / contact variants, shared validation)
  pages/               One component per route, composed from the primitives above
  routes.tsx           Route table (lazily-loaded pages, wired into vite-react-ssg)
  main.tsx             SSG entry point
```

Each page is plain React composed from `Section`/`Eyebrow`/`Button`/etc. — no page reaches into another page's markup, and all copy is pulled from `useLanguage()` rather than hard-coded, so adding a language is a matter of adding a `content/xx.ts` file that satisfies the `Content` type.

## Content & translations

`src/content/en.ts` is the source of truth — its inferred type (`Content`) is what `hi.ts` and `gu.ts` are checked against, so a missing or mistyped key fails `npm run typecheck` rather than shipping silently. Language switching is client-side and instant (no route-level `/en/`, `/hi/` prefixes); the static HTML is rendered in English and the visitor's saved preference is applied on hydration, matching the original design.

## Forms

`components/forms/EnquiryForm.tsx` renders three variants (`donor`, `support`, `contact`) from one schema-driven component. Validation (required fields, mobile/email patterns, consent checkboxes) runs on submit; a hidden honeypot field silently blocks bot submissions. There's no backend wired up — successful submission navigates to the matching `/thank-you/...` route. Wire a real submit handler in `EnquiryForm`'s `handleSubmit` when a backend/endpoint exists.

## Images

`components/ui/ImageSlot.tsx` renders a labelled placeholder until a real `src` is supplied — photographs and partner logos throughout the site are unapproved placeholders per the source content (`t.home.galleryLead`, `t.partners.approvalNote`, etc.).
