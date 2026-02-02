import { Section } from "@/components/ui/section";
import { Card, CardLink } from "@/components/ui/card";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { siteConfig, workItems, projects, socialLinks } from "@/lib/data";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto py-16 px-6 text-sm">
      <header className="mb-12">
        <h1 className="text-sm font-medium uppercase tracking-widest">
          {siteConfig.name}
        </h1>
        <p className="text-sm text-foreground/50">{siteConfig.description}</p>
        <hr className="mt-4 border-foreground/5" />
      </header>

      <Section title="Work.">
        <div className="space-y-2">
          {workItems.map((item) => (
            <Card key={item.title}>
              <p className="font-medium">{item.title}</p>
              <p className="text-foreground/50">{item.company}, <span className="">{item.dates}</span></p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Projects.">
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
      </Section>

      <Section title="Contact." className="">
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((link) => (
            <CardLink key={link.name} href={link.href} className="flex items-center gap-2">
              {link.icon === "github" && (
                <GitHubIcon className="group-hover:fill-white" />
              )}
              {link.icon === "linkedin" && (
                <LinkedInIcon className="group-hover:fill-white" />
              )}
              <span className="group-hover:text-white">{link.name}</span>
            </CardLink>
          ))}
        </div>
      </Section>

      <footer className="mt-12">
        <hr className="border-foreground/5" />
        <p className="mt-4 text-xs text-foreground/50">Feb 2026</p>
      </footer>
    </main>
  );
}
