import Link from "next/link";
import { getPostBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="container">
            <nav className="nav">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
            </nav>

            <article>
                <header className="header">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
                    <p style={{ fontSize: '1rem', color: 'var(--foreground)', opacity: 0.6 }}>
                        {post.date}
                    </p>
                </header>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }} className="markdown-content">
                    <ReactMarkdown>{post.content || ""}</ReactMarkdown>
                </div>
            </article>
        </main>
    );
}
