# mholandez.com

Personal site for Matthew Holandez — Next.js 16 (App Router), plain CSS, MDX.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

| Route | Source |
| --- | --- |
| `/` | `content/about.md` |

`content/about.md` is the only content Markdown file. `@next/mdx` compiles it,
and `mdx-components.tsx` maps Markdown elements to React components. Contact
links live in `app/page.tsx`.

Design system: `DESIGN.md`.
