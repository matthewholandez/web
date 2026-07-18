# Design System

This is the design reference for **mholandez.com** — a personal site for Matthew
Holandez. The aesthetic is **inverted monochrome**: white ink on a near-black page,
set in **Neue Montreal**, with type pushed to a bold, poppy scale. There is no
component library and no UI framework beyond the basics; everything is hand-authored
plain CSS in `app/globals.css` (homepage) and `app/time/time.css` (the `/time` route).

If you're picking this up as a designer, the guiding principle is **restraint with one
loud voice**. The page is quiet and typographic — no shadows, no gradients, no borders,
no accent hue — and spends all of its boldness in one place: **scale and contrast**. The
homepage hero and the `/time` countdown are two versions of the same idea — a giant,
mechanical, monochrome counter — and that kinship is what makes the site feel like one
thing. Hierarchy comes from **value, scale, and letter-spacing**, never from color.

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Plain CSS**, hand-written in `app/globals.css`. No CSS modules, no
  styled-components, no Tailwind utility classes in markup. (Tailwind v4 is
  installed via PostCSS but the page is styled with semantic class names and
  raw CSS — keep new styling in `globals.css` to match.)
- **Neue Montreal** via `next/font/local`, registered once in `app/fonts.ts` (exposed
  as `--font-neue`, applied to `<html>` in `app/layout.tsx`). Three weight-mapped cuts
  are bundled from `app/fonts/`, so `font-weight` picks the cut.
- **lucide-react** for the mail icon; brand icons (GitHub, LinkedIn) are
  hand-inlined SVGs in `app/brand-icons.tsx`.

---

## Color

Defined as CSS custom properties on `:root` in `app/globals.css` and shared by every
route. The site is **dark-only** (`color-scheme: dark`) — there is intentionally no
light mode and no accent hue.

| Token     | Value     | Role                                                       |
| --------- | --------- | ---------------------------------------------------------- |
| `--paper` | `#050505` | Page background (near-black)                               |
| `--ink`   | `#f6f6f4` | Primary text, hero, active hover state                     |
| `--muted` | `#8a8a88` | Secondary text — eyebrows, descriptions, resting icons     |
| `--faint` | `#4a4a48` | Dividers, icon rings, the `/time` colon separators         |

Usage rules:

- Primary copy is `--ink`; supporting/secondary copy is `--muted`.
- Hover promotes `--muted` → `--ink`. That value shift *is* the interaction language —
  don't introduce a color for it.
- No accent hue anywhere. If you feel a design needs a pop, reach for **scale or
  weight**, not color.
- Brand/theme colors (`theme_color`, `background_color` in `public/site.webmanifest`,
  and the OG image background) are all `--paper`.

---

## Typography

- **Typeface:** Neue Montreal, exposed through the `--font-neue` CSS variable. Fallback
  stack: `ui-sans-serif, system-ui, -apple-system, sans-serif`.
- **Base:** 16px, weight 400, on the `body`.
- **Weights in use — three cuts** (`app/fonts.ts` maps each to a `font-weight`):
  - **400 Regular** — body, descriptions, the "I am" lead.
  - **600 Semibold** — emphasis: project names, section eyebrows. Also the single
    weight of the entire `/time` page.
  - **800 Extrabold** — reserved for the giant homepage hero reel.

| Element              | Size                              | Weight | Color     |
| -------------------- | --------------------------------- | ------ | --------- |
| Hero reel (`.reel`)  | `clamp(2rem, 8vw, 3.75rem)`, tracking `-0.03em` | 800 | `--ink`   |
| Hero lead (`.heroLead`) | `1.125rem`                     | 400    | `--muted` |
| Eyebrow (`.eyebrow`) | `0.72rem`, tracking `0.28em`, uppercase | 600 | `--muted` |
| Info line            | `1rem`                            | 400    | `--ink`   |
| Project name         | `1.0625rem`                       | 600    | `--ink`   |
| Project description  | `0.9375rem`                       | 400    | `--muted` |
| Body / default       | `1rem` (16px)                     | 400    | `--ink`   |

The hero is the only fluid (responsive) type — everything else is fixed-size. Keep the
Extrabold cut for the hero only; over-using 800 flattens the hierarchy.

---

## Layout & spacing

- **Container:** `.page` — `max-width: 640px`, centered (`margin: 0 auto`),
  padding `120px 24px 96px`. On screens ≤480px the top padding drops to `64px`.
- **Single column, left-aligned.** The whole page is a vertical stack of sections.
- **Section rhythm:** major sections are separated by `64px` — carried by the
  `.eyebrow`'s `margin-top` where a section has one (Currently, Selected work), and by
  `margin-top: 64px` on the time link and contact. Reuse `64px` for any new top-level
  section.
- **Intra-section gaps:** flexbox `gap` of `12px` (info lines), `16px` (projects),
  `8px` (within a project row), `12–20px` (icon/text and contact spacing).
- No grid, no cards, no containers-within-containers. Keep nesting flat.

The single breakpoint is **480px** (`@media (max-width: 480px)`), used only to tighten
the top padding. The layout is otherwise intrinsically responsive via `max-width` +
fluid hero type.

---

## Components / patterns

All class names are semantic and live in `app/globals.css`. The page (`app/page.tsx`)
drives content from small data arrays (`phrases`, `projects`) — add items there rather
than hand-writing markup.

- **Signature** (`.signature`) — `public/signature.png` (a black "MATTHEW."
  brushstroke wordmark) rendered at 38px tall, `width: auto`, `filter: invert(1)` so it
  reads as **white ink on the dark page**, `margin-bottom: 40px`. Loaded with `priority`
  (it's the LCP element).
- **Hero reel** (`.hero` / `.heroLead` / `.reel` / `.reelTrack` / `.reelSizer`) — the
  signature moment. A small `--muted` "I am" lead sits over a **giant Extrabold reel on
  its own full-width line** that ticks through `phrases` like a mechanical display (the
  homepage's echo of the `/time` readout). The `@keyframes reel-roll` is **generated in
  JS** (`buildReelKeyframes` in `page.tsx`) from `phrases.length`, so adding/removing a
  phrase needs no CSS edits. Duration = `phrases.length * 3.5s`. The reel is
  `overflow: hidden` — keep the max clamp small enough that the longest phrase fits the
  container without clipping. Respects `prefers-reduced-motion: reduce` (animation
  disabled); a visually-hidden `.srOnly` sentence carries the accessible text.
- **Eyebrow** (`.eyebrow`) — small uppercase `--muted` label (weight 600, tracking
  `0.28em`) marking a real group. Only used where content genuinely is a category
  ("Currently", "Selected work", "Other"); it also sets that section's top rhythm. Not
  decoration — don't add one without a group under it.
- **Info lines** (`.infoLines` / `.infoLine`) — icon + label rows linking to
  affiliations. The raster logos are normalized to **clean 20px circular marks**
  (`.infoIcon`: `border-radius: 50%`, `object-fit: cover`, `1px --faint` inset ring) so
  a logo on a white background doesn't read as a harsh chip on black. Text underlines on
  row hover.
- **Projects** (`.projects` / `.project`) — name (weight 600) + muted description on a
  baseline-aligned, wrapping flex row. Project name underlines on hover.
- **Time link** (`.timeLink`) — a discreet `next/link` text link ("Time remaining →")
  to the `/time` countdown page, under the "Other" eyebrow (between Selected work and
  contact). Quiet: `0.875rem`, `--muted`, no border/fill; underlines and shifts to
  `--ink` on hover. The trailing `→` is `aria-hidden`.
- **Contact** (`.contact` / `.contactIcon`) — a `<nav>` of 20px icon links. Icons are
  `--muted`, transitioning to `--ink` on hover over `150ms`.

---

## Interaction & motion

- **Hover:** links reveal an underline (info lines, project names, time link); icons
  shift `--muted` → `--ink`. Keep hover affordances this subtle.
- **Focus:** a visible `2px solid var(--ink)` outline with `3px` offset on all focusable
  `a`/`button` (`:focus-visible`). Don't remove this.
- **Transitions:** only color, `150ms`. The reel uses `ease-in-out`. There are no other
  homepage animations.
- **Reduced motion:** always honor `prefers-reduced-motion`. Any new motion must have a
  static fallback.

---

## Iconography

- **Size:** 20px in the live UI.
- **Style:** stroke-based, `stroke-width: 2`, `round` caps/joins, no fill —
  consistent with lucide-react. Hand-authored brand icons in `app/brand-icons.tsx`
  follow the same `viewBox="0 0 24 24"` / `stroke="currentColor"` convention so they
  inherit text color. Raster affiliation logos are the exception — masked to circular
  marks (see Info lines).
- Line icons inherit `currentColor`; control their color via the parent's `color`.

---

## Accessibility

- Dark-only, high contrast (`#f6f6f4` on `#050505`).
- Visible focus rings (above) — preserve them.
- Decorative animated hero is `aria-hidden`; a screen-reader-only sentence carries the
  real meaning.
- All icon-only links have `aria-label`s; the contact group is a labeled
  `<nav aria-label="Contact links">`.
- External links use `target="_blank"` + `rel="noopener noreferrer"`.

---

## The `/time` countdown page

`/time` (`app/time/`) is the **centered countdown variant** of the same system — a
full-screen live countdown to the end of the 1B term at Waterloo. It shares the site's
palette (`:root` tokens) and typeface (`--font-neue`, inherited from `<html>`); it
differs only in being centered and using a single weight.

- **One weight.** The whole page is Neue Montreal **Semibold (600)**; hierarchy comes
  from scale, value, and tracking alone — never from mixing cuts.
- **Scoping convention:** all styles live in `app/time/time.css`, every selector
  prefixed with `.time-remaining`. That wrapper (rendered in `app/time/layout.tsx`) is a
  full-viewport surface (`min-height: 100dvh`) that centers the readout. Keep any new
  `/time` styles under this prefix so they stay contained to the route.
- **Key pieces:** `.readout`/`.cell`/`.num` (fluid `clamp(3.5rem, 17vw, 13rem)`
  numerals, `tabular-nums`), a blinking `.sep--blink` colon on the minutes cell,
  `.meta` lines (business-days count + target), a fixed `.footer` with a
  "What is this?" button + "Home" link, and an accessible about `.modal`
  (`role="dialog"`, Escape / click-outside to close, focus moved to Close).
- **Motion:** `blink` (1s) and `fade` (0.15s) keyframes, both disabled under
  `prefers-reduced-motion: reduce`.
- **Data:** the target date, labels, and Ontario stat-holiday list live in
  `app/time/config.ts`; business-day math in `app/time/businessDays.ts`.

---

## Assets & metadata

- **Favicons / app icons:** in `public/` (`favicon.ico`, 16/32 PNGs,
  android-chrome 192/512, apple-touch-icon). Wired up in `app/layout.tsx`.
- **Web manifest:** `public/site.webmanifest` — `--paper` (`#050505`) theme/background,
  `display: standalone`. `themeColor` is also set via the `viewport` export in
  `app/layout.tsx`.
- **Open Graph image:** generated at build via `app/opengraph-image.tsx` (1200×630).
  Mirrors the site look — name at 96px/weight 800 in `--ink` over `--paper`, tagline at
  34px in `--muted`, both set in Neue Montreal (the `.otf`s are read from `app/fonts/`
  and passed to `ImageResponse`). Keep it in sync with the page's type/color if those
  change.
- **Structured data:** `Person` JSON-LD injected in `app/layout.tsx`.

---

## Adding to the page — quick rules

1. New top-level section → wrap in a semantic class; lead with an `.eyebrow` (which
   carries the `64px` top rhythm) if it's a real group, else give it `margin-top: 64px`.
2. New styles → write plain CSS in `app/globals.css`, using the color tokens.
3. New content (a phrase, a project) → push to the data arrays in `page.tsx`.
4. Pop comes from **scale or weight**, not color — don't add an accent hue.
5. Keep it dark-only, single-column, ≤640px wide, three font weights (400/600/800),
   Extrabold for the hero only.
