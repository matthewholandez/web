# Personal Website with Notion-Powered Blog

This is a personal portfolio and blog website built with [Next.js 16](https://nextjs.org/), using [Notion](https://www.notion.so/) as a CMS.

## Features

- **Next.js 16**: App Router, Server Components, and Server Actions.
- **Notion as CMS**: Manage blog posts directly in Notion.
- **Markdown Rendering**: Blog content is converted from Notion blocks to Markdown and rendered using `react-markdown`.
- **TypeScript**: Fully typed codebase.

## Prerequisites

- Node.js 18+ installed.
- A Notion account.

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

### 3. Configure Notion

To use Notion as your CMS, you need to set up an integration and a database.
**The Blog page will throw an error unless the `NOTION_API_KEY` and `NOTION_DATABASE_ID` are provided.** See below for details.

#### A. Create a Notion Integration
1. Go to [Notion My Integrations](https://www.notion.so/my-integrations).
2. Click **New integration**.
3. Name it (e.g., "My Blog").
4. Select the workspace where your database will live.
5. Submit and copy the **Internal Integration Secret** (this is your `NOTION_API_KEY`).

#### B. Create the Database
1. Create a new Database in Notion.
2. Add the following properties (names must match exactly):
   - **Name** (Title): The title of the post.
   - **Slug** (Text): The URL slug for the post (e.g., `my-first-post`).
   - **Date** (Date): The publication date.
   - **Status** (Status or Select): Must have a generic "Published" option.
   - **Excerpt** (Text): A short summary of the post.
3. Add a sample post, set the Status to "Published", and fill in the other fields.

#### C. Connect Integration to Database
1. Open your database page.
2. Click the `...` menu in the top right corner.
3. Click **Connect to** (or "Add connections").
4. Search for and select the integration you created in step A.

#### D. Get the Database ID
1. Copy the link to your database view.
2. The ID is the 32-character string between the workspace name and the `?`.
   - Example URL: `https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...`
   - Database ID: `a8aec43384f447ed84390e8e42c2e089`

### 4. Environment Variables

Create a `.env.local` file in the root of the project and add your Notion credentials:

```bash
NOTION_API_KEY=secret_your_integration_secret_here
NOTION_DATABASE_ID=your_database_id_here
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `page.tsx`: Home page.
  - `blog/page.tsx`: Blog index page.
  - `blog/[slug]/page.tsx`: Individual blog post page.
- `lib/notion.ts`: Notion API client and data fetching logic.
- `public/`: Static assets.

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com/).

1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Add the `NOTION_API_KEY` and `NOTION_DATABASE_ID` environment variables in the Vercel project settings.
4. Deploy.