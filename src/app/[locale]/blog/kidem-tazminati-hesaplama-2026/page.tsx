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
      ? "Kidem Tazminati Hesaplama 2026 — Tavan, Sartlar, Ornek"
      : "Severance Pay Calculation 2026 Turkey — Ceiling, Conditions, Examples",
    description: isTr
      ? "Kidem tazminati nasil hesaplanir? 2026 guncel tavan tutari, hak kazanma sartlari, damga vergisi, ihbar suresi ve ornek hesaplamalar."
      : "How is severance pay calculated in Turkey? 2026 ceiling, eligibility, stamp tax, notice period and example calculations.",
    alternates: {
      canonical: isTr
        ? "/blog/kidem-tazminati-hesaplama-2026"
        : "/en/blog/kidem-tazminati-hesaplama-2026",
      languages: {
        tr: "/blog/kidem-tazminati-hesaplama-2026",
        en: "/en/blog/kidem-tazminati-hesaplama-2026",
      },
    },
  };
}

export default async function KidemTazminatiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Kidem tazminati almak icin en az kac yil calismak gerekir?",
          a: "Kidem tazminati alabilmek icin ayni isverenin yaninda en az 1 yil (365 gun) calismis olmak gerekmektedir.",
        },
        {
          q: "Istifa edersem kidem tazminati alabilir miyim?",
          a: "Normal istifada kidem tazminati hakkiniz yoktur. Ancak evlilik (kadin), askerlik, emeklilik, saglik sorunlari gibi hakli nedenlerle istifa ederseniz kidem tazminati alabilirsiniz.",
        },
        {
          q: "2026 kidem tazminati tavani ne kadar?",
          a: "2026 yili ikinci yarisi (Temmuz-Aralik) icin kidem tazminati tavani 44.764,27 TL'dir. Brut maasiniz bu tutarin uzerinde olsa bile her yil icin en fazla tavan tutari kadar tazminat alabilirsiniz.",
        },
        {
          q: "Kidem tazminatindan vergi kesilir mi?",
          a: "Kidem tazminati gelir vergisinden muaftir. Ancak %0,759 oraninda damga vergisi kesilir.",
        },
        {
          q: "Part-time calisanlar kidem tazminati alabilir mi?",
          a: "Evet, part-time calisanlar da en az 1 yil calisma suresini tamamlamis ve hakli nedenle ayrilmislarsä kidem tazminati alabilir. Tazminat brut ucret uzerinden hesaplanir.",
        },
      ]
    : [
        {
          q: "What is the minimum employment period for severance pay?",
          a: "You must have worked for the same employer for at least 1 year (365 days) to be eligible for severance pay.",
        },
        {
          q: "Can I get severance pay if I resign?",
          a: "Normal resignation does not qualify for severance pay. However, you can receive it if you resign for justified reasons: marriage (women), military service, retirement, or health issues.",
        },
        {
          q: "What is the 2026 severance pay ceiling?",
          a: "The ceiling for the second half of 2026 (July-December) is 44,764.27 TL. Even if your gross salary is higher, you can receive a maximum of this ceiling amount per year of service.",
        },
        {
          q: "Is severance pay taxed?",
          a: "Severance pay is exempt from income tax. However, stamp tax of 0.759% is deducted.",
        },
        {
          q: "Can part-time employees receive severance pay?",
          a: "Yes, part-time employees who have completed at least 1 year and leave for a justified reason are eligible. Severance is calculated based on gross salary.",
        },
      ];

  return (
    <BlogLayout
      slug="kidem-tazminati-hesaplama-2026"
      title={
        isTr
          ? "Kidem Tazminati Hesaplama 2026 — Tavan, Sartlar ve Ornek"
          : "Severance Pay Calculation 2026 in Turkey — Ceiling, Conditions & Examples"
      }
      description={
        isTr
          ? "Kidem tazminati hakkinizda bilmeniz gereken her sey: hesaplama yontemi, guncel tavan, sartlar."
          : "Everything you need to know about severance pay: calculation method, current ceiling, conditions."
      }
      datePublished="2026-04-09"
      locale={locale}
      relatedTool={{
        href: "/tools/severance-calculator",
        label: isTr
          ? "Kidem Tazminati Hesaplayiciya Git"
          : "Go to Severance Pay Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Kidem Tazminati Nedir?</h2>
          <p>
            Kidem tazminati, isverenin yaninda en az 1 yil calisip belirli kosullarla
            isten ayrilan isçiye odenen tazminattir. Her tam calisma yili icin 30 gunluk
            brut maas tutarinda tazminat hesaplanir.
          </p>

          <h2>Kidem Tazminati Hak Kazanma Sartlari</h2>
          <p>Asagidaki durumlarda kidem tazminati alabilirsiniz:</p>
          <ul>
            <li><strong>Isveren tarafindan iscilikten cikarilma</strong> (hakli fesih disindaki nedenlerle)</li>
            <li><strong>Askerlik hizmeti</strong> icin isten ayrilma</li>
            <li><strong>Emeklilik</strong> (yas ve prim gun sartini saglama)</li>
            <li><strong>Evlilik</strong> nedeniyle isten ayrilma (kadin isciler icin, evlendikten sonra 1 yil icinde)</li>
            <li><strong>Saglik sorunlari</strong> nedeniyle calisma gucu kaybı</li>
            <li><strong>Isverenin hakli sebep olusturmasi</strong> (maas odememe, mobbing vb.)</li>
            <li><strong>Olum</strong> halinde varislerine odenir</li>
          </ul>

          <h2>Kidem Tazminati Hesaplama Formulu</h2>
          <p>
            <strong>Kidem Tazminati = Hizmet Suresi (yil) x 30 Gunluk Brut Ucret</strong>
          </p>
          <p>
            30 gunluk brut ucret hesaplanirken maasa ek olarak sureklilik arz eden
            yan haklar da dahil edilir:
          </p>
          <ul>
            <li>Yemek yardimi</li>
            <li>Yol yardimi</li>
            <li>Duzenli prim ve ikramiye</li>
            <li>Aile ve cocuk yardimi</li>
          </ul>

          <h2>2026 Kidem Tazminati Tavani</h2>
          <table>
            <thead>
              <tr>
                <th>Donem</th>
                <th>Tavan Tutari</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026 Ocak - Haziran</td>
                <td>41.828,42 TL</td>
              </tr>
              <tr>
                <td>2026 Temmuz - Aralik</td>
                <td>44.764,27 TL</td>
              </tr>
              <tr>
                <td>2024 Temmuz - Aralik</td>
                <td>35.058,58 TL</td>
              </tr>
              <tr>
                <td>2024 Ocak - Haziran</td>
                <td>23.489,83 TL</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Onemli:</strong> Brut maasiniz tavan tutarinin uzerinde olsa bile,
            her calisma yili icin en fazla tavan tutari kadar tazminat alabilirsiniz.
          </p>

          <h2>Damga Vergisi Kesintisi</h2>
          <p>
            Kidem tazminati gelir vergisinden muaftir. Ancak toplam tazminat tutari
            uzerinden <strong>%0,759 damga vergisi</strong> kesilir.
          </p>

          <h2>Ornek Hesaplama</h2>
          <p>
            <strong>Senaryo:</strong> 5 yil 3 ay calismis, 35.000 TL brut maasli bir calisan
          </p>
          <table>
            <thead>
              <tr>
                <th>Kalem</th>
                <th>Deger</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hizmet suresi</td>
                <td>5 yil 3 ay (5,25 yil)</td>
              </tr>
              <tr>
                <td>Brut maas (30 gun)</td>
                <td>35.000 TL</td>
              </tr>
              <tr>
                <td>Tavan kontrolu</td>
                <td>35.000 &lt; 44.764,27 (tavan altinda)</td>
              </tr>
              <tr>
                <td>Brut tazminat</td>
                <td>5,25 x 35.000 = 183.750 TL</td>
              </tr>
              <tr>
                <td>Damga vergisi (%0,759)</td>
                <td>-1.394,66 TL</td>
              </tr>
              <tr>
                <td><strong>Net tazminat</strong></td>
                <td><strong>182.355,34 TL</strong></td>
              </tr>
            </tbody>
          </table>

          <h2>Ihbar Suresi ile Kidem Tazminatinin Farki</h2>
          <p>
            Ihbar tazminati ve kidem tazminati farkli kavramlardir:
          </p>
          <ul>
            <li><strong>Kidem tazminati:</strong> Her calisma yili icin 30 gunluk brut ucret</li>
            <li><strong>Ihbar tazminati:</strong> Bildirim suresine uyulmadan fesihte odenir. Sureye gore 2-8 haftalik ucret</li>
          </ul>
          <p>
            Kesin hesaplama icin <strong>kidem tazminati hesaplayici aracimizi</strong> kullanabilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>What is Severance Pay?</h2>
          <p>
            Severance pay (kidem tazminati) is compensation paid to an employee who has
            worked for at least 1 year and leaves under certain conditions. It equals
            30 days of gross salary for each full year of service.
          </p>

          <h2>Eligibility Conditions</h2>
          <p>You can receive severance pay in these cases:</p>
          <ul>
            <li><strong>Termination by employer</strong> (other than for just cause)</li>
            <li><strong>Military service</strong></li>
            <li><strong>Retirement</strong> (meeting age and premium day requirements)</li>
            <li><strong>Marriage</strong> (female employees, within 1 year of marriage)</li>
            <li><strong>Health issues</strong> causing loss of work capacity</li>
            <li><strong>Employer misconduct</strong> (unpaid wages, harassment, etc.)</li>
            <li><strong>Death</strong> (paid to heirs)</li>
          </ul>

          <h2>Calculation Formula</h2>
          <p>
            <strong>Severance Pay = Years of Service x 30 Days Gross Salary</strong>
          </p>
          <p>
            The 30-day gross salary includes regular benefits on top of base salary:
          </p>
          <ul>
            <li>Meal allowance</li>
            <li>Transportation allowance</li>
            <li>Regular bonuses and premiums</li>
            <li>Family and child benefits</li>
          </ul>

          <h2>2026 Severance Pay Ceiling</h2>
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Ceiling Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026 January - June</td>
                <td>41,828.42 TL</td>
              </tr>
              <tr>
                <td>2026 July - December</td>
                <td>44,764.27 TL</td>
              </tr>
              <tr>
                <td>2024 July - December</td>
                <td>35,058.58 TL</td>
              </tr>
              <tr>
                <td>2024 January - June</td>
                <td>23,489.83 TL</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Important:</strong> Even if your gross salary exceeds the ceiling,
            severance pay per year of service is capped at the ceiling amount.
          </p>

          <h2>Tax Deduction</h2>
          <p>
            Severance pay is exempt from income tax. However, <strong>0.759% stamp
            tax</strong> is deducted from the total amount.
          </p>

          <h2>Example Calculation</h2>
          <p>
            <strong>Scenario:</strong> 5 years 3 months of service, 35,000 TL gross salary
          </p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Service duration</td>
                <td>5 years 3 months (5.25 years)</td>
              </tr>
              <tr>
                <td>Gross salary (30 days)</td>
                <td>35,000 TL</td>
              </tr>
              <tr>
                <td>Ceiling check</td>
                <td>35,000 &lt; 44,764.27 (under ceiling)</td>
              </tr>
              <tr>
                <td>Gross severance</td>
                <td>5.25 x 35,000 = 183,750 TL</td>
              </tr>
              <tr>
                <td>Stamp tax (0.759%)</td>
                <td>-1,394.66 TL</td>
              </tr>
              <tr>
                <td><strong>Net severance</strong></td>
                <td><strong>182,355.34 TL</strong></td>
              </tr>
            </tbody>
          </table>

          <h2>Severance Pay vs. Notice Pay</h2>
          <ul>
            <li><strong>Severance pay:</strong> 30 days gross salary per year of service</li>
            <li><strong>Notice pay:</strong> Paid when termination occurs without proper notice. Ranges from 2-8 weeks salary based on tenure</li>
          </ul>
          <p>
            For exact calculations, use our <strong>severance pay calculator tool</strong>.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
