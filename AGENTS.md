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
