"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/now", label: "Now" },
  { href: "/projects", label: "Projects" },
  { href: "mailto:mholandez@uwaterloo.ca", label: "Say Hi", external: true },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="siteNav" aria-label="Primary">
      <ul className="siteNav__list">
        {links.map((link) => {
          const active =
            !("external" in link && link.external) &&
            (link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`));

          if ("external" in link && link.external) {
            return (
              <li key={link.href}>
                <a className="siteNav__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            );
          }

          return (
            <li key={link.href}>
              <Link
                className={
                  active ? "siteNav__link siteNav__link--active" : "siteNav__link"
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
