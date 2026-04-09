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
      ? "KDV Oranlari 2025 Guncel Liste — %1, %10, %20 Hangi Urune?"
      : "Turkey VAT Rates 2025 — Complete List of 1%, 10%, 20% Rates",
    description: isTr
      ? "Turkiye'deki guncel KDV oranlari: %1, %10, %20. Gida, saglik, egitim, elektronik ve diger urunlerin KDV oranlari. Orneklerle tam rehber."
      : "Current VAT rates in Turkey: 1%, 10%, 20%. VAT rates for food, health, education, electronics and more. Complete guide with examples.",
    alternates: {
      canonical: isTr
        ? "/blog/kdv-oranlari-2025"
        : "/en/blog/kdv-oranlari-2025",
      languages: {
        tr: "/blog/kdv-oranlari-2025",
        en: "/en/blog/kdv-oranlari-2025",
      },
    },
  };
}

export default async function KdvOranlariPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Turkiye'de kac farkli KDV orani var?",
          a: "Turkiye'de 3 farkli KDV orani uygulanmaktadir: %1 (temel gida), %10 (temel ihtiyac mallari ve hizmetleri) ve %20 (standart oran).",
        },
        {
          q: "KDV dahil fiyattan KDV nasil cikarilir?",
          a: "KDV dahil fiyati (1 + KDV orani) degerine bolerek KDV haric fiyati bulabilirsiniz. Ornegin %20 KDV dahil 120 TL'lik bir urunun KDV haric fiyati: 120 / 1,20 = 100 TL.",
        },
        {
          q: "Gida urunlerinde KDV orani nedir?",
          a: "Temel gida maddelerinde (ekmek, sut, peynir, sebze, meyve vb.) KDV orani %1'dir. Islenmis gida urunlerinde %10, restoran hizmetlerinde %10 KDV uygulanir.",
        },
        {
          q: "Elektronik urunlerde KDV orani kactir?",
          a: "Telefon, bilgisayar, televizyon gibi elektronik urunlerde standart %20 KDV orani uygulanmaktadir.",
        },
      ]
    : [
        {
          q: "How many VAT rates are there in Turkey?",
          a: "Turkey has 3 different VAT rates: 1% (basic food), 10% (essential goods and services) and 20% (standard rate).",
        },
        {
          q: "How to extract VAT from a VAT-inclusive price?",
          a: "Divide the VAT-inclusive price by (1 + VAT rate). For example, a 120 TL product with 20% VAT: 120 / 1.20 = 100 TL excluding VAT.",
        },
        {
          q: "What is the VAT rate on food products?",
          a: "Basic food items (bread, milk, cheese, vegetables, fruits) have 1% VAT. Processed food has 10%, restaurant services have 10% VAT.",
        },
        {
          q: "What is the VAT rate on electronics?",
          a: "Electronics such as phones, computers, and TVs have the standard 20% VAT rate.",
        },
      ];

  return (
    <BlogLayout
      slug="kdv-oranlari-2025"
      title={
        isTr
          ? "KDV Oranlari 2025 Guncel Liste — Hangi Urune Kac KDV?"
          : "Turkey VAT Rates 2025 — Complete Updated List"
      }
      description={
        isTr
          ? "Turkiye'deki guncel KDV oranlari ve urun kategorileri."
          : "Current VAT rates and product categories in Turkey."
      }
      datePublished="2026-04-09"
      locale={locale}
      relatedTool={{
        href: "/tools/vat-calculator",
        label: isTr ? "KDV Hesaplayiciya Git" : "Go to VAT Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Turkiye&apos;de KDV Nedir?</h2>
          <p>
            Katma Deger Vergisi (KDV), Turkiye&apos;de mal ve hizmet satislarinda uygulanan
            dolayli bir vergidir. Tuketici nihai KDV yukunu tasir, ancak vergi her
            asama da toplanir ve devlete odenir.
          </p>

          <h2>Guncel KDV Oranlari (2025)</h2>
          <p>
            Turkiye&apos;de 3 farkli KDV orani uygulanmaktadir:
          </p>

          <h3>%1 KDV — Temel Gida Maddeleri</h3>
          <table>
            <thead>
              <tr>
                <th>Urun/Hizmet</th>
                <th>KDV Orani</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Ekmek, un, pirinc, bulgur</td><td>%1</td></tr>
              <tr><td>Sut ve sut urunleri (peynir, yogurt)</td><td>%1</td></tr>
              <tr><td>Taze sebze ve meyveler</td><td>%1</td></tr>
              <tr><td>Kuru bakliyat (mercimek, nohut, fasulye)</td><td>%1</td></tr>
              <tr><td>Et urunleri (taze et, tavuk, balik)</td><td>%1</td></tr>
              <tr><td>Yumurta</td><td>%1</td></tr>
              <tr><td>Cay (kuru)</td><td>%1</td></tr>
              <tr><td>Seker</td><td>%1</td></tr>
              <tr><td>Yag (zeytinyagi, aycicek yagi)</td><td>%1</td></tr>
              <tr><td>Gazete ve sureli yayinlar</td><td>%1</td></tr>
            </tbody>
          </table>

          <h3>%10 KDV — Temel Ihtiyac Mallari ve Hizmetler</h3>
          <table>
            <thead>
              <tr>
                <th>Urun/Hizmet</th>
                <th>KDV Orani</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Islenmis gida urunleri</td><td>%10</td></tr>
              <tr><td>Restoran ve yemek hizmetleri</td><td>%10</td></tr>
              <tr><td>Otel konaklama</td><td>%10</td></tr>
              <tr><td>Saglik hizmetleri (ozel hastane)</td><td>%10</td></tr>
              <tr><td>Egitim hizmetleri (ozel okul)</td><td>%10</td></tr>
              <tr><td>Tekstil ve giyim</td><td>%10</td></tr>
              <tr><td>Ayakkabi ve canta</td><td>%10</td></tr>
              <tr><td>Temizlik urunleri</td><td>%10</td></tr>
              <tr><td>Kitap</td><td>%10</td></tr>
              <tr><td>Tarımsal urunler</td><td>%10</td></tr>
            </tbody>
          </table>

          <h3>%20 KDV — Standart Oran</h3>
          <table>
            <thead>
              <tr>
                <th>Urun/Hizmet</th>
                <th>KDV Orani</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Elektronik cihazlar (telefon, bilgisayar, TV)</td><td>%20</td></tr>
              <tr><td>Otomobil ve motorlu tasitlar</td><td>%20</td></tr>
              <tr><td>Mobilya ve ev esyasi</td><td>%20</td></tr>
              <tr><td>Beyaz esya</td><td>%20</td></tr>
              <tr><td>Kozmetik urunler</td><td>%20</td></tr>
              <tr><td>Alkol ve tutun urunleri</td><td>%20</td></tr>
              <tr><td>Profesyonel hizmetler (avukatlik, muhasebecilik)</td><td>%20</td></tr>
              <tr><td>Yazilim ve dijital hizmetler</td><td>%20</td></tr>
              <tr><td>Insaat ve tadilat iscligi</td><td>%20</td></tr>
              <tr><td>Luks tuketim mallari</td><td>%20</td></tr>
            </tbody>
          </table>

          <h2>KDV Hesaplama Formulü</h2>
          <h3>KDV Ekleme</h3>
          <p>
            <strong>KDV Dahil Fiyat = Fiyat x (1 + KDV Orani)</strong>
          </p>
          <p>
            Ornek: 1.000 TL&apos;lik bir urun, %20 KDV ile: 1.000 x 1,20 = <strong>1.200 TL</strong>
          </p>

          <h3>KDV Cikarma</h3>
          <p>
            <strong>KDV Haric Fiyat = KDV Dahil Fiyat / (1 + KDV Orani)</strong>
          </p>
          <p>
            Ornek: 1.200 TL KDV dahil fiyat, %20 KDV ile: 1.200 / 1,20 = <strong>1.000 TL</strong>
          </p>
          <p>
            Bu hesaplamalari hizlica yapmak icin <strong>KDV hesaplayici aracimizi</strong> kullanabilirsiniz.
          </p>

          <h2>KDV Oranlarinin Tarihcesi</h2>
          <p>
            Turkiye&apos;de KDV orani 1985&apos;te %10 olarak basladi, 2009&apos;da %18&apos;e cikti.
            Temmuz 2023&apos;te yapilan son artisla genel oran %20&apos;ye yukseldi. Ayni
            duzenlemede %8 olan indirimli oran %10&apos;a cikarildi.
          </p>
        </>
      ) : (
        <>
          <h2>What is VAT in Turkey?</h2>
          <p>
            Value Added Tax (KDV in Turkish) is an indirect tax applied on the sale of goods
            and services. The end consumer bears the final VAT burden, but the tax is
            collected at every stage and paid to the government.
          </p>

          <h2>Current VAT Rates (2025)</h2>
          <p>Turkey applies 3 different VAT rates:</p>

          <h3>1% VAT — Basic Food Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product/Service</th>
                <th>VAT Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Bread, flour, rice, bulgur</td><td>1%</td></tr>
              <tr><td>Milk and dairy (cheese, yogurt)</td><td>1%</td></tr>
              <tr><td>Fresh vegetables and fruits</td><td>1%</td></tr>
              <tr><td>Dry legumes (lentils, chickpeas, beans)</td><td>1%</td></tr>
              <tr><td>Meat products (fresh meat, chicken, fish)</td><td>1%</td></tr>
              <tr><td>Eggs</td><td>1%</td></tr>
              <tr><td>Tea (dry)</td><td>1%</td></tr>
              <tr><td>Sugar</td><td>1%</td></tr>
              <tr><td>Cooking oils</td><td>1%</td></tr>
              <tr><td>Newspapers and periodicals</td><td>1%</td></tr>
            </tbody>
          </table>

          <h3>10% VAT — Essential Goods and Services</h3>
          <table>
            <thead>
              <tr>
                <th>Product/Service</th>
                <th>VAT Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Processed food products</td><td>10%</td></tr>
              <tr><td>Restaurant and dining services</td><td>10%</td></tr>
              <tr><td>Hotel accommodation</td><td>10%</td></tr>
              <tr><td>Healthcare (private hospitals)</td><td>10%</td></tr>
              <tr><td>Education (private schools)</td><td>10%</td></tr>
              <tr><td>Textile and clothing</td><td>10%</td></tr>
              <tr><td>Shoes and bags</td><td>10%</td></tr>
              <tr><td>Cleaning products</td><td>10%</td></tr>
              <tr><td>Books</td><td>10%</td></tr>
              <tr><td>Agricultural products</td><td>10%</td></tr>
            </tbody>
          </table>

          <h3>20% VAT — Standard Rate</h3>
          <table>
            <thead>
              <tr>
                <th>Product/Service</th>
                <th>VAT Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Electronics (phones, computers, TVs)</td><td>20%</td></tr>
              <tr><td>Automobiles and motor vehicles</td><td>20%</td></tr>
              <tr><td>Furniture and home goods</td><td>20%</td></tr>
              <tr><td>White goods / appliances</td><td>20%</td></tr>
              <tr><td>Cosmetics</td><td>20%</td></tr>
              <tr><td>Alcohol and tobacco</td><td>20%</td></tr>
              <tr><td>Professional services (legal, accounting)</td><td>20%</td></tr>
              <tr><td>Software and digital services</td><td>20%</td></tr>
              <tr><td>Construction and renovation labor</td><td>20%</td></tr>
              <tr><td>Luxury consumer goods</td><td>20%</td></tr>
            </tbody>
          </table>

          <h2>VAT Calculation Formula</h2>
          <h3>Adding VAT</h3>
          <p>
            <strong>VAT-Inclusive Price = Price x (1 + VAT Rate)</strong>
          </p>
          <p>
            Example: A 1,000 TL product with 20% VAT: 1,000 x 1.20 = <strong>1,200 TL</strong>
          </p>

          <h3>Removing VAT</h3>
          <p>
            <strong>VAT-Exclusive Price = VAT-Inclusive Price / (1 + VAT Rate)</strong>
          </p>
          <p>
            Example: 1,200 TL inclusive with 20% VAT: 1,200 / 1.20 = <strong>1,000 TL</strong>
          </p>

          <h2>History of VAT Rates</h2>
          <p>
            Turkey&apos;s VAT started at 10% in 1985, increased to 18% in 2009.
            The latest increase in July 2023 raised the standard rate to 20% and
            the reduced rate from 8% to 10%.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
