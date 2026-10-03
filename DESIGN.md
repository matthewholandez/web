# Design System

**mholandez.com** is a quiet, light-only personal calling card. A narrow text
column and generous empty space carry the design. It borrows the restraint of
simple personal sites while keeping this site's Neue Montreal typeface. All
colors are neutral; there is no green or decorative background wash.

## Stack and content

- Next.js 16 App Router, React 19, and hand-written CSS in `app/globals.css`.
- Neue Montreal Regular is loaded from `app/fonts/` with `next/font/local`.
- Homepage copy lives in `content/about.md` and is rendered through MDX. Keep it
  short and use plain prose. The homepage's contact links are in `app/page.tsx`.
- Privacy and existing explanation pages remain as direct, shareable routes.
  Their content lives in `content/privacy.md` and `content/explanations/*.md`.
  Explanations are no longer promoted from the homepage. The intercepted
  explanation panel remains available for existing internal links.

## Color

The `:root` tokens in `app/globals.css` are the single palette. The site uses
`color-scheme: light` and a solid background.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#fafafa` | Background, manifest, browser theme, Open Graph |
| `--ink` | `#171717` | Primary text and focus rings |
| `--muted` | `#666666` | Secondary text and quiet links |
| `--mark` | `#ebebeb` | Legacy explanation emphasis |
| `--mark-hover` | `#dedede` | Legacy explanation emphasis on hover |
| `--faint` | `#dddddd` | Explanation separators |

Keep new colors neutral. Do not add accent colors, gradients, cards, or shadows.

## Typography and layout

- Neue Montreal Regular, 16px, line-height `1.7`, letter-spacing `-0.005em`.
  Hierarchy comes from spacing and text value rather than bold or display type.
- The resting `explanationStage` is `38rem` wide. `.shell` adds `2rem` of side
  padding, leaving a `34rem` content measure. Desktop top padding is `6.5rem`;
  at `720px` and below it becomes `2.25rem` with `1.35rem` side padding.
- The homepage starts with the handwritten `Matthew` signature at 32px tall,
  in the H1 position. If the image cannot load, it becomes plain `Matthew`
  text. The heading's accessible name is `Matthew Holandez`.
- Two short paragraphs begin `2.5rem` below the heading, separated by
  `1.9rem`, then a compact row of Email, GitHub, and LinkedIn links.
- A subdued privacy footer follows the content. Inner routes add a home link.
- No full-name text heading, hero, project cards, primary navigation, or
  inline links appear on the homepage.

## Existing content routes

- The explanation stage still expands to two columns on wide screens, with a
  faint vertical rule beside the panel. At `960px` and below, the explanation
  becomes a full-width sheet. The sheet uses the same solid `--paper` color.
- Legacy MDX links and headings use neutral gray `.mark` backgrounds. Outbound
  links elsewhere retain a small ↗ suffix. Homepage contact links are plain
  text without arrows or chips.
- `/contact` continues to redirect to `/explanations/say-hi`. The direct
  explanation routes preserve old links while the homepage stays concise.
- `scripts/generate-explanations.mjs` generates the loader map before dev and
  build. Do not edit `app/generated/explanation-loaders.ts` directly.

## Interaction and accessibility

- Links shift from `--muted` to `--ink` on hover. Legacy marks deepen on hover.
- All links and buttons retain a visible `2px solid var(--ink)` focus outline
  with `3px` offset. Use semantic headings, links, main content, and nav labels.
- The main column rises and fades in on load (`0.55s`). Explanation open/close
  movement lasts `320ms`; Escape and browser history retain the same behavior.
  `prefers-reduced-motion: reduce` disables these animations and transitions.
- External HTTP links open in a new tab with `rel="noopener noreferrer"`.

## Assets and metadata

- Existing favicons and app icons are monochrome and remain in `public/`.
- The web manifest, viewport theme color, and generated Open Graph image use
  `#fafafa`. Open Graph text uses `--ink` and `--muted` values.
- `public/signature.png` is the monochrome handwritten heading. The client
  `SignatureHeading` component swaps in text on image failure.
- Vercel Web Analytics and Speed Insights remain in the root layout. The
  sitemap lists `/` and `/privacy`.

## Editing rules

1. Keep homepage copy in `content/about.md` to a few plain paragraphs.
2. Keep the homepage's link row small and purposeful.
3. Use the existing tokens and Neue Montreal for all visible routes.
4. Update this file whenever color, type, layout, component, motion, or brand
   assets change.
