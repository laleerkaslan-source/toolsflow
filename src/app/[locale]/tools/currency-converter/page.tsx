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

  const guide = isTr ? (
    <>
      <h2>Döviz Kuru Nedir ve Nasıl Belirlenir?</h2>
      <p>
        Döviz kuru, bir para biriminin başka bir para birimi cinsinden değeridir.
        Örneğin &quot;1 USD = 34,20 TL&quot; ifadesi, bir Amerikan dolarının 34,20
        Türk lirasına karşılık geldiğini gösterir. Serbest piyasa ekonomilerinde
        kurlar, arz ve talebe göre sürekli değişir. Bir ülkenin faiz oranları,
        enflasyonu, cari açığı, siyasi istikrarı ve merkez bankası politikaları
        döviz kurunu etkileyen başlıca faktörlerdir. Türkiye&apos;de kurlar
        dalgalı (serbest) kur rejimi ile belirlenir; yani devlet sabit bir kur
        ilan etmez, piyasa fiyatı esas alınır.
      </p>

      <h2>Bu Araç Hangi Kurları Kullanıyor?</h2>
      <p>
        Bu çevirici, Avrupa Merkez Bankası&apos;nın (ECB) her iş günü yayımladığı
        referans kurlarını temel alır. Referans kurlar, bankalar arası piyasada
        oluşan ortalama değerlerdir ve şeffaf, güvenilir bir baz sağlar. Ancak
        unutmayın: bu değerler <strong>gösterge kurlardır</strong>. Bir bankadan
        veya döviz bürosundan gerçek alım-satım yaptığınızda karşılaşacağınız kur,
        aşağıda açıkladığımız alış-satış farkı nedeniyle bir miktar farklı olur.
      </p>

      <h2>Alış ve Satış Kuru Arasındaki Fark (Spread)</h2>
      <p>
        Döviz büroları ve bankalar iki farklı kur ilan eder: <strong>alış</strong>
        (sizden dövizi satın aldıkları fiyat) ve <strong>satış</strong> (size
        döviz sattıkları fiyat). Satış kuru her zaman alıştan yüksektir; aradaki
        farka <strong>spread</strong> (makas) denir ve kurumun kârını oluşturur.
        Örneğin dolar alışı 34,10 TL, satışı 34,30 TL ise, 1.000 dolar alıp hemen
        geri satarsanız yaklaşık 200 TL kaybedersiniz. Küçük tutarlarda ve sık
        işlemlerde bu makas ciddi maliyet yaratabilir.
      </p>

      <h2>Çapraz Kur Nasıl Hesaplanır?</h2>
      <p>
        İki para birimi arasında doğrudan kur yoksa, ortak bir para birimi
        (genellikle ABD doları veya euro) üzerinden <strong>çapraz kur</strong>
        hesaplanır. Örneğin sterlin/lira kuru bilinmiyorsa: GBP/USD × USD/TRY
        işlemiyle bulunur. 1 GBP = 1,27 USD ve 1 USD = 34,20 TL ise, 1 GBP = 1,27
        × 34,20 = <strong>43,43 TL</strong> olur. Bu araç 150&apos;den fazla para
        birimi arasında bu çapraz hesaplamayı otomatik yapar.
      </p>

      <h2>Ne Zaman Döviz Bozdurmalı? Pratik İpuçları</h2>
      <ul>
        <li><strong>Kur takibi yapın:</strong> Kısa vadeli dalgalanmalar için birkaç günlük eğilime bakın; tek bir günün rakamına göre acele karar vermeyin.</li>
        <li><strong>Makası karşılaştırın:</strong> Aynı gün farklı bankalar/bürolar farklı spread uygular. Büyük tutarlarda birkaç yer karşılaştırmaya değer.</li>
        <li><strong>Komisyon ve masrafları sorun:</strong> Bazı kurumlar kurun yanında ek işlem ücreti alır. Toplam maliyeti net kur üzerinden hesaplayın.</li>
        <li><strong>Seyahat için:</strong> Havalimanı bürolarında spread genellikle en yüksektir; mümkünse önceden şehir merkezinden bozdurun.</li>
      </ul>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Çevirmek istediğiniz tutarı girin.</li>
        <li>Kaynak para birimini seçin (ör. USD).</li>
        <li>Hedef para birimini seçin (ör. TRY).</li>
        <li>Güncel referans kuruna göre sonucu anında görün.</li>
      </ol>

      <h2>Uyarı ve Kaynaklar</h2>
      <p>
        Buradaki kurlar bilgilendirme amaçlı gösterge değerlerdir ve yatırım
        tavsiyesi değildir. Resmi kurlar için{" "}
        <a href="https://www.tcmb.gov.tr" target="_blank" rel="noopener noreferrer">Türkiye Cumhuriyet Merkez Bankası (TCMB)</a>{" "}
        ve{" "}
        <a href="https://www.ecb.europa.eu" target="_blank" rel="noopener noreferrer">Avrupa Merkez Bankası (ECB)</a>{" "}
        referans kurlarını esas alın. Gerçek işlem öncesi bankanızın güncel
        alım-satım kurunu teyit edin.
      </p>
    </>
  ) : (
    <>
      <h2>What Is an Exchange Rate and How Is It Set?</h2>
      <p>
        An exchange rate is the value of one currency expressed in terms of
        another. For example, &quot;1 USD = 34.20 TL&quot; means one US dollar
        equals 34.20 Turkish lira. In free-market economies, rates change
        constantly based on supply and demand. Interest rates, inflation, the
        current account balance, political stability and central bank policy are
        the main drivers. Turkey uses a floating exchange rate regime, meaning the
        market — not a fixed government rate — determines the price.
      </p>

      <h2>Which Rates Does This Tool Use?</h2>
      <p>
        This converter is based on the reference rates published every business
        day by the European Central Bank (ECB). Reference rates reflect average
        interbank values and provide a transparent, reliable baseline. Keep in
        mind these are <strong>indicative rates</strong>: the rate you get at a
        bank or exchange office will differ slightly due to the buy/sell spread
        explained below.
      </p>

      <h2>The Difference Between Buy and Sell Rates (Spread)</h2>
      <p>
        Exchange offices and banks quote two rates: the <strong>buy</strong> rate
        (the price they pay you for currency) and the <strong>sell</strong> rate
        (the price they charge you). The sell rate is always higher; the gap is
        the <strong>spread</strong>, which is the institution&apos;s profit. If the
        dollar buy is 34.10 TL and sell is 34.30 TL, buying 1,000 dollars and
        immediately selling back loses about 200 TL. On small, frequent
        transactions this spread adds up.
      </p>

      <h2>How Cross Rates Are Calculated</h2>
      <p>
        When there is no direct rate between two currencies, a <strong>cross
        rate</strong> is computed through a common currency (usually USD or EUR).
        If GBP/TRY is unknown: GBP/USD × USD/TRY. With 1 GBP = 1.27 USD and 1 USD
        = 34.20 TL, then 1 GBP = 1.27 × 34.20 = <strong>43.43 TL</strong>. This
        tool performs cross calculations across 150+ currencies automatically.
      </p>

      <h2>When to Exchange: Practical Tips</h2>
      <ul>
        <li><strong>Track the rate:</strong> Look at a multi-day trend rather than reacting to a single day&apos;s number.</li>
        <li><strong>Compare spreads:</strong> Different banks apply different spreads on the same day; it pays to compare for large amounts.</li>
        <li><strong>Ask about fees:</strong> Some institutions add transaction fees on top of the rate. Calculate the total cost.</li>
        <li><strong>For travel:</strong> Airport kiosks usually have the widest spread; exchange in the city center beforehand when possible.</li>
      </ul>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter the amount to convert.</li>
        <li>Select the source currency (e.g., USD).</li>
        <li>Select the target currency (e.g., TRY).</li>
        <li>See the result instantly at the current reference rate.</li>
      </ol>

      <h2>Disclaimer and Sources</h2>
      <p>
        Rates here are indicative and not investment advice. For official rates,
        rely on the{" "}
        <a href="https://www.ecb.europa.eu" target="_blank" rel="noopener noreferrer">European Central Bank (ECB)</a>{" "}
        reference rates and confirm your bank&apos;s current buy/sell rate before
        any real transaction.
      </p>
    </>
  );

  return (
    <ToolLayout toolId="currency-converter" locale={locale} faq={faq} guide={guide}>
      <CurrencyConverter />
    </ToolLayout>
  );
}
