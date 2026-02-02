import Link from "next/link";
import { getPublishedPosts } from "@/lib/notion";

export default async function BlogIndex() {
    const posts = await getPublishedPosts();

    return (
        <main className="max-w-[700px] mx-auto py-16 px-8">
            <nav className="flex gap-6 mb-8 font-sans text-sm uppercase tracking-wider">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
            </nav>

            <header className="mb-16">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
            </header>

            <section>
                <ul className="list-none p-0">
                    {posts.map((post) => (
                        <li key={post.id} className="mb-12">
                            <Link href={`/blog/${post.slug}`} className="block hover:opacity-70 transition-opacity">
                                <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
                                <p className="text-sm text-foreground/60 mb-2">
                                    {post.date}
                                </p>
                                <p className="opacity-80">{post.excerpt}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
