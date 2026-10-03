import About from "@/content/about.md";
import { SignatureHeading } from "./components/SignatureHeading";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <SignatureHeading />

        <div className="prose homeIntro">
          <About />
        </div>

        <nav className="extLinks" aria-label="Contact and profiles">
          <a href="mailto:mholandez@uwaterloo.ca">Email</a>
          <a
            href="https://github.com/matthewholandez"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mholandez"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>

      </main>
    </SiteShell>
  );
}
