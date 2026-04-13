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
    // Blog
    "/blog": {
      tr: "/blog",
      en: "/blog",
    },
    "/blog/brut-net-maas-hesaplama-2026": {
      tr: "/blog/brut-net-maas-hesaplama-2026",
      en: "/blog/brut-net-maas-hesaplama-2026",
    },
    "/blog/kdv-oranlari-2026": {
      tr: "/blog/kdv-oranlari-2026",
      en: "/blog/kdv-oranlari-2026",
    },
    "/blog/kidem-tazminati-hesaplama-2026": {
      tr: "/blog/kidem-tazminati-hesaplama-2026",
      en: "/blog/kidem-tazminati-hesaplama-2026",
    },
    "/blog/asgari-ucret-2026": {
      tr: "/blog/asgari-ucret-2026",
      en: "/blog/asgari-ucret-2026",
    },
    "/blog/ihbar-tazminati-hesaplama-2026": {
      tr: "/blog/ihbar-tazminati-hesaplama-2026",
      en: "/blog/ihbar-tazminati-hesaplama-2026",
    },
    "/blog/bilesik-faiz-hesaplama": {
      tr: "/blog/bilesik-faiz-hesaplama",
      en: "/blog/bilesik-faiz-hesaplama",
    },
    "/blog/gelir-vergisi-dilimleri-2026": {
      tr: "/blog/gelir-vergisi-dilimleri-2026",
      en: "/blog/gelir-vergisi-dilimleri-2026",
    },
    "/blog/konut-kredisi-ihtiyac-kredisi": {
      tr: "/blog/konut-kredisi-ihtiyac-kredisi",
      en: "/blog/konut-kredisi-ihtiyac-kredisi",
    },
    "/blog/sgk-primi-2026": {
      tr: "/blog/sgk-primi-2026",
      en: "/blog/sgk-primi-2026",
    },
    "/blog/yillik-izin-hesaplama": {
      tr: "/blog/yillik-izin-hesaplama",
      en: "/blog/yillik-izin-hesaplama",
    },
    "/blog/fazla-mesai-hesaplama": {
      tr: "/blog/fazla-mesai-hesaplama",
      en: "/blog/fazla-mesai-hesaplama",
    },
    "/blog/emlak-vergisi-2026": {
      tr: "/blog/emlak-vergisi-2026",
      en: "/blog/emlak-vergisi-2026",
    },
    "/blog/mtv-2026": {
      tr: "/blog/mtv-2026",
      en: "/blog/mtv-2026",
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
