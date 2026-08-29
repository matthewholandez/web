import Image from "next/image";
import About from "@/content/about.md";
import { ExternalLink } from "./components/ExternalLink";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell activeHref="/">
      <main>
        <h1 className="srOnly">Matthew Holandez</h1>

        <div className="prose">
          <About />
        </div>

        <div className="extLinks">
          <ExternalLink href="https://github.com/matthewholandez">
            GitHub
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/in/mholandez">
            LinkedIn
          </ExternalLink>
        </div>

        <Image
          className="signature"
          src="/signature.png"
          alt="Matthew Holandez signature"
          width={2400}
          height={400}
        />
      </main>
    </SiteShell>
  );
}
