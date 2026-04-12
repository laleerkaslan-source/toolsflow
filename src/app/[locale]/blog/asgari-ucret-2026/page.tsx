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
      ? "2026 Asgari Ucret Brut Net — AGI, SGK, Isveren Maliyeti"
      : "2026 Minimum Wage in Turkey — Gross, Net, Employer Cost",
    description: isTr
      ? "2026 asgari ucret brut 22.104,67 TL, net 17.002 TL. SGK kesintileri, asgari gecim indirimi ve isveren maliyeti detaylari."
      : "2026 minimum wage in Turkey: 22,104.67 TL gross, 17,002 TL net. SSI deductions, tax exemption and full employer cost breakdown.",
    alternates: {
      canonical: isTr
        ? "/blog/asgari-ucret-2026"
        : "/en/blog/asgari-ucret-2026",
      languages: {
        tr: "/blog/asgari-ucret-2026",
        en: "/en/blog/asgari-ucret-2026",
      },
    },
  };
}

export default async function AsgariUcretPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "2026 asgari ucret ne kadar?",
          a: "2026 yili asgari ucret brut 22.104,67 TL, net yaklasik 17.002 TL olarak belirlenmistir.",
        },
        {
          q: "Asgari ucret vergiden muaf mi?",
          a: "Evet. 2022'den itibaren asgari ucret tutarina kadar olan gelir kismi gelir vergisi ve damga vergisinden muaftir.",
        },
        {
          q: "Asgari ucretin isverene maliyeti nedir?",
          a: "SGK isveren payi ve issizlik sigortasi ile birlikte 2026 asgari ucretin isverene maliyeti yaklasik 26.005 TL'dir.",
        },
        {
          q: "Asgari ucret yil ortasinda artar mi?",
          a: "2026 icin Ocak'ta belirlenen zam ile yil boyunca ayni tutar uygulanmaktadir. Enflasyona bagli ek zam karari Bakanlar Kurulu takdirindedir.",
        },
      ]
    : [
        {
          q: "What is the 2026 minimum wage in Turkey?",
          a: "The 2026 minimum wage is 22,104.67 TL gross, approximately 17,002 TL net.",
        },
        {
          q: "Is the minimum wage tax-exempt?",
          a: "Yes. Since 2022, income up to the minimum wage level is exempt from both income tax and stamp tax.",
        },
        {
          q: "What is the employer cost of the minimum wage?",
          a: "Including SSI employer share and unemployment insurance, the total employer cost is approximately 26,005 TL for 2026.",
        },
        {
          q: "Will the minimum wage increase mid-year?",
          a: "The 2026 rate was set in January and applies throughout the year. Any additional inflation-based raise is at the government's discretion.",
        },
      ];

  return (
    <BlogLayout
      slug="asgari-ucret-2026"
      title={
        isTr
          ? "2026 Asgari Ucret — Brut, Net ve Isveren Maliyeti"
          : "2026 Minimum Wage in Turkey — Gross, Net & Employer Cost"
      }
      description={
        isTr
          ? "2026 asgari ucret tum detaylariyla: brut-net tutar, SGK kesintileri, AGI ve isveren maliyeti."
          : "Everything about the 2026 minimum wage: gross-net amount, SSI deductions, exemption and employer cost."
      }
      datePublished="2026-04-12"
      locale={locale}
      relatedTool={{
        href: "/tools/salary-calculator",
        label: isTr ? "Maas Hesaplayiciya Git" : "Go to Salary Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>2026 Asgari Ucret Ne Kadar?</h2>
          <p>
            2026 yili icin belirlenen asgari ucret <strong>brut 22.104,67 TL</strong>,
            <strong> net 17.002 TL</strong> tutarindadir. Bu tutar, aylik 30 gun
            uzerinden hesaplanmaktadir.
          </p>

          <h2>Asgari Ucret Kesintileri</h2>
          <table>
            <thead>
              <tr>
                <th>Kalem</th>
                <th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Brut Asgari Ucret</td><td>22.104,67 TL</td></tr>
              <tr><td>SGK Isci Payi (%14)</td><td>-3.094,65 TL</td></tr>
              <tr><td>Issizlik Sigortasi (%1)</td><td>-221,05 TL</td></tr>
              <tr><td>Gelir Vergisi (muaf)</td><td>0 TL</td></tr>
              <tr><td>Damga Vergisi (muaf)</td><td>0 TL</td></tr>
              <tr><td><strong>Net Maas</strong></td><td><strong>17.002,12 TL</strong></td></tr>
            </tbody>
          </table>

          <h2>Isveren Maliyeti</h2>
          <p>
            Isveren, brut asgari ucretin yaninda SGK isveren payi (%15,5 veya
            %20,5) ve issizlik sigortasi (%2) odemektedir. Toplam isveren maliyeti
            yaklasik <strong>26.005 TL</strong>&apos;dir.
          </p>

          <h2>Asgari Ucret Vergi Istisnasi</h2>
          <p>
            2022 yilindan itibaren Turkiye&apos;de tum ucretlilerin asgari ucret
            tutarina kadar olan gelir kismi gelir vergisi ve damga vergisinden
            muaftir. Bu duzenleme asgari ucretli ile daha yuksek maasli calisanlarin
            hepsine esit sekilde uygulanir.
          </p>

          <h2>Net Maas Hesaplamasi Icin</h2>
          <p>
            Kendi maasinizi hesaplamak veya zam sonrasi yeni net maasinizi
            gormek icin <strong>maas hesaplayici aracimizi</strong> kullanabilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>2026 Minimum Wage in Turkey</h2>
          <p>
            The 2026 minimum wage in Turkey is <strong>22,104.67 TL gross</strong> and
            <strong> 17,002 TL net</strong> per month (30-day basis).
          </p>

          <h2>Minimum Wage Deductions</h2>
          <table>
            <thead>
              <tr><th>Item</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Gross Minimum Wage</td><td>22,104.67 TL</td></tr>
              <tr><td>SSI Employee (-14%)</td><td>-3,094.65 TL</td></tr>
              <tr><td>Unemployment Ins. (-1%)</td><td>-221.05 TL</td></tr>
              <tr><td>Income Tax (exempt)</td><td>0 TL</td></tr>
              <tr><td>Stamp Tax (exempt)</td><td>0 TL</td></tr>
              <tr><td><strong>Net Salary</strong></td><td><strong>17,002.12 TL</strong></td></tr>
            </tbody>
          </table>

          <h2>Total Employer Cost</h2>
          <p>
            Employers pay SSI employer share (15.5% or 20.5%) and unemployment
            insurance (2%) on top of the gross wage. Total employer cost is
            approximately <strong>26,005 TL</strong>.
          </p>

          <h2>Minimum Wage Tax Exemption</h2>
          <p>
            Since 2022, income up to the minimum wage level is fully exempt from
            income tax and stamp tax for all employees, regardless of total salary.
          </p>

          <h2>Calculate Your Salary</h2>
          <p>
            Use our <strong>salary calculator</strong> to compute your own gross-net
            breakdown or see the impact of the annual raise.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
