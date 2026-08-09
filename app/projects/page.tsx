import type { Metadata } from "next";
import { ExternalLink } from "../components/ExternalLink";
import { SiteShell } from "../components/SiteShell";
import { projects } from "../projects-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by Matthew Holandez.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects · Matthew Holandez",
    description: "Selected projects by Matthew Holandez.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <main className="page">
        <h1 className="srOnly">Projects</h1>

        <div className="prose">
          <p>
            A short list of things I&apos;ve built — tools, translations, and
            visualizations. Most of them live on GitHub.
          </p>
        </div>

        <ul className="projectList">
          {projects.map((project) => (
            <li className="projectList__item" key={project.name}>
              <ExternalLink mark href={project.href}>
                {project.name}
              </ExternalLink>
              <span className="projectList__desc">{project.description}</span>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  );
}
