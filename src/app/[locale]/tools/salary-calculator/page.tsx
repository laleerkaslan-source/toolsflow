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
      canonical: isTr ? "/araclar/maas-hesaplayici" : "/en/tools/salary-calculator",
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

  const guide = isTr ? (
    <>
      <h2>Brüt Net Maaş Hesaplama Nasıl Yapılır?</h2>
      <p>
        Türkiye&apos;de brüt maaştan net maaşa ulaşmak için 4 temel kesinti uygulanır:
        <strong> SGK işçi payı (%14)</strong>, <strong>işsizlik sigortası (%1)</strong>,
        <strong> gelir vergisi (%15 - %40)</strong> ve <strong>damga vergisi (%0,759)</strong>.
        Asgari ücret tutarı kadar olan gelir kısmı gelir vergisi ve damga vergisinden
        muaftır.
      </p>

      <h2>2026 Gelir Vergisi Dilimleri</h2>
      <ul>
        <li>0 - 158.000 TL: %15</li>
        <li>158.000 - 330.000 TL: %20</li>
        <li>330.000 - 800.000 TL: %27</li>
        <li>800.000 - 4.300.000 TL: %35</li>
        <li>4.300.000 TL üzeri: %40</li>
      </ul>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Brüt aylık maaşınızı girin</li>
        <li>Çalıştığınız ayı seçin (kümülatif vergi için önemli)</li>
        <li>AGİ ve ek kesintiler varsa belirtin</li>
        <li>Net maaş, kesintiler ve işveren maliyetini anında görün</li>
      </ol>

      <h2>Kümülatif Vergi Etkisi</h2>
      <p>
        Yılın başında %15 diliminde olan bir çalışan, brüt maaşı yüksekse yıl
        ortasında %20 veya %27 dilimine geçebilir. Bu nedenle Kasım-Aralık aylarında
        net maaş düşebilir. Araç her ay için ayrı hesaplama yapar.
      </p>

      <h2>İlgili Rehberler</h2>
      <ul>
        <li><a href="/blog/brut-net-maas-hesaplama-2026">Brüt Net Maaş Hesaplama Rehberi</a></li>
        <li><a href="/blog/gelir-vergisi-dilimleri-2026">2026 Gelir Vergisi Dilimleri</a></li>
        <li><a href="/blog/asgari-ucret-2026">2026 Asgari Ücret</a></li>
      </ul>
    </>
  ) : (
    <>
      <h2>How Gross-to-Net Salary Calculation Works</h2>
      <p>
        In Turkey, four main deductions reduce gross to net salary:
        <strong> SSI employee premium (14%)</strong>, <strong>unemployment insurance (1%)</strong>,
        <strong> income tax (15% - 40%)</strong>, and <strong>stamp tax (0.759%)</strong>.
        Income up to the minimum wage is exempt from income and stamp tax.
      </p>

      <h2>2026 Income Tax Brackets</h2>
      <ul>
        <li>0 - 158,000 TL: 15%</li>
        <li>158,000 - 330,000 TL: 20%</li>
        <li>330,000 - 800,000 TL: 27%</li>
        <li>800,000 - 4,300,000 TL: 35%</li>
        <li>Over 4,300,000 TL: 40%</li>
      </ul>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter your gross monthly salary</li>
        <li>Select the working month (matters for cumulative tax)</li>
        <li>Add any additional deductions if applicable</li>
        <li>Instantly see net salary, deductions, and employer cost</li>
      </ol>

      <h2>Cumulative Tax Effect</h2>
      <p>
        An employee starting the year at the 15% bracket may move to 20% or 27%
        mid-year as cumulative income grows. Net pay therefore tends to decrease
        toward year-end. This tool calculates each month separately.
      </p>

      <h2>Related Guides</h2>
      <ul>
        <li><a href="/en/blog/brut-net-maas-hesaplama-2026">Gross to Net Salary Guide</a></li>
        <li><a href="/en/blog/gelir-vergisi-dilimleri-2026">2026 Income Tax Brackets</a></li>
        <li><a href="/en/blog/asgari-ucret-2026">2026 Minimum Wage</a></li>
      </ul>
    </>
  );

  return (
    <ToolLayout toolId="salary-calculator" locale={locale} faq={faq} guide={guide}>
      <SalaryCalculator />
    </ToolLayout>
  );
}
