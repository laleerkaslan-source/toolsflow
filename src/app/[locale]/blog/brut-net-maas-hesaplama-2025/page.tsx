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
      ? "2025-2026 Brut Net Maas Hesaplama Rehberi — SGK, Vergi Dilimleri"
      : "2025-2026 Gross to Net Salary Guide — SSI, Tax Brackets (Turkey)",
    description: isTr
      ? "Brut maas ile net maas arasindaki farki ogren. SGK primi %14, gelir vergisi dilimleri (%15-%40), damga vergisi ve asgari ucret istisnasi. Guncel 2026 oranlari."
      : "Learn the difference between gross and net salary in Turkey. SSI premium 14%, income tax brackets (15%-40%), stamp tax and minimum wage exemption. Updated 2026 rates.",
    alternates: {
      canonical: isTr
        ? "/blog/brut-net-maas-hesaplama-2025"
        : "/en/blog/brut-net-maas-hesaplama-2025",
      languages: {
        tr: "/blog/brut-net-maas-hesaplama-2025",
        en: "/en/blog/brut-net-maas-hesaplama-2025",
      },
    },
  };
}

export default async function BrutNetMaasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Brut maas nedir?",
          a: "Brut maas, SGK primi, gelir vergisi, damga vergisi gibi yasal kesintiler yapilmadan onceki toplam ucrettir. Is sozlesmesinde genellikle brut tutar belirtilir.",
        },
        {
          q: "Net maas nasil hesaplanir?",
          a: "Net maas = Brut Maas - SGK Isci Payi (%14) - Issizlik Sigortasi (%1) - Gelir Vergisi (kumulatif dilimler) - Damga Vergisi (%0,759) + Asgari Ucret Istisnasi.",
        },
        {
          q: "2026 yilinda asgari ucret ne kadar?",
          a: "2026 yili asgari ucret tutari 22.104,67 TL brut, yaklasik 17.002 TL net olarak belirlenmistir (Ocak-Haziran donemi).",
        },
        {
          q: "Vergi dilimi degisince maasim neden dusuyor?",
          a: "Turkiye'de gelir vergisi kumulatif olarak hesaplanir. Yil icerisinde toplam kazanciniz arttikca ust vergi dilimlerine gecersiniz ve daha yuksek oranda vergi odersiniz.",
        },
      ]
    : [
        {
          q: "What is gross salary?",
          a: "Gross salary is the total compensation before legal deductions such as SSI premium, income tax, and stamp tax. Employment contracts usually specify the gross amount.",
        },
        {
          q: "How is net salary calculated?",
          a: "Net Salary = Gross - SSI Employee Share (14%) - Unemployment Insurance (1%) - Income Tax (cumulative brackets) - Stamp Tax (0.759%) + Minimum Wage Exemption.",
        },
        {
          q: "What is the minimum wage in Turkey for 2026?",
          a: "The 2026 minimum wage is 22,104.67 TL gross, approximately 17,002 TL net (January-June period).",
        },
        {
          q: "Why does my salary decrease during the year?",
          a: "Income tax in Turkey is calculated cumulatively. As your total earnings increase throughout the year, you move into higher tax brackets and pay a higher tax rate.",
        },
      ];

  return (
    <BlogLayout
      slug="brut-net-maas-hesaplama-2025"
      title={
        isTr
          ? "2025-2026 Brut Net Maas Hesaplama Rehberi"
          : "2025-2026 Gross to Net Salary Calculation Guide (Turkey)"
      }
      description={
        isTr
          ? "Brut maas ile net maas arasindaki tum farklar, SGK kesintileri, vergi dilimleri ve asgari ucret istisnasi."
          : "All differences between gross and net salary, SSI deductions, tax brackets and minimum wage exemption."
      }
      datePublished="2026-04-09"
      locale={locale}
      relatedTool={{
        href: "/tools/salary-calculator",
        label: isTr ? "Maas Hesaplayiciya Git" : "Go to Salary Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>Brut Maas ile Net Maas Arasindaki Fark</h2>
          <p>
            Turkiye&apos;de calisan olarak is sozlesmenizde genellikle <strong>brut maas</strong> tutari
            belirtilir. Ancak elinize gecen tutar olan <strong>net maas</strong>, brut maas uzerinden
            yapilan yasal kesintilerden sonra kalan miktardir. Peki bu kesintiler nelerdir?
          </p>

          <h2>Maas Kesintileri Nelerdir?</h2>

          <h3>1. SGK Isci Payi (%14)</h3>
          <p>
            Sosyal Guvenlik Kurumu&apos;na odenen en buyuk kesinti kalemidir. Brut maasinizin
            %14&apos;u SGK isci payi olarak kesilir. 2026 yilinda SGK tavan tutari
            166.669,50 TL&apos;dir — bu tutarin uzerindeki maaslardan tavan uzerinden kesinti yapilir.
          </p>

          <h3>2. Issizlik Sigortasi (%1)</h3>
          <p>
            Brut maasin %1&apos;i issizlik sigortasi primi olarak kesilir. SGK isci payi ile
            birlikte toplam %15 sosyal guvenlik kesintisi yapilir.
          </p>

          <h3>3. Gelir Vergisi (%15 - %40)</h3>
          <p>
            Turkiye&apos;de gelir vergisi <strong>kumulatif</strong> olarak hesaplanir ve 5 dilim
            vardir:
          </p>
          <table>
            <thead>
              <tr>
                <th>Vergi Dilimi</th>
                <th>Oran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - 158.000 TL</td>
                <td>%15</td>
              </tr>
              <tr>
                <td>158.000 - 330.000 TL</td>
                <td>%20</td>
              </tr>
              <tr>
                <td>330.000 - 800.000 TL</td>
                <td>%27</td>
              </tr>
              <tr>
                <td>800.000 - 4.300.000 TL</td>
                <td>%35</td>
              </tr>
              <tr>
                <td>4.300.000 TL uzeri</td>
                <td>%40</td>
              </tr>
            </tbody>
          </table>
          <p>
            Onemli: Yilin basinda dusuk vergi diliminde baslarsiniz, ancak kumulatif
            geliriniz arttikca ust dilimlere gecersiniz. Bu yuzden yilin son aylarinda
            net maasiniz dusebilir.
          </p>

          <h3>4. Damga Vergisi (%0,759)</h3>
          <p>
            Brut maasin %0,759&apos;u damga vergisi olarak kesilir. Diger kesintilere gore
            kucuk bir tutar olsa da her ay duzenli olarak uygulanir.
          </p>

          <h2>Asgari Ucret Vergi Istisnasi</h2>
          <p>
            2022 yilindan itibaren Turkiye&apos;de asgari ucrete kadar olan gelir kismi gelir
            vergisi ve damga vergisinden <strong>muaftir</strong>. Bu istisna tum
            ucretlilere uygulanir ve net maasinizi artirici etki yapar.
          </p>
          <p>
            Ornegin 50.000 TL brut maas alan birinin gelir vergisi matrahinda asgari
            ucretin gelir vergisi kadar bir tutar dusulur.
          </p>

          <h2>Isveren Maliyeti</h2>
          <p>
            Isverenler brut maasin yaninda ek maliyetler de oder:
          </p>
          <ul>
            <li><strong>SGK Isveren Payi:</strong> %15,5 (5 puanlik hazine indirimi ile) veya %20,5 (indirimsiz)</li>
            <li><strong>Isveren Issizlik Sigortasi:</strong> %2</li>
          </ul>
          <p>
            Bu nedenle bir calisanin isveren maliyeti, brut maasindan onemli olcude yuksektir.
            50.000 TL brut maas alan bir calisanin toplam isveren maliyeti yaklasik 58.750 TL&apos;dir.
          </p>

          <h2>Ornek Hesaplama: 50.000 TL Brut Maas</h2>
          <table>
            <thead>
              <tr>
                <th>Kalem</th>
                <th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Brut Maas</td>
                <td>50.000 TL</td>
              </tr>
              <tr>
                <td>SGK Isci Payi (%14)</td>
                <td>-7.000 TL</td>
              </tr>
              <tr>
                <td>Issizlik Sigortasi (%1)</td>
                <td>-500 TL</td>
              </tr>
              <tr>
                <td>Gelir Vergisi Matrahi</td>
                <td>42.500 TL</td>
              </tr>
              <tr>
                <td>Gelir Vergisi (%15)</td>
                <td>-6.375 TL</td>
              </tr>
              <tr>
                <td>Asgari Ucret Istisnasi</td>
                <td>+2.382 TL</td>
              </tr>
              <tr>
                <td>Damga Vergisi</td>
                <td>-379 TL</td>
              </tr>
              <tr>
                <td><strong>Net Maas</strong></td>
                <td><strong>~38.128 TL</strong></td>
              </tr>
            </tbody>
          </table>
          <p>
            Bu yaklasik bir hesaplamadır. Kesin sonuc icin
            <strong> maas hesaplayici aracimizi</strong> kullanmanizi oneririz.
          </p>
        </>
      ) : (
        <>
          <h2>Difference Between Gross and Net Salary</h2>
          <p>
            In Turkey, employment contracts typically specify the <strong>gross salary</strong>.
            However, the amount you actually receive — your <strong>net salary</strong> — is what
            remains after legal deductions. Let&apos;s break down these deductions.
          </p>

          <h2>Salary Deductions in Turkey</h2>

          <h3>1. SSI Employee Premium (14%)</h3>
          <p>
            The largest deduction is the Social Security Institution (SGK) employee share.
            14% of your gross salary is deducted. In 2026, the SSI ceiling is
            166,669.50 TL — salaries above this are capped.
          </p>

          <h3>2. Unemployment Insurance (1%)</h3>
          <p>
            1% of gross salary goes to unemployment insurance. Combined with SSI,
            total social security deductions are 15%.
          </p>

          <h3>3. Income Tax (15% - 40%)</h3>
          <p>
            Turkey uses <strong>cumulative</strong> income tax brackets with 5 tiers:
          </p>
          <table>
            <thead>
              <tr>
                <th>Tax Bracket</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - 158,000 TL</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>158,000 - 330,000 TL</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>330,000 - 800,000 TL</td>
                <td>27%</td>
              </tr>
              <tr>
                <td>800,000 - 4,300,000 TL</td>
                <td>35%</td>
              </tr>
              <tr>
                <td>Over 4,300,000 TL</td>
                <td>40%</td>
              </tr>
            </tbody>
          </table>
          <p>
            Important: You start at the lowest bracket in January, but as your
            cumulative income grows, you move into higher brackets. This is why your
            net salary may decrease in later months.
          </p>

          <h3>4. Stamp Tax (0.759%)</h3>
          <p>
            0.759% of gross salary is deducted as stamp tax. While smaller than other
            deductions, it applies every month.
          </p>

          <h2>Minimum Wage Tax Exemption</h2>
          <p>
            Since 2022, income up to the minimum wage level is <strong>exempt</strong> from
            income tax and stamp tax. This applies to all employees and effectively
            increases net salary.
          </p>

          <h2>Employer Cost</h2>
          <p>
            Employers pay additional costs on top of gross salary:
          </p>
          <ul>
            <li><strong>SSI Employer Share:</strong> 15.5% (with treasury discount) or 20.5% (without)</li>
            <li><strong>Employer Unemployment Insurance:</strong> 2%</li>
          </ul>
          <p>
            Therefore, the total employer cost for a 50,000 TL gross salary employee
            is approximately 58,750 TL.
          </p>

          <h2>Example: 50,000 TL Gross Salary</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gross Salary</td>
                <td>50,000 TL</td>
              </tr>
              <tr>
                <td>SSI Employee (-14%)</td>
                <td>-7,000 TL</td>
              </tr>
              <tr>
                <td>Unemployment Ins. (-1%)</td>
                <td>-500 TL</td>
              </tr>
              <tr>
                <td>Taxable Income</td>
                <td>42,500 TL</td>
              </tr>
              <tr>
                <td>Income Tax (15%)</td>
                <td>-6,375 TL</td>
              </tr>
              <tr>
                <td>Min. Wage Exemption</td>
                <td>+2,382 TL</td>
              </tr>
              <tr>
                <td>Stamp Tax</td>
                <td>-379 TL</td>
              </tr>
              <tr>
                <td><strong>Net Salary</strong></td>
                <td><strong>~38,128 TL</strong></td>
              </tr>
            </tbody>
          </table>
          <p>
            This is an approximate calculation. For exact results, use our
            <strong> salary calculator tool</strong>.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
