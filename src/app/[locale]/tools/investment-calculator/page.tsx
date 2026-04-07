import { ToolLayout } from "@/components/tools/tool-layout";
import { InvestmentCalculator } from "@/components/tools/investment-calculator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Yatırım Getiri Hesaplayıcı" : "Investment Return Calculator",
    description: isTr
      ? "Bileşik faiz ile yatırım getirinizi hesaplayın. Aylık katkı, enflasyon düzeltmesi ve senaryo karşılaştırması. Ücretsiz yatırım hesaplama aracı."
      : "Calculate investment returns with compound interest. Monthly contributions, inflation adjustment and scenario comparison.",
    alternates: {
      languages: {
        tr: "/araclar/yatirim-hesaplayici",
        en: "/en/tools/investment-calculator",
      },
    },
  };
}

export default async function InvestmentCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Bileşik faiz nedir?",
          a: "Bileşik faiz, hem anaparanız hem de önceki dönemlerde kazanılan faizler üzerinden faiz kazanmanızdır. Bu 'faiz üzerine faiz' etkisi, uzun vadede getirinizi katlamalı olarak artırır.",
        },
        {
          q: "Enflasyon düzeltmesi ne anlama gelir?",
          a: "Enflasyon düzeltmeli değer, gelecekteki yatırım değerinizin bugünkü alım gücünü gösterir. Örneğin %20 enflasyonla 10 yıl sonraki 1.000.000 ₺, bugünkü ~160.000 ₺ alım gücüne eşdeğerdir.",
        },
        {
          q: "Senaryo karşılaştırması nasıl çalışır?",
          a: "Girdiğiniz getiri oranı etrafında düşük, orta ve yüksek olmak üzere 3 senaryo oluşturulur. Bu farklı piyasa koşullarında yatırımınızın nasıl büyüyeceğini gösterir.",
        },
        {
          q: "Vergi hesaba katılıyor mu?",
          a: "Bu hesaplama vergi öncesi brüt getiri üzerinden yapılmaktadır. Gerçek getiriniz yatırım aracına göre değişen vergi kesintilerinden sonra daha düşük olabilir.",
        },
      ]
    : [
        {
          q: "What is compound interest?",
          a: "Compound interest is when you earn interest on both your principal and the interest earned in previous periods. This 'interest on interest' effect exponentially increases your returns over the long term.",
        },
        {
          q: "What does inflation adjustment mean?",
          a: "The inflation-adjusted value shows the purchasing power of your future investment in today's terms. For example, ₺1,000,000 in 10 years with 20% inflation is equivalent to about ₺160,000 in today's purchasing power.",
        },
        {
          q: "How does scenario comparison work?",
          a: "Three scenarios (low, medium, high) are generated around your input return rate. This shows how your investment would grow under different market conditions.",
        },
        {
          q: "Is tax included in the calculation?",
          a: "This calculation is based on pre-tax gross returns. Your actual returns may be lower after tax deductions, which vary by investment type.",
        },
      ];

  return (
    <ToolLayout toolId="investment-calculator" locale={locale} faq={faq}>
      <InvestmentCalculator />
    </ToolLayout>
  );
}
