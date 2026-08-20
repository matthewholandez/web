import type { MetadataRoute } from "next";
import { NOW_PUBLISHED } from "./now/published";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mholandez.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(NOW_PUBLISHED
      ? [
          {
            url: "https://mholandez.com/now",
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
        ]
      : []),
    {
      url: "https://mholandez.com/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mholandez.com/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://mholandez.com/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
