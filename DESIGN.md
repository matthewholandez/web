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
- `/` is the only content route. `content/about.md` is the only authored content
  Markdown file. `mdx-components.tsx` preserves Markdown formatting and link handling.

## Color

The `:root` tokens in `app/globals.css` are the single palette. The site uses
`color-scheme: light` and a solid background.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#fafafa` | Background, manifest, browser theme, Open Graph |
| `--ink` | `#171717` | Primary text and focus rings |
| `--muted` | `#666666` | Secondary text and quiet links |
| `--mark` | `#ebebeb` | Markdown links and bold emphasis |
| `--mark-hover` | `#dedede` | Markdown emphasis on hover |

Keep new colors neutral. Do not add accent colors, gradients, cards, or shadows.

## Typography and layout

- Neue Montreal Regular, 16px, line-height `1.7`, letter-spacing `-0.005em`.
  Hierarchy comes from spacing and text value rather than bold or display type.
- The centered `.shell` is `38rem` wide above `960px` and full width below. It adds `2rem` of side
  padding, leaving a `34rem` content measure. Desktop top padding is `6.5rem`;
  at `720px` and below it becomes `2.25rem` with `1.35rem` side padding.
- The homepage starts with the handwritten `Matthew` signature at 32px tall,
  in the H1 position. If the image cannot load, it becomes plain `Matthew`
  text. The heading's accessible name is `Matthew Holandez`.
- Two short paragraphs begin `2.5rem` below the heading, separated by
  `1.9rem`, then a compact row of Email, GitHub, and LinkedIn links.
- No full-name text heading, hero, project cards, primary navigation, or
  inline links appear on the homepage.

## Markdown rendering

- `@next/mdx` compiles `content/about.md` through the `.md` extension configured
  in `next.config.ts`. Keep the required root `mdx-components.tsx` and `mdx.d.ts`.
- Paragraphs render inside `.prose`. The renderer supports headings, lists,
  emphasis, quotes, rules, and code through native HTML elements.
- Markdown links and bold text use neutral gray `.mark` backgrounds. HTTP links
  use `ExternalLink` with a small arrow suffix and open in a new tab. Internal
  paths and anchors use Next.js `Link`. Email links remain ordinary anchors.
- Homepage contact links are plain text without arrows or chips.

## Interaction and accessibility

- Links shift from `--muted` to `--ink` on hover. Markdown marks deepen on hover.
- All links and buttons retain a visible `2px solid var(--ink)` focus outline
  with `3px` offset. Use semantic headings, links, main content, and nav labels.
- The main column rises and fades in on load (`0.55s`).
  `prefers-reduced-motion: reduce` disables this animation and link transitions.
- External HTTP links open in a new tab with `rel="noopener noreferrer"`.

## Assets and metadata

- Existing favicons and app icons are monochrome and remain in `public/`.
- The web manifest, viewport theme color, and generated Open Graph image use
  `#fafafa`. Open Graph text uses `--ink` and `--muted` values.
- `public/signature.png` is the monochrome handwritten heading. The client
  `SignatureHeading` component swaps in text on image failure.
- Vercel Web Analytics and Speed Insights remain in the root layout. The
  sitemap lists only `/`.

## Editing rules

1. Keep homepage copy in `content/about.md` to a few plain paragraphs.
2. Keep the homepage's link row small and purposeful.
3. Use the existing tokens and Neue Montreal for all visible routes.
4. Update this file whenever color, type, layout, component, motion, or brand
   assets change.
