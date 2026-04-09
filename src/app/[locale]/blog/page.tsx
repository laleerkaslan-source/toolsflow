import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Calendar, ArrowRight } from "lucide-react";

export const BLOG_POSTS = [
  {
    slug: "brut-net-maas-hesaplama-2025",
    date: "2026-04-09",
    title: {
      tr: "2025-2026 Brut Net Maas Hesaplama Rehberi",
      en: "2025-2026 Gross to Net Salary Calculation Guide (Turkey)",
    },
    description: {
      tr: "Brut maas ile net maas arasindaki fark, SGK primi, gelir vergisi dilimleri ve asgari ucret istisnasi. Guncel vergi oranlariyla detayli rehber.",
      en: "Difference between gross and net salary, SSI premiums, income tax brackets and minimum wage exemption. Detailed guide with current tax rates.",
    },
    category: { tr: "Finans", en: "Finance" },
  },
  {
    slug: "kdv-oranlari-2025",
    date: "2026-04-09",
    title: {
      tr: "KDV Oranlari 2025 Guncel Liste — Hangi Urune Kac KDV?",
      en: "Turkey VAT Rates 2025 — Complete Updated List",
    },
    description: {
      tr: "Turkiye'deki guncel KDV oranlari: %1, %10 ve %20. Hangi urunlere hangi KDV orani uygulanir? Tam liste ve orneklerle rehber.",
      en: "Current VAT rates in Turkey: 1%, 10% and 20%. Which products have which VAT rate? Complete guide with examples.",
    },
    category: { tr: "Finans", en: "Finance" },
  },
  {
    slug: "kidem-tazminati-hesaplama-2025",
    date: "2026-04-09",
    title: {
      tr: "Kidem Tazminati Hesaplama 2025 — Tavan, Sartlar ve Ornek",
      en: "Severance Pay Calculation 2025 in Turkey — Ceiling, Conditions & Examples",
    },
    description: {
      tr: "Kidem tazminati nasil hesaplanir? Guncel tavan tutari, hak kazanma sartlari, damga vergisi kesintisi ve ornek hesaplamalar.",
      en: "How to calculate severance pay? Current ceiling amount, eligibility conditions, stamp tax deduction and example calculations.",
    },
    category: { tr: "Finans", en: "Finance" },
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
      </div>
    </>
  );
}
