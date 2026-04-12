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
      ? "Ihbar Tazminati Hesaplama 2026 — Sureler, Hak Kazanma, Ornek"
      : "Notice Pay Calculation 2026 (Turkey) — Periods, Eligibility",
    description: isTr
      ? "Ihbar tazminati nedir, kac gun, kimler hak kazanir? 4857 sayili Is Kanunu'na gore ihbar sureleri, hesaplama formulu ve ornek."
      : "What is notice pay in Turkey? Periods, eligibility and calculation formula based on Labor Law No. 4857 with examples.",
    alternates: {
      canonical: isTr
        ? "/blog/ihbar-tazminati-hesaplama-2026"
        : "/en/blog/ihbar-tazminati-hesaplama-2026",
      languages: {
        tr: "/blog/ihbar-tazminati-hesaplama-2026",
        en: "/en/blog/ihbar-tazminati-hesaplama-2026",
      },
    },
  };
}

export default async function IhbarTazminatiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Ihbar tazminati nedir?",
          a: "Is sozlesmesini feshederken yasal ihbar suresine uymayan tarafin karsi tarafa odedigi tazminattir. Hem isveren hem isci tarafindan odenebilir.",
        },
        {
          q: "Ihbar tazminati kac gun?",
          a: "Kidem suresine gore degisir: 6 ay altinda 2 hafta, 6 ay - 1,5 yil arasi 4 hafta, 1,5 - 3 yil arasi 6 hafta, 3 yil uzeri 8 haftadir.",
        },
        {
          q: "Kidem tazminati ile ihbar tazminati ayni midir?",
          a: "Hayir. Kidem tazminati 1 yildan fazla calisanlara haklı nedenle fesihte odenir. Ihbar tazminati ise ihbar suresine uyulmadiginda odenir ve vergiye tabidir.",
        },
        {
          q: "Istifa edersem ihbar tazminati alir miyim?",
          a: "Istifa eden isci ihbar suresine uymak zorundadir. Uymazsa isverene ihbar tazminati odemek durumunda kalabilir — alici degil verici olur.",
        },
      ]
    : [
        {
          q: "What is notice pay?",
          a: "Compensation paid by the party terminating the employment contract without adhering to the legal notice period. Payable by either employer or employee.",
        },
        {
          q: "How many days of notice pay?",
          a: "Depends on tenure: under 6 months = 2 weeks; 6-18 months = 4 weeks; 1.5-3 years = 6 weeks; over 3 years = 8 weeks.",
        },
        {
          q: "Is notice pay the same as severance pay?",
          a: "No. Severance pay applies to employees with 1+ year tenure terminated with cause. Notice pay compensates for skipped notice period and is taxable.",
        },
        {
          q: "Do I get notice pay if I resign?",
          a: "Resigning employees must serve the notice period. If not, they may owe notice pay to the employer — not the other way around.",
        },
      ];

  return (
    <BlogLayout
      slug="ihbar-tazminati-hesaplama-2026"
      title={
        isTr
          ? "Ihbar Tazminati Hesaplama Rehberi 2026"
          : "Notice Pay Calculation Guide 2026 (Turkey)"
      }
      description={
        isTr
          ? "4857 sayili Is Kanunu'na gore ihbar sureleri, hak kazanma sartlari ve hesaplama ornekleri."
          : "Notice periods, eligibility requirements and calculation examples under Turkish Labor Law No. 4857."
      }
      datePublished="2026-04-12"
      locale={locale}
      relatedTool={{
        href: "/tools/severance-calculator",
        label: isTr ? "Tazminat Hesaplayiciya Git" : "Go to Severance Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Ihbar Tazminati Nedir?</h2>
          <p>
            Ihbar tazminati, is sozlesmesini fesheden tarafin <strong>yasal ihbar
            suresine</strong> uymamasi durumunda karsi tarafa odedigi tazminattir.
            4857 sayili Is Kanunu madde 17&apos;de duzenlenmistir.
          </p>

          <h2>Ihbar Sureleri</h2>
          <table>
            <thead>
              <tr>
                <th>Kidem Suresi</th>
                <th>Ihbar Suresi</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>6 aydan az</td><td>2 hafta</td></tr>
              <tr><td>6 ay - 1,5 yil</td><td>4 hafta</td></tr>
              <tr><td>1,5 - 3 yil</td><td>6 hafta</td></tr>
              <tr><td>3 yildan fazla</td><td>8 hafta</td></tr>
            </tbody>
          </table>

          <h2>Ihbar Tazminati Nasil Hesaplanir?</h2>
          <p>
            <strong>Ihbar Tazminati = Gunluk Brut Ucret × Ihbar Suresi (gun)</strong>
          </p>
          <p>
            Hesaplamada giydirilmis brut ucret kullanilir — yani ikramiye, yemek,
            yol, prim gibi duzenli eklemeler de dahildir.
          </p>

          <h2>Ornek Hesaplama</h2>
          <p>
            4 yil calismis, brut aylik ucreti 45.000 TL olan bir calisanin ihbar
            tazminati:
          </p>
          <ul>
            <li>Gunluk brut ucret: 45.000 / 30 = 1.500 TL</li>
            <li>Ihbar suresi: 8 hafta = 56 gun</li>
            <li>Ihbar tazminati: 1.500 × 56 = <strong>84.000 TL brut</strong></li>
          </ul>
          <p>
            Ihbar tazminati gelir vergisi ve damga vergisine <strong>tabidir</strong>.
            Bu yonuyle kidem tazminatindan ayrisir.
          </p>

          <h2>Hangi Durumlarda Odenir?</h2>
          <ul>
            <li>Isveren haksiz fesih yaptiginda (ihbar suresine uymadan)</li>
            <li>Isci ihbar suresine uymadan istifa ettiginde (iscinin odemesi gerekir)</li>
            <li>Belirsiz sureli is sozlesmelerinde gecerlidir</li>
          </ul>

          <h2>Hesaplamak Icin</h2>
          <p>
            Kidem ve ihbar tazminati hesaplamak icin
            <strong> tazminat hesaplayici aracimizi</strong> kullanabilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>What Is Notice Pay?</h2>
          <p>
            Notice pay is compensation paid when the party terminating the employment
            contract fails to observe the legally required notice period. Defined in
            Article 17 of Turkish Labor Law No. 4857.
          </p>

          <h2>Notice Periods</h2>
          <table>
            <thead>
              <tr><th>Tenure</th><th>Notice Period</th></tr>
            </thead>
            <tbody>
              <tr><td>Under 6 months</td><td>2 weeks</td></tr>
              <tr><td>6 months - 1.5 years</td><td>4 weeks</td></tr>
              <tr><td>1.5 - 3 years</td><td>6 weeks</td></tr>
              <tr><td>Over 3 years</td><td>8 weeks</td></tr>
            </tbody>
          </table>

          <h2>Calculation Formula</h2>
          <p>
            <strong>Notice Pay = Daily Gross Wage × Notice Period (days)</strong>
          </p>
          <p>
            The calculation uses the &quot;dressed&quot; gross wage — including regular
            additions such as bonuses, meal, travel, and premiums.
          </p>

          <h2>Example</h2>
          <p>
            An employee with 4 years of tenure earning 45,000 TL gross monthly:
          </p>
          <ul>
            <li>Daily gross: 45,000 / 30 = 1,500 TL</li>
            <li>Notice period: 8 weeks = 56 days</li>
            <li>Notice pay: 1,500 × 56 = <strong>84,000 TL gross</strong></li>
          </ul>
          <p>
            Notice pay is <strong>subject to</strong> income tax and stamp tax,
            unlike severance pay.
          </p>

          <h2>When Is It Paid?</h2>
          <ul>
            <li>Employer termination without proper notice</li>
            <li>Employee resigning without notice (employee pays employer)</li>
            <li>Applies to indefinite-term employment contracts</li>
          </ul>

          <h2>Calculate Yours</h2>
          <p>
            Use our <strong>severance calculator</strong> for both severance and
            notice pay calculations.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
