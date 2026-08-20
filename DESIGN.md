# Design System

This is the design reference for **mholandez.com** — a personal site for Matthew
Holandez. The aesthetic is **quiet prose with a left sidebar**: cool sage marks on
a soft green-gray page, set entirely in **Neue Montreal**. There is no component
library and no UI framework beyond the basics; everything is hand-authored plain
CSS in `app/globals.css` (shared shell + content routes) and `app/now/now.css`
(the `/now` route).

If you're picking this up as a designer, the guiding principle is **whisper, don't
shout**. The site reads like a short personal calling card — no shadows, no cards,
no section eyebrows. Hierarchy comes from **value** (`--ink` vs `--muted`), a soft
**sage mark** for active nav and inline keywords, and spacing — not from display
type or heavy chrome.

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Plain CSS**, hand-written in `app/globals.css` / route CSS files. No CSS
  modules, no styled-components, no Tailwind.
- **MDX** via `@next/mdx` for About (`content/about.md`), Contact
  (`content/contact.md`), Privacy (`content/privacy.md`), and `/now`
  (`content/now/YYYY-MM-DD.md`), mapped through `mdx-components.tsx`.
- **Vercel Web Analytics** via `@vercel/analytics` and **Speed Insights** via
  `@vercel/speed-insights` in the root layout.
- **Neue Montreal** via `next/font/local`, registered once in `app/fonts.ts` (exposed
  as `--font-neue`, applied to `<html>` in `app/layout.tsx`). Regular is bundled from
  `app/fonts/`, so `font-weight: 400` picks that cut.
- Shared chrome lives in `app/components/` — `SiteShell`, `SiteNav` (client, for
  active route), and `ExternalLink` (↗ suffix for outbound links).

---

## Color

Defined as CSS custom properties on `:root` in `app/globals.css` and shared by every
route. The site is **light-only** (`color-scheme: light`) — there is intentionally no
dark mode. The page background is a fixed cool wash (soft sage radial + paper
gradient), not a flat cream field and not pink.

| Token          | Value     | Role                                                          |
| -------------- | --------- | ------------------------------------------------------------- |
| `--paper`      | `#f5f6f4` | Page base (cool green-gray)                                   |
| `--paper-deep` | `#eef1ec` | Gradient end                                                  |
| `--ink`        | `#151716` | Primary text                                                  |
| `--muted`      | `#6e7470` | Secondary text — dates, project descriptions                  |
| `--mark`       | `#cfe3d6` | Sage highlight — active nav, inline keywords/links            |
| `--mark-hover` | `#b9d6c4` | Slightly deeper sage on hover                                 |
| `--faint`      | `#e2e6e3` | Soft marks (`/now` rule separators)                           |

Usage rules:

- Primary copy is `--ink`; supporting/secondary copy is `--muted`.
- Interactive emphasis uses the sage `--mark` background (nav active state and
  `.mark` inline links). Do **not** switch to pink, purple, or cream/terracotta.
- Brand/theme colors (`theme_color`, `background_color` in `public/site.webmanifest`,
  and the OG image background) are `--paper` (`#f5f6f4`).

---

## Typography

- **Typeface:** Neue Montreal, exposed through the `--font-neue` CSS variable. Fallback
  stack: `ui-sans-serif, system-ui, -apple-system, sans-serif`.
- **Base:** 16px, weight 400, line-height 1.7, tracking `-0.005em` on the `body`.
  Prose is meant to breathe — keep leading generous.
- **Weight in use — one cut** (`app/fonts.ts` maps it to a `font-weight`):
  - **400 Regular** — all shell pages (About, Now, Projects, Contact).

There are **no display sizes** on the content routes. The About page keeps the name
in a visually hidden `<h1 class="srOnly">` — identity lives in the opening prose
("I'm Matthew Holandez"), not a hero lockup. `/now` still uses a quiet visible
`.name` heading styled as body type.

---

## Layout & spacing

- **Shell:** `.shell` — CSS grid with a sticky left nav column (`9.5rem`) and a
  prose column (`minmax(0, 34rem)`), `gap: 3.5rem`, max-width `52rem`, padding
  `5.5rem 2rem 5rem`. Justified to the start so the composition sits left-of-center
  like a notebook page, not a dashboard.
- **Breakpoint:** `720px` — nav stacks above content as a horizontal wrap; shell
  padding tightens to `2.25rem 1.35rem 4rem`.
- **Prose rhythm:** `.prose` uses a `1.35rem` vertical gap between paragraphs.
- **Section rhythm:** external link row, signature, and major `/now` blocks use
  `~2.75rem` top margin.
- No cards, no bordered panels, no inset media. Nesting stays flat.

---

## Components / patterns

### Site shell

- **`SiteShell`** — wraps About, Now, Projects, Contact, and Privacy with
  `.shell` / sticky `.shell__nav` / `.shell__main`, plus a quiet `.siteFooter`
  privacy link at the bottom of the main column.
- **`SiteNav`** — vertical list: About (`/`), Projects (`/projects`), Contact
  (`/contact`). `/now` stays in the links array but is unpublished via
  `NOW_PUBLISHED` in `app/now/published.ts`. Hover uses `--mark`; the active
  route uses the deeper `--mark-hover` so current page reads clearly. On small
  screens the list goes horizontal.

### About (`/`)

- **Authoring.** Edit `content/about.md` — plain markdown, no frontmatter.
  The homepage (`app/page.tsx`) imports that file via `@next/mdx` and renders
  it inside `.prose`. Chrome around it (contact `.extLinks` row + signature)
  stays in the React page.
- **Markdown → marks.** Links become sage `.mark` chips (`mdx-components.tsx`):
  external `https://…` links also get a trailing ↗; internal paths use
  `next/link`. Wrap a non-link keyword in `**bold**` to get the same mark
  highlight (e.g. `**Systems Design Engineering**`).
- **`.extLinks`** — bottom row of GitHub / LinkedIn / Email with ↗ suffixes.
- **Signature** — `public/signature.png` at 32px tall under the link row.

### Projects (`/projects`)

- Short intro prose, then `.projectList` — each item is a marked `ExternalLink`
  name plus muted `.projectList__desc`. Project data lives in
  `app/projects-data.ts`.

### Contact (`/contact`)

- **Authoring.** Edit `content/contact.md` — plain markdown, no frontmatter.
  The page (`app/contact/page.tsx`) imports it via `@next/mdx` and renders it
  inside `.prose`. Typically one marked `mailto:` link (no form, no ↗).
  Semantic heading is visually hidden like About and Projects.

### Privacy (`/privacy`)

- **Authoring.** Edit `content/privacy.md` — plain markdown, no frontmatter.
  Boilerplate privacy copy noting Vercel Web Analytics (cookieless page-view
  analytics). Rendered in `.prose.privacy`.
- **Hierarchy.** Still one type cut (Regular). The page title (`.privacyPage
  .name`) steps up to `1.35rem`. Section `h2`s stay near body size but sit in
  `--ink` with tighter tracking; body paragraphs use `--muted` so heading vs
  copy separates by value, not weight.
- **Footer link.** Every `SiteShell` page shows a muted lowercase `privacy`
  link (`.siteFooter`) at the bottom of the main column — not in the nav.

### Marks & arrows

- `.mark` — sage background chip on inline keywords/links; hover deepens to
  `--mark-hover`.
- `.extArrow` — small ↗ that nudges up-right on link hover (disabled under
  reduced motion).

---

## Interaction & motion

- **Hover:** sage mark deepens; external arrows translate slightly; nav links pick
  up the mark background.
- **Focus:** a visible `2px solid var(--ink)` outline with `3px` offset on all
  focusable `a`/`button` (`:focus-visible`). Don't remove this.
- **Motion (intentional, quiet):**
  1. `.shell__main` rises/fades in on load (`rise`, 0.55s).
  2. Mark background color transitions (150ms).
  3. External arrow nudge on hover (150ms).
- **Reduced motion:** `prefers-reduced-motion: reduce` disables the entrance
  animation, arrow nudge, and transitions.

---

## Iconography

- Content routes use text + ↗ (`.extArrow` via `ExternalLink` / MDX links).
  There is no icon library.
- No raster affiliation logos on content routes.

---

## Accessibility

- Light-only, high contrast (`#151716` on `#f5f6f4`).
- Visible focus rings (above) — preserve them.
- About keeps a semantic visually-hidden `<h1>`; nav uses `aria-current="page"`
  on the active item; primary nav is labeled.
- External links use `target="_blank"` + `rel="noopener noreferrer"`.
- Decorative ↗ arrows are `aria-hidden`.

---

## The `/now` page

`/now` (`app/now/`) is a quiet [now page](https://nownownow.com/about) — a dated
blurb about what Matthew is currently up to. It uses the shared `SiteShell` and
palette; route-specific prose styles live in `app/now/now.css`, scoped under
`.now`.

**Unpublished.** Files stay; the page still renders at `/now`. `NOW_PUBLISHED`
in `app/now/published.ts` is `false`, which hides it from nav, sitemap, and
robots, and sets `noindex`. Flip that flag to publish. Restore the About
copy link in `content/about.md` at the same time.

- **Authoring.** One file per point in time: `content/now/YYYY-MM-DD.md`
  (plain markdown body, no frontmatter). Drop a new dated file to post an
  update; older files stay and remain visible. Display order is filename
  descending (`2026-07-29.md` above `2026-01-15.md`).
- **Markdown → components.** `@next/mdx` compiles the files. Root
  `mdx-components.tsx` maps markdown elements to quiet React components; links
  get the `.mark` treatment and external ones append ↗.
- **Layout.** Semantic `<h1 class="name">Now</h1>`, muted "Updated …" tagline
  from the newest filename, then one `<article class="now-entry">` per file —
  each with a muted `<time>` taken from its `YYYY-MM-DD` name. Navigation back
  home is via the sidebar (no footer “← Home” link).

---

## Assets & metadata

- **Signature:** `public/signature.png` — dark brushstroke "MATTHEW." wordmark on a
  transparent background (2400×400). Used at the bottom of the About page.
- **Favicons / app icons:** in `public/` (`favicon.ico`, 16/32 PNGs,
  android-chrome 192/512, apple-touch-icon). Wired up in `app/layout.tsx`.
- **Web manifest:** `public/site.webmanifest` — `--paper` (`#f5f6f4`) theme/background,
  `display: standalone`. `themeColor` is also set via the `viewport` export in
  `app/layout.tsx`.
- **Open Graph image:** generated at build via `app/opengraph-image.tsx` (1200×630).
  Name at 42px/weight 400 in `--ink` over `--paper`, tagline at 28px in `--muted`,
  both set in Neue Montreal Regular. Keep it in sync with the page's type/color
  if those change.
- **Structured data:** `Person` JSON-LD injected in `app/layout.tsx`.
- **Sitemap:** `/`, `/projects`, `/contact`, `/privacy` (`/now` omitted while
  unpublished).
- **Analytics:** `@vercel/analytics` (`Analytics` from `@vercel/analytics/next`)
  in `app/layout.tsx`. Tracks page views in production when Web Analytics is
  enabled on the Vercel project.
- **Speed Insights:** `@vercel/speed-insights` (`SpeedInsights` from
  `@vercel/speed-insights/next`) in `app/layout.tsx`. Reports Core Web Vitals
  in production when Speed Insights is enabled on the Vercel project.

---

## Adding to the page — quick rules

1. Edit About copy → change `content/about.md` (links + `**highlights**`).
2. Edit Contact copy → change `content/contact.md`.
3. Edit Privacy copy → change `content/privacy.md`.
4. New `/now` update → add `content/now/YYYY-MM-DD.md` (filename is the date;
   older files stay on the page, sorted newest-first).
5. New project → push to `app/projects-data.ts`.
6. New content route → wrap in `SiteShell` and keep prose ≤~34rem.
7. New styles → write plain CSS in `app/globals.css`, using the color tokens.
8. Do **not** add display type, cards, pink/cream accents, or icon-heavy chrome
   on the content routes.
9. Keep it light-only; honor `prefers-reduced-motion`.
