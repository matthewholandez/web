import type { MetadataRoute } from "next";
import { NOW_PUBLISHED } from "./now/published";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(NOW_PUBLISHED ? {} : { disallow: "/now" }),
    },
    sitemap: "https://mholandez.com/sitemap.xml",
  };
}
