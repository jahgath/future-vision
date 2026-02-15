# Future Vision Travel - Project Guidelines

## Overview
Marketing website for a travel agency, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

## Tech Stack
- **Framework:** Next.js 16 (App Router, `src/` directory)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Linting:** ESLint with `eslint-config-next`
- **Package Manager:** npm

## Project Structure
```
src/
  app/             → Pages & layouts (App Router)
  components/
    layout/        → Header, Footer, Nav
    ui/            → Reusable UI primitives (buttons, cards, etc.)
    sections/      → Page-level sections (Hero, CTA, etc.)
  lib/             → Utilities, constants, helpers
  types/           → Shared TypeScript types
  assets/images/   → Source images
public/images/     → Static images served at /images/*
```

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Conventions
- Use the `@/*` import alias (maps to `src/*`)
- Components use PascalCase filenames and default exports
- Keep pages thin — compose from section components
- Tailwind utility classes preferred; avoid custom CSS unless necessary
- All text content is in English
