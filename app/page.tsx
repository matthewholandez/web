import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto py-16 px-6 text-sm">
      <header className="mb-12">
        <h1 className="text-sm font-medium uppercase tracking-widest">Matthew Holandez</h1>
        <p className="text-sm text-foreground/50">Systems Design Engineering, University of Waterloo</p>
        <hr className="mt-4 border-foreground/5" />
      </header>

      {/* Currently Section */}
      <section className="mb-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50 mb-4">Work</h2>
        <div className="space-y-2">
          <div className="border border-foreground/5 px-4 py-4">
            <p className="font-medium">🌐 Cyber Intelligence Intern</p>
            <p className="text-foreground/50">DeepCode</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50 mb-4">Projects</h2>
        <div className="grid grid-cols-2 gap-3">
          <a href="https://github.com/matthewholandez" target="_blank" rel="noopener noreferrer" className="border border-foreground/5 px-4 py-4 hover:bg-foreground/5 transition-colors">
            <p className="font-medium">🗃️ Podcast Analytics</p>
            <p className="text-[12px] text-foreground/50">Exploratory data analysis</p>
          </a>
          <a href="https://github.com/matthewholandez" target="_blank" rel="noopener noreferrer" className="border border-foreground/5 px-4 py-4 hover:bg-foreground/5 transition-colors">
            <p className="font-medium">💬 Wat Course</p>
            <p className="text-[12px] text-foreground/50">UW course advisor chatbot</p>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50 mb-4">Contact</h2>
        <div className="grid grid-cols-2 gap-3">
          <a href="https://github.com/matthewholandez" target="_blank" rel="noopener noreferrer" className="border border-foreground/5 px-4 py-4 hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/matthewholandez" target="_blank" rel="noopener noreferrer" className="border border-foreground/5 px-4 py-4 hover:bg-foreground/5 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
