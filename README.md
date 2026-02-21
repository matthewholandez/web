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

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com/).

1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Deploy.
