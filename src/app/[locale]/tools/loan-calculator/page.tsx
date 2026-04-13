import { ToolLayout } from "@/components/tools/tool-layout";
import { LoanCalculator } from "@/components/tools/loan-calculator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Kredi Hesaplayıcı — Taksit ve Faiz Hesaplama" : "Loan Calculator — Payment & Interest",
    description: isTr
      ? "Kredi tutarı, faiz oranı ve vadeye göre aylık taksit hesaplayın. KKDF ve BSMV dahil amortisman tablosu. Ücretsiz kredi hesaplama aracı."
      : "Calculate monthly payments based on loan amount, interest rate and term. Full amortization schedule with KKDF and BSMV.",
    alternates: {
      canonical: isTr ? "/araclar/kredi-hesaplayici" : "/en/tools/loan-calculator",
      languages: {
        tr: "/araclar/kredi-hesaplayici",
        en: "/en/tools/loan-calculator",
      },
    },
  };
}

export default async function LoanCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "KKDF ve BSMV nedir?",
          a: "KKDF (Kaynak Kullanımını Destekleme Fonu) %15 ve BSMV (Banka ve Sigorta Muameleleri Vergisi) %10 oranında faiz üzerinden hesaplanır. Tüketici kredilerinde bu vergiler faize eklenir.",
        },
        {
          q: "Aylık faiz oranı nedir?",
          a: "Aylık faiz oranı, bankaların kredi için uyguladığı aylık yüzdelik orandır. Yıllık faiz oranını 12'ye bölerek yaklaşık aylık oranı bulabilirsiniz.",
        },
        {
          q: "Amortisman tablosu ne gösterir?",
          a: "Amortisman tablosu her ay ne kadar anapara, faiz ve KKDF+BSMV ödediğinizi ve kalan borç tutarını gösterir. İlk aylarda faiz payı yüksek, son aylarda anapara payı yüksektir.",
        },
        {
          q: "Erken ödeme yaparsam ne olur?",
          a: "Erken ödeme yaparsanız kalan anapara üzerinden faiz hesaplanır, bu nedenle toplam faiz maliyetiniz düşer. Bankalar erken ödeme komisyonu alabilir.",
        },
      ]
    : [
        {
          q: "What are KKDF and BSMV?",
          a: "KKDF (Resource Utilization Support Fund) at 15% and BSMV (Banking and Insurance Transaction Tax) at 10% are calculated on the interest amount. These taxes are added to consumer loan interest.",
        },
        {
          q: "What is the monthly interest rate?",
          a: "The monthly interest rate is the percentage charged by banks per month. You can approximate it by dividing the annual rate by 12.",
        },
        {
          q: "What does the amortization table show?",
          a: "The amortization table shows how much principal, interest and KKDF+BSMV you pay each month and the remaining balance. Interest portion is higher in early months, principal portion is higher in later months.",
        },
        {
          q: "What happens if I pay early?",
          a: "If you make early payments, interest is calculated on the remaining principal, reducing your total interest cost. Banks may charge an early payment fee.",
        },
      ];

  const guide = isTr ? (
    <>
      <h2>Kredi Taksidi Nasıl Hesaplanır?</h2>
      <p>
        Kredi taksidi, <strong>anüite (eşit taksitli)</strong> yöntemi ile hesaplanır:
        her ay aynı tutar ödersiniz, ancak bu tutarın anapara ve faiz oranı değişir.
        İlk aylarda faiz payı yüksek, son aylarda anapara payı yüksektir.
      </p>
      <p>
        Formül: <code>Taksit = P × [r(1+r)^n] / [(1+r)^n - 1]</code> — P: kredi tutarı,
        r: aylık faiz, n: vade (ay). Tüketici kredilerinde faize
        <strong> KKDF (%15) + BSMV (%10)</strong> eklenir.
      </p>

      <h2>Konut Kredisi mi İhtiyaç Kredisi mi?</h2>
      <p>
        Konut kredilerinde <strong>KKDF ve BSMV yoktur</strong>, vadeler 120-240 aya
        kadar uzar, faizler daha düşüktür. İhtiyaç kredisi ise daha yüksek faizli
        ama teminatsız ve hızlıdır. Büyük tutar ve uzun vade için konut kredisi
        tercih edilmelidir.
      </p>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Kredi tutarı, vade (ay) ve aylık faiz oranını girin</li>
        <li>Kredi türünü seçin (ihtiyaç/konut) — vergi hesaplaması değişir</li>
        <li>Aylık taksit, toplam ödeme ve amortisman tablosunu görün</li>
      </ol>

      <h2>Erken Kapama Avantajı</h2>
      <p>
        Kredinizi erken kapatırsanız henüz tahakkuk etmemiş faizleri ödemezsiniz.
        Bankalar genellikle kalan anapara üzerinden %1-2 erken kapama komisyonu
        alır ancak toplam tasarruf çoğu zaman komisyondan yüksektir.
      </p>

      <h2>İlgili Rehberler</h2>
      <ul>
        <li><a href="/blog/konut-kredisi-ihtiyac-kredisi">Konut Kredisi vs İhtiyaç Kredisi</a></li>
        <li><a href="/blog/bilesik-faiz-hesaplama">Bileşik Faiz Nedir?</a></li>
      </ul>
    </>
  ) : (
    <>
      <h2>How Loan Payments Are Calculated</h2>
      <p>
        Loan payments use the <strong>annuity (equal installments)</strong> method:
        each month you pay the same amount, but the principal/interest split shifts
        — interest-heavy early, principal-heavy later.
      </p>
      <p>
        Formula: <code>Payment = P × [r(1+r)^n] / [(1+r)^n - 1]</code>. Turkish consumer
        loans add <strong>KKDF (15%) + BSMV (10%)</strong> on top of interest.
      </p>

      <h2>Mortgage vs Personal Loan</h2>
      <p>
        Mortgages are exempt from KKDF and BSMV, offer 120-240 month terms and lower
        rates. Personal loans are faster and unsecured but costlier. For large
        amounts and long terms, prefer a mortgage.
      </p>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter loan amount, term (months) and monthly rate</li>
        <li>Select loan type (personal/mortgage) — tax calculation differs</li>
        <li>Review monthly payment, total cost and full amortization schedule</li>
      </ol>

      <h2>Early Repayment</h2>
      <p>
        Paying off early eliminates unaccrued interest. Banks typically charge a
        1-2% prepayment fee on the remaining balance — but the interest savings
        usually outweigh the fee.
      </p>

      <h2>Related Guides</h2>
      <ul>
        <li><a href="/en/blog/konut-kredisi-ihtiyac-kredisi">Mortgage vs Personal Loan</a></li>
        <li><a href="/en/blog/bilesik-faiz-hesaplama">Compound Interest Explained</a></li>
      </ul>
    </>
  );

  return (
    <ToolLayout toolId="loan-calculator" locale={locale} faq={faq} guide={guide}>
      <LoanCalculator />
    </ToolLayout>
  );
}
