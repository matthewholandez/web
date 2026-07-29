# Design System

This is the design reference for **mholandez.com** — a personal site for Matthew
Holandez. The aesthetic is **extreme light minimalism**: dark ink on an off-white
page, set entirely in **Neue Montreal**, with almost no typographic hierarchy.
There is no component library and no UI framework beyond the basics; everything is
hand-authored plain CSS in `app/globals.css` (homepage), `app/now/now.css`
(the `/now` route), and `app/time/time.css` (the `/time` route).

If you're picking this up as a designer, the guiding principle is **whisper, don't
shout**. The page reads like a short CV or calling card — no shadows, no gradients,
no borders, no accent hue, no section labels, and **no visual headings**. The name
is a semantic `<h1>` but is styled identically to body type. Hierarchy comes only
from **value** (`--ink` vs `--muted`) and spacing — never from scale, weight, or
color.

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Plain CSS**, hand-written in `app/globals.css`. No CSS modules, no
  styled-components, no Tailwind utility classes in markup. (Tailwind v4 is
  installed via PostCSS but the page is styled with semantic class names and
  raw CSS — keep new styling in `globals.css` / route CSS files to match.)
- **MDX** via `@next/mdx` for the `/now` page — dated markdown in
  `content/now/YYYY-MM-DD.md` is compiled to React and mapped through
  `mdx-components.tsx`.
- **Neue Montreal** via `next/font/local`, registered once in `app/fonts.ts` (exposed
  as `--font-neue`, applied to `<html>` in `app/layout.tsx`). Two weight-mapped cuts
  are bundled from `app/fonts/`, so `font-weight` picks the cut.
- **lucide-react** for the mail icon; brand icons (GitHub, LinkedIn) are
  hand-inlined SVGs in `app/brand-icons.tsx`.

---

## Color

Defined as CSS custom properties on `:root` in `app/globals.css` and shared by every
route. The site is **light-only** (`color-scheme: light`) — there is intentionally no
dark mode and no accent hue.

| Token     | Value     | Role                                                       |
| --------- | --------- | ---------------------------------------------------------- |
| `--paper` | `#fafafa` | Page background (off-white)                                |
| `--ink`   | `#111111` | Primary text, active hover state                           |
| `--muted` | `#8a8a8a` | Secondary text — tagline, descriptions, resting icons      |
| `--faint` | `#e8e8e8` | Soft marks (footer dot, `/time` colon separators)          |

Usage rules:

- Primary copy is `--ink`; supporting/secondary copy is `--muted`.
- Hover promotes `--muted` → `--ink`. That value shift *is* the interaction language —
  don't introduce a color for it.
- No accent hue anywhere. If you feel a design needs a pop, **don't** — add whitespace
  or cut something instead.
- Brand/theme colors (`theme_color`, `background_color` in `public/site.webmanifest`,
  and the OG image background) are all `--paper`.

---

## Typography

- **Typeface:** Neue Montreal, exposed through the `--font-neue` CSS variable. Fallback
  stack: `ui-sans-serif, system-ui, -apple-system, sans-serif`.
- **Base:** 15px, weight 400, line-height 1.55, tracking `-0.005em` on the `body`.
- **Weights in use — two cuts** (`app/fonts.ts` maps each to a `font-weight`):
  - **400 Regular** — everything on the homepage, and all secondary copy on `/time`.
  - **600 Semibold** — reserved for the `/time` countdown numerals and separators.

| Element              | Size       | Weight | Color     |
| -------------------- | ---------- | ------ | --------- |
| Name (`.name`)       | inherit (15px) | 400 | `--ink` |
| Tagline              | inherit    | 400    | `--muted` |
| Body / links / projects | inherit | 400 | `--ink` / `--muted` for descriptions |
| Time link            | inherit    | 400    | `--muted` |

There are **no display sizes and no visual headings** on the homepage. Do not introduce
a larger or heavier treatment for the name, section titles, or project names — keep
the page flat. The Extrabold cut is intentionally unused and not registered.

---

## Layout & spacing

- **Container:** `.page` — `max-width: 28rem`, centered (`margin: 0 auto`),
  padding `6rem 1.5rem 5rem`. On screens ≤480px the top padding drops to `3.5rem`.
- **Single column, left-aligned.** The whole page is a vertical stack of quiet text.
- **Section rhythm:** major blocks are separated by `2.5rem` (`margin-top` on
  projects, page links, contact, and signature). Reuse `2.5rem` for any new
  top-level block.
- **Intra-section gaps:** `0.55rem` between projects; `0.45rem 0.65rem` within a
  project row; `1.1rem` between contact icons.
- No grid, no cards, no containers-within-containers. Keep nesting flat.
- No section eyebrows, category labels, or decorative rules — content flows as flat text.

The single breakpoint is **480px** (`@media (max-width: 480px)`), used only to tighten
the top padding. The layout is otherwise intrinsically responsive via `max-width`.

---

## Components / patterns

All class names are semantic and live in `app/globals.css`. The page (`app/page.tsx`)
drives content from a small data array (`projects`) — add items there rather than
hand-writing markup.

- **Name** (`.name`) — semantic `<h1>`, visually identical to body type. Single line.
  This is deliberate: the page has no hero lockup.
- **Tagline** (`.tagline`) — muted identity lines under the name: school, then
  "Prev @ DeepCode" (DeepCode linked). Same class, tight `0.15rem` stack — one
  identity block, not a separate section.
- **Projects** (`.projects` / `.project`) — name + muted description on a wrapping
  baseline row. Same weight/size as body; name underlines on hover.
- **Page links** (`.pageLinks` / `.timeLink`) — a quiet stack of `next/link` text
  links ("Now →", "Time remaining →"). Quiet: `--muted`, underlines and shifts to
  `--ink` on hover. The trailing `→` is `aria-hidden`. The wrapper owns the
  `2.5rem` section spacing; individual links have no top margin inside it.
- **Contact** (`.contact` / `.contactIcon`) — a `<nav>` of 18px icon links. Icons are
  `--muted`, transitioning to `--ink` on hover over `150ms`. Stroke weight `1.75`.
- **Signature** (`.signature`) — `public/signature.png` (dark "MATTHEW." brushstroke on
  transparent) at the bottom of the page, 32px tall, `width: auto`, `margin-top: 2.5rem`.
  No invert — the asset is already dark ink for the light page.

---

## Interaction & motion

- **Hover:** links underline (`text-underline-offset: 0.15em`); icons shift
  `--muted` → `--ink`. Keep hover affordances this subtle.
- **Focus:** a visible `2px solid var(--ink)` outline with `3px` offset on all focusable
  `a`/`button` (`:focus-visible`). Don't remove this.
- **Transitions:** only color, `150ms`. There are no homepage animations.
- **Reduced motion:** always honor `prefers-reduced-motion`. Any new motion must have a
  static fallback.

---

## Iconography

- **Size:** 18px in the live UI.
- **Style:** stroke-based, `stroke-width: 1.75`, `round` caps/joins, no fill —
  consistent with lucide-react. Hand-authored brand icons in `app/brand-icons.tsx`
  follow the same `viewBox="0 0 24 24"` / `stroke="currentColor"` convention so they
  inherit text color.
- Line icons inherit `currentColor`; control their color via the parent's `color`.
- No raster affiliation logos on the homepage.

---

## Accessibility

- Light-only, high contrast (`#111111` on `#fafafa`).
- Visible focus rings (above) — preserve them.
- The name is a semantic `<h1>` even though it is not visually enlarged.
- All icon-only links have `aria-label`s; the contact group is a labeled
  `<nav aria-label="Contact links">`.
- External links use `target="_blank"` + `rel="noopener noreferrer"`.

---

## The `/now` page

`/now` (`app/now/`) is a quiet [now page](https://nownownow.com/about) — a dated
blurb about what Matthew is currently up to. It reuses the homepage `.page`
container, palette, and flat typography; route-specific prose styles live in
`app/now/now.css`, scoped under `.now`.

- **Authoring.** One file per point in time: `content/now/YYYY-MM-DD.md`
  (plain markdown body, no frontmatter). Drop a new dated file to post an
  update; older files stay and remain visible. Display order is filename
  descending (`2026-07-29.md` above `2026-01-15.md`).
- **Markdown → components.** `@next/mdx` compiles the files. Root
  `mdx-components.tsx` maps markdown elements (`p`, `a`, `ul`, headings, etc.)
  to quiet React components styled for this site — no display type, no accent,
  external links open in a new tab.
- **Layout.** Semantic `<h1 class="name">Now</h1>`, muted "Updated …" tagline
  from the newest filename, then one `<article class="now-entry">` per file —
  each with a muted `<time>` taken from its `YYYY-MM-DD` name. A "← Home"
  `.timeLink` closes the page.
- **Prose rules.** Headings inherit body size/weight (flat hierarchy). Body is
  `--ink`; dates and blockquotes are `--muted`. Soft `hr` uses `--faint`.
  Section rhythm stays `2.5rem`.

---

## The `/time` countdown page

`/time` (`app/time/`) is the **one place scale is allowed** — a full-screen live
countdown to the next queued milestone. It shares the site's palette
(`:root` tokens) and typeface (`--font-neue`, inherited from `<html>`); it differs by
centering the readout and using Semibold for the numerals.

- **Weights.** Numerals/separators are Neue Montreal **Semibold (600)**; labels, meta,
  and footer are **Regular (400)**. No uppercase tracked eyebrows.
- **Scoping convention:** all styles live in `app/time/time.css`, every selector
  prefixed with `.time-remaining`. That wrapper (rendered in `app/time/layout.tsx`) is a
  full-viewport surface (`min-height: 100dvh`) that centers the readout. Keep any new
  `/time` styles under this prefix so they stay contained to the route.
- **Key pieces:** `.readout`/`.cell`/`.num` (fluid `clamp(2.75rem, 12vw, 8rem)`
  numerals, `tabular-nums`), a blinking `.sep--blink` colon on the minutes cell,
  `.meta` lines (business-days count + target), a fixed `.footer` with a
  "What is this?" button + "Home" link, and an accessible about `.modal`
  (`role="dialog"`, Escape / click-outside to close, focus moved to Close).
- **Motion:** `blink` (1s) and `fade` (0.15s) keyframes, both disabled under
  `prefers-reduced-motion: reduce`.
- **Data:** `app/time/config.ts` holds an `EVENTS` queue (`target`, `targetLabel`,
  `eventLabel`) plus Ontario holidays. `getActiveEvent(now)` / `getDisplayEvent(now)`
  pick the closest future milestone (or the latest past one when the queue is
  exhausted). Business-day math lives in `app/time/businessDays.ts`. To schedule
  another countdown, append to `EVENTS` — the page always shows the soonest
  upcoming entry.

---

## Assets & metadata

- **Signature:** `public/signature.png` — dark brushstroke "MATTHEW." wordmark on a
  transparent background (2400×400). Used at the bottom of the homepage.
- **Favicons / app icons:** in `public/` (`favicon.ico`, 16/32 PNGs,
  android-chrome 192/512, apple-touch-icon). Wired up in `app/layout.tsx`.
- **Web manifest:** `public/site.webmanifest` — `--paper` (`#fafafa`) theme/background,
  `display: standalone`. `themeColor` is also set via the `viewport` export in
  `app/layout.tsx`.
- **Open Graph image:** generated at build via `app/opengraph-image.tsx` (1200×630).
  Mirrors the quiet homepage — name at 42px/weight 400 in `--ink` over `--paper`,
  tagline at 28px in `--muted`, both set in Neue Montreal Regular. Keep it in sync
  with the page's type/color if those change.
- **Structured data:** `Person` JSON-LD injected in `app/layout.tsx`.

---

## Adding to the page — quick rules

1. New top-level block → give it `margin-top: 2.5rem` to match existing rhythm.
2. New styles → write plain CSS in `app/globals.css`, using the color tokens.
3. New content (a project) → push to the data array in `page.tsx`.
4. New `/now` update → add `content/now/YYYY-MM-DD.md` (filename is the date;
   older files stay on the page, sorted newest-first).
5. Do **not** add display type, section headings, accent color, cards, or logos.
6. Keep it light-only, single-column, ≤28rem wide, Regular weight on the homepage.
