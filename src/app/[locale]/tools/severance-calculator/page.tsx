import { ToolLayout } from "@/components/tools/tool-layout";
import { SeveranceCalculator } from "@/components/tools/severance-calculator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Kıdem Tazminatı Hesaplayıcı 2026" : "Severance Pay Calculator 2026",
    description: isTr
      ? "Kıdem tazminatınızı hesaplayın. Çalışma süresi, brüt maaş ve güncel tavan üzerinden detaylı hesaplama. 2026 güncel tavan tutarları."
      : "Calculate your severance pay. Detailed calculation based on employment duration, gross salary and current ceiling. Updated 2026 ceilings.",
    alternates: {
      canonical: isTr ? "/araclar/kidem-tazminati-hesaplayici" : "/en/tools/severance-calculator",
      languages: {
        tr: "/araclar/kidem-tazminati-hesaplayici",
        en: "/en/tools/severance-calculator",
      },
    },
  };
}

export default async function SeveranceCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Kıdem tazminatı nedir?",
          a: "Kıdem tazminatı, en az 1 yıl çalışmış işçinin iş akdinin belirli koşullarda sona ermesi halinde işveren tarafından ödenen bir tazminattır. Her tam yıl için 30 günlük brüt ücret tutarında hesaplanır.",
        },
        {
          q: "Kıdem tazminatı tavanı nedir?",
          a: "Kıdem tazminatı tavanı, her 6 ayda bir güncellenen üst sınır tutardır. Brüt maaşınız tavanı aşsa bile hesaplama tavan tutarı üzerinden yapılır.",
        },
        {
          q: "Kıdem tazminatından hangi kesintiler yapılır?",
          a: "Kıdem tazminatından sadece damga vergisi (%0,759) kesilir. Gelir vergisi ve SGK primi kesilmez.",
        },
        {
          q: "Hangi durumlarda kıdem tazminatı alınır?",
          a: "İşveren tarafından haklı neden olmaksızın fesih, emeklilik, askerlik, evlilik (kadın çalışan için ilk 1 yıl), sağlık nedenleri ve vefat durumlarında kıdem tazminatı hakkı doğar.",
        },
      ]
    : [
        {
          q: "What is severance pay?",
          a: "Severance pay is compensation paid by the employer when an employment contract is terminated under certain conditions after at least 1 year of service. It is calculated as 30 days gross salary per full year.",
        },
        {
          q: "What is the severance pay ceiling?",
          a: "The severance pay ceiling is an upper limit updated every 6 months. Even if your gross salary exceeds the ceiling, calculation is based on the ceiling amount.",
        },
        {
          q: "What deductions apply to severance pay?",
          a: "Only stamp tax (0.759%) is deducted from severance pay. No income tax or SSI premium applies.",
        },
        {
          q: "When is severance pay applicable?",
          a: "Severance pay applies in cases of dismissal without just cause, retirement, military service, marriage (for female employees within first year), health reasons and death.",
        },
      ];

  const guide = isTr ? (
    <>
      <h2>Kıdem Tazminatı Nasıl Hesaplanır?</h2>
      <p>
        <strong>Kıdem Tazminatı = Giydirilmiş Brüt Ücret × Kıdem Yılı</strong>.
        Her tam çalışma yılı için 30 günlük ücret esastır. Artan süreler için
        gün hesabı yapılır: (Artan Ay × 30 + Artan Gün) / 365 oranında ek hak
        doğar.
      </p>
      <p>
        Giydirilmiş ücret; çıplak brüt ücrete yemek, yol, ikramiye, prim gibi
        düzenli ek ödemelerin eklenmesiyle bulunur. Kıdem tazminatı damga vergisi
        hariç <strong>tamamen vergiden muaftır</strong>.
      </p>

      <h2>2026 Kıdem Tavanı</h2>
      <p>
        2026 yılı kıdem tazminatı tavan tutarı <strong>44.764,27 TL</strong> olarak
        belirlenmiştir. Brüt maaşınız bu tavanın üzerindeyse, hesaplama tavan
        üzerinden yapılır.
      </p>

      <h2>Hak Kazanma Koşulları</h2>
      <ul>
        <li>En az 1 yıl aynı işverene bağlı çalışma</li>
        <li>İşveren tarafından haklı neden olmadan fesih</li>
        <li>Emeklilik (3600 gün + 15 yıl sigortalılık)</li>
        <li>Askerlik nedeniyle istifa</li>
        <li>Kadın işçinin evlilik sonrası 1 yıl içinde istifası</li>
        <li>Sağlık nedenleri, vefat</li>
      </ul>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>İşe giriş ve çıkış tarihlerinizi girin</li>
        <li>Son giydirilmiş brüt aylık ücretinizi girin</li>
        <li>Hem kıdem hem ihbar tazminatını anında görün</li>
      </ol>

      <h2>İlgili Rehberler</h2>
      <ul>
        <li><a href="/blog/kidem-tazminati-hesaplama-2026">Kıdem Tazminatı Rehberi 2026</a></li>
        <li><a href="/blog/ihbar-tazminati-hesaplama-2026">İhbar Tazminatı Rehberi</a></li>
      </ul>
    </>
  ) : (
    <>
      <h2>How Severance Pay Is Calculated</h2>
      <p>
        <strong>Severance = Dressed Gross Wage × Years of Tenure</strong>. 30 days&apos;
        wage per full year, with pro-rated addition for partial years.
        Severance is fully exempt from income tax — only stamp tax applies.
      </p>

      <h2>2026 Severance Ceiling</h2>
      <p>
        The 2026 severance ceiling is <strong>44,764.27 TL</strong>. Salaries above
        this cap are calculated using the ceiling.
      </p>

      <h2>Eligibility</h2>
      <ul>
        <li>Minimum 1 year tenure with the same employer</li>
        <li>Termination by employer without just cause</li>
        <li>Retirement (3600 days + 15 years insurance)</li>
        <li>Resignation due to military service</li>
        <li>Female employee resigning within 1 year of marriage</li>
        <li>Health reasons, death</li>
      </ul>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter employment start and end dates</li>
        <li>Enter last dressed gross monthly wage</li>
        <li>See both severance and notice pay instantly</li>
      </ol>

      <h2>Related Guides</h2>
      <ul>
        <li><a href="/en/blog/kidem-tazminati-hesaplama-2026">Severance Pay Guide 2026</a></li>
        <li><a href="/en/blog/ihbar-tazminati-hesaplama-2026">Notice Pay Guide</a></li>
      </ul>
    </>
  );

  return (
    <ToolLayout toolId="severance-calculator" locale={locale} faq={faq} guide={guide}>
      <SeveranceCalculator />
    </ToolLayout>
  );
}
