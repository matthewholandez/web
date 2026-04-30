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
      pinned: frontmatter.pinned === true || frontmatter.pinned === "true",
    };
  });

  // Sort by date descending, but keep pinned posts at the top
  postList.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main className="max-w-xl mx-auto py-16 px-6 text-sm">
      <header className="mb-12">
        <Link to="/" className="text-foreground/50 hover:text-foreground transition-colors mb-4 inline-block">
          &larr; Home
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
                <div className="flex items-center gap-2">
                  <span className="font-medium group-hover:text-foreground/80 transition-colors">{post.title}</span>
                  {post.pinned && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40">
                      <line x1="12" y1="17" x2="12" y2="22"></line>
                      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.6V6h3V2h-3"></path>
                      <path d="M9 2H6v4h3v4.6a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17"></path>
                    </svg>
                  )}
                </div>
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
