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

  return (
    <ToolLayout toolId="loan-calculator" locale={locale} faq={faq}>
      <LoanCalculator />
    </ToolLayout>
  );
}
