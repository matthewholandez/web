import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./brand-icons";

const projects = [
  {
    name: "Intelligo",
    description: "AI web novel translator",
    href: "https://github.com/matthewholandez/intelligo",
  },
  {
    name: "Wat Course",
    description: "academic advisor for UW students",
    href: "https://github.com/matthewholandez/wat-course",
  },
  {
    name: "AllOfOurVotes",
    description: "UN voting data visualizations",
    href: "https://allofourvotes.org",
  },
  {
    name: "Showdown",
    description: "LLM eval harness",
    href: "https://github.com/matthewholandez/showdown",
  },
];

export default function Home() {
  return (
    <main className="page">
      <h1 className="name">Matthew Holandez</h1>
      <p className="tagline">Systems Design Engineering @ UWaterloo</p>
      <p className="tagline">
        Prev @{" "}
        <a href="https://deepcode.ca" target="_blank" rel="noopener noreferrer">
          DeepCode
        </a>
      </p>

      <div className="projects">
        {projects.map((project) => (
          <p className="project" key={project.name}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
            <span className="projectDesc">{project.description}</span>
          </p>
        ))}
      </div>

      <div className="pageLinks">
        <Link className="timeLink" href="/now">
          Now <span aria-hidden="true">→</span>
        </Link>
        <Link className="timeLink" href="/time">
          Time remaining <span aria-hidden="true">→</span>
        </Link>
      </div>

      <nav className="contact" aria-label="Contact links">
        <a
          className="contactIcon"
          href="mailto:mholandez@uwaterloo.ca"
          aria-label="Email"
        >
          <Mail size={18} strokeWidth={1.75} />
        </a>
        <a
          className="contactIcon"
          href="https://github.com/matthewholandez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          className="contactIcon"
          href="https://linkedin.com/in/mholandez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      </nav>

      <Image
        className="signature"
        src="/signature.png"
        alt="Matthew Holandez signature"
        width={2400}
        height={400}
      />
    </main>
  );
}
