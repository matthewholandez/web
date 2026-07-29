import fs from "fs";
import path from "path";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

/** ISO date taken from the filename: YYYY-MM-DD.md */
export type NowEntry = {
  slug: string;
  date: string;
  Content: ComponentType<MDXProps>;
};

const contentDir = path.join(process.cwd(), "content/now");
const DATE_FILE = /^(\d{4}-\d{2}-\d{2})\.md$/;

export async function getNowEntries(): Promise<NowEntry[]> {
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => DATE_FILE.test(file));

  const entries = await Promise.all(
    files.map(async (file) => {
      const match = file.match(DATE_FILE);
      const slug = match![1];
      const mod = await import(`@/content/now/${slug}.md`);
      return {
        slug,
        date: slug,
        Content: mod.default,
      };
    }),
  );

  // YYYY-MM-DD sorts correctly as plain strings.
  return entries.sort((a, b) => b.slug.localeCompare(a.slug));
}

export function formatNowDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
