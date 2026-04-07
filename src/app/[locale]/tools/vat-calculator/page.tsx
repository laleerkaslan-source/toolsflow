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

  return (
    <ToolLayout toolId="vat-calculator" locale={locale} faq={faq}>
      <VatCalculator />
    </ToolLayout>
  );
}
