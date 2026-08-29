import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import {
  explanationLoaders,
  type ExplanationSlug,
} from "../generated/explanation-loaders";

const explanationsDirectory = path.join(
  process.cwd(),
  "content",
  "explanations",
);

const explanationSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ExplanationContentComponent = ComponentType<MDXProps>;

export async function getExplanationSlugs() {
  return Object.keys(explanationLoaders) as ExplanationSlug[];
}

export async function getExplanationTitle(slug: string) {
  if (!explanationSlugPattern.test(slug)) {
    return null;
  }

  const source = await readFile(
    path.join(explanationsDirectory, `${slug}.md`),
    "utf8",
  );
  const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (!title) {
    throw new Error(
      `Explanation "${slug}" must begin with a level-one Markdown heading.`,
    );
  }

  return title;
}

export async function loadExplanation(slug: string) {
  if (!explanationSlugPattern.test(slug)) {
    return null;
  }

  if (!(slug in explanationLoaders)) {
    return null;
  }

  const loader = explanationLoaders[slug as ExplanationSlug];
  const { default: Content } = await loader();

  return Content as ExplanationContentComponent;
}
