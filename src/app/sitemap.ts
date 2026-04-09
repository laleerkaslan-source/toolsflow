import type { MetadataRoute } from "next";
import { SITE_URL, TOOLS } from "@/lib/constants";

// Tool ID → Turkish slug mapping (must match routing.ts)
const TOOL_TR_SLUGS: Record<string, string> = {
  "qr-code-generator": "qr-kod-olusturucu",
  "bmi-calculator": "vki-hesaplayici",
  "image-compressor": "resim-sikistirma",
  "currency-converter": "doviz-cevirici",
  "salary-calculator": "maas-hesaplayici",
  "loan-calculator": "kredi-hesaplayici",
  "vat-calculator": "kdv-hesaplayici",
  "severance-calculator": "kidem-tazminati-hesaplayici",
  "investment-calculator": "yatirim-hesaplayici",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { en: "", tr: "", priority: 1 },
    { en: "/en/tools", tr: "/araclar", priority: 0.9 },
    { en: "/en/ai-guide", tr: "/ai-rehber", priority: 0.8 },
    { en: "/en/about", tr: "/hakkimizda", priority: 0.5 },
    { en: "/en/contact", tr: "/iletisim", priority: 0.5 },
    { en: "/en/privacy", tr: "/gizlilik-politikasi", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.tr}`,
      lastModified: new Date(),
      changeFrequency: page.priority >= 0.8 ? "weekly" : "monthly",
      priority: page.priority,
      alternates: {
        languages: {
          tr: `${SITE_URL}${page.tr}`,
          en: `${SITE_URL}${page.en}`,
        },
      },
    });
  }

  // Tool pages — automatically from TOOLS array
  for (const tool of TOOLS) {
    const trSlug = TOOL_TR_SLUGS[tool.id];
    if (!trSlug) continue;

    entries.push({
      url: `${SITE_URL}/araclar/${trSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: tool.category === "finance" ? 0.9 : 0.8,
      alternates: {
        languages: {
          tr: `${SITE_URL}/araclar/${trSlug}`,
          en: `${SITE_URL}/en/tools/${tool.id}`,
        },
      },
    });
  }

  // Blog posts
  const blogPosts = [
    "brut-net-maas-hesaplama-2026",
    "kdv-oranlari-2026",
    "kidem-tazminati-hesaplama-2026",
  ];

  // Blog listing page
  entries.push({
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        tr: `${SITE_URL}/blog`,
        en: `${SITE_URL}/en/blog`,
      },
    },
  });

  for (const slug of blogPosts) {
    entries.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${SITE_URL}/blog/${slug}`,
          en: `${SITE_URL}/en/blog/${slug}`,
        },
      },
    });
  }

  return entries;
}
