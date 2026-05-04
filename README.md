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