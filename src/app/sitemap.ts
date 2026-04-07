import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    "qr-code-generator",
    "bmi-calculator",
    "image-compressor",
    "currency-converter",
  ];

  const staticPages = [
    { path: "", trPath: "" },
    { path: "/en/tools", trPath: "/araclar" },
    { path: "/en/ai-guide", trPath: "/ai-rehber" },
    { path: "/en/about", trPath: "/hakkimizda" },
    { path: "/en/privacy", trPath: "/gizlilik-politikasi" },
  ];

  const toolPathMap: Record<string, string> = {
    "qr-code-generator": "qr-kod-olusturucu",
    "bmi-calculator": "vki-hesaplayici",
    "image-compressor": "resim-sikistirma",
    "currency-converter": "doviz-cevirici",
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.trPath}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page.trPath === "" ? 1 : 0.8,
      alternates: {
        languages: {
          tr: `${SITE_URL}${page.trPath}`,
          en: `${SITE_URL}${page.path}`,
        },
      },
    });
  }

  for (const tool of tools) {
    entries.push({
      url: `${SITE_URL}/araclar/${toolPathMap[tool]}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${SITE_URL}/araclar/${toolPathMap[tool]}`,
          en: `${SITE_URL}/en/tools/${tool}`,
        },
      },
    });
  }

  return entries;
}
