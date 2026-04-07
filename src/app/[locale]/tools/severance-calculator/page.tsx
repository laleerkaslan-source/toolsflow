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

  return (
    <ToolLayout toolId="severance-calculator" locale={locale} faq={faq}>
      <SeveranceCalculator />
    </ToolLayout>
  );
}
