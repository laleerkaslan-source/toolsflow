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
      ? "2026 Gelir Vergisi Dilimleri — Ucret, Serbest Meslek, Kira"
      : "2026 Income Tax Brackets in Turkey — Full Guide",
    description: isTr
      ? "2026 yili gelir vergisi dilimleri, ucretli-ucretsiz oranlari, kumulatif hesaplama yontemi ve ornekler."
      : "2026 income tax brackets in Turkey, wage/non-wage rates, cumulative calculation method and examples.",
    alternates: {
      canonical: isTr
        ? "/blog/gelir-vergisi-dilimleri-2026"
        : "/en/blog/gelir-vergisi-dilimleri-2026",
      languages: {
        tr: "/blog/gelir-vergisi-dilimleri-2026",
        en: "/en/blog/gelir-vergisi-dilimleri-2026",
      },
    },
  };
}

export default async function GelirVergisiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "2026 gelir vergisi dilimleri nelerdir?",
          a: "2026 icin ucretli dilimleri: 158.000'e kadar %15; 330.000'e kadar %20; 800.000'e kadar %27; 4.300.000'e kadar %35; uzeri %40.",
        },
        {
          q: "Kumulatif vergilendirme ne demek?",
          a: "Yil icinde kazanilan tum brut ucretler toplanir ve bu kumulatif matraha gore vergi dilimi belirlenir. Yilin son aylarinda ust dilimlere gecilebilir.",
        },
        {
          q: "Ucret gelirleri disindaki dilimler farkli mi?",
          a: "Evet. Serbest meslek, kira ve ticari kazancta son iki dilim biraz farklidir: 800.000'e kadar %27, 2.000.000'a kadar %35, uzeri %40.",
        },
        {
          q: "Asgari ucret gelir vergisinden muaf mi?",
          a: "Evet. Tum ucretlilerde asgari ucret tutarina kadar olan gelir kismi gelir vergisinden muaftir.",
        },
      ]
    : [
        {
          q: "What are the 2026 income tax brackets?",
          a: "For wage income: up to 158,000 TL at 15%; to 330,000 at 20%; to 800,000 at 27%; to 4,300,000 at 35%; above at 40%.",
        },
        {
          q: "What is cumulative taxation?",
          a: "All gross wages earned during the year are summed, and the tax bracket is determined by this cumulative base. Employees may move to higher brackets later in the year.",
        },
        {
          q: "Are non-wage brackets different?",
          a: "Yes. For self-employed, rental and commercial income the upper two tiers are: to 800,000 at 27%, to 2,000,000 at 35%, above at 40%.",
        },
        {
          q: "Is minimum wage exempt from income tax?",
          a: "Yes. For all employees, income up to the minimum wage level is exempt from income tax.",
        },
      ];

  return (
    <BlogLayout
      slug="gelir-vergisi-dilimleri-2026"
      title={
        isTr
          ? "2026 Gelir Vergisi Dilimleri ve Oranlari"
          : "2026 Turkish Income Tax Brackets & Rates"
      }
      description={
        isTr
          ? "2026 yili icin guncel gelir vergisi dilimleri, kumulatif hesaplama ve ornek senaryolar."
          : "Current 2026 income tax brackets, cumulative calculation method and example scenarios."
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
          <h2>2026 Ucret Gelirleri Vergi Dilimleri</h2>
          <table>
            <thead>
              <tr><th>Dilim</th><th>Oran</th></tr>
            </thead>
            <tbody>
              <tr><td>0 - 158.000 TL</td><td>%15</td></tr>
              <tr><td>158.000 - 330.000 TL</td><td>%20</td></tr>
              <tr><td>330.000 - 800.000 TL</td><td>%27</td></tr>
              <tr><td>800.000 - 4.300.000 TL</td><td>%35</td></tr>
              <tr><td>4.300.000 TL uzeri</td><td>%40</td></tr>
            </tbody>
          </table>

          <h2>Ucret Disi Gelirler</h2>
          <p>
            Serbest meslek, kira, ticari kazanc gibi gelirlerde ust iki dilim
            daha dusuk esiklerden baslar:
          </p>
          <table>
            <thead>
              <tr><th>Dilim</th><th>Oran</th></tr>
            </thead>
            <tbody>
              <tr><td>0 - 158.000 TL</td><td>%15</td></tr>
              <tr><td>158.000 - 330.000 TL</td><td>%20</td></tr>
              <tr><td>330.000 - 800.000 TL</td><td>%27</td></tr>
              <tr><td>800.000 - 2.000.000 TL</td><td>%35</td></tr>
              <tr><td>2.000.000 TL uzeri</td><td>%40</td></tr>
            </tbody>
          </table>

          <h2>Kumulatif Hesaplama Nasil Isler?</h2>
          <p>
            Turkiye&apos;de ucret gelirleri <strong>kumulatif</strong> vergilendirilir.
            Ocak ayindan itibaren toplam brut gelir dilim esigini astikca, sonraki
            aylarda daha yuksek oranda vergi odenir.
          </p>

          <h2>Ornek: 45.000 TL Brut Aylik</h2>
          <ul>
            <li>Ocak - Mart: Kumulatif 135.000 TL &lt; 158.000 → %15</li>
            <li>Nisan - Temmuz: Kumulatif 158.000 - 330.000 → %20</li>
            <li>Agustos - Aralik: Kumulatif 330.000 uzeri → %27</li>
          </ul>
          <p>
            Bu nedenle calisanin <strong>net maasi yil sonuna dogru azalir</strong> —
            brut maas sabit olsa bile.
          </p>

          <h2>Asgari Ucret Istisnasi</h2>
          <p>
            2022&apos;den itibaren asgari ucret tutari kadar olan gelir kismi
            tum ucretlilerde gelir vergisinden muaftir. Bu sayede net maaslar
            ozellikle dusuk gelir grubunda onemli olcude korunur.
          </p>

          <h2>Maas Hesaplamasi</h2>
          <p>
            Yil icinde hangi ayda dilim degistireceginizi ve net maasiniz nasil
            degisecegini <strong>maas hesaplayicimiz</strong> ile gorebilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>2026 Wage Income Tax Brackets</h2>
          <table>
            <thead><tr><th>Bracket</th><th>Rate</th></tr></thead>
            <tbody>
              <tr><td>0 - 158,000 TL</td><td>15%</td></tr>
              <tr><td>158,000 - 330,000 TL</td><td>20%</td></tr>
              <tr><td>330,000 - 800,000 TL</td><td>27%</td></tr>
              <tr><td>800,000 - 4,300,000 TL</td><td>35%</td></tr>
              <tr><td>Over 4,300,000 TL</td><td>40%</td></tr>
            </tbody>
          </table>

          <h2>Non-Wage Income</h2>
          <p>Self-employment, rental and commercial income have lower upper thresholds:</p>
          <table>
            <thead><tr><th>Bracket</th><th>Rate</th></tr></thead>
            <tbody>
              <tr><td>0 - 158,000 TL</td><td>15%</td></tr>
              <tr><td>158,000 - 330,000 TL</td><td>20%</td></tr>
              <tr><td>330,000 - 800,000 TL</td><td>27%</td></tr>
              <tr><td>800,000 - 2,000,000 TL</td><td>35%</td></tr>
              <tr><td>Over 2,000,000 TL</td><td>40%</td></tr>
            </tbody>
          </table>

          <h2>Cumulative Taxation</h2>
          <p>
            Turkey taxes wage income <strong>cumulatively</strong>. Once year-to-date
            income exceeds a threshold, subsequent months are taxed at the higher rate.
          </p>

          <h2>Example: 45,000 TL Gross/Month</h2>
          <ul>
            <li>Jan-Mar: Cumulative 135,000 TL &lt; 158,000 → 15%</li>
            <li>Apr-Jul: Cumulative 158,000-330,000 → 20%</li>
            <li>Aug-Dec: Cumulative over 330,000 → 27%</li>
          </ul>
          <p>
            Hence, <strong>net salary decreases toward year-end</strong> even with
            constant gross pay.
          </p>

          <h2>Minimum Wage Exemption</h2>
          <p>
            Since 2022, income up to the minimum wage level is exempt from income
            tax for all employees.
          </p>

          <h2>Calculate Your Salary</h2>
          <p>
            Use our <strong>salary calculator</strong> to see when you change
            brackets and how net pay evolves monthly.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
