import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

function SmartLink({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  const url = typeof href === "string" ? href : undefined;
  const external = !!url && /^https?:\/\//.test(url);

  if (external) {
    return (
      <a
        href={url}
        className="mark"
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        <span className="extArrow" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  if (url && (url.startsWith("/") || url.startsWith("#"))) {
    return (
      <Link href={url} className="mark" {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={url} className="mark" {...rest}>
      {children}
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
    <p className="md-p">{children}</p>
  ),
  a: SmartLink,
  ul: ({ children }: ComponentPropsWithoutRef<"ul">) => (
    <ul className="now-list">{children}</ul>
  ),
  ol: ({ children }: ComponentPropsWithoutRef<"ol">) => (
    <ol className="now-list">{children}</ol>
  ),
  li: ({ children }: ComponentPropsWithoutRef<"li">) => <li>{children}</li>,
  // **bold** → sage mark highlight (easy emphasis in markdown)
  strong: ({ children }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="mark">{children}</strong>
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
