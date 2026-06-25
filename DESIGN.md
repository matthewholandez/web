# Design System

This is the design reference for **mholandez.com** — a single-page personal
landing site for Matthew Holandez. The aesthetic is deliberately minimal:
a quiet, typographic, document-like page on a white background with a single
deep-navy accent. There is no component library and no UI framework beyond the
basics; everything is hand-authored plain CSS in `app/globals.css`.

If you're picking this up as a designer, the guiding principle is **restraint**.
The page should read like a well-set business card, not an app. Generous
vertical rhythm, one accent color, one typeface, no shadows, no gradients, no
borders.

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Plain CSS**, hand-written in `app/globals.css`. No CSS modules, no
  styled-components, no Tailwind utility classes in markup. (Tailwind v4 is
  installed via PostCSS but the page is styled with semantic class names and
  raw CSS — keep new styling in `globals.css` to match.)
- **Geist Sans** via the `geist` package (`geist/font/sans`)
- **lucide-react** for the mail icon; brand icons (GitHub, LinkedIn) are
  hand-inlined SVGs in `app/brand-icons.tsx`

---

## Color

Defined as CSS custom properties on `:root` in `app/globals.css`. The site is
**light-only** (`color-scheme: light only`) — there is intentionally no dark
mode.

| Token      | Value     | Role                                                    |
| ---------- | --------- | ------------------------------------------------------- |
| `--bg`     | `#ffffff` | Page background                                          |
| `--text`   | `#111111` | Primary text (near-black, not pure black)               |
| `--muted`  | `#666666` | Secondary text — project descriptions, contact icons    |
| `--accent` | `#0b132b` | Deep navy — focus outlines, contact-icon hover          |

Usage rules:

- Body copy is `--text`; supporting/secondary copy is `--muted`.
- `--accent` is used sparingly — only the keyboard focus ring and the hover
  state of contact icons. Don't introduce it as a fill or large surface.
- Brand/theme colors (`theme_color`, `background_color` in
  `public/site.webmanifest`, and the OG image background) are all white.

---

## Typography

- **Typeface:** Geist Sans, exposed through the `--font-geist-sans` CSS variable
  (the `GeistSans.variable` class is applied to `<html>` in
  `app/layout.tsx`). Fallback stack: `system-ui, sans-serif`.
- **Base:** 16px, weight 400, on the `body`.
- **Weights in use:** 400 (regular), 500 (medium). Nothing heavier. 500 is the
  "emphasis" weight for the hero and project names.

| Element            | Size                              | Weight | Color     |
| ------------------ | --------------------------------- | ------ | --------- |
| Hero (`.hero`)     | `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.2 | 500 | `--text` |
| Info line          | `1rem`                            | 400    | `--text`  |
| Project name       | `1.0625rem`                       | 500    | `--text`  |
| Project description| `0.9375rem`                       | 400    | `--muted` |
| Body / default     | `1rem` (16px)                     | 400    | `--text`  |

The hero is the only fluid (responsive) type — everything else is fixed-size.

---

## Layout & spacing

- **Container:** `.page` — `max-width: 640px`, centered (`margin: 0 auto`),
  padding `120px 24px 64px`. On screens ≤480px the top padding drops to `64px`.
- **Single column.** The whole page is a vertical stack of sections.
- **Section rhythm:** major sections (info lines, projects, contact) are
  separated by `margin-top: 56px`. This 56px gap is the primary vertical
  rhythm of the page — reuse it for any new top-level section.
- **Intra-section gaps:** flexbox `gap` of `12px` (info lines), `16px`
  (projects), `8px` (within a project row), `10–20px` (icon/text and contact
  spacing).
- No grid, no cards, no containers-within-containers. Keep nesting flat.

The single breakpoint is **480px** (`@media (max-width: 480px)`), used only to
tighten the top padding. The layout itself is intrinsically responsive via
`max-width` + fluid hero type.

---

## Components / patterns

All class names are semantic and live in `app/globals.css`. The page
(`app/page.tsx`) drives content from small data arrays (`phrases`, `projects`)
— add items there rather than hand-writing markup.

- **Signature** (`.signature`) — `public/signature.png` rendered at 32px tall,
  `width: auto`, with `margin-bottom: 24px`. Acts as the wordmark/logo. Loaded
  with `priority` (it's the LCP element).
- **Hero reel** (`.reel` / `.reelTrack` / `.reelSizer`) — "I am ___" with an
  animated vertical slot-machine reel cycling through `phrases`. The
  `@keyframes reel-roll` is **generated in JS** (`buildReelKeyframes` in
  `page.tsx`) from `phrases.length`, so adding/removing a phrase needs no CSS
  edits. Duration = `phrases.length * 2s`. Respects
  `prefers-reduced-motion: reduce` (animation disabled). A visually-hidden
  `.srOnly` fallback ("I am a Waterloo student.") provides the accessible text.
- **Info lines** (`.infoLines` / `.infoLine`) — icon + label rows linking to
  affiliations. 20px icon (`.infoIcon`), text underlines on row hover.
- **Projects** (`.projects` / `.project`) — name + muted description on a
  baseline-aligned, wrapping flex row. Project name underlines on hover.
- **Contact** (`.contact` / `.contactIcon`) — a `<nav>` of 20px icon links.
  Icons are `--muted`, transitioning to `--accent` on hover over `150ms`.

---

## Interaction & motion

- **Hover:** links reveal an underline (info lines, project names); contact
  icons shift from `--muted` → `--accent`. Keep hover affordances this subtle.
- **Focus:** a visible `2px solid var(--accent)` outline with `2px` offset on
  all focusable `a`/`button` (`:focus-visible`). Don't remove this.
- **Transitions:** only color, `150ms`. The reel uses `ease-in-out`. There are
  no other animations.
- **Reduced motion:** always honor `prefers-reduced-motion`. Any new motion
  must have a static fallback.

---

## Iconography

- **Size:** 20px in the live UI.
- **Style:** stroke-based, `stroke-width: 2`, `round` caps/joins, no fill —
  consistent with lucide-react. Hand-authored brand icons in
  `app/brand-icons.tsx` follow the same `viewBox="0 0 24 24"` /
  `stroke="currentColor"` convention so they inherit text color.
- Icons inherit `currentColor`; control their color via the parent's `color`.

---

## Accessibility

- Light-only, high contrast (`#111` on `#fff`).
- Visible focus rings (above) — preserve them.
- Decorative animated hero is `aria-hidden`; a screen-reader-only sentence
  carries the real meaning.
- All icon-only links have `aria-label`s; the contact group is a labeled
  `<nav aria-label="Contact links">`.
- External links use `target="_blank"` + `rel="noopener noreferrer"`.

---

## Assets & metadata

- **Favicons / app icons:** in `public/` (`favicon.ico`, 16/32 PNGs,
  android-chrome 192/512, apple-touch-icon). Wired up in `app/layout.tsx`.
- **Web manifest:** `public/site.webmanifest` — white theme/background,
  `display: standalone`.
- **Open Graph image:** generated at build via `app/opengraph-image.tsx`
  (1200×630). Mirrors the site look — name at 72px/weight 500 in `#111` over
  white, tagline at 32px in `#666`. Keep it in sync with the page's type/color
  if those change.
- **Structured data:** `Person` JSON-LD injected in `app/layout.tsx`.

---

## Adding to the page — quick rules

1. New top-level section → wrap in a semantic class, give it `margin-top: 56px`.
2. New styles → write plain CSS in `app/globals.css`, using the color tokens.
3. New content (a phrase, a project) → push to the data arrays in `page.tsx`.
4. New color → only if unavoidable; add it as a `--token` on `:root`.
5. Keep it light-only, single-column, ≤640px wide, two font weights, one accent.
