import type { Metadata } from "next";
import { BlogLayout } from "@/components/blog/blog-layout";
import { socialMetadata } from "@/lib/og";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr
      ? "MTV 2026 — Motorlu Tasitlar Vergisi Tarifesi ve Odeme"
      : "Motor Vehicle Tax 2026 (Turkey) — Rates & Payment",
    description: isTr
      ? "2026 MTV tarifesi: otomobil, SUV, minibus, kamyonet icin motor hacmi ve yasa gore vergi tutarlari. Odeme tarihleri ve muafiyetler."
      : "2026 Motor Vehicle Tax (MTV) table for Turkey: amounts by engine size and vehicle age. Payment dates and exemptions.",
    alternates: {
      canonical: isTr ? "/blog/mtv-2026" : "/en/blog/mtv-2026",
      languages: {
        tr: "/blog/mtv-2026",
        en: "/en/blog/mtv-2026",
      },
    },
    ...socialMetadata({
      title: isTr ? "MTV 2026 — Motorlu Tasitlar Vergisi Tarifesi ve Odeme" : "Motor Vehicle Tax 2026 (Turkey) — Rates & Payment",
      description: isTr ? "2026 MTV tarifesi: otomobil, SUV, minibus, kamyonet icin motor hacmi ve yasa gore vergi tutarlari. Odeme tarihleri ve muafiyetler." : "2026 Motor Vehicle Tax (MTV) table for Turkey: amounts by engine size and vehicle age. Payment dates and exemptions.",
      url: `${SITE_URL}${isTr ? "/blog/mtv-2026" : "/en/blog/mtv-2026"}`,
      category: "Vergi",
      type: "blog",
      locale,
    }),
  };
}

export default async function MtvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "MTV ne zaman odenir?",
          a: "Yilda 2 taksit halinde odenir: 1. taksit Ocak, 2. taksit Temmuz ayi sonuna kadar. Gecikmede aylik faiz islenir.",
        },
        {
          q: "MTV nasil hesaplanir?",
          a: "Otomobiller icin motor hacmi (cc) ve yas kategorisine gore sabit tarife uygulanir. Her yil yeniden degerleme orani ile artirilir.",
        },
        {
          q: "Elektrikli araclar icin MTV var mi?",
          a: "Evet, elektrikli araclar icin motor gucu (kW) ve yas kategorisine gore ayri bir tarife uygulanir.",
        },
        {
          q: "MTV muafiyeti kimler icin var?",
          a: "%90 ve uzeri engelli raporuna sahip kisilerin bir adet aracinda MTV muafiyeti uygulanir (bazi motor hacmi sinirlarinda).",
        },
      ]
    : [
        {
          q: "When is MTV paid?",
          a: "Two installments: January and July each year. Late payments incur monthly interest.",
        },
        {
          q: "How is MTV calculated?",
          a: "For cars, a fixed schedule by engine size (cc) and vehicle age. Updated annually with the revaluation rate.",
        },
        {
          q: "Is there MTV for electric vehicles?",
          a: "Yes — electric vehicles have a separate schedule based on motor power (kW) and age.",
        },
        {
          q: "Who is exempt from MTV?",
          a: "Individuals with 90%+ disability rating for one vehicle (within certain engine limits).",
        },
      ];

  return (
    <BlogLayout
      slug="mtv-2026"
      title={
        isTr
          ? "2026 MTV Tarifesi ve Odeme Rehberi"
          : "2026 Motor Vehicle Tax Guide (Turkey)"
      }
      description={
        isTr
          ? "Otomobiller, kamyonetler ve elektrikli araclar icin 2026 MTV tutarlari, odeme tarihleri, muafiyetler."
          : "2026 MTV amounts for cars, vans and electric vehicles, payment dates and exemptions."
      }
      datePublished="2026-04-13"
      locale={locale}
      relatedTool={{
        href: "/tools/loan-calculator",
        label: isTr ? "Tasit Kredisi Hesaplayici" : "Vehicle Loan Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>MTV Nedir?</h2>
          <p>
            Motorlu Tasitlar Vergisi (MTV), Turkiye&apos;de trafige tescilli
            tasitlardan alinan <strong>yillik bir vergidir</strong>. 197 sayili
            Motorlu Tasitlar Vergisi Kanunu&apos;na gore tahsil edilir.
          </p>

          <h2>2026 Otomobil MTV Tarifesi (I Sayili Cetvel)</h2>
          <table>
            <thead>
              <tr>
                <th>Motor Hacmi (cm³)</th>
                <th>1-3 Yas</th>
                <th>4-6 Yas</th>
                <th>7-11 Yas</th>
                <th>12-15 Yas</th>
                <th>16+ Yas</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1300&apos;e kadar</td><td>3.659 TL</td><td>2.553 TL</td><td>1.428 TL</td><td>1.080 TL</td><td>386 TL</td></tr>
              <tr><td>1301-1600</td><td>6.373 TL</td><td>4.780 TL</td><td>2.773 TL</td><td>1.964 TL</td><td>757 TL</td></tr>
              <tr><td>1601-1800</td><td>11.261 TL</td><td>8.803 TL</td><td>5.180 TL</td><td>3.164 TL</td><td>1.227 TL</td></tr>
              <tr><td>1801-2000</td><td>17.732 TL</td><td>13.666 TL</td><td>8.036 TL</td><td>4.788 TL</td><td>1.891 TL</td></tr>
              <tr><td>2001-2500</td><td>26.598 TL</td><td>19.310 TL</td><td>12.063 TL</td><td>7.208 TL</td><td>2.853 TL</td></tr>
              <tr><td>2501-3000</td><td>37.102 TL</td><td>32.290 TL</td><td>20.176 TL</td><td>10.859 TL</td><td>3.980 TL</td></tr>
              <tr><td>3001-3500</td><td>56.528 TL</td><td>50.878 TL</td><td>30.638 TL</td><td>15.315 TL</td><td>5.620 TL</td></tr>
              <tr><td>3501-4000</td><td>88.896 TL</td><td>76.726 TL</td><td>45.203 TL</td><td>20.176 TL</td><td>8.036 TL</td></tr>
              <tr><td>4001+</td><td>145.550 TL</td><td>109.138 TL</td><td>64.639 TL</td><td>29.049 TL</td><td>11.261 TL</td></tr>
            </tbody>
          </table>
          <p>
            <em>Not: Tarife yeniden degerleme orani ile her yil guncellenir.
            Guncel tutar icin GIB ya da e-Devlet&apos;i kontrol edin.</em>
          </p>

          <h2>Elektrikli Arac MTV</h2>
          <p>
            Elektrikli otomobiller ayri tarifeye tabidir. Motor gucu (kW) ve yasa
            gore hesaplama yapilir — genellikle benzinli esdegerinden %25
            daha dusuktur.
          </p>

          <h2>Odeme Donemleri</h2>
          <ul>
            <li><strong>1. Taksit:</strong> 1 - 31 Ocak 2026</li>
            <li><strong>2. Taksit:</strong> 1 - 31 Temmuz 2026</li>
          </ul>
          <p>
            Odeme: GIB Dijital Vergi Dairesi, e-Devlet, banka veya PTT.
          </p>

          <h2>Muafiyetler</h2>
          <ul>
            <li><strong>%90 ve uzeri engellilik:</strong> 1 adet araca muafiyet</li>
            <li>Gaziler, sehit yakinlari (belirli sartlarda)</li>
            <li>Resmi kurum araclari</li>
          </ul>

          <h2>Arac Alirken Toplam Maliyet</h2>
          <p>
            Arac satin alirken OTV, KDV, kasko, trafik sigortasi ve yillik MTV
            birlikte hesaplanmalidir.
            <strong> Kredi hesaplayici</strong> aracimiz ile tasit kredisi
            taksitinizi bulabilirsiniz.
          </p>

          <h2>Vaka: Aile Sahibi Bir Filo Kararsiziligi</h2>
          <p>
            Ankara&apos;da 4 kisilik bir aile, 2 araca sahip olmayi degerlendiriyor:
          </p>
          <ul>
            <li><strong>Secenek A:</strong> 2026 model 1.6 SUV (1.598 cc) — MTV 1-3 yas dilimi: <strong>6.373 TL/yil</strong></li>
            <li><strong>Secenek B:</strong> 2020 model 2.0 sedan (1.997 cc) — 4-6 yas dilimi: <strong>13.666 TL/yil</strong></li>
          </ul>
          <p>
            Goruldugu uzere yeni ama dusuk motor hacimli arac (Secenek A), 6 yil
            once alinmis 2 litrelik araca gore yilda 7.293 TL daha az MTV oder.
            10 yillik kullanim suresinde MTV farki yaklasik <strong>73.000 TL</strong>
            seviyesine ulasir — bu kucumsenecek bir tutar degildir. Buna ek olarak
            elektrikli arac secimi (orn. 80 kW motor gucu) yilda yaklasik
            <strong> 4.500 TL</strong> MTV ile en avantajli secenektir.
          </p>

          <h2>Yanlis Bilinen Hususlar</h2>
          <ul>
            <li>
              <strong>&quot;Aracin pazar degeri MTV&apos;yi belirler&quot;</strong> — Yanlis.
              MTV motor hacmi (cc) ve YAS uzerinden hesaplanir. 4 milyon TL&apos;lik
              bir SUV ile 800.000 TL&apos;lik aile sedani, ayni motor hacmi ve yas
              kategorisindeyse ayni MTV&apos;yi oder.
            </li>
            <li>
              <strong>&quot;Yas ay bazinda hesaplanir&quot;</strong> — Hayir. MTV&apos;de yas
              <strong> tescil tarihinden itibaren TAM YIL</strong> olarak sayilir.
              2024 Mart&apos;ta tescil edilen arac, 2026 Ocak&apos;ta hala &quot;1-3 yas&quot;
              kategorisindedir.
            </li>
            <li>
              <strong>&quot;Engelli muafiyeti her engellilige uygulanir&quot;</strong> —
              Yanlis. %90 ve uzeri engellilik raporu sarti vardir. Daha dusuk
              oranlarda farkli vergisel destekler vardir ama MTV muafiyeti yoktur.
            </li>
            <li>
              <strong>&quot;Gecikmis MTV affa girer&quot;</strong> — Genelde dogru ama her
              donem icin geni - 2023 ve 2024 yapilandirma kanunlari ile pek cok
              MTV borcu yapilandirildi. Suresinde basvurmayanlar fark eder.
            </li>
          </ul>

          <h2>Resmi Kaynaklar</h2>
          <p>
            MTV{" "}
            <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=197&MevzuatTur=1&MevzuatTertip=4" target="_blank" rel="noopener noreferrer">197 sayili Motorlu Tasitlar Vergisi Kanunu</a>{" "}
            ile duzenlenir. Guncel tarife icin{" "}
            <a href="https://www.gib.gov.tr" target="_blank" rel="noopener noreferrer">Gelir Idaresi Baskanligi</a>{" "}
            yillik tebliglerini takip edin. Odeme icin{" "}
            <a href="https://ivd.gib.gov.tr" target="_blank" rel="noopener noreferrer">Interaktif Vergi Dairesi</a>{" "}
            veya{" "}
            <a href="https://www.turkiye.gov.tr" target="_blank" rel="noopener noreferrer">e-Devlet</a>{" "}
            kullanabilirsiniz. Engelli muafiyeti basvurusu icin
            <a href="https://gib.gov.tr/yardim-ve-kaynaklar/yararli-bilgiler/engellilik-muafiyeti" target="_blank" rel="noopener noreferrer"> GIB Engellilik Muafiyeti</a>{" "}
            sayfasi rehberdir.
          </p>
        </>
      ) : (
        <>
          <h2>What Is MTV?</h2>
          <p>
            Motor Vehicle Tax (MTV) is a <strong>yearly tax</strong> on registered
            vehicles in Turkey under Law No. 197.
          </p>

          <h2>2026 Car MTV (Schedule I)</h2>
          <table>
            <thead>
              <tr>
                <th>Engine (cc)</th>
                <th>1-3 yrs</th>
                <th>4-6 yrs</th>
                <th>7-11 yrs</th>
                <th>12-15 yrs</th>
                <th>16+ yrs</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Up to 1300</td><td>3,659</td><td>2,553</td><td>1,428</td><td>1,080</td><td>386</td></tr>
              <tr><td>1301-1600</td><td>6,373</td><td>4,780</td><td>2,773</td><td>1,964</td><td>757</td></tr>
              <tr><td>1601-1800</td><td>11,261</td><td>8,803</td><td>5,180</td><td>3,164</td><td>1,227</td></tr>
              <tr><td>1801-2000</td><td>17,732</td><td>13,666</td><td>8,036</td><td>4,788</td><td>1,891</td></tr>
              <tr><td>2001-2500</td><td>26,598</td><td>19,310</td><td>12,063</td><td>7,208</td><td>2,853</td></tr>
              <tr><td>2501-3000</td><td>37,102</td><td>32,290</td><td>20,176</td><td>10,859</td><td>3,980</td></tr>
              <tr><td>3001-3500</td><td>56,528</td><td>50,878</td><td>30,638</td><td>15,315</td><td>5,620</td></tr>
              <tr><td>3501-4000</td><td>88,896</td><td>76,726</td><td>45,203</td><td>20,176</td><td>8,036</td></tr>
              <tr><td>4001+</td><td>145,550</td><td>109,138</td><td>64,639</td><td>29,049</td><td>11,261</td></tr>
            </tbody>
          </table>
          <p>All amounts in TL. Updated annually; verify with GIB.</p>

          <h2>Electric Vehicles</h2>
          <p>
            EVs follow a separate schedule based on motor power (kW) — typically
            about 25% lower than combustion equivalents.
          </p>

          <h2>Payment Dates</h2>
          <ul>
            <li><strong>1st installment:</strong> January 1-31, 2026</li>
            <li><strong>2nd installment:</strong> July 1-31, 2026</li>
          </ul>

          <h2>Exemptions</h2>
          <ul>
            <li>Disability 90%+: one vehicle exempt</li>
            <li>Veterans, families of martyrs (certain conditions)</li>
            <li>Official government vehicles</li>
          </ul>

          <h2>Total Cost When Buying</h2>
          <p>
            Include SCT, VAT, insurance, traffic insurance and annual MTV in your
            cost plan. Use our <strong>loan calculator</strong> for vehicle loan
            installments.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
