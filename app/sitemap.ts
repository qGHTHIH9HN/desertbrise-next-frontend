import type { MetadataRoute } from "next";
import { getBlog, getPages, getServices } from "@/lib/api";

const SITE_URL = "https://desertbrise-travel.com";

function cleanUrl(path: string) {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function servicePath(item: any) {
  if (item.url) return cleanUrl(item.url);

  const type = String(item.type || item.category || item.url_base || "").toLowerCase();
  const slug = item.slug || "";

  if (type.includes("trek")) return cleanUrl(`/trek/${slug}`);
  if (type.includes("day")) return cleanUrl(`/daytrip/${slug}`);

  return cleanUrl(`/tour/${slug}`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tours`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/trip-match`, lastModified: now, changeFrequency: "weekly", priority: 0.93 },
    { url: `${SITE_URL}/private-morocco-tours`, lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${SITE_URL}/sahara-desert-tours`, lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${SITE_URL}/morocco-family-tours`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/luxury-morocco-tours`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/morocco-trekking-tours`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/morocco-retreat-travel`, lastModified: now, changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/morocco-travel-planner`, lastModified: now, changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/why-travel-with-us`, lastModified: now, changeFrequency: "monthly", priority: 0.86 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.84 },
    { url: `${SITE_URL}/thank-you`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/travel-styles`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const results = await Promise.allSettled([
    getServices({ per_page: 200 }),
    getBlog({ per_page: 200 }),
    getPages({ type: "hub", per_page: 200 }),
    getPages({ type: "style", per_page: 200 }),
  ]);

  const services = results[0].status === "fulfilled" ? results[0].value.items || [] : [];
  const posts = results[1].status === "fulfilled" ? results[1].value.items || [] : [];
  const destinations = results[2].status === "fulfilled" ? results[2].value.items || [] : [];
  const styles = results[3].status === "fulfilled" ? results[3].value.items || [] : [];

  const servicePages: MetadataRoute.Sitemap = services
    .filter((item: any) => item?.slug || item?.url)
    .map((item: any) => ({
      url: servicePath(item),
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "weekly",
      priority: 0.92,
    }));

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((item: any) => item?.slug)
    .map((item: any) => ({
      url: cleanUrl(`/blog/${item.slug}`),
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly",
      priority: 0.72,
    }));

  const destinationPages: MetadataRoute.Sitemap = destinations
    .filter((item: any) => item?.slug)
    .map((item: any) => ({
      url: cleanUrl(`/destinations/${item.slug}`),
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly",
      priority: 0.82,
    }));

  const stylePages: MetadataRoute.Sitemap = styles
    .filter((item: any) => item?.slug)
    .map((item: any) => ({
      url: cleanUrl(`/travel-styles/${item.slug}`),
      lastModified: item.updated_at ? new Date(item.updated_at) : now,
      changeFrequency: "monthly",
      priority: 0.82,
    }));

  return [...staticPages, ...servicePages, ...blogPages, ...destinationPages, ...stylePages];
}
