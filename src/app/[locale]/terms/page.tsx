import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Kullanım Şartları" : "Terms of Service",
    description: isTr
      ? `${SITE_NAME} kullanım şartları: hizmet tanımı, sorumluluklar, içerik kullanımı, fikri mülkiyet ve yasal sınırlamalar.`
      : `${SITE_NAME} terms of service: service description, responsibilities, content use, intellectual property and legal limitations.`,
    alternates: {
      canonical: isTr ? "/kullanim-sartlari" : "/en/terms",
      languages: {
        tr: "/kullanim-sartlari",
        en: "/en/terms",
      },
    },
  };
}

export default function TermsPage() {
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">
        {isTr ? "Kullanım Şartları" : "Terms of Service"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isTr ? "Son güncelleme: 13 Nisan 2026" : "Last updated: April 13, 2026"}
      </p>

      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
        {isTr ? (
          <>
            <h2>1. Taraflar ve Kapsam</h2>
            <p>
              Bu Kullanım Şartları, <strong>Lale Dijital</strong> (&quot;biz&quot;,
              &quot;Şirket&quot;) tarafından işletilen <strong>{SITE_NAME}</strong>{" "}
              (toolsflow.net) web sitesinin ziyaretçileri ve kullanıcıları
              (&quot;siz&quot;, &quot;Kullanıcı&quot;) için geçerlidir. Siteyi
              kullanarak bu şartları kabul etmiş sayılırsınız.
            </p>

            <h2>2. Hizmet Tanımı</h2>
            <p>
              {SITE_NAME}, Türkiye mevzuatına göre finansal hesaplamalar yapan
              ücretsiz online araçlar ve bilgilendirici içerikler sunar. Araçlar
              arasında maaş hesaplayıcı, kredi hesaplayıcı, KDV hesaplayıcı,
              kıdem tazminatı hesaplayıcı, yatırım getiri hesaplayıcı ve döviz
              çevirici bulunur.
            </p>

            <h2>3. Bilgi ve Sorumluluk Reddi</h2>
            <p>
              Sitedeki tüm hesaplama araçları ve içerikler{" "}
              <strong>yalnızca bilgilendirme amaçlıdır</strong>. Profesyonel
              muhasebe, hukuk, vergi veya finans danışmanlığı yerine{" "}
              <strong>geçmez</strong>. Araçların çıktıları tahmini değerlerdir;
              gerçek ödemeleriniz ve hesaplamalarınız, bankanızın, işvereninizin
              veya ilgili resmi kurumların hesaplamalarına göre değişebilir.
            </p>
            <p>
              Vergi dilimleri, SGK oranları, asgari ücret ve tazminat tavanı
              gibi değerler zaman içinde değişir. Önemli finansal kararlar
              almadan önce mutlaka bir <strong>SMMM, avukat veya yetkili
              danışman</strong>a başvurun.
            </p>

            <h2>4. Kullanıcı Yükümlülükleri</h2>
            <p>Siteyi kullanırken şunları kabul edersiniz:</p>
            <ul>
              <li>Yasalara ve ahlaka uygun kullanım</li>
              <li>Siteyi kötüye kullanmamak, otomatik araçlarla aşırı istek göndermemek</li>
              <li>Telif hakkı ve fikri mülkiyet haklarına saygı göstermek</li>
              <li>Güvenlik açıklarını istismar etmemek</li>
              <li>Diğer kullanıcıların siteyi kullanmasını engellememek</li>
            </ul>

            <h2>5. Fikri Mülkiyet</h2>
            <p>
              Site üzerindeki tüm içerik (metin, yazılım, tasarım, logo, araçlar)
              <strong> Lale Dijital&apos;e aittir</strong> ve 5846 sayılı Fikir
              ve Sanat Eserleri Kanunu ile koruma altındadır. İçeriği kişisel
              kullanım dışında, yazılı izin olmadan kopyalayamaz, dağıtamaz,
              değiştiremezsiniz.
            </p>
            <p>
              Blog yazılarımıza kaynak göstererek (toolsflow.net&apos;e geri
              link vererek) özet bilgiler paylaşabilirsiniz. Tam içerik
              kopyalamaya izin verilmez.
            </p>

            <h2>6. Üçüncü Taraf Bağlantılar</h2>
            <p>
              Sitemiz, üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin
              içeriği, gizlilik politikaları ve uygulamaları bizim
              sorumluluğumuzda değildir. Bu sitelere girmeden önce kendi
              koşullarını incelemenizi öneririz.
            </p>

            <h2>7. Reklam İçeriği</h2>
            <p>
              Sitemizde Google AdSense üzerinden üçüncü taraf reklamlar gösterilir.
              Reklam içerikleri, reklamverenlerin kendi sorumluluğundadır.
              Reklamlar aracılığıyla gerçekleştirdiğiniz işlemlerden
              <strong> {SITE_NAME} sorumlu değildir</strong>.
            </p>

            <h2>8. Hizmetin Kesilmesi ve Değişiklik</h2>
            <p>
              Site herhangi bir bildirim yapmaksızın; hizmetin tamamını veya
              bir bölümünü geçici olarak durdurma, güncelleme, değiştirme veya
              sona erdirme hakkını saklı tutar. Bakım, yazılım hataları, güvenlik
              sorunları ve teknik aksaklıklardan kaynaklanan hizmet kesintileri
              için sorumluluk kabul edilmez.
            </p>

            <h2>9. Sorumluluk Sınırlaması</h2>
            <p>
              Yasaların izin verdiği azami ölçüde, {SITE_NAME} ve Lale Dijital;
              sitenin kullanımından, hesaplama sonuçlarının yanlış yorumlanmasından,
              içeriklerdeki olası hatalardan veya hizmet kesintilerinden doğan
              doğrudan veya dolaylı zararlar (kar kaybı, veri kaybı, gelir kaybı
              dahil) için <strong>sorumlu tutulamaz</strong>.
            </p>

            <h2>10. Gizlilik</h2>
            <p>
              Kişisel verilerinizin nasıl toplandığı ve kullanıldığı hakkında
              bilgi için{" "}
              <Link href="/privacy">Gizlilik Politikamızı</Link> inceleyin.
            </p>

            <h2>11. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
            <p>
              Bu Kullanım Şartları Türkiye Cumhuriyeti yasalarına tabidir. Bu
              şartlardan doğabilecek uyuşmazlıklarda <strong>İstanbul
              Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
            </p>

            <h2>12. Değişiklikler</h2>
            <p>
              Kullanım Şartları&apos;nı zaman zaman güncelleyebiliriz.
              Güncellemeler bu sayfada yayımlanır ve &quot;Son güncelleme&quot;
              tarihi değiştirilir. Önemli değişiklikler site üzerinden
              duyurulabilir. Devamlı kullanım, güncel şartları kabul ettiğiniz
              anlamına gelir.
            </p>

            <h2>13. İletişim</h2>
            <p>
              Sorularınız için:{" "}
              <a href="mailto:info@laledijital.com">info@laledijital.com</a>{" "}
              veya <Link href="/contact">iletişim sayfamız</Link>.
            </p>
          </>
        ) : (
          <>
            <h2>1. Parties and Scope</h2>
            <p>
              These Terms of Service apply to visitors and users
              (&quot;you&quot;, &quot;User&quot;) of <strong>{SITE_NAME}</strong>{" "}
              (toolsflow.net), operated by <strong>Lale Dijital</strong>
              (&quot;we&quot;, &quot;Company&quot;). By using the site, you
              accept these terms.
            </p>

            <h2>2. Service Description</h2>
            <p>
              {SITE_NAME} provides free online calculators and informational
              content based on Turkish legislation — including salary, loan, VAT,
              severance, investment and currency calculators.
            </p>

            <h2>3. Information and Disclaimer</h2>
            <p>
              All tools and content are for <strong>informational purposes
              only</strong> and do <strong>not constitute</strong> professional
              accounting, legal, tax or financial advice. Tool outputs are
              estimates; actual payments may differ based on your bank,
              employer or government authority calculations.
            </p>
            <p>
              Values such as tax brackets, SSI rates, minimum wage and
              severance ceiling change over time. Always consult a{" "}
              <strong>certified accountant, lawyer, or authorized advisor</strong>{" "}
              before major financial decisions.
            </p>

            <h2>4. User Obligations</h2>
            <ul>
              <li>Lawful and ethical use</li>
              <li>No abuse, no automated excessive requests</li>
              <li>Respect copyright and intellectual property</li>
              <li>No security exploitation</li>
              <li>No interference with other users</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All site content (text, software, design, logos, tools) is
              <strong> owned by Lale Dijital</strong> and protected under
              Turkish Law No. 5846 on Intellectual and Artistic Works. You may
              not copy, redistribute or modify the content beyond personal use
              without written permission.
            </p>
            <p>
              You may share summaries of our blog posts with attribution and a
              backlink to toolsflow.net. Full content copying is not permitted.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our site may link to third-party websites. We are not responsible
              for their content, privacy policies or practices.
            </p>

            <h2>7. Advertising</h2>
            <p>
              We display third-party ads via Google AdSense. Advertisers are
              responsible for their own content. <strong>{SITE_NAME} is not
              liable</strong> for transactions you make through ads.
            </p>

            <h2>8. Service Interruptions</h2>
            <p>
              We reserve the right to suspend, update, modify or terminate any
              part of the service without notice. We are not liable for outages
              due to maintenance, bugs, security issues or technical failures.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {SITE_NAME} and Lale
              Dijital are <strong>not liable</strong> for any direct or
              indirect damages (including lost profits, data or revenue)
              arising from use of the site, misinterpretation of results,
              content errors or service interruptions.
            </p>

            <h2>10. Privacy</h2>
            <p>
              See our <Link href="/privacy">Privacy Policy</Link> for how we
              handle personal data.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Turkey.
              Any disputes are subject to the exclusive jurisdiction of the{" "}
              <strong>Istanbul Courts and Enforcement Offices</strong>.
            </p>

            <h2>12. Changes</h2>
            <p>
              We may update these Terms. Updates are posted on this page and
              the &quot;Last updated&quot; date is changed. Continued use
              implies acceptance.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions:{" "}
              <a href="mailto:info@laledijital.com">info@laledijital.com</a> or{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
