import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/writing/")({
  component: Writing,
});

// Use import.meta.glob to load all mdx files in the content directory
const posts = import.meta.glob("../content/*.mdx", { eager: true });

function Writing() {
  // Parse the modules to extract slug and frontmatter
  const postList = Object.entries(posts).map(([path, module]: [string, any]) => {
    // extract slug from filename, e.g., "../content/hello-world.mdx" -> "hello-world"
    const slug = path.split("/").pop()?.replace(".mdx", "") || "";
    const frontmatter = module.frontmatter || {};
    return {
      slug,
      title: frontmatter.title || "Untitled",
      date: frontmatter.date || "",
    };
  });

  // Sort by date descending
  postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="max-w-xl mx-auto py-16 px-6 text-sm">
      <header className="mb-12">
        <Link to="/" className="text-foreground/50 hover:text-foreground transition-colors mb-4 inline-block">
          &larr; Back home
        </Link>
        <h1 className="text-2xl font-bold">Writing</h1>
      </header>
      
      <ul className="space-y-4">
        {postList.map((post) => (
          <li key={post.slug}>
            <Link 
              to={`/writing/$slug`} 
              params={{ slug: post.slug }}
              className="group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium group-hover:text-foreground/80 transition-colors">{post.title}</span>
                <span className="text-foreground/50 text-xs">{post.date}</span>
              </div>
            </Link>
          </li>
        ))}
        {postList.length === 0 && (
          <p className="text-foreground/50 italic">No posts yet.</p>
        )}
      </ul>
    </main>
  );
}
