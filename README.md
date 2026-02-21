# Personal Website

A personal portfolio website built with [TanStack Start](https://tanstack.com/start) and [Vite](https://vite.dev/).

## Features

- **TanStack Start**: Full-stack SSR framework built on TanStack Router.
- **TypeScript**: Fully typed codebase.
- **Tailwind CSS v4**: Utility-first styling.
- **React 19**: Latest React with server-side rendering.

## Prerequisites

- Node.js 18+ installed.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/matthewholandez/web.git
cd web
```

### 2. Install dependencies

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Project Structure

- `src/app/`: TanStack Router routes and layouts.
  - `__root.tsx`: Root layout.
  - `index.tsx`: Home page route.
  - `globals.css`: Global styles.
- `src/components/`: Reusable UI components.
- `src/lib/`: Data and utilities.
- `public/`: Static assets.
- `vite.config.ts`: Vite and TanStack Start configuration.

## Deployment (Cloudflare Workers)

Follow the Cloudflare guide for TanStack Start: https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/

### 1. Install Cloudflare tooling

```bash
npm i @cloudflare/vite-plugin wrangler -- -D
```

### 2. Update Vite config

Add the Cloudflare plugin before TanStack Start:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    react(),
  ],
});
```

### 3. Add Wrangler config

Create `wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "<YOUR_PROJECT_NAME>",
  "compatibility_date": "2026-02-21",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "observability": { "enabled": true }
}
```

### 4. Update package scripts

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

### 5. Deploy

```bash
npm run deploy
```

Preview the production build locally:

```bash
npm run preview
```
