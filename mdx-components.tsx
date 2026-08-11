import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ExternalLink } from "./app/components/ExternalLink";

function SmartLink({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  const url = typeof href === "string" ? href : undefined;

  if (url && /^https?:\/\//.test(url)) {
    return (
      <ExternalLink href={url} mark>
        {children}
      </ExternalLink>
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
    <h1 className="md-heading">{children}</h1>
  ),
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="md-heading">{children}</h2>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="md-heading">{children}</h3>
  ),
  p: ({ children }: ComponentPropsWithoutRef<"p">) => (
    <p className="md-p">{children}</p>
  ),
  a: SmartLink,
  ul: ({ children }: ComponentPropsWithoutRef<"ul">) => (
    <ul className="md-list">{children}</ul>
  ),
  ol: ({ children }: ComponentPropsWithoutRef<"ol">) => (
    <ol className="md-list">{children}</ol>
  ),
  li: ({ children }: ComponentPropsWithoutRef<"li">) => <li>{children}</li>,
  strong: ({ children }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="mark">{children}</strong>
  ),
  em: ({ children }: ComponentPropsWithoutRef<"em">) => <em>{children}</em>,
  hr: () => <hr className="md-hr" />,
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="md-quote">{children}</blockquote>
  ),
  code: ({ children }: ComponentPropsWithoutRef<"code">) => (
    <code className="md-code">{children}</code>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
