import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "./components/ExternalLink";
import { SiteShell } from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <main className="page">
        <h1 className="srOnly">Matthew Holandez</h1>

        <div className="prose">
          <p>
            I&apos;m Matthew Holandez — I study{" "}
            <span className="mark">Systems Design Engineering</span> at the{" "}
            <ExternalLink mark href="https://uwaterloo.ca">
              University of Waterloo
            </ExternalLink>
            .
          </p>

          <p>
            Previously I was at{" "}
            <ExternalLink mark href="https://deepcode.ca">
              DeepCode
            </ExternalLink>
            . These days I&apos;m usually building something, reading about
            systems, or watching the{" "}
            <Link className="mark" href="/time">
              time remaining
            </Link>
            .
          </p>

          <p>
            A few{" "}
            <Link className="mark" href="/projects">
              projects
            </Link>{" "}
            I&apos;ve worked on:{" "}
            <ExternalLink mark href="https://github.com/matthewholandez/intelligo">
              Intelligo
            </ExternalLink>
            , an AI web novel translator;{" "}
            <ExternalLink
              mark
              href="https://github.com/matthewholandez/wat-course"
            >
              Wat Course
            </ExternalLink>
            , an academic advisor for UW students; and{" "}
            <ExternalLink mark href="https://allofourvotes.org">
              AllOfOurVotes
            </ExternalLink>
            , visualizations of UN voting data.
          </p>

          <p>
            For what I&apos;m up to right now, see my{" "}
            <Link className="mark" href="/now">
              now
            </Link>{" "}
            page — or just{" "}
            <a className="mark" href="mailto:mholandez@uwaterloo.ca">
              say hi
            </a>
            .
          </p>
        </div>

        <div className="extLinks">
          <ExternalLink href="https://github.com/matthewholandez">
            GitHub
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/in/mholandez">
            LinkedIn
          </ExternalLink>
          <a href="mailto:mholandez@uwaterloo.ca">
            Email
            <span className="extArrow" aria-hidden="true">
              ↗
            </span>
          </a>
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
