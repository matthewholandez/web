import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function ExternalAwareLink({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className="mark"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...rest}
    >
      {children}
      {external ? (
        <span className="extArrow" aria-hidden="true">
          ↗
        </span>
      ) : null}
    </a>
  );
}

const components = {
  h1: ({ children }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="now-heading">{children}</h1>
  ),
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="now-heading">{children}</h2>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="now-heading">{children}</h3>
  ),
  p: ({ children }: ComponentPropsWithoutRef<"p">) => (
    <p className="now-p">{children}</p>
  ),
  a: ExternalAwareLink,
  ul: ({ children }: ComponentPropsWithoutRef<"ul">) => (
    <ul className="now-list">{children}</ul>
  ),
  ol: ({ children }: ComponentPropsWithoutRef<"ol">) => (
    <ol className="now-list">{children}</ol>
  ),
  li: ({ children }: ComponentPropsWithoutRef<"li">) => <li>{children}</li>,
  strong: ({ children }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="now-strong">{children}</strong>
  ),
  em: ({ children }: ComponentPropsWithoutRef<"em">) => <em>{children}</em>,
  hr: () => <hr className="now-hr" />,
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="now-quote">{children}</blockquote>
  ),
  code: ({ children }: ComponentPropsWithoutRef<"code">) => (
    <code className="now-code">{children}</code>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
