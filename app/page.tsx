import Image from "next/image";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./brand-icons";

const phrases = [
  "a Waterloo student",
  "a shawarma enjoyer",
  "a web novel reader",
  "a cat lover",
  "MattGPT",
];

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
      <Image
        className="signature"
        src="/signature.png"
        alt="Matthew Holandez signature"
        width={2400}
        height={400}
        priority
      />
      <h1 className="hero">
        <span aria-hidden="true">
          I am{" "}
          <span className="reel">
            <span className="reelSizer">
              {phrases.map((phrase) => (
                <span key={phrase}>{phrase}</span>
              ))}
            </span>
            <span className="reelTrack">
              {[...phrases, phrases[0]].map((phrase, i) => (
                <span key={i}>{phrase}</span>
              ))}
            </span>
          </span>
        </span>
        <span className="srOnly">I am a Waterloo student.</span>
      </h1>

      <div className="infoLines">
        <a
          className="infoLine"
          href="https://uwaterloo.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="infoIcon"
            src="/waterloo.svg"
            alt="University of Waterloo"
            width={20}
            height={20}
          />
          <span className="infoLineText">
            Systems Design Engineering at UWaterloo
          </span>
        </a>
        <a
          className="infoLine"
          href="https://deepcode.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="infoIcon"
            src="/deepcode.jpeg"
            alt="DeepCode"
            width={20}
            height={20}
          />
          <span className="infoLineText">
            Former Cyber Intelligence Dev Intern at DeepCode
          </span>
        </a>
      </div>

      <div className="projects">
        {projects.map((project) => (
          <div className="project" key={project.name}>
            <a
              className="projectName"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
            <span className="projectDesc">{project.description}</span>
          </div>
        ))}
      </div>

      <div className="contact">
        <a
          className="contactIcon"
          href="mailto:mholandez@uwaterloo.ca"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        <a
          className="contactIcon"
          href="https://github.com/matthewholandez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          className="contactIcon"
          href="https://linkedin.com/in/mholandez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </main>
  );
}
