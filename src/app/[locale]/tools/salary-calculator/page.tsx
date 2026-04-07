import { ToolLayout } from "@/components/tools/tool-layout";
import { SalaryCalculator } from "@/components/tools/salary-calculator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Maaş Hesaplayıcı — Brüt Net Hesaplama 2026" : "Salary Calculator — Gross to Net 2026",
    description: isTr
      ? "Brüt maaştan net maaşa hesaplama. SGK, gelir vergisi, damga vergisi ve işveren maliyeti detaylı dökümü. 2026 güncel vergi dilimleri."
      : "Calculate net salary from gross. Detailed breakdown of SGK, income tax, stamp tax and employer cost. Updated 2026 tax brackets for Turkey.",
    alternates: {
      languages: {
        tr: "/araclar/maas-hesaplayici",
        en: "/en/tools/salary-calculator",
      },
    },
  };
}

export default async function SalaryCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Brüt maaş ile net maaş arasındaki fark nedir?",
          a: "Brüt maaş, SGK primi, gelir vergisi ve damga vergisi gibi yasal kesintiler yapılmadan önceki toplam maaştır. Net maaş ise tüm kesintilerden sonra elinize geçen tutardır.",
        },
        {
          q: "SGK primi nasıl hesaplanır?",
          a: "SGK işçi payı brüt maaşın %14'ü, işsizlik sigortası ise %1'idir. Toplam %15 işçi kesintisi yapılır. SGK tavanı üzerindeki maaşlar için tavan tutarı baz alınır.",
        },
        {
          q: "Asgari ücret vergi istisnası nedir?",
          a: "Asgari ücrete kadar olan gelir kısmı gelir vergisi ve damga vergisinden muaftır. Bu istisna tüm ücretlilere uygulanır ve net maaşı artırıcı etki yapar.",
        },
        {
          q: "Vergi dilimleri neden önemli?",
          a: "Türkiye'de gelir vergisi kümülatif olarak hesaplanır. Yılın ilerleyen aylarında kümülatif gelir arttıkça daha yüksek vergi dilimlerine geçilebilir ve net maaş düşebilir.",
        },
        {
          q: "İşveren maliyeti nedir?",
          a: "İşveren brüt maaşın yanı sıra SGK işveren payı (%15.5 - %20.5) ve işveren işsizlik sigortası (%2) öder. Bu nedenle toplam işveren maliyeti brüt maaştan yüksektir.",
        },
      ]
    : [
        {
          q: "What is the difference between gross and net salary?",
          a: "Gross salary is the total salary before legal deductions such as SSI premium, income tax and stamp tax. Net salary is the amount you receive after all deductions.",
        },
        {
          q: "How is SSI premium calculated?",
          a: "Employee SSI premium is 14% of gross salary, unemployment insurance is 1%. Total employee deduction is 15%. For salaries above the SSI ceiling, the ceiling amount is used as the base.",
        },
        {
          q: "What is the minimum wage tax exemption?",
          a: "Income up to the minimum wage is exempt from income tax and stamp tax. This exemption applies to all employees and increases net salary.",
        },
        {
          q: "Why do tax brackets matter?",
          a: "Income tax in Turkey is calculated cumulatively. As cumulative income increases throughout the year, higher tax brackets may apply and net salary may decrease.",
        },
        {
          q: "What is employer cost?",
          a: "The employer pays SSI employer share (15.5%-20.5%) and employer unemployment insurance (2%) on top of gross salary. Total employer cost is therefore higher than gross salary.",
        },
      ];

  return (
    <ToolLayout toolId="salary-calculator" locale={locale} faq={faq}>
      <SalaryCalculator />
    </ToolLayout>
  );
}
