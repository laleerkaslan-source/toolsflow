import type { Metadata } from "next";
import { BlogLayout } from "@/components/blog/blog-layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr
      ? "Bilesik Faiz Nedir, Nasil Hesaplanir? Formul ve Ornekler"
      : "Compound Interest Explained — Formula, Examples & Calculator",
    description: isTr
      ? "Bilesik faiz nedir, basit faizden farki nedir? Formul, ornek hesaplama ve yatirim getirisine etkisi."
      : "What is compound interest, how does it differ from simple interest? Formula, examples and its impact on investment returns.",
    alternates: {
      canonical: isTr
        ? "/blog/bilesik-faiz-hesaplama"
        : "/en/blog/bilesik-faiz-hesaplama",
      languages: {
        tr: "/blog/bilesik-faiz-hesaplama",
        en: "/en/blog/bilesik-faiz-hesaplama",
      },
    },
  };
}

export default async function BilesikFaizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Bilesik faiz ile basit faiz arasindaki fark nedir?",
          a: "Basit faizde faiz sadece ana paraya uygulanir. Bilesik faizde ise her donem kazanilan faiz ana paraya eklenir ve sonraki donemde hem ana para hem de birikmis faiz uzerinden faiz kazanilir.",
        },
        {
          q: "Bilesik faiz formulu nedir?",
          a: "A = P × (1 + r/n)^(n×t). A: toplam tutar, P: ana para, r: yillik faiz orani, n: yillik bilesiklendirme sayisi, t: yil sayisi.",
        },
        {
          q: "Bilesik faiz neden Einstein'in 'sekizinci harika' dedigi seydir?",
          a: "Uzun vadede bilesik faiz ustel buyume saglar. Kucuk bir baslangic sermayesi bile yeterli zaman verildiginde cok buyuk tutarlara ulasabilir.",
        },
        {
          q: "Bilesiklendirme sikligi sonucu nasil etkiler?",
          a: "Bilesiklendirme ne kadar sik olursa (gunluk > aylik > yillik) toplam getiri o kadar yuksek olur, ancak fark marjinaldir.",
        },
      ]
    : [
        {
          q: "What is the difference between simple and compound interest?",
          a: "Simple interest applies only to the principal. Compound interest adds each period's interest back to the principal, so future interest is earned on both principal and accumulated interest.",
        },
        {
          q: "What is the compound interest formula?",
          a: "A = P × (1 + r/n)^(n×t). A: final amount, P: principal, r: annual rate, n: compoundings per year, t: years.",
        },
        {
          q: "Why did Einstein call compound interest the 'eighth wonder'?",
          a: "Over long periods, compound interest produces exponential growth. Even small initial capital can reach large sums given enough time.",
        },
        {
          q: "How does compounding frequency affect returns?",
          a: "More frequent compounding (daily > monthly > yearly) increases total return, though the difference is marginal.",
        },
      ];

  return (
    <BlogLayout
      slug="bilesik-faiz-hesaplama"
      title={
        isTr
          ? "Bilesik Faiz Nedir, Nasil Hesaplanir?"
          : "Compound Interest — What It Is and How to Calculate"
      }
      description={
        isTr
          ? "Bilesik faiz kavrami, formulu, basit faizden farki ve yatirimda gercek etkisi."
          : "Compound interest concept, formula, difference from simple interest and its real impact on investing."
      }
      datePublished="2026-04-12"
      locale={locale}
      relatedTool={{
        href: "/tools/investment-calculator",
        label: isTr ? "Yatirim Hesaplayiciya Git" : "Go to Investment Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Bilesik Faiz Nedir?</h2>
          <p>
            <strong>Bilesik faiz</strong>, bir yatirimda kazanilan faizin ana paraya
            eklenerek yeni donemde hem ana para hem de birikmis faiz uzerinden
            faiz kazanilmasidir. Yani &quot;faizin faizidir.&quot;
          </p>

          <h2>Bilesik Faiz Formulu</h2>
          <p>
            <code>A = P × (1 + r/n)^(n×t)</code>
          </p>
          <ul>
            <li><strong>A</strong>: Vade sonu tutar</li>
            <li><strong>P</strong>: Ana para (baslangic yatirimi)</li>
            <li><strong>r</strong>: Yillik faiz orani (ondalik)</li>
            <li><strong>n</strong>: Yil icinde bilesiklendirme sayisi</li>
            <li><strong>t</strong>: Yil sayisi</li>
          </ul>

          <h2>Basit Faiz vs Bilesik Faiz</h2>
          <p>
            100.000 TL&apos;yi %40 yillik faizle 10 yil yatirdiginizi dusunelim:
          </p>
          <table>
            <thead>
              <tr><th>Yontem</th><th>10 Yil Sonunda</th></tr>
            </thead>
            <tbody>
              <tr><td>Basit Faiz</td><td>500.000 TL</td></tr>
              <tr><td>Bilesik Faiz (yillik)</td><td>2.892.546 TL</td></tr>
              <tr><td>Bilesik Faiz (aylik)</td><td>5.351.249 TL</td></tr>
            </tbody>
          </table>
          <p>
            Gorulecegi gibi bilesik faiz, basit faize gore <strong>5-10 kat</strong>
            daha fazla getiri saglayabilir.
          </p>

          <h2>Ornek: Aylik Duzenli Yatirim</h2>
          <p>
            Her ay 5.000 TL biriktirip %35 yillik getiri ile degerlendirdiginizde
            20 yil sonunda yaklasik <strong>85 milyon TL</strong> birikmis olur —
            ana para toplami sadece 1,2 milyon TL iken.
          </p>

          <h2>72 Kurali</h2>
          <p>
            Paranizin kac yilda ikiye katlanacagini hizlica hesaplamak icin:
          </p>
          <p>
            <strong>Katlanma Yili ≈ 72 / Faiz Orani (%)</strong>
          </p>
          <p>
            Ornek: %20 faizle para 72/20 = 3,6 yilda ikiye katlanir.
          </p>

          <h2>Kendi Yatiriminizi Hesaplayin</h2>
          <p>
            Farkli faiz oranlari, sureler ve aylik katki senaryolari icin
            <strong> yatirim getiri hesaplayicimizi</strong> deneyebilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>What Is Compound Interest?</h2>
          <p>
            <strong>Compound interest</strong> is the process where earned interest is
            added to the principal, so subsequent periods earn interest on both the
            original capital and the accumulated interest — &quot;interest on interest.&quot;
          </p>

          <h2>Formula</h2>
          <p><code>A = P × (1 + r/n)^(n×t)</code></p>
          <ul>
            <li><strong>A</strong>: Final amount</li>
            <li><strong>P</strong>: Principal</li>
            <li><strong>r</strong>: Annual rate (decimal)</li>
            <li><strong>n</strong>: Compoundings per year</li>
            <li><strong>t</strong>: Number of years</li>
          </ul>

          <h2>Simple vs Compound</h2>
          <p>100,000 TL invested at 40% annual rate for 10 years:</p>
          <table>
            <thead><tr><th>Method</th><th>After 10 Years</th></tr></thead>
            <tbody>
              <tr><td>Simple</td><td>500,000 TL</td></tr>
              <tr><td>Compound (annual)</td><td>2,892,546 TL</td></tr>
              <tr><td>Compound (monthly)</td><td>5,351,249 TL</td></tr>
            </tbody>
          </table>

          <h2>Rule of 72</h2>
          <p>Quick estimate of doubling time:</p>
          <p><strong>Years to Double ≈ 72 / Rate (%)</strong></p>
          <p>At 20% annual return, money doubles in roughly 3.6 years.</p>

          <h2>Calculate Yours</h2>
          <p>
            Use our <strong>investment calculator</strong> to model different rates,
            durations and monthly contributions.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
