import { useLocale } from "next-intl";
import { SITE_NAME } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import {
  Building2,
  Mail,
  Phone,
  Target,
  ShieldCheck,
  BookOpen,
  Users,
  Calendar,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Hakkımızda — Lale Dijital" : "About Us — Lale Dijital",
    description: isTr
      ? `${SITE_NAME} hakkında: misyonumuz, uzmanlık alanlarımız, editoryal sürecimiz ve ekibimiz. Lale Dijital tarafından geliştirilen ücretsiz finans araçları platformu.`
      : `About ${SITE_NAME}: our mission, expertise, editorial process and team. Free finance tools platform developed by Lale Dijital.`,
    alternates: {
      canonical: isTr ? "/hakkimizda" : "/en/about",
      languages: {
        tr: "/hakkimizda",
        en: "/en/about",
      },
    },
  };
}

export default function AboutPage() {
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">
        {isTr ? "Hakkımızda" : "About Us"}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {isTr
          ? `${SITE_NAME} — Türkiye&apos;ye özel finansal hesaplama araçları ve güncel rehberler sunan bağımsız bir platform.`
          : `${SITE_NAME} — an independent platform providing Turkey-specific financial calculation tools and up-to-date guides.`}
      </p>

      <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
        {isTr ? (
          <>
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Target className="h-5 w-5 text-primary" />
                Misyonumuz
              </h2>
              <p className="mt-3">
                <strong className="text-foreground">{SITE_NAME}</strong>,{" "}
                <strong className="text-foreground">Lale Dijital</strong> tarafından
                2026 yılında kurulan bağımsız bir finans teknolojisi platformudur.
                Amacımız, Türkiye&apos;deki kullanıcıların günlük yaşamlarında
                karşılaştıkları karmaşık finansal hesaplamaları — brüt/net maaş,
                kıdem tazminatı, kredi taksidi, KDV, gelir vergisi gibi — basit,
                hızlı ve doğru bir şekilde yapabilmelerini sağlamaktır.
              </p>
              <p className="mt-3">
                Türkiye mevzuatına göre doğru hesaplama yapan ücretsiz araçlar
                piyasada sınırlıdır. Yerli kullanıcının ihtiyacını gören, güncel
                vergi dilimlerine ve SGK tavanına göre çalışan, reklam baskısı
                olmadan kullanılabilen bir platform oluşturmayı hedefliyoruz.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                Uzmanlık Alanlarımız
              </h2>
              <p className="mt-3">
                İçeriklerimiz 4857 sayılı İş Kanunu, 5510 sayılı Sosyal Sigortalar
                Kanunu, 193 sayılı Gelir Vergisi Kanunu, 3065 sayılı KDV Kanunu ve
                ilgili yönetmelikler baz alınarak hazırlanır. Finans
                hesaplayıcılarımız aşağıdaki alanlarda uzmanlaşmıştır:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Ücret Hesaplamaları:</strong>{" "}
                  Brüt/net maaş, kümülatif gelir vergisi, SGK primi, asgari ücret
                  istisnası, işveren maliyeti
                </li>
                <li>
                  <strong className="text-foreground">İş Hukuku:</strong>{" "}
                  Kıdem tazminatı, ihbar tazminatı, yıllık izin ücreti, fazla mesai
                </li>
                <li>
                  <strong className="text-foreground">Kredi ve Yatırım:</strong>{" "}
                  Anüite formülü ile kredi taksiti, KKDF/BSMV hesaplaması, bileşik
                  faiz, enflasyon düzeltmeli reel getiri
                </li>
                <li>
                  <strong className="text-foreground">Vergi:</strong>{" "}
                  KDV oranları (%1, %10, %20), gelir vergisi dilimleri, emlak
                  vergisi, motorlu taşıtlar vergisi
                </li>
              </ul>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Editoryal Süreç
              </h2>
              <p className="mt-3">
                Her rehber ve araç, yayına alınmadan önce üç aşamalı bir kalite
                kontrolünden geçer:
              </p>
              <ol className="mt-4 list-decimal pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Birincil kaynak doğrulaması:</strong>{" "}
                  Resmi Gazete, GİB (Gelir İdaresi Başkanlığı), SGK ve Çalışma
                  Bakanlığı resmi yayınları.
                </li>
                <li>
                  <strong className="text-foreground">Hesaplama testi:</strong>{" "}
                  Tüm formüller gerçek örneklerle ve ücret bordrosu yazılımlarıyla
                  karşılaştırmalı olarak test edilir.
                </li>
                <li>
                  <strong className="text-foreground">Güncel tutma:</strong>{" "}
                  Vergi dilimleri, SGK tavanı, asgari ücret, tazminat tavanı gibi
                  değerler 6 ayda bir veya yeni mevzuat yayımlandığında güncellenir.
                </li>
              </ol>
              <p className="mt-4">
                <strong className="text-foreground">Önemli:</strong> Araçlarımız
                bilgilendirme amaçlıdır; profesyonel muhasebe, hukuk veya
                finans danışmanlığı yerine geçmez. Büyük finansal kararlar için
                mutlaka SMMM, avukat veya uzman danışmanına başvurun.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Users className="h-5 w-5 text-primary" />
                Ekip
              </h2>
              <p className="mt-3">
                <strong className="text-foreground">Lale Dijital</strong>,
                yazılım geliştirme ve dijital yayıncılık alanında faaliyet gösteren
                bir girişimdir. Ekibimiz; yazılım mühendisliği, finansal okuryazarlık
                ve içerik üretimi alanlarından deneyime sahip profesyonellerden
                oluşur. Tüm içerik ve araçlar ekip tarafından yönetilir ve telif
                hakları Lale Dijital&apos;e aittir.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Kısa Tarihçe
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <strong className="text-foreground">2026 Ocak:</strong>{" "}
                  Platform fikrinin oluşması, alan adı tescili, ilk araç
                  geliştirmelerinin başlaması.
                </li>
                <li>
                  <strong className="text-foreground">2026 Şubat:</strong>{" "}
                  İlk 5 finans hesaplayıcının (maaş, kredi, KDV, kıdem, yatırım)
                  yayına alınması.
                </li>
                <li>
                  <strong className="text-foreground">2026 Nisan:</strong>{" "}
                  Blog bölümünün açılması, TR/EN çift dilli içerik üretiminin
                  başlaması.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Building2 className="h-5 w-5 text-primary" />
                İletişim
              </h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Lale Dijital</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href="mailto:info@laledijital.com"
                    className="text-sm hover:text-primary"
                  >
                    info@laledijital.com
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href="tel:+905063977306"
                    className="text-sm hover:text-primary"
                  >
                    +90 506 397 73 06
                  </a>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Geri bildirim, içerik düzeltme talebi, iş birliği veya basın
                soruları için bize ulaşabilirsiniz. Tüm e-postaları 2 iş günü
                içinde yanıtlamaya çalışıyoruz. Ayrıntılı iletişim için{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  iletişim sayfamızı
                </Link>{" "}
                ziyaret edebilirsiniz.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </h2>
              <p className="mt-3">
                <strong className="text-foreground">{SITE_NAME}</strong> is an
                independent fintech platform founded in 2026 by{" "}
                <strong className="text-foreground">Lale Dijital</strong>. We help
                users in Turkey handle everyday financial calculations — gross/net
                salary, severance pay, loan installments, VAT, income tax — simply,
                quickly and accurately.
              </p>
              <p className="mt-3">
                Free tools that correctly apply Turkish legislation are scarce.
                We aim to fill that gap with a platform that stays up-to-date with
                current tax brackets and SSI ceilings, and respects users with a
                low-friction, ad-light experience.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                Areas of Expertise
              </h2>
              <p className="mt-3">
                Our content is based on Labor Law No. 4857, Social Insurance Law
                No. 5510, Income Tax Law No. 193, VAT Law No. 3065 and related
                regulations. Our calculators specialize in:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Wage calculations:</strong>{" "}
                  Gross/net salary, cumulative income tax, SSI premium, minimum
                  wage exemption, employer cost
                </li>
                <li>
                  <strong className="text-foreground">Labor Law:</strong>{" "}
                  Severance pay, notice pay, annual leave pay, overtime
                </li>
                <li>
                  <strong className="text-foreground">Loans & Investment:</strong>{" "}
                  Annuity method loans, KKDF/BSMV, compound interest, inflation-
                  adjusted real returns
                </li>
                <li>
                  <strong className="text-foreground">Tax:</strong>{" "}
                  VAT rates (1%, 10%, 20%), income tax brackets, property tax,
                  motor vehicle tax
                </li>
              </ul>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Editorial Process
              </h2>
              <p className="mt-3">
                Every guide and tool passes a three-stage quality review before
                publication:
              </p>
              <ol className="mt-4 list-decimal pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Primary source verification:</strong>{" "}
                  Official Gazette, GİB (Revenue Administration), SSI and Ministry
                  of Labor publications.
                </li>
                <li>
                  <strong className="text-foreground">Calculation testing:</strong>{" "}
                  All formulas are cross-checked against real payroll examples
                  and commercial software.
                </li>
                <li>
                  <strong className="text-foreground">Ongoing maintenance:</strong>{" "}
                  Tax brackets, SSI ceiling, minimum wage and severance ceiling
                  are updated every 6 months or when new regulations are issued.
                </li>
              </ol>
              <p className="mt-4">
                <strong className="text-foreground">Important:</strong> Our tools
                are for informational purposes only and do not constitute
                professional accounting, legal or financial advice. For major
                financial decisions, consult a certified accountant, lawyer or
                advisor.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Users className="h-5 w-5 text-primary" />
                Team
              </h2>
              <p className="mt-3">
                <strong className="text-foreground">Lale Dijital</strong> is a
                venture operating in software development and digital publishing.
                Our team brings together software engineering, financial literacy
                and editorial expertise. All content and tools are maintained by
                the team; copyrights belong to Lale Dijital.
              </p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Brief History
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <strong className="text-foreground">January 2026:</strong>{" "}
                  Platform concept, domain registration, first tool development.
                </li>
                <li>
                  <strong className="text-foreground">February 2026:</strong>{" "}
                  Launch of the first 5 finance calculators (salary, loan, VAT,
                  severance, investment).
                </li>
                <li>
                  <strong className="text-foreground">April 2026:</strong>{" "}
                  Blog section opens; bilingual TR/EN content production begins.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Building2 className="h-5 w-5 text-primary" />
                Contact
              </h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Lale Dijital</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href="mailto:info@laledijital.com"
                    className="text-sm hover:text-primary"
                  >
                    info@laledijital.com
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href="tel:+905063977306"
                    className="text-sm hover:text-primary"
                  >
                    +90 506 397 73 06
                  </a>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Reach out for feedback, content corrections, partnerships or
                press inquiries. We aim to reply within 2 business days. See our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact page
                </Link>{" "}
                for detailed information.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
