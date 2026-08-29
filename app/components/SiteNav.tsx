import Link from "next/link";
import { NOW_PUBLISHED } from "../now/published";

const links = [
  { href: "/", label: "About" },
  { href: "/now", label: "Now", hidden: !NOW_PUBLISHED },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav({ activeHref }: { activeHref?: string }) {
  return (
    <nav aria-label="Primary">
      <ul className="siteNav__list">
        {links
          .filter((link) => !("hidden" in link && link.hidden))
          .map((link) => {
            const active = link.href === activeHref;

            return (
              <li key={link.href}>
                <Link
                  className={
                    active
                      ? "siteNav__link siteNav__link--active"
                      : "siteNav__link"
                  }
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
