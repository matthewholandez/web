# Design System

This is the design reference for **mholandez.com** — a personal site for Matthew
Holandez. The aesthetic is **quiet prose with a right-hand explanation column**:
cool sage marks on a soft green-gray page, set entirely in **Neue Montreal**.
There is no component library and no UI framework beyond the basics; everything
is hand-authored plain CSS in `app/globals.css`.

If you're picking this up as a designer, the guiding principle is **whisper, don't
shout**. The site reads like a short personal calling card — no shadows, no cards,
no section eyebrows. Hierarchy comes from **value** (`--ink` vs `--muted`), a soft
**sage mark** for inline keywords, and spacing — not from display type or heavy
chrome.

---

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Plain CSS**, hand-written in `app/globals.css` / route CSS files. No CSS
  modules, no styled-components, no Tailwind.
- **MDX** via `@next/mdx` for About (`content/about.md`), Privacy
  (`content/privacy.md`), and explanations (`content/explanations/*.md`),
  mapped through `mdx-components.tsx`.
- **Vercel Web Analytics** via `@vercel/analytics` and **Speed Insights** via
  `@vercel/speed-insights` in the root layout.
- **Neue Montreal** via `next/font/local`, registered once in `app/fonts.ts` (exposed
  as `--font-neue`, applied to `<html>` in `app/layout.tsx`). Regular is bundled from
  `app/fonts/`, so `font-weight: 400` picks that cut.
- Shared chrome lives in `app/components/` — `SiteShell` and `ExternalLink`
  (↗ suffix for outbound links).

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
| `--mark`       | `#cfe3d6` | Sage highlight — inline keywords/links                        |
| `--mark-hover` | `#b9d6c4` | Slightly deeper sage on hover                                 |
| `--faint`      | `#e2e6e3` | Soft explanation-column separators                           |

Usage rules:

- Primary copy is `--ink`; supporting/secondary copy is `--muted`.
- Interactive emphasis uses the sage `--mark` background on `.mark` inline
  links. Do **not** switch to pink, purple, or cream/terracotta.
- Brand/theme colors (`theme_color`, `background_color` in `public/site.webmanifest`,
  and the OG image background) are `--paper` (`#f5f6f4`).

---

## Typography

- **Typeface:** Neue Montreal, exposed through the `--font-neue` CSS variable. Fallback
  stack: `ui-sans-serif, system-ui, -apple-system, sans-serif`.
- **Base:** 16px, weight 400, line-height 1.7, tracking `-0.005em` on the `body`.
  Prose is meant to breathe — keep leading generous.
- **Weight in use — one cut** (`app/fonts.ts` maps it to a `font-weight`):
  - **400 Regular** — all shell pages (About, Privacy, standalone explanations).

There are **no display sizes** on the content routes. The About page keeps the name
in a visually hidden `<h1 class="srOnly">` — identity lives in the opening prose,
not a hero lockup.

---

## Layout & spacing

- **Shell:** `.shell` — a single main column with padding `5.5rem 2rem 5rem`.
  Prose inside `.shell__main` is capped at `34rem`. Justified to the start so
  the composition sits left-of-center like a notebook page, not a dashboard.
- **Explanation stage:** `.explanationStage` wraps the route content and the
  `@explanation` parallel-route slot. At rest the stage is `38rem` (prose plus
  padding). Opening an explanation expands it to `72rem` and becomes a true
  two-column layout: the main column takes most of the width (`1fr`) and the
  explanation sits in a narrower right column (`clamp(18rem, 28vw, 22rem)`).
  At `960px` and below, the explanation becomes a full-width sheet and the
  underlying page moves entirely out of view.
- **Breakpoint:** `720px` — shell padding tightens to `2.25rem 1.35rem 4rem`.
- **Prose rhythm:** `.prose` uses a `1.35rem` vertical gap between paragraphs.
- **Section rhythm:** the external link row and signature use `~2.75rem` top
  margin.
- No cards, enclosing bordered panels, or inset media. Nesting stays flat. When
  an explanation is open, a single-pixel `--faint` editorial rule divides the
  main column from the explanation without enclosing either region.

---

## Components / patterns

### Site shell

- **`SiteShell`** — wraps About, Privacy, and standalone explanation pages with
  `.shell` / `.shell__main`, plus a quiet `.siteFooter` at the bottom of the
  main column. Privacy and standalone explanations pass `homeLink` so the
  footer also includes a muted `home` link before `privacy`. There is no
  primary nav — the site is a single About page, with contact living as an
  explanation.

### About (`/`)

- **Authoring.** Edit `content/about.md` — plain markdown, no frontmatter.
  The homepage (`app/page.tsx`) imports that file via `@next/mdx` and renders
  it inside `.prose`. Chrome around it (GitHub/LinkedIn `.extLinks` row +
  signature) stays in the React page.
- **Markdown → marks.** Links become sage `.mark` chips (`mdx-components.tsx`):
  external `https://…` links also get a trailing ↗; internal paths use
  `next/link`. Wrap a non-link keyword in `**bold**` to get the same mark
  highlight (e.g. `**Systems Design Engineering**`).
- **`.extLinks`** — bottom row of GitHub / LinkedIn with ↗ suffixes.
- **Signature** — `public/signature.png` at 32px tall under the link row.

### Contact (`/explanations/say-hi`)

- **Authoring.** Edit `content/explanations/say-hi.md` — same convention as
  other explanations (level-one heading, then ordinary Markdown). Linked from
  About as `[say hi!](/explanations/say-hi)`. Typically one marked `mailto:`
  link (no form, no ↗) plus outbound social links.
- **Redirect.** `/contact` permanently redirects here so older links still
  resolve.

### Privacy (`/privacy`)

- **Authoring.** Edit `content/privacy.md` — plain markdown, no frontmatter.
  Boilerplate privacy copy noting Vercel Web Analytics (cookieless page-view
  analytics). Rendered in `.prose.privacy`.
- **Hierarchy.** Still one type cut (Regular). The page title (`.privacyPage
  .name`) steps up to `1.35rem`. Section `h2`s stay near body size but sit in
  `--ink` with tighter tracking; body paragraphs use `--muted` so heading vs
  copy separates by value, not weight.
- **Footer link.** Every `SiteShell` page shows a muted lowercase `privacy`
  link (`.siteFooter`) at the bottom of the main column. Inner pages also
  show a `home` link, separated by a middot.

### Marks & arrows

- `.mark` — sage background chip on inline keywords/links; hover deepens to
  `--mark-hover`.
- `.extArrow` — small ↗ that nudges up-right on link hover (disabled under
  reduced motion). `ExternalLink` keeps it attached to the label's final word,
  so an arrow never wraps onto a line by itself.

### Explanation links

- **Authoring.** Each explanation is a plain Markdown file in
  `content/explanations/`, named with a lowercase hyphenated slug. Its first line
  must be a level-one heading, followed by ordinary Markdown. Links, lists,
  emphasis, quotes, and inline code use the existing global MDX mappings.
- **Linking.** Use a normal internal Markdown link to its standalone route:
  `[Systems Design Engineering](/explanations/systems-design-engineering)`.
  No React component or hand-maintained content registry is needed.
- **Discovery.** `scripts/generate-explanations.mjs` creates a typed, generated
  loader map before `pnpm dev` and `pnpm build`. Do not edit
  `app/generated/explanation-loaders.ts` by hand. Restart the dev server after
  adding or renaming an explanation so the loader map is regenerated.
- **Routes.** `/explanations/[slug]` is the accessible, shareable standalone
  fallback. In-site navigation is intercepted by the root `@explanation` slot
  and renders the same MDX in `.explanationPanel` without losing the current
  page context.
- **Presentation.** The explanation heading uses the existing sage `.mark` and
  the slightly smaller (`0.95rem`) body uses `--muted`. Wide screens use a faint
  vertical rule before the explanation to clarify the two regions while the
  main column keeps its measure. The panel remains flat and transparent;
  responsive sheets use the existing paper gradient with no card, shadow, or
  new color token.

---

## Interaction & motion

- **Hover:** sage mark deepens; external arrows translate slightly.
- **Focus:** a visible `2px solid var(--ink)` outline with `3px` offset on all
  focusable `a`/`button` (`:focus-visible`). Don't remove this.
- **Motion (intentional, quiet):**
  1. `.shell__main` rises/fades in on load (`rise`, 0.55s).
  2. Mark background color transitions (150ms).
  3. External arrow nudge on hover (150ms).
  4. Opening an explanation expands/shifts the page and slides the explanation
     in from the right (`320ms`). Close and Escape play the equal reverse motion
     before completing the history navigation.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables the entrance
  animations, explanation movement, arrow nudge, and transitions.

---

## Iconography

- Content routes use text + ↗ (`.extArrow` via `ExternalLink` / MDX links).
  There is no icon library.
- No raster affiliation logos on content routes.

---

## Accessibility

- Light-only, high contrast (`#151716` on `#f5f6f4`).
- Visible focus rings (above) — preserve them.
- About keeps a semantic visually-hidden `<h1>`; primary identity lives in the
  opening prose. Inner pages offer a footer `home` link back to `/`.
- External links use `target="_blank"` + `rel="noopener noreferrer"`.
- Decorative ↗ arrows are `aria-hidden`.
- Explanation triggers are real internal links with standalone destinations.
  The intercepted panel is an `aside` labeled by its Markdown heading, moves
  focus to its close control on open, supports Escape, and closes through browser
  history so Back/Forward behavior stays native.

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
- **Search description:** the site-wide description is the About page's first
  sentence: “I study Systems Design Engineering at the University of Waterloo.”
- **Sitemap:** `/` and `/privacy`. `/contact` is a permanent redirect to
  `/explanations/say-hi` and is not listed.
- **Analytics:** `@vercel/analytics` (`Analytics` from `@vercel/analytics/next`)
  in `app/layout.tsx`. Tracks page views in production when Web Analytics is
  enabled on the Vercel project.
- **Speed Insights:** `@vercel/speed-insights` (`SpeedInsights` from
  `@vercel/speed-insights/next`) in `app/layout.tsx`. Reports Core Web Vitals
  in production when Speed Insights is enabled on the Vercel project.

---

## Adding to the page — quick rules

1. Edit About copy → change `content/about.md` (links + `**highlights**`).
2. Edit contact copy → change `content/explanations/say-hi.md`.
3. Edit Privacy copy → change `content/privacy.md`.
4. New project → add it to the project sentence in `content/about.md`.
5. New content route → wrap in `SiteShell` and keep prose ≤~34rem.
6. New styles → write plain CSS in `app/globals.css`, using the color tokens.
7. Do **not** add display type, cards, pink/cream accents, or icon-heavy chrome
   on the content routes.
8. Keep it light-only; honor `prefers-reduced-motion`.
9. New explanation → add `content/explanations/my-slug.md` with an `# Heading`,
    then link to `/explanations/my-slug` with normal Markdown. Restart `pnpm dev`
    after adding or renaming a file.
