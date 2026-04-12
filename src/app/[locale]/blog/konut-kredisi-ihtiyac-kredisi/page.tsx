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
      ? "Konut Kredisi vs Ihtiyac Kredisi — Farklar, Faiz, Vade"
      : "Mortgage vs Personal Loan in Turkey — Differences & Rates",
    description: isTr
      ? "Konut kredisi ile ihtiyac kredisi arasindaki farklar, faiz oranlari, vade secenekleri ve hangisini ne zaman tercih etmelisiniz."
      : "Differences between mortgage and personal loans in Turkey: rates, maturity, tax benefits and which to choose when.",
    alternates: {
      canonical: isTr
        ? "/blog/konut-kredisi-ihtiyac-kredisi"
        : "/en/blog/konut-kredisi-ihtiyac-kredisi",
      languages: {
        tr: "/blog/konut-kredisi-ihtiyac-kredisi",
        en: "/en/blog/konut-kredisi-ihtiyac-kredisi",
      },
    },
  };
}

export default async function KrediKarsilastirmaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Konut kredisi mi ihtiyac kredisi mi daha avantajli?",
          a: "Konut alimi icin konut kredisi hem daha dusuk faizli hem daha uzun vadeli oldugu icin avantajlidir. Ancak ipotek ve ekspertiz masrafi vardir.",
        },
        {
          q: "Ihtiyac kredisi konut alimi icin kullanilabilir mi?",
          a: "Teknik olarak kullanilabilir ancak faiz oranlari konut kredisinden yuksek, vadeler 36-48 ay ile sinirlidir. Buyuk tutarlar icin uygun degildir.",
        },
        {
          q: "Konut kredisi vadesi en fazla kac ay?",
          a: "Turkiye'de konut kredileri genellikle 120 ay (10 yil) vadeye kadar verilir. Bazi bankalar 240 aya kadar cikabilir.",
        },
        {
          q: "KKDF ve BSMV ihtiyac kredisinde de var mi?",
          a: "Evet. Ihtiyac kredilerinde KKDF %15 ve BSMV %10 uygulanir. Konut kredilerinde bu vergiler yoktur — bu da onemli bir maliyet farkidir.",
        },
      ]
    : [
        {
          q: "Mortgage or personal loan — which is better?",
          a: "For home purchases, mortgages are better: lower rates and longer maturities. However, they require mortgage registration and appraisal fees.",
        },
        {
          q: "Can a personal loan be used for buying a home?",
          a: "Technically yes, but rates are higher and maturities cap at 36-48 months. Not viable for large amounts.",
        },
        {
          q: "What is the max mortgage maturity in Turkey?",
          a: "Typically up to 120 months (10 years); some banks offer up to 240 months.",
        },
        {
          q: "Do KKDF and BSMV apply to personal loans?",
          a: "Yes. Personal loans carry 15% KKDF and 10% BSMV. Mortgages are exempt — a significant cost difference.",
        },
      ];

  return (
    <BlogLayout
      slug="konut-kredisi-ihtiyac-kredisi"
      title={
        isTr
          ? "Konut Kredisi vs Ihtiyac Kredisi Karsilastirmasi"
          : "Mortgage vs Personal Loan in Turkey — Full Comparison"
      }
      description={
        isTr
          ? "Iki kredi turunun faiz, vade, maliyet ve kullanim farklari ile hangisini ne zaman tercih etmelisiniz."
          : "Rate, maturity, cost and usage differences between the two loan types and when to choose which."
      }
      datePublished="2026-04-12"
      locale={locale}
      relatedTool={{
        href: "/tools/loan-calculator",
        label: isTr ? "Kredi Hesaplayiciya Git" : "Go to Loan Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Iki Kredi Turunun Ozeti</h2>
          <p>
            <strong>Konut kredisi</strong>, yalnizca konut satin almak amaciyla
            kullanilir ve satin alinan konut bankaya ipotek edilir.
            <strong> Ihtiyac kredisi</strong> ise herhangi bir kullanim amaci belirtmeden
            alinabilen, teminatsiz (genelde) kredi turudur.
          </p>

          <h2>Ozellik Karsilastirmasi</h2>
          <table>
            <thead>
              <tr>
                <th>Ozellik</th>
                <th>Konut Kredisi</th>
                <th>Ihtiyac Kredisi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Faiz Orani</td><td>Dusuk (%2,5 - %4 aylik)</td><td>Yuksek (%4 - %6 aylik)</td></tr>
              <tr><td>Vade</td><td>120-240 ay</td><td>3-48 ay</td></tr>
              <tr><td>Teminat</td><td>Gayrimenkul ipotegi</td><td>Genellikle teminatsiz</td></tr>
              <tr><td>KKDF</td><td>Yok</td><td>%15</td></tr>
              <tr><td>BSMV</td><td>Yok</td><td>%10</td></tr>
              <tr><td>Ekspertiz</td><td>Gerekli</td><td>Gerekmez</td></tr>
              <tr><td>Dosya Masrafi</td><td>Var</td><td>Var (sinirli)</td></tr>
            </tbody>
          </table>

          <h2>Hangisi Ne Zaman Tercih Edilmeli?</h2>
          <h3>Konut Kredisi</h3>
          <ul>
            <li>Evi uzun vadede odemek isteyen (5+ yil)</li>
            <li>Gayrimenkul tapusunu bankaya ipotek olarak verebilen</li>
            <li>Dusuk faiz ve uzun vade onceligi olanlar</li>
          </ul>

          <h3>Ihtiyac Kredisi</h3>
          <ul>
            <li>Tatil, tadilat, dugun gibi kisa vadeli ihtiyaclar</li>
            <li>Gayrimenkul ipotegi istemeyenler</li>
            <li>Kucuk tutarli, hizli nakit ihtiyaci</li>
          </ul>

          <h2>Ornek Maliyet Karsilastirmasi</h2>
          <p>500.000 TL 60 ay vadeli kredi:</p>
          <table>
            <thead>
              <tr><th>Kredi</th><th>Aylik Taksit</th><th>Toplam Geri Odeme</th></tr>
            </thead>
            <tbody>
              <tr><td>Konut (%3 aylik)</td><td>~16.900 TL</td><td>~1.014.000 TL</td></tr>
              <tr><td>Ihtiyac (%5 aylik + vergi)</td><td>~26.400 TL</td><td>~1.584.000 TL</td></tr>
            </tbody>
          </table>
          <p>
            Ayni tutarda konut kredisi, ihtiyac kredisine gore ~570.000 TL daha
            az geri odeme demektir.
          </p>

          <h2>Kendi Taksidinizi Hesaplayin</h2>
          <p>
            Her iki kredi turu icin aylik taksit ve toplam maliyet karsilastirmasini
            <strong> kredi hesaplayici aracimizla</strong> yapabilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>Quick Overview</h2>
          <p>
            <strong>Mortgages</strong> are used only for home purchases, secured by the
            purchased property. <strong>Personal loans</strong> can be used for any purpose,
            usually unsecured.
          </p>

          <h2>Feature Comparison</h2>
          <table>
            <thead>
              <tr><th>Feature</th><th>Mortgage</th><th>Personal Loan</th></tr>
            </thead>
            <tbody>
              <tr><td>Rate</td><td>Low (2.5-4%/mo)</td><td>High (4-6%/mo)</td></tr>
              <tr><td>Maturity</td><td>120-240 months</td><td>3-48 months</td></tr>
              <tr><td>Collateral</td><td>Property mortgage</td><td>Usually none</td></tr>
              <tr><td>KKDF Tax</td><td>No</td><td>15%</td></tr>
              <tr><td>BSMV Tax</td><td>No</td><td>10%</td></tr>
              <tr><td>Appraisal</td><td>Required</td><td>Not required</td></tr>
            </tbody>
          </table>

          <h2>When to Choose Which?</h2>
          <h3>Mortgage</h3>
          <ul>
            <li>Long-term home financing (5+ years)</li>
            <li>Willing to pledge property</li>
            <li>Priority on low rate and long term</li>
          </ul>

          <h3>Personal Loan</h3>
          <ul>
            <li>Short-term needs: vacation, renovation, wedding</li>
            <li>No property to pledge</li>
            <li>Small, quick cash requirements</li>
          </ul>

          <h2>Cost Example</h2>
          <p>500,000 TL loan, 60-month term:</p>
          <table>
            <thead><tr><th>Loan</th><th>Monthly</th><th>Total Repay</th></tr></thead>
            <tbody>
              <tr><td>Mortgage (3%/mo)</td><td>~16,900 TL</td><td>~1,014,000 TL</td></tr>
              <tr><td>Personal (5%/mo + tax)</td><td>~26,400 TL</td><td>~1,584,000 TL</td></tr>
            </tbody>
          </table>
          <p>The mortgage saves ~570,000 TL over the same term.</p>

          <h2>Calculate Yours</h2>
          <p>
            Compare both loan types with our <strong>loan calculator</strong>.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
