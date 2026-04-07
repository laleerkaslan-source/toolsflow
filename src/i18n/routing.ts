import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/tools": {
      tr: "/araclar",
      en: "/tools",
    },
    "/tools/qr-code-generator": {
      tr: "/araclar/qr-kod-olusturucu",
      en: "/tools/qr-code-generator",
    },
    "/tools/bmi-calculator": {
      tr: "/araclar/vki-hesaplayici",
      en: "/tools/bmi-calculator",
    },
    "/tools/image-compressor": {
      tr: "/araclar/resim-sikistirma",
      en: "/tools/image-compressor",
    },
    "/tools/currency-converter": {
      tr: "/araclar/doviz-cevirici",
      en: "/tools/currency-converter",
    },
    "/ai-guide": {
      tr: "/ai-rehber",
      en: "/ai-guide",
    },
    "/ai-guide/[slug]": {
      tr: "/ai-rehber/[slug]",
      en: "/ai-guide/[slug]",
    },
    "/about": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/contact": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/privacy": {
      tr: "/gizlilik-politikasi",
      en: "/privacy",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
