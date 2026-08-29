<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system

`DESIGN.md` is the source of truth for this project's design system — color tokens, typography, spacing rhythm, components, motion, and accessibility conventions. Read it before making any frontend or styling change so your work stays consistent with the established look.

**Keep `DESIGN.md` in sync.** Any change that alters the design system must be reflected in `DESIGN.md` in the same change. This includes:

- Adding, removing, or changing a color token, font, or font weight
- Changing the layout container, spacing rhythm, or breakpoints
- Adding, removing, or restyling a component or pattern (e.g. in `app/globals.css` / `app/page.tsx`)
- Changing motion, hover/focus interaction conventions, or iconography style
- Changing brand assets, favicons, the web manifest, or the Open Graph image

If a change touches how the site looks or how UI is built but doesn't fit an existing section, add or update a section rather than leaving `DESIGN.md` stale. Treat an out-of-date `DESIGN.md` as a bug.

## Cursor Cloud specific instructions

Single Next.js 16 (App Router) app; **pnpm** is the package manager (`pnpm-lock.yaml`). Standard scripts are in `package.json`: `pnpm dev` (dev server on port 3000), `pnpm build`, `pnpm start`, `pnpm lint`. No database, backend, env vars, or external services are needed. Styling is plain CSS (no Tailwind).

- Dev/test target: `http://localhost:3000` (routes: `/`, `/contact`, `/privacy`, and `/explanations/[slug]`). Run the dev server with `pnpm dev`.
- About copy: `content/about.md`. Contact copy: `content/contact.md`. Privacy copy: `content/privacy.md`. Explanation copy: `content/explanations/*.md`.
- Analytics: `@vercel/analytics` is wired in `app/layout.tsx`; enable Web Analytics in the Vercel project dashboard for production data.
- Speed Insights: `@vercel/speed-insights` is wired in `app/layout.tsx`; enable Speed Insights in the Vercel project dashboard for production data.
