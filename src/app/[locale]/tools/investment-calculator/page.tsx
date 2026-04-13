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
      canonical: isTr ? "/araclar/yatirim-hesaplayici" : "/en/tools/investment-calculator",
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

  const guide = isTr ? (
    <>
      <h2>Yatırım Getirisi Nasıl Hesaplanır?</h2>
      <p>
        Bileşik faiz formülü: <code>A = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]</code>
        <br />
        A: vade sonu, P: başlangıç, r: yıllık getiri, n: yıllık bileşik sayısı,
        t: yıl, PMT: düzenli katkı.
      </p>

      <h2>72 Kuralı ile Hızlı Tahmin</h2>
      <p>
        Paranızın kaç yılda ikiye katlanacağı: <strong>72 / Yıllık Getiri (%)</strong>.
        %30 getiri → 72/30 ≈ 2,4 yılda katlanır.
      </p>

      <h2>Enflasyon Düzeltmesi Neden Önemli?</h2>
      <p>
        Nominal getiri her zaman yanıltıcıdır. Yılda %40 getiri, %50 enflasyonla
        birlikte <strong>reel olarak</strong> -%7 kayıptır. Araç, tahmini enflasyon
        oranına göre bugünkü alım gücünü otomatik hesaplar.
      </p>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Başlangıç sermayeni gir</li>
        <li>Aylık düzenli katkı miktarını gir (isteğe bağlı)</li>
        <li>Yıllık getiri ve yatırım süresini seç</li>
        <li>Enflasyon oranı gir — reel getiriyi de görürsün</li>
        <li>Düşük/orta/yüksek senaryolarla karşılaştır</li>
      </ol>

      <h2>Yatırım Araçları ve Tipik Getiri</h2>
      <ul>
        <li><strong>TL Mevduat:</strong> %30-45 brüt (stopaj sonrası düşer)</li>
        <li><strong>Altın:</strong> Yıllık değişken, enflasyona karşı koruma</li>
        <li><strong>Dolar/Euro:</strong> Kur artışı kadar + faiz</li>
        <li><strong>Hisse Senedi (BIST):</strong> Uzun vadede %35-60 ortalama</li>
        <li><strong>Yatırım Fonu:</strong> Fon türüne göre %20-80</li>
      </ul>

      <h2>İlgili Rehber</h2>
      <ul>
        <li><a href="/blog/bilesik-faiz-hesaplama">Bileşik Faiz Nedir, Nasıl Hesaplanır?</a></li>
      </ul>
    </>
  ) : (
    <>
      <h2>How Investment Returns Are Calculated</h2>
      <p>
        Compound interest with contributions:
        <code> A = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]</code>
      </p>

      <h2>Rule of 72</h2>
      <p>
        Quick doubling estimate: <strong>72 / Annual Return (%)</strong>. At 30%
        annual return, money doubles in ~2.4 years.
      </p>

      <h2>Why Inflation Adjustment Matters</h2>
      <p>
        Nominal returns mislead. A 40% return with 50% inflation is a <strong>real</strong>
        loss of -7%. The tool adjusts for your inflation estimate to show true
        purchasing power.
      </p>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter starting capital</li>
        <li>Enter monthly contribution (optional)</li>
        <li>Set annual return and duration</li>
        <li>Add inflation rate — see real returns</li>
        <li>Compare low/medium/high scenarios</li>
      </ol>

      <h2>Typical Returns by Asset</h2>
      <ul>
        <li><strong>TL Deposits:</strong> 30-45% gross (lower after withholding tax)</li>
        <li><strong>Gold:</strong> Variable, inflation hedge</li>
        <li><strong>USD/EUR:</strong> Currency appreciation + interest</li>
        <li><strong>Stocks (BIST):</strong> 35-60% long-term average</li>
        <li><strong>Mutual Funds:</strong> 20-80% by fund type</li>
      </ul>

      <h2>Related Guide</h2>
      <ul>
        <li><a href="/en/blog/bilesik-faiz-hesaplama">Compound Interest Explained</a></li>
      </ul>
    </>
  );

  return (
    <ToolLayout toolId="investment-calculator" locale={locale} faq={faq} guide={guide}>
      <InvestmentCalculator />
    </ToolLayout>
  );
}
