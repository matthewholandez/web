import Link from "next/link";
import { getPublishedPosts } from "@/lib/notion";

export default async function BlogIndex() {
    const posts = await getPublishedPosts();

    return (
        <main className="container">
            <nav className="nav">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
            </nav>

            <header className="header">
                <h1>Blog</h1>
            </header>

            <section>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {posts.map((post) => (
                        <li key={post.id} style={{ marginBottom: '3rem' }}>
                            <Link href={`/blog/${post.slug}`} style={{ display: 'block' }}>
                                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{post.title}</h2>
                                <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', opacity: 0.6, marginBottom: '0.5rem' }}>
                                    {post.date}
                                </p>
                                <p style={{ opacity: 0.8 }}>{post.excerpt}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
