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
      ? "Emlak Vergisi 2026 — Oranlar, Hesaplama, Odeme Tarihleri"
      : "Property Tax in Turkey 2026 — Rates, Dates, Calculation",
    description: isTr
      ? "Emlak vergisi oranlari (konut, isyeri, arsa), 2026 rayic bedel artisi, odeme tarihleri (Mayis ve Kasim) ve muafiyetler."
      : "Property tax rates (home, commercial, land), 2026 valuation increases, payment dates (May and November) and exemptions.",
    alternates: {
      canonical: isTr
        ? "/blog/emlak-vergisi-2026"
        : "/en/blog/emlak-vergisi-2026",
      languages: {
        tr: "/blog/emlak-vergisi-2026",
        en: "/en/blog/emlak-vergisi-2026",
      },
    },
  };
}

export default async function EmlakVergisiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Emlak vergisi oranlari nedir?",
          a: "Konut %0,1; isyeri %0,2; arsa %0,3; arazi %0,1. Buyuksehir belediyelerinde bu oranlar iki katina cikar (konut %0,2 gibi).",
        },
        {
          q: "Emlak vergisi ne zaman odenir?",
          a: "Yilda 2 taksit halinde odenir: 1. taksit Mart-Mayis, 2. taksit Kasim ayi sonuna kadar.",
        },
        {
          q: "Emlak vergisi muafiyeti var mi?",
          a: "Emekli, issiz, engelli, sehit aileleri, gaziler ve hicbir geliri olmayanlar 200 m2'yi asmayan tek konut icin muaftir.",
        },
        {
          q: "Rayic bedel nedir?",
          a: "Rayic bedel, belediyelerin 4 yilda bir belirledigi emlak vergisine esas degerdir. 2026 yili icin dogal afet riskine gore %30-50 arasinda artirilmistir.",
        },
      ]
    : [
        {
          q: "What are the property tax rates?",
          a: "Residential 0.1%; commercial 0.2%; land plot 0.3%; agricultural land 0.1%. Rates double in metropolitan municipalities.",
        },
        {
          q: "When is property tax paid?",
          a: "Two installments: first in March-May, second by end of November.",
        },
        {
          q: "Are there exemptions?",
          a: "Retirees, unemployed, disabled, families of martyrs, veterans and those with no income are exempt for a single home up to 200 m².",
        },
        {
          q: "What is 'rayic bedel' (valuation)?",
          a: "Municipalities set property tax valuations every 4 years. For 2026 they increased 30-50% depending on location.",
        },
      ];

  return (
    <BlogLayout
      slug="emlak-vergisi-2026"
      title={
        isTr
          ? "2026 Emlak Vergisi Rehberi"
          : "2026 Property Tax Guide (Turkey)"
      }
      description={
        isTr
          ? "Emlak vergisi oranlari, 2026 rayic bedel degisiklikleri, odeme tarihleri, muafiyetler ve ornek hesaplamalar."
          : "Property tax rates, 2026 valuation changes, payment dates, exemptions and example calculations."
      }
      datePublished="2026-04-13"
      locale={locale}
      relatedTool={{
        href: "/tools/loan-calculator",
        label: isTr ? "Kredi Hesaplayiciya Git" : "Go to Loan Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Emlak Vergisi Nedir?</h2>
          <p>
            Emlak vergisi, Turkiye sinirlari icinde bulunan bina, arsa ve arazi
            sahiplerinden alinan <strong>yillik bir yerel vergidir</strong>.
            Belediyelere odenir ve kamu hizmetlerinin finansmaninda kullanilir.
          </p>

          <h2>2026 Emlak Vergisi Oranlari</h2>
          <table>
            <thead>
              <tr>
                <th>Gayrimenkul Turu</th>
                <th>Normal Belediye</th>
                <th>Buyuksehir</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Konut</td><td>%0,1 (binde 1)</td><td>%0,2 (binde 2)</td></tr>
              <tr><td>Isyeri</td><td>%0,2 (binde 2)</td><td>%0,4 (binde 4)</td></tr>
              <tr><td>Arsa</td><td>%0,3 (binde 3)</td><td>%0,6 (binde 6)</td></tr>
              <tr><td>Arazi</td><td>%0,1 (binde 1)</td><td>%0,2 (binde 2)</td></tr>
            </tbody>
          </table>

          <h2>Hesaplama Formulu</h2>
          <p>
            <strong>Emlak Vergisi = Rayic Bedel × Vergi Orani</strong>
          </p>
          <p>
            Ornek: Istanbul&apos;da rayic bedeli 3.000.000 TL olan bir konut icin:
            3.000.000 × %0,2 = <strong>6.000 TL yillik vergi</strong>.
          </p>

          <h2>Odeme Tarihleri</h2>
          <ul>
            <li><strong>1. Taksit:</strong> 1 Mart - 31 Mayis 2026</li>
            <li><strong>2. Taksit:</strong> 1 Kasim - 30 Kasim 2026</li>
          </ul>
          <p>
            Odemeler belediye veznelerinden, e-belediye uzerinden veya bankalar
            araciligi ile yapilabilir.
          </p>

          <h2>Muafiyetler</h2>
          <p>
            Asagidaki kisiler <strong>200 m2&apos;yi gecmeyen tek konut</strong>
            icin emlak vergisinden muaftir:
          </p>
          <ul>
            <li>Emekliler (hicbir geliri olmayanlar)</li>
            <li>Issiz kisiler</li>
            <li>Engelliler</li>
            <li>Sehit yakinlari ve gaziler</li>
          </ul>

          <h2>Rayic Bedel ve 2026 Guncellemesi</h2>
          <p>
            Rayic bedel belediyeler tarafindan <strong>4 yilda bir</strong>
            belirlenir ve ara yillarda yeniden degerleme oraninin yarisi kadar
            artirilir. 2026 yili icin bolgeye gore <strong>%30-50 artis</strong>
            yapilmistir — bu nedenle onceki yillara gore vergi daha yuksektir.
          </p>

          <h2>Konut Alirken Vergi Etkisi</h2>
          <p>
            Konut alirken tapu harci (%4) ve yillik emlak vergisi yuk olarak
            dikkate alinmalidir. <strong>Kredi hesaplayici</strong> aracimiz ile
            aylik taksit ve toplam maliyet planlamasi yapabilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>What Is Property Tax?</h2>
          <p>
            Property tax is a <strong>yearly local tax</strong> on buildings, lots
            and agricultural land in Turkey, paid to the municipality.
          </p>

          <h2>2026 Rates</h2>
          <table>
            <thead>
              <tr><th>Type</th><th>Standard</th><th>Metropolitan</th></tr>
            </thead>
            <tbody>
              <tr><td>Residential</td><td>0.1%</td><td>0.2%</td></tr>
              <tr><td>Commercial</td><td>0.2%</td><td>0.4%</td></tr>
              <tr><td>Building plot</td><td>0.3%</td><td>0.6%</td></tr>
              <tr><td>Agricultural</td><td>0.1%</td><td>0.2%</td></tr>
            </tbody>
          </table>

          <h2>Formula</h2>
          <p>
            <strong>Property Tax = Valuation × Rate</strong>
          </p>
          <p>
            Istanbul home valued at 3,000,000 TL: 3,000,000 × 0.2% =
            <strong> 6,000 TL/year</strong>.
          </p>

          <h2>Payment Dates</h2>
          <ul>
            <li><strong>1st installment:</strong> March 1 - May 31, 2026</li>
            <li><strong>2nd installment:</strong> November 1-30, 2026</li>
          </ul>

          <h2>Exemptions</h2>
          <p>Exempt for single home up to 200 m² if:</p>
          <ul>
            <li>Retiree with no other income</li>
            <li>Unemployed</li>
            <li>Disabled</li>
            <li>Families of martyrs, veterans</li>
          </ul>

          <h2>2026 Valuation Update</h2>
          <p>
            Valuations are reset <strong>every 4 years</strong>. For 2026 they
            increased <strong>30-50%</strong>, raising the tax bill significantly.
          </p>

          <h2>Buying a Home?</h2>
          <p>
            Include 4% title deed fee and annual property tax in your cost plan.
            Use our <strong>loan calculator</strong> to model total costs.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
