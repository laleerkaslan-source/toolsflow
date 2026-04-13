import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Calendar, ArrowRight } from "lucide-react";

export const BLOG_POSTS = [
  {
    slug: "brut-net-maas-hesaplama-2026",
    date: "2026-04-09",
    title: {
      tr: "2026-2026 Brut Net Maas Hesaplama Rehberi",
      en: "2026-2026 Gross to Net Salary Calculation Guide (Turkey)",
    },
    description: {
      tr: "Brut maas ile net maas arasindaki fark, SGK primi, gelir vergisi dilimleri ve asgari ucret istisnasi. Guncel vergi oranlariyla detayli rehber.",
      en: "Difference between gross and net salary, SSI premiums, income tax brackets and minimum wage exemption. Detailed guide with current tax rates.",
    },
    category: { tr: "Finans", en: "Finance" },
  },
  {
    slug: "kdv-oranlari-2026",
    date: "2026-04-09",
    title: {
      tr: "KDV Oranlari 2026 Guncel Liste — Hangi Urune Kac KDV?",
      en: "Turkey VAT Rates 2026 — Complete Updated List",
    },
    description: {
      tr: "Turkiye'deki guncel KDV oranlari: %1, %10 ve %20. Hangi urunlere hangi KDV orani uygulanir? Tam liste ve orneklerle rehber.",
      en: "Current VAT rates in Turkey: 1%, 10% and 20%. Which products have which VAT rate? Complete guide with examples.",
    },
    category: { tr: "Finans", en: "Finance" },
  },
  {
    slug: "kidem-tazminati-hesaplama-2026",
    date: "2026-04-09",
    title: {
      tr: "Kidem Tazminati Hesaplama 2026 — Tavan, Sartlar ve Ornek",
      en: "Severance Pay Calculation 2026 in Turkey — Ceiling, Conditions & Examples",
    },
    description: {
      tr: "Kidem tazminati nasil hesaplanir? Guncel tavan tutari, hak kazanma sartlari, damga vergisi kesintisi ve ornek hesaplamalar.",
      en: "How to calculate severance pay? Current ceiling amount, eligibility conditions, stamp tax deduction and example calculations.",
    },
    category: { tr: "Finans", en: "Finance" },
  },
  {
    slug: "asgari-ucret-2026",
    date: "2026-04-12",
    title: {
      tr: "2026 Asgari Ucret — Brut, Net ve Isveren Maliyeti",
      en: "2026 Minimum Wage in Turkey — Gross, Net & Employer Cost",
    },
    description: {
      tr: "2026 asgari ucret brut 22.104,67 TL, net 17.002 TL. SGK kesintileri, vergi istisnasi ve isveren maliyeti detaylari.",
      en: "2026 minimum wage: 22,104.67 TL gross, 17,002 TL net. SSI deductions, tax exemption and full employer cost breakdown.",
    },
    category: { tr: "Finans", en: "Finance" },
  },
  {
    slug: "ihbar-tazminati-hesaplama-2026",
    date: "2026-04-12",
    title: {
      tr: "Ihbar Tazminati Hesaplama Rehberi 2026",
      en: "Notice Pay Calculation Guide 2026 (Turkey)",
    },
    description: {
      tr: "4857 sayili Is Kanunu'na gore ihbar sureleri, hak kazanma sartlari ve hesaplama ornekleri.",
      en: "Notice periods, eligibility and calculation examples under Turkish Labor Law No. 4857.",
    },
    category: { tr: "Is Hukuku", en: "Labor Law" },
  },
  {
    slug: "bilesik-faiz-hesaplama",
    date: "2026-04-12",
    title: {
      tr: "Bilesik Faiz Nedir, Nasil Hesaplanir?",
      en: "Compound Interest — What It Is and How to Calculate",
    },
    description: {
      tr: "Bilesik faiz kavrami, formulu, basit faizden farki ve yatirimda gercek etkisi.",
      en: "Compound interest concept, formula, difference from simple interest and its real impact on investing.",
    },
    category: { tr: "Yatirim", en: "Investment" },
  },
  {
    slug: "gelir-vergisi-dilimleri-2026",
    date: "2026-04-12",
    title: {
      tr: "2026 Gelir Vergisi Dilimleri ve Oranlari",
      en: "2026 Turkish Income Tax Brackets & Rates",
    },
    description: {
      tr: "2026 yili icin guncel gelir vergisi dilimleri, kumulatif hesaplama ve ornek senaryolar.",
      en: "Current 2026 income tax brackets, cumulative calculation method and example scenarios.",
    },
    category: { tr: "Vergi", en: "Tax" },
  },
  {
    slug: "konut-kredisi-ihtiyac-kredisi",
    date: "2026-04-12",
    title: {
      tr: "Konut Kredisi vs Ihtiyac Kredisi Karsilastirmasi",
      en: "Mortgage vs Personal Loan in Turkey — Full Comparison",
    },
    description: {
      tr: "Iki kredi turunun faiz, vade, maliyet ve kullanim farklari ile hangisini ne zaman tercih etmelisiniz.",
      en: "Rate, maturity, cost and usage differences between the two loan types and when to choose which.",
    },
    category: { tr: "Kredi", en: "Loan" },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr
      ? `Blog — Finans Rehberleri ve Hesaplama Ipuclari | ${SITE_NAME}`
      : `Blog — Finance Guides & Calculation Tips | ${SITE_NAME}`,
    description: isTr
      ? "Maas hesaplama, KDV oranlari, kidem tazminati ve daha fazlasi hakkinda detayli rehberler. Turkiye'ye ozel finans bilgileri."
      : "Detailed guides about salary calculation, VAT rates, severance pay and more. Turkey-specific finance information.",
    alternates: {
      canonical: isTr ? "/blog" : "/en/blog",
      languages: {
        tr: "/blog",
        en: "/en/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Blog", url: isTr ? "/blog" : "/en/blog" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {isTr
            ? "Finans, vergi ve hesaplama araclari hakkinda detayli rehberler."
            : "Detailed guides about finance, tax and calculation tools."}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}` as "/"}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {isTr ? post.category.tr : post.category.en}
              </span>
              <h2 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">
                {isTr ? post.title.tr : post.title.en}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {isTr ? post.description.tr : post.description.en}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString(
                    isTr ? "tr-TR" : "en-US",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {isTr ? "Oku" : "Read"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-primary/20 bg-primary/5 p-8">
          <h2 className="text-xl font-bold sm:text-2xl">
            {isTr ? "Ucretsiz Hesaplama Araclari" : "Free Calculation Tools"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isTr
              ? "Rehberlerimizde anlatilan hesaplamalari saniyeler icinde yapabilirsiniz."
              : "Run the calculations from our guides in seconds."}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/tools/salary-calculator", tr: "Maas Hesaplayici", en: "Salary Calculator" },
              { href: "/tools/loan-calculator", tr: "Kredi Hesaplayici", en: "Loan Calculator" },
              { href: "/tools/severance-calculator", tr: "Kidem Tazminati Hesaplayici", en: "Severance Calculator" },
              { href: "/tools/vat-calculator", tr: "KDV Hesaplayici", en: "VAT Calculator" },
              { href: "/tools/investment-calculator", tr: "Yatirim Hesaplayici", en: "Investment Calculator" },
              { href: "/tools/currency-converter", tr: "Doviz Cevirici", en: "Currency Converter" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href as "/"}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {isTr ? t.tr : t.en}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
