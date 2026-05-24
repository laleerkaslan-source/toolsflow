import type { Metadata } from "next";
import { BlogLayout } from "@/components/blog/blog-layout";
import { SgkBreakdownChart } from "@/components/blog/charts/sgk-breakdown-chart";
import { socialMetadata } from "@/lib/og";
import { SITE_URL } from "@/lib/constants";

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
    ...socialMetadata({
      title: isTr ? "2026 Asgari Ucret Brut Net — AGI, SGK, Isveren Maliyeti" : "2026 Minimum Wage in Turkey — Gross, Net, Employer Cost",
      description: isTr ? "2026 asgari ucret brut 22.104,67 TL, net 17.002 TL. SGK kesintileri, asgari gecim indirimi ve isveren maliyeti detaylari." : "2026 minimum wage in Turkey: 22,104.67 TL gross, 17,002 TL net. SSI deductions, tax exemption and full employer cost breakdown.",
      url: `${SITE_URL}${isTr ? "/blog/asgari-ucret-2026" : "/en/blog/asgari-ucret-2026"}`,
      category: "Finans",
      type: "blog",
      locale,
    }),
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
          <SgkBreakdownChart locale={locale} />
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

          <h2>Ornek: Bir Tekstil Atolyesinde 8 Calisan</h2>
          <p>
            Bursa&apos;da kucuk olcekli bir tekstil atolyesinde 8 kisi asgari ucretle
            calisiyor. 2026 yilinda her bir calisan icin isveren ayda <strong>26.005 TL</strong>,
            yilda 312.060 TL odeme yapmaktadir. 8 calisan icin yillik toplam maliyet
            <strong>2.496.480 TL</strong>&apos;dir. 5 puanlik hazine indirimi sartlarini
            karsiliyorsa (SGK borcu olmamak ve duzenli bildirim yapmak) yillik maliyet
            yaklasik 192.000 TL azalir — bu da yaklasik 1 kisilik ek istihdam imkani demektir.
          </p>
          <p>
            Ayni atolye, calisanlardan birinin maasini 30.000 TL brute cikarsa, ek
            5.895,33 TL brut farkin sadece <strong>~4.250 TL&apos;si</strong> calisanin
            cebine girer (gelir vergisi %15 dilimine girer + SGK kesintisi olur).
            Geri kalan yaklasik 1.645 TL devlete ve sigortaya gider. Bu, isverenler ve
            iscilerin kafasini en cok karistiran konulardan biridir.
          </p>

          <h2>Yanlis Bilinenler</h2>
          <ul>
            <li>
              <strong>&quot;Asgari ucret gelir vergisi alir&quot;</strong> — Yanlis. 2022&apos;den
              beri asgari ucret tutari kadar olan kisim tum maaslarda vergiden muaftir.
              Yani 100.000 TL brut maas alan biri de ilk 22.104,67 TL&apos;si icin vergi odemez.
            </li>
            <li>
              <strong>&quot;Isveren asgari ucretten daha az verebilir&quot;</strong> — Hayir.
              4857 sayili Is Kanunu&apos;na gore asgari ucretten az odeme yapan isveren
              idari para cezasi ile karsi karsiya kalir. Calisan, eksik tutari yargi
              yoluyla geriye donuk talep edebilir.
            </li>
            <li>
              <strong>&quot;AGI hala uygulaniyor&quot;</strong> — Yanlis. Asgari Gecim Indirimi
              2022&apos;de kaldirildi. Yerine asgari ucret istisnasi geldi ve etkisi
              tum ucretlilere yayildi.
            </li>
          </ul>

          <h2>Resmi Kaynaklar</h2>
          <p>
            Asgari ucret 2026 tutari, <a href="https://www.aile.gov.tr" target="_blank" rel="noopener noreferrer">Calisma ve Sosyal Guvenlik Bakanligi</a>&apos;na
            bagli Asgari Ucret Tespit Komisyonu tarafindan her yil Aralik ayinda
            belirlenir ve Resmi Gazete&apos;de yayimlanir. Kesintiler icin{" "}
            <a href="https://www.sgk.gov.tr" target="_blank" rel="noopener noreferrer">SGK</a>{" "}
            (5510 sayili Kanun) ve gelir vergisi muafiyeti icin{" "}
            <a href="https://www.gib.gov.tr" target="_blank" rel="noopener noreferrer">Gelir Idaresi Baskanligi</a>{" "}
            sayfalarini takip edebilirsiniz.
          </p>

          <h2>Net Maas Hesaplamasi Icin</h2>
          <p>
            Kendi maasinizi hesaplamak veya zam sonrasi yeni net maasinizi
            gormek icin <strong>maas hesaplayici aracimizi</strong> kullanabilirsiniz.
            Brut tutari girince anlik olarak SGK, vergi ve isveren maliyetinin
            dokumunu gosterir.
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

          <h2>Example: A Bursa Textile Workshop With 8 Workers</h2>
          <p>
            A small Bursa workshop employs 8 people on minimum wage. The 2026 cost
            per worker is <strong>26,005 TL/month</strong> &mdash; or <strong>2,496,480 TL/year</strong>
            for all eight. Employers who qualify for the 5-point treasury discount
            (no SSI debt + on-time reporting) save ~192,000 TL annually &mdash; roughly
            one additional employee.
          </p>

          <h2>Common Misconceptions</h2>
          <ul>
            <li><strong>&quot;Minimum wage pays income tax&quot;</strong> &mdash; False. Since 2022, all employees enjoy a tax exemption equal to the minimum wage amount.</li>
            <li><strong>&quot;Employers can pay below minimum wage&quot;</strong> &mdash; No. Article 39 of Labor Law No. 4857 prohibits it. Underpaid workers can recover the difference via court.</li>
            <li><strong>&quot;AGI is still in effect&quot;</strong> &mdash; Wrong. The Minimum Living Allowance was replaced in 2022 by the universal minimum-wage exemption.</li>
          </ul>

          <h2>Official Sources</h2>
          <p>
            The minimum wage is set yearly in December by the Minimum Wage Commission
            under the <a href="https://www.aile.gov.tr" target="_blank" rel="noopener noreferrer">Ministry of Labor</a>{" "}
            and published in the Official Gazette. See{" "}
            <a href="https://www.sgk.gov.tr" target="_blank" rel="noopener noreferrer">SSI</a>{" "}
            for deduction rules (Law No. 5510) and{" "}
            <a href="https://www.gib.gov.tr" target="_blank" rel="noopener noreferrer">Revenue Administration</a>{" "}
            for tax exemption details.
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
