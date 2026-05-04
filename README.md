<div align="center">
    <img src="apps/home/public/android-chrome-192x192.png"
        alt="mholandez" width="100" />
    <h1>mholandez.com</h1>
    <a href="https://mholandez.com">
      Matthew's personal website
    </a>
</div>

## Structure

- **Homepage** located in `apps/home`, a Next.js application
- **Blog** located in `apps/blog`, built with Jekyll

Both are hosted on [Vercel](https://vercel.com/).

## Start

```bash
npm run dev

# Or, to start only the homepage
npm run dev:home

# Or, to start only the blog
npm run dev:blog
```

## Deploy

Deployment is made simple with Vercel's monorepo support.
Install the [Vercel CLI](https://vercel.com/docs/cli) first.

```bash
vercel link --repo

vercel
```

## Acknowledgements

Homepage design inspired by (in no particular order):
- [no-10.jp](https://www.no-10.jp/en/)
- [howmuch.tax](https://www.howmuch.tax/)
- the GoodNotes dotted paper background

Development was assisted by OpenCode, an agentic AI tool, running the Google Gemini 3.1 Pro model.

## License
[MIT](LICENSE)