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
    // Generators
    "/tools/qr-code-generator": {
      tr: "/araclar/qr-kod-olusturucu",
      en: "/tools/qr-code-generator",
    },
    // Health
    "/tools/bmi-calculator": {
      tr: "/araclar/vki-hesaplayici",
      en: "/tools/bmi-calculator",
    },
    // Converters
    "/tools/image-compressor": {
      tr: "/araclar/resim-sikistirma",
      en: "/tools/image-compressor",
    },
    // Finance
    "/tools/currency-converter": {
      tr: "/araclar/doviz-cevirici",
      en: "/tools/currency-converter",
    },
    "/tools/salary-calculator": {
      tr: "/araclar/maas-hesaplayici",
      en: "/tools/salary-calculator",
    },
    "/tools/loan-calculator": {
      tr: "/araclar/kredi-hesaplayici",
      en: "/tools/loan-calculator",
    },
    "/tools/vat-calculator": {
      tr: "/araclar/kdv-hesaplayici",
      en: "/tools/vat-calculator",
    },
    "/tools/severance-calculator": {
      tr: "/araclar/kidem-tazminati-hesaplayici",
      en: "/tools/severance-calculator",
    },
    "/tools/investment-calculator": {
      tr: "/araclar/yatirim-hesaplayici",
      en: "/tools/investment-calculator",
    },
    // Guides
    "/ai-guide": {
      tr: "/ai-rehber",
      en: "/ai-guide",
    },
    "/ai-guide/[slug]": {
      tr: "/ai-rehber/[slug]",
      en: "/ai-guide/[slug]",
    },
    // Pages
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
