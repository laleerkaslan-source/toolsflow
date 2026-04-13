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
      ? "2026 SGK Primi — Isci, Isveren Oranlari, Taban ve Tavan"
      : "2026 SSI Premium Rates in Turkey — Employee, Employer, Ceiling",
    description: isTr
      ? "2026 SGK prim oranlari: isci %14, isveren %20,5 (5 puan indirimli %15,5). Taban ve tavan tutarlari, issizlik primi ve ornekler."
      : "2026 SSI premium rates in Turkey: employee 14%, employer 20.5% (15.5% with discount). Floor/ceiling amounts and examples.",
    alternates: {
      canonical: isTr ? "/blog/sgk-primi-2026" : "/en/blog/sgk-primi-2026",
      languages: {
        tr: "/blog/sgk-primi-2026",
        en: "/en/blog/sgk-primi-2026",
      },
    },
  };
}

export default async function SgkPrimiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "SGK isci primi yuzde kac?",
          a: "Isci SGK primi %14, issizlik sigortasi %1'dir. Toplam %15 brut maastan kesilir.",
        },
        {
          q: "SGK isveren primi yuzde kac?",
          a: "Isveren payi %20,5'tir. 5 puanlik hazine indiriminden yararlanan isverenler icin %15,5 uygulanir. Ayrica %2 issizlik isveren payi eklenir.",
        },
        {
          q: "2026 SGK tabani ve tavani nedir?",
          a: "2026 icin taban 22.104,67 TL (asgari ucret), tavan 166.669,50 TL'dir. Tavan uzeri kazanclarda prim hesaplanmaz.",
        },
        {
          q: "BAG-KUR primi ne kadar?",
          a: "4/b kapsamindaki serbest calisanlar 2026'da beyan ettikleri gelir uzerinden %34,75 oraninda BAG-KUR primi oder (alt sinir asgari ucret).",
        },
      ]
    : [
        {
          q: "What is the employee SSI rate?",
          a: "14% SSI + 1% unemployment insurance = 15% total from gross salary.",
        },
        {
          q: "What is the employer SSI rate?",
          a: "20.5% employer share. Eligible employers receive a 5-point treasury discount (15.5%). Plus 2% employer unemployment contribution.",
        },
        {
          q: "What are the 2026 SSI floor and ceiling?",
          a: "Floor: 22,104.67 TL (minimum wage). Ceiling: 166,669.50 TL. No premium on earnings above the ceiling.",
        },
        {
          q: "How much is BAG-KUR (self-employed) premium?",
          a: "Self-employed (4/b) pay 34.75% on declared income in 2026, with the minimum wage as the floor.",
        },
      ];

  return (
    <BlogLayout
      slug="sgk-primi-2026"
      title={
        isTr
          ? "2026 SGK Primi Oranlari ve Hesaplama"
          : "2026 SSI Premium Rates in Turkey"
      }
      description={
        isTr
          ? "Isci, isveren SGK prim oranlari, 2026 taban-tavan tutarlari, issizlik sigortasi ve ornek hesaplamalar."
          : "Employee/employer SSI rates, 2026 floor-ceiling, unemployment insurance and example calculations."
      }
      datePublished="2026-04-13"
      locale={locale}
      relatedTool={{
        href: "/tools/salary-calculator",
        label: isTr ? "Maas Hesaplayiciya Git" : "Go to Salary Calculator",
      }}
      faq={faq}
    >
      {isTr ? (
        <>
          <h2>2026 SGK Prim Oranlari</h2>
          <table>
            <thead>
              <tr><th>Taraf</th><th>Prim Turu</th><th>Oran</th></tr>
            </thead>
            <tbody>
              <tr><td>Isci</td><td>Malulluk, Yaslilik, Olum</td><td>%9</td></tr>
              <tr><td>Isci</td><td>Genel Saglik</td><td>%5</td></tr>
              <tr><td>Isci</td><td>Issizlik</td><td>%1</td></tr>
              <tr><td><strong>Isci Toplami</strong></td><td></td><td><strong>%15</strong></td></tr>
              <tr><td>Isveren</td><td>Sosyal Guvenlik</td><td>%20,5</td></tr>
              <tr><td>Isveren</td><td>Issizlik</td><td>%2</td></tr>
              <tr><td><strong>Isveren Toplami</strong></td><td></td><td><strong>%22,5</strong></td></tr>
            </tbody>
          </table>
          <p>
            Duzenli bildirim yapan ve prim borcu olmayan isverenler
            <strong> 5 puanlik hazine indiriminden</strong> yararlanarak %15,5 oraninda
            isveren payi oder.
          </p>

          <h2>2026 Taban ve Tavan</h2>
          <ul>
            <li><strong>Taban:</strong> 22.104,67 TL (asgari ucret)</li>
            <li><strong>Tavan:</strong> 166.669,50 TL (asgari ucretin 7,5 kati)</li>
          </ul>
          <p>
            Tavan uzeri kazanclarda prim kesilmez. Yani 200.000 TL kazanan bir
            calisanin SGK primi de tavan olan 166.669,50 TL uzerinden hesaplanir.
          </p>

          <h2>Ornek: 50.000 TL Brut Maas</h2>
          <ul>
            <li>Isci SGK+Issizlik: 50.000 × %15 = 7.500 TL</li>
            <li>Isveren SGK: 50.000 × %20,5 = 10.250 TL</li>
            <li>Isveren issizlik: 50.000 × %2 = 1.000 TL</li>
            <li><strong>Isverenin toplam SGK yuku: 11.250 TL</strong></li>
          </ul>

          <h2>BAG-KUR (4/b) Primi</h2>
          <p>
            Serbest calisanlar (esnaf, sirket ortagi, avukat, doktor vb.) beyan
            ettikleri aylik gelir uzerinden <strong>%34,75 BAG-KUR primi</strong>
            oder. 2026&apos;da alt sinir asgari ucrettir — yani en az 7.681 TL
            aylik prim.
          </p>

          <h2>Net Maas Hesaplamasi</h2>
          <p>
            Brut maasinizdan SGK kesintilerinden sonra kalan tutari gormek icin
            <strong> maas hesaplayici</strong> aracimizi kullanabilirsiniz.
          </p>
        </>
      ) : (
        <>
          <h2>2026 SSI Rate Structure</h2>
          <table>
            <thead>
              <tr><th>Party</th><th>Component</th><th>Rate</th></tr>
            </thead>
            <tbody>
              <tr><td>Employee</td><td>Disability, Old Age, Death</td><td>9%</td></tr>
              <tr><td>Employee</td><td>General Health</td><td>5%</td></tr>
              <tr><td>Employee</td><td>Unemployment</td><td>1%</td></tr>
              <tr><td><strong>Employee Total</strong></td><td></td><td><strong>15%</strong></td></tr>
              <tr><td>Employer</td><td>Social Security</td><td>20.5%</td></tr>
              <tr><td>Employer</td><td>Unemployment</td><td>2%</td></tr>
              <tr><td><strong>Employer Total</strong></td><td></td><td><strong>22.5%</strong></td></tr>
            </tbody>
          </table>
          <p>
            Compliant employers receive a <strong>5-point treasury discount</strong>,
            paying 15.5% instead of 20.5%.
          </p>

          <h2>2026 Floor and Ceiling</h2>
          <ul>
            <li><strong>Floor:</strong> 22,104.67 TL (minimum wage)</li>
            <li><strong>Ceiling:</strong> 166,669.50 TL (7.5× minimum wage)</li>
          </ul>

          <h2>Example: 50,000 TL Gross</h2>
          <ul>
            <li>Employee SSI+Unemployment: 50,000 × 15% = 7,500 TL</li>
            <li>Employer SSI: 50,000 × 20.5% = 10,250 TL</li>
            <li>Employer unemployment: 50,000 × 2% = 1,000 TL</li>
            <li><strong>Total employer SSI burden: 11,250 TL</strong></li>
          </ul>

          <h2>BAG-KUR (Self-Employed)</h2>
          <p>
            Self-employed pay <strong>34.75%</strong> on declared income in 2026,
            with the minimum wage as the floor.
          </p>

          <h2>Calculate Your Net</h2>
          <p>
            Use our <strong>salary calculator</strong> to see your net after SSI
            deductions.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
