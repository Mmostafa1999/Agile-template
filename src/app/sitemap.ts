import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://next-app-i18n-starter.vercel.app";
  const lastModified = new Date();

  // Get locales from i18n config
  const locales = routing.locales;

  // Define all routes that should be included in the sitemap
  const routes = [
    "",
    "/signin",
    "/signup",
    "/profile"
  ];

  // Generate sitemap entries
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "yearly",
      priority: 1,
    }
  ];

  // Add localized routes
  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Add other localized routes
    for (const route of routes) {
      if (route === "") continue; // Skip empty route as it's already covered
      
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
