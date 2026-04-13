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
      ? "Fazla Mesai Ucreti Hesaplama — %50 ve %25 Zaml Ucret"
      : "Overtime Pay in Turkey — 50% and 25% Uplift Rules",
    description: isTr
      ? "Fazla mesai ve fazla calisma farki, %50 ve %25 zam oranlari, haftalik 45 saat siniri ve hesaplama ornekleri."
      : "Overtime vs extra work, 50% and 25% uplift rates, 45-hour weekly limit and calculation examples.",
    alternates: {
      canonical: isTr
        ? "/blog/fazla-mesai-hesaplama"
        : "/en/blog/fazla-mesai-hesaplama",
      languages: {
        tr: "/blog/fazla-mesai-hesaplama",
        en: "/en/blog/fazla-mesai-hesaplama",
      },
    },
  };
}

export default async function FazlaMesaiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        {
          q: "Fazla mesai nedir?",
          a: "Haftalik 45 saatlik calisma suresini asan her calisma fazla mesaidir. Fazla mesai ucreti normal saatlik ucretin %50 fazlasiyla odenir.",
        },
        {
          q: "Fazla calisma ile fazla mesai ayni mi?",
          a: "Hayir. Haftalik calisma suresi 45 saatin altinda belirlenmisse (orn. 40 saat), 40-45 saat arasindaki calisma fazla CALISMA sayilir ve %25 zamli odenir. 45 saat uzeri ise fazla MESAIdir ve %50 zamlidir.",
        },
        {
          q: "Fazla mesai icerisinde yillik sinir var mi?",
          a: "Yasa geregi yilda en fazla 270 saat fazla mesai yapilabilir. Bu sinir calisanin yazili onayi ile uygulanir.",
        },
        {
          q: "Fazla mesai yerine izin kullanabilir miyim?",
          a: "Evet. Calisan talep ederse her fazla mesai saati icin 1,5 saat, fazla calisma saati icin 1,25 saat serbest zaman kullanabilir.",
        },
      ]
    : [
        {
          q: "What is overtime?",
          a: "Work beyond 45 hours per week is overtime, paid at 1.5× the regular hourly rate (50% uplift).",
        },
        {
          q: "Is extra work the same as overtime?",
          a: "No. If contractual weekly hours are below 45 (e.g. 40), work between the contract hours and 45 is 'extra work' paid at 1.25× (25% uplift). Work above 45 is overtime at 1.5×.",
        },
        {
          q: "Is there an annual cap on overtime?",
          a: "Yes — maximum 270 hours of overtime per year, with the employee's written consent.",
        },
        {
          q: "Can I take time off instead of overtime pay?",
          a: "Yes. On request, employees may take 1.5 hours off per overtime hour, or 1.25 hours per extra-work hour.",
        },
      ];

  return (
    <BlogLayout
      slug="fazla-mesai-hesaplama"
      title={
        isTr
          ? "Fazla Mesai Ucreti Nasil Hesaplanir?"
          : "How to Calculate Overtime Pay (Turkey)"
      }
      description={
        isTr
          ? "Fazla mesai ve fazla calisma oranlari, yillik sinir, serbest zaman takasi ve ornek hesaplamalar."
          : "Overtime and extra-work rates, annual cap, time-off exchange and examples."
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
          <h2>Fazla Mesai ve Fazla Calisma Ayrimi</h2>
          <p>
            4857 sayili Is Kanunu&apos;nda haftalik normal calisma suresi <strong>45
            saat</strong>tir. Bu sinirin asilmasi halinde iki farkli durum ortaya
            cikar:
          </p>
          <table>
            <thead>
              <tr><th>Durum</th><th>Kapsam</th><th>Zam Orani</th></tr>
            </thead>
            <tbody>
              <tr><td>Fazla Calisma</td><td>Sozlesmede 45 saatten az belirtilmis, arasindaki saatler</td><td>%25</td></tr>
              <tr><td>Fazla Mesai</td><td>Haftalik 45 saat uzeri</td><td>%50</td></tr>
              <tr><td>Hafta Tatili</td><td>Pazar veya tatil gunu calisma</td><td>%50 (+ gunluk ucret)</td></tr>
            </tbody>
          </table>

          <h2>Saatlik Ucret Nasil Bulunur?</h2>
          <p>
            <strong>Saatlik Ucret = Aylik Brut Ucret / 225 saat</strong>
            <br />
            (Haftalik 45 saat × 4,33 hafta ≈ 195 saat + resmi tatiller = 225 saat)
          </p>

          <h2>Ornek Hesaplama</h2>
          <p>Aylik brut 45.000 TL alan bir calisan bir haftada 10 saat fazla mesai yapiyorsa:</p>
          <ul>
            <li>Saatlik ucret: 45.000 / 225 = 200 TL</li>
            <li>Fazla mesai ucreti: 200 × 1,5 = 300 TL/saat</li>
            <li>10 saat fazla mesai: 300 × 10 = <strong>3.000 TL brut</strong></li>
          </ul>

          <h2>Yillik Sinir ve Onay</h2>
          <p>
            Yilda en fazla <strong>270 saat</strong> fazla mesai yapilabilir.
            Isciden <strong>yazili onay</strong> alinmasi zorunludur. Onay
            alinmamasi durumunda fazla mesai ucreti yine odenir ancak isveren idari
            para cezasi ile karsilasabilir.
          </p>

          <h2>Serbest Zaman Kullanimi</h2>
          <p>
            Isci talep ederse her fazla mesai saati icin <strong>1,5 saat</strong>,
            her fazla calisma saati icin <strong>1,25 saat</strong> serbest zaman
            kullanabilir. Serbest zaman 6 ay icinde kullanilmalidir.
          </p>

          <h2>Istisnalar</h2>
          <p>
            Yonetici konumundaki calisanlar, ust duzey yoneticiler ve gorev
            itibariyle belirli pozisyonlar fazla mesai ucretinden muaf tutulabilir —
            ancak bu durum sozlesmede acikca belirtilmelidir.
          </p>
        </>
      ) : (
        <>
          <h2>Overtime vs Extra Work</h2>
          <p>
            Normal weekly working hours are <strong>45 hours</strong>. Work beyond
            this has two forms:
          </p>
          <table>
            <thead><tr><th>Type</th><th>Scope</th><th>Uplift</th></tr></thead>
            <tbody>
              <tr><td>Extra Work</td><td>Contract &lt; 45h, hours up to 45</td><td>25%</td></tr>
              <tr><td>Overtime</td><td>Over 45h/week</td><td>50%</td></tr>
              <tr><td>Weekend/Holiday</td><td>Working on rest day</td><td>50% + daily wage</td></tr>
            </tbody>
          </table>

          <h2>Hourly Rate</h2>
          <p>
            <strong>Hourly Rate = Monthly Gross / 225 hours</strong> (45h × 4.33 + holidays ≈ 225)
          </p>

          <h2>Example</h2>
          <p>45,000 TL monthly gross, 10 overtime hours in a week:</p>
          <ul>
            <li>Hourly: 45,000 / 225 = 200 TL</li>
            <li>Overtime rate: 200 × 1.5 = 300 TL/hr</li>
            <li>10 hours: <strong>3,000 TL gross</strong></li>
          </ul>

          <h2>Annual Cap</h2>
          <p>
            Max <strong>270 hours</strong> of overtime per year, requires written
            employee consent.
          </p>

          <h2>Time Off in Lieu</h2>
          <p>
            Employees may request 1.5 hours off per overtime hour, or 1.25 hours per
            extra-work hour. Must be used within 6 months.
          </p>
        </>
      )}
    </BlogLayout>
  );
}
