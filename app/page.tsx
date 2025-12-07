import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
      </nav>

      <header className="header">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Matthew Holandez</h1>
        <p style={{
          fontSize: '1.2rem', color: 'var(--foreground)', opacity: 0.8,
          // fontStyle: 'italic' 
        }}>
          Systems Design Engineering at the University of Waterloo
        </p>
      </header>

      <section style={{ maxWidth: '600px' }}>
        <p>
          I love all things data.
        </p>

        <div style={{ marginTop: '4rem' }}>
          <h3>Connect with me</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1.5rem' }}>
            <li><a href="https://github.com/matthewholandez" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://linkedin.com/in/matthewholandez" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
