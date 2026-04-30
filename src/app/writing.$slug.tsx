import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/writing/$slug")({
  component: Post,
});

// Import all mdx files
const posts = import.meta.glob("../content/*.mdx", { eager: true });

function Post() {
  const { slug } = Route.useParams();
  
  // Find the post matching the slug
  const postEntry = Object.entries(posts).find(([path]) => {
    return path.endsWith(`/${slug}.mdx`);
  });

  if (!postEntry) {
    throw notFound();
  }

  const [_, module]: [string, any] = postEntry;
  const frontmatter = module.frontmatter || {};
  const PostComponent = module.default;

  return (
    <main className="max-w-xl mx-auto py-16 px-6 text-sm">
      <Link to="/writing" className="text-foreground/50 hover:text-foreground transition-colors mb-8 inline-block">
        &larr; Back to writing
      </Link>
      
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{frontmatter.title}</h1>
        {frontmatter.date && (
          <p className="text-foreground/50 mt-2 text-xs">{frontmatter.date}</p>
        )}
      </header>

      <article className="prose prose-sm max-w-none">
        <PostComponent />
      </article>
    </main>
  );
}
