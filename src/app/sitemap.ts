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

  return entries;
}
