import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/section";
import { CardLink } from "@/components/ui/card";
import { GitHubIcon, LinkedInIcon, PenIcon, MailIcon } from "@/components/icons";
import {
  siteConfig,
  workItems,
  educationItems,
  projects,
  socialLinks,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="max-w-xl mx-auto py-16 px-6 text-sm">
      <header className="mb-12">
        <img
          src="/signature.png"
          alt={siteConfig.name}
          className="h-10 w-auto mix-blend-multiply"
        />
        {/* <p className="text-sm text-foreground/50">{siteConfig.description}</p> */}
        <hr className="mt-4 border-foreground/5" />
      </header>

      <Section title="Work.">
        <div className="space-y-2">
          {workItems.map((item) => (
            <CardLink key={item.title} href={item.href}>
              <p className="font-medium group-hover:text-white">
                {item.title}
              </p>
              <p className="text-foreground/50 group-hover:text-white/50">
                {item.company}, <span>{item.dates}</span>
              </p>
            </CardLink>
          ))}
        </div>
      </Section>

      <Section title="Education.">
        <div className="space-y-2">
          {educationItems.map((item) => (
            <CardLink key={item.title} href={item.href}>
              <p className="font-medium group-hover:text-white">
                {item.title}
              </p>
              <p className="text-foreground/50 group-hover:text-white/50">
                {item.company}, <span>{item.dates}</span>,{" "}
                <em>{item.gpa}</em>
              </p>
            </CardLink>
          ))}
        </div>
      </Section>

      {/* <Section title="Projects.">
        <div className="grid grid-cols-2 gap-3">
          {projects.map((project) => (
            <CardLink key={project.title} href={project.href}>
              <p className="font-medium group-hover:text-white">{project.title}</p>
              <p className="text-[12px] text-foreground/50 group-hover:text-white/50">
                {project.description}
              </p>
            </CardLink>
          ))}
        </div>
      </Section> */}

      <Section title="More of me." className="">
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((link) => (
            <CardLink
              key={link.name}
              href={link.href}
              className="flex items-center gap-2"
            >
              {link.icon === "github" && (
                <GitHubIcon className="group-hover:fill-white" />
              )}
              {link.icon === "linkedin" && (
                <LinkedInIcon className="group-hover:fill-white" />
              )}
              {link.icon === "writing" && (
                <PenIcon className="group-hover:stroke-white" />
              )}
              {link.icon === "email" && (
                <MailIcon className="group-hover:stroke-white" />
              )}
              <span className="group-hover:text-white">{link.name}</span>
            </CardLink>
          ))}
        </div>
      </Section>

      {/* <section className="mt-12 flex justify-center">
        <Link
          to="/writing"
          className="text-foreground/50 hover:text-white transition-colors p-2"
          aria-label="Writing"
        >
          <PenIcon className="w-5 h-5" />
        </Link>
      </section> */}

      <footer className="mt-12">
        <hr className="border-foreground/5" />
        <p className="mt-4 text-xs text-foreground/50">
          Apr 2026. See the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://howmuch.tax/"
            className="underline font-bold"
          >
            inspiration
          </a>{" "}
          behind this site.
        </p>
      </footer>
    </main>
  );
}
