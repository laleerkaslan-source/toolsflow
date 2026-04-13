import { ToolLayout } from "@/components/tools/tool-layout";
import { VatCalculator } from "@/components/tools/vat-calculator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "KDV Hesaplayıcı" : "VAT Calculator",
    description: isTr
      ? "KDV dahil veya hariç fiyat hesaplayın. %1, %10 ve %20 KDV oranları. Toplu hesaplama modu. Ücretsiz online KDV hesaplama aracı."
      : "Calculate VAT inclusive or exclusive prices. Supports 1%, 10% and 20% Turkish VAT rates. Batch calculation mode.",
    alternates: {
      canonical: isTr ? "/araclar/kdv-hesaplayici" : "/en/tools/vat-calculator",
      languages: {
        tr: "/araclar/kdv-hesaplayici",
        en: "/en/tools/vat-calculator",
      },
    },
  };
}

export default async function VatCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "KDV nedir?",
          a: "Katma Değer Vergisi (KDV), mal ve hizmetlerin satışı üzerinden alınan bir tüketim vergisidir. Türkiye'de üç farklı oran uygulanır: %1 (temel gıda maddeleri), %10 (temel ihtiyaç malları) ve %20 (standart oran).",
        },
        {
          q: "KDV dahil fiyattan KDV nasıl çıkarılır?",
          a: "KDV dahil fiyatı (1 + KDV oranı) değerine bölersiniz. Örneğin %20 KDV dahil 120 ₺'lik bir ürünün KDV hariç fiyatı: 120 / 1.20 = 100 ₺, KDV tutarı: 20 ₺'dir.",
        },
        {
          q: "Hangi ürünlere %1 KDV uygulanır?",
          a: "Temel gıda maddeleri (ekmek, süt, et, sebze, meyve, bakliyat vb.) %1 KDV oranına tabidir.",
        },
        {
          q: "Toplu hesaplama nasıl çalışır?",
          a: "Toplu hesaplama modunu açarak birden fazla tutarı aynı anda hesaplayabilirsiniz. Tüm tutarlar seçilen KDV oranı ile hesaplanır ve genel toplam gösterilir.",
        },
      ]
    : [
        {
          q: "What is VAT?",
          a: "Value Added Tax (VAT) is a consumption tax levied on the sale of goods and services. In Turkey, three rates apply: 1% (basic food items), 10% (essential goods) and 20% (standard rate).",
        },
        {
          q: "How do I remove VAT from an inclusive price?",
          a: "Divide the VAT-inclusive price by (1 + VAT rate). For example, a ₺120 product with 20% VAT: 120 / 1.20 = ₺100 base price, ₺20 VAT.",
        },
        {
          q: "Which products have 1% VAT in Turkey?",
          a: "Basic food items such as bread, milk, meat, vegetables, fruits and legumes are subject to 1% VAT.",
        },
        {
          q: "How does batch calculation work?",
          a: "Enable batch mode to calculate multiple amounts at once. All amounts are calculated with the selected VAT rate and a grand total is displayed.",
        },
      ];

  const guide = isTr ? (
    <>
      <h2>KDV Hesaplama Formülleri</h2>
      <p>
        <strong>KDV Ekle:</strong> Net Tutar × (1 + KDV Oranı) = KDV Dahil Tutar
        <br />
        <strong>KDV Çıkar:</strong> KDV Dahil Tutar / (1 + KDV Oranı) = Net Tutar
      </p>

      <h2>2026 KDV Oranları</h2>
      <ul>
        <li><strong>%1:</strong> Temel gıda (ekmek, süt, et, sebze, meyve, bakliyat), gazete, kitap</li>
        <li><strong>%10:</strong> Giyim, ayakkabı, tekstil, bazı hizmetler</li>
        <li><strong>%20:</strong> Standart oran — elektronik, otomobil, çoğu mal ve hizmet</li>
      </ul>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Tutarı girin (KDV dahil veya hariç)</li>
        <li>KDV oranını seçin (%1, %10 veya %20)</li>
        <li>Mod seçin: KDV ekle / KDV çıkar</li>
        <li>Toplu hesaplama için birden fazla tutar girebilirsiniz</li>
      </ol>

      <h2>Fatura Düzenlerken KDV</h2>
      <p>
        Mal/hizmet satışı yapan işletmeler faturaya KDV eklemek zorundadır.
        Alıcı KDV mükellefi ise ödediği KDV&apos;yi <strong>indirim hakkı</strong>
        olarak kullanabilir — sadece net aradaki fark hazineye ödenir.
      </p>

      <h2>İlgili Rehber</h2>
      <ul>
        <li><a href="/blog/kdv-oranlari-2026">KDV Oranları 2026 — Tam Liste</a></li>
      </ul>
    </>
  ) : (
    <>
      <h2>VAT Calculation Formulas</h2>
      <p>
        <strong>Add VAT:</strong> Net × (1 + Rate) = VAT-Inclusive
        <br />
        <strong>Remove VAT:</strong> Inclusive / (1 + Rate) = Net
      </p>

      <h2>2026 Turkish VAT Rates</h2>
      <ul>
        <li><strong>1%:</strong> Basic food (bread, milk, meat, vegetables, fruit), newspapers, books</li>
        <li><strong>10%:</strong> Clothing, footwear, textiles, some services</li>
        <li><strong>20%:</strong> Standard rate — electronics, cars, most goods and services</li>
      </ul>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter the amount (inclusive or exclusive)</li>
        <li>Select VAT rate (1%, 10% or 20%)</li>
        <li>Choose mode: add VAT / remove VAT</li>
        <li>Use batch mode for multiple amounts</li>
      </ol>

      <h2>VAT on Invoices</h2>
      <p>
        Sellers must add VAT to invoices. VAT-registered buyers can <strong>deduct</strong>
        the VAT they pay as input tax — only the net difference goes to the treasury.
      </p>

      <h2>Related Guide</h2>
      <ul>
        <li><a href="/en/blog/kdv-oranlari-2026">Turkey VAT Rates 2026 — Complete List</a></li>
      </ul>
    </>
  );

  return (
    <ToolLayout toolId="vat-calculator" locale={locale} faq={faq} guide={guide}>
      <VatCalculator />
    </ToolLayout>
  );
}
