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
      ? "Yillik Izin Hesaplama — Kac Gun, Nasil Kullanilir?"
      : "Annual Leave in Turkey — Days, Rules, Calculation",
    description: isTr
      ? "Yillik izin sureleri, hak kazanma sarti, kullanilmamis izin ucreti ve 4857 sayili Is Kanunu'na gore ornekler."
      : "Annual leave periods, eligibility, unused leave pay and examples under Turkish Labor Law No. 4857.",
    alternates: {
      canonical: isTr
        ? "/blog/yillik-izin-hesaplama"
        : "/en/blog/yillik-izin-hesaplama",
      languages: {
        tr: "/blog/yillik-izin-hesaplama",
        en: "/en/blog/yillik-izin-hesaplama",
      },
    },
  };
}

export default async function YillikIzinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Yillik izin hakki ne zaman kazanilir?",
          a: "En az 1 yil (deneme suresi dahil) calistiktan sonra yillik ucretli izin hakki kazanilir.",
        },
        {
          q: "Kac gun yillik izin kullanabilirim?",
          a: "Kidem suresine gore: 1-5 yil 14 gun, 5-15 yil 20 gun, 15 yil uzeri 26 gun. 18 yas alti ve 50 yas ustu calisanlar icin minimum 20 gundur.",
        },
        {
          q: "Kullanilmayan izin ne olur?",
          a: "Is sozlesmesi sona erdiginde kullanilmayan izinler son giydirilmis brut ucret uzerinden nakit olarak odenir. Suresi iken devredilebilir ancak hakki dusmez.",
        },
        {
          q: "Izin sirasinda maas odenir mi?",
          a: "Evet. Yillik izin ucretli izindir — izinde geciren sureler icin tam maas odenmeye devam eder.",
        },
      ]
    : [
        {
          q: "When do I earn annual leave?",
          a: "After completing at least 1 year (including probation) with the same employer.",
        },
        {
          q: "How many days of leave?",
          a: "By tenure: 1-5 years = 14 days; 5-15 years = 20 days; 15+ years = 26 days. Minimum 20 days for under-18 and over-50 workers.",
        },
        {
          q: "What happens to unused leave?",
          a: "Unused leave is paid in cash on termination, based on the last dressed gross wage. It may carry over but the right doesn't expire.",
        },
        {
          q: "Is the leave paid?",
          a: "Yes — annual leave is fully paid. Your normal salary continues during the leave period.",
        },
      ];

  return (
    <BlogLayout
      slug="yillik-izin-hesaplama"
      title={
        isTr
          ? "Yillik Izin Hesaplama Rehberi"
          : "Annual Leave Calculation Guide (Turkey)"
      }
      description={
        isTr
          ? "Yillik izin sureleri, hak kazanma sarti, kullanilmamis izin ucreti ve ornek hesaplamalar."
          : "Annual leave periods, eligibility, unused leave pay and example calculations."
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
          <h2>Yillik Izin Sureleri</h2>
          <p>
            4857 sayili Is Kanunu&apos;nun 53. maddesine gore yillik izin sureleri
            kidem suresine baglidir:
          </p>
          <table>
            <thead>
              <tr><th>Kidem Suresi</th><th>Izin Suresi</th></tr>
            </thead>
            <tbody>
              <tr><td>1 - 5 yil arasi</td><td>14 is gunu</td></tr>
              <tr><td>5 - 15 yil arasi</td><td>20 is gunu</td></tr>
              <tr><td>15 yil ve uzeri</td><td>26 is gunu</td></tr>
            </tbody>
          </table>
          <p>
            <strong>18 yasini doldurmamis ve 50 yasini gecmis</strong> calisanlar icin
            izin suresi kidemlerinden bagimsiz olarak en az <strong>20 gundur</strong>.
          </p>

          <h2>Hak Kazanma Kosullari</h2>
          <ul>
            <li>En az 1 yil ayni isverene bagli calisma (deneme suresi dahil)</li>
            <li>Tam sure kosulu: 1 yil icinde 90 gunden fazla devamsizlik olmamali</li>
          </ul>

          <h2>Izin Ucreti Hesabi</h2>
          <p>
            <strong>Izin Ucreti = Gunluk Giydirilmis Brut Ucret × Kullanilmayan Izin Gunu</strong>
          </p>
          <p>
            Ornek: Aylik 60.000 TL brut giydirilmis ucret alan ve 10 gun
            kullanilmamis izni olan bir calisanin izin ucreti:
          </p>
          <ul>
            <li>Gunluk ucret: 60.000 / 30 = 2.000 TL</li>
            <li>Izin ucreti: 2.000 × 10 = <strong>20.000 TL brut</strong></li>
          </ul>
          <p>
            Izin ucreti gelir vergisi ve damga vergisine tabidir — net tutar
            yaklasik 14.500 TL olur.
          </p>

          <h2>Izin Kullandirma Sekli</h2>
          <ul>
            <li>Bir bolumu <strong>10 gunden az olmamak</strong> uzere toplu kullanilmali</li>
            <li>Kalan bolum parcali kullanilabilir</li>
            <li>Izin zamanini <strong>isveren</strong> belirler (calisanin talebi dikkate alinir)</li>
          </ul>

          <h2>Yol Izni</h2>
          <p>
            Yillik izni farkli bir sehirde gecirecek calisan, talep ederse
            ayrica 4 gune kadar <strong>ucretsiz yol izni</strong> alabilir.
          </p>
        </>
      ) : (
        <>
          <h2>Annual Leave Entitlement</h2>
          <p>
            Under Article 53 of Labor Law No. 4857, annual leave depends on tenure:
          </p>
          <table>
            <thead><tr><th>Tenure</th><th>Leave</th></tr></thead>
            <tbody>
              <tr><td>1-5 years</td><td>14 working days</td></tr>
              <tr><td>5-15 years</td><td>20 working days</td></tr>
              <tr><td>15+ years</td><td>26 working days</td></tr>
            </tbody>
          </table>
          <p>
            Workers <strong>under 18 or over 50</strong> receive at least 20 days
            regardless of tenure.
          </p>

          <h2>Leave Pay Calculation</h2>
          <p>
            <strong>Leave Pay = Daily Gross Wage × Unused Days</strong>
          </p>
          <p>
            Example: 60,000 TL gross/month, 10 unused days → 2,000 × 10 = 20,000 TL
            gross (≈14,500 TL net after tax).
          </p>

          <h2>How Leave Must Be Used</h2>
          <ul>
            <li>One portion must be at least 10 continuous days</li>
            <li>Remainder may be split</li>
            <li>Timing is set by the <strong>employer</strong></li>
          </ul>

          <h2>Travel Allowance</h2>
          <p>
            Employees spending leave in another city may request up to 4 days of
            <strong> unpaid travel leave</strong>.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
