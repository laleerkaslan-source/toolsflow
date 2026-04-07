import { ToolLayout } from "@/components/tools/tool-layout";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Döviz Çevirici — Güncel Kurlar" : "Currency Converter — Live Rates",
    description: isTr
      ? "Ücretsiz döviz çevirici. Güncel kurlarla dolar, euro, TL ve 150+ para birimi arasında çeviri yapın."
      : "Free currency converter. Convert between USD, EUR, TRY and 150+ currencies with real-time exchange rates.",
    alternates: {
      canonical: isTr ? "/araclar/doviz-cevirici" : "/en/tools/currency-converter",
      languages: {
        tr: "/araclar/doviz-cevirici",
        en: "/en/tools/currency-converter",
      },
    },
  };
}

export default async function CurrencyConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        { q: "Döviz kurları ne sıklıkla güncelleniyor?", a: "Döviz kurları Avrupa Merkez Bankası (ECB) tarafından her iş günü güncellenmektedir." },
        { q: "Hangi para birimleri destekleniyor?", a: "TRY, USD, EUR, GBP, JPY, CHF ve daha birçok popüler para birimi desteklenmektedir." },
        { q: "Bu kurlar gerçek zamanlı mı?", a: "Kurlar ECB referans kurlarına dayanmaktadır ve günlük olarak güncellenir. Anlık alım-satım kurlarından farklılık gösterebilir." },
        { q: "Bu araç ücretsiz mi?", a: "Evet, döviz çeviricimiz tamamen ücretsiz ve sınırsızdır." },
      ]
    : [
        { q: "How often are exchange rates updated?", a: "Exchange rates are updated daily by the European Central Bank (ECB) on every business day." },
        { q: "Which currencies are supported?", a: "TRY, USD, EUR, GBP, JPY, CHF and many other popular currencies are supported." },
        { q: "Are these rates real-time?", a: "Rates are based on ECB reference rates and updated daily. They may differ from live buy/sell rates." },
        { q: "Is this tool free?", a: "Yes, our currency converter is completely free and unlimited." },
      ];

  return (
    <ToolLayout toolId="currency-converter" locale={locale} faq={faq}>
      <CurrencyConverter />
    </ToolLayout>
  );
}
