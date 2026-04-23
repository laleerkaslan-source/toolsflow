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
    title: isTr ? "Gizlilik Politikası" : "Privacy Policy",
    description: isTr
      ? `${SITE_NAME} gizlilik politikası: KVKK uyumu, çerez kullanımı, Google AdSense ve Analytics verileri, haklarınız.`
      : `${SITE_NAME} privacy policy: GDPR compliance, cookies, Google AdSense and Analytics data, your rights.`,
    alternates: {
      canonical: isTr ? "/gizlilik-politikasi" : "/en/privacy",
      languages: {
        tr: "/gizlilik-politikasi",
        en: "/en/privacy",
      },
    },
  };
}

export default function PrivacyPage() {
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">
        {isTr ? "Gizlilik Politikası" : "Privacy Policy"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isTr ? "Son güncelleme: 13 Nisan 2026" : "Last updated: April 13, 2026"}
      </p>

      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
        {isTr ? (
          <>
            <h2>1. Veri Sorumlusu</h2>
            <p>
              Bu gizlilik politikası, <strong>Lale Dijital</strong> tarafından
              işletilen <strong>{SITE_NAME}</strong> (toolsflow.net) web sitesi
              için geçerlidir. 6698 sayılı Kişisel Verilerin Korunması Kanunu
              (KVKK) kapsamında veri sorumlusu Lale Dijital&apos;dir.
            </p>
            <ul>
              <li>Şirket: Lale Dijital</li>
              <li>E-posta: info@laledijital.com</li>
              <li>Telefon: +90 506 397 73 06</li>
            </ul>

            <h2>2. Topladığımız Veriler</h2>
            <p>
              Sitemiz, kullanıcıların kişisel hesaplama verilerini (maaş,
              kredi tutarı, yatırım miktarı vb.) <strong>sunucularımıza
              göndermez veya saklamaz</strong>. Tüm hesaplamalar tarayıcınızda
              (client-side) gerçekleşir.
            </p>
            <p>
              Sitenin çalışması ve iyileştirilmesi için aşağıdaki veriler
              otomatik olarak toplanabilir:
            </p>
            <ul>
              <li>
                <strong>Teknik veriler:</strong> IP adresi, tarayıcı türü,
                işletim sistemi, ziyaret edilen sayfalar, yönlendiren URL,
                ziyaret süresi
              </li>
              <li>
                <strong>Analitik veriler:</strong> Google Analytics 4 (GA4)
                aracılığıyla anonim oturum verileri
              </li>
              <li>
                <strong>Reklam verileri:</strong> Google AdSense&apos;in reklam
                kişiselleştirmesi için kullandığı çerez kimlikleri
              </li>
            </ul>

            <h2>3. Çerez (Cookie) Kullanımı</h2>
            <p>Sitemizde aşağıdaki çerezler kullanılmaktadır:</p>
            <table>
              <thead>
                <tr>
                  <th>Çerez</th>
                  <th>Amaç</th>
                  <th>Süre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga, _ga_*</td>
                  <td>Google Analytics — ziyaretçi ayrımı ve oturum takibi</td>
                  <td>2 yıl</td>
                </tr>
                <tr>
                  <td>__gads, __gpi</td>
                  <td>Google AdSense — reklam kişiselleştirme ve sıklık sınırı</td>
                  <td>13 ay</td>
                </tr>
                <tr>
                  <td>IDE, NID</td>
                  <td>Google DoubleClick — reklam performans ölçümü</td>
                  <td>13 ay</td>
                </tr>
                <tr>
                  <td>FCNEC, FCCDCF</td>
                  <td>Google Funding Choices — rıza yönetimi</td>
                  <td>13 ay</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Koyu/açık tema tercihi (yerel depolama)</td>
                  <td>Kalıcı</td>
                </tr>
              </tbody>
            </table>
            <p>
              AB/AEA kullanıcıları için, reklam ve analitik çerezleri
              <strong> Google Funding Choices CMP</strong> aracılığıyla
              rıza alındıktan sonra etkinleştirilir. Tarayıcı ayarlarınızdan
              çerezleri istediğiniz zaman silebilir veya engelleyebilirsiniz.
            </p>

            <h2>4. Google AdSense ve Üçüncü Taraflar</h2>
            <p>
              Sitemizde gelir sağlamak amacıyla <strong>Google AdSense</strong>{" "}
              reklamları gösterilmektedir. Google, reklamları ilgi alanlarınıza
              göre kişiselleştirmek için çerezler (DoubleClick DART çerezi
              dahil) kullanabilir. Google&apos;ın reklam uygulamalarını
              inceleyebilir ve{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                adssettings.google.com
              </a>{" "}
              adresinden kişiselleştirilmiş reklamları kapatabilirsiniz.
            </p>
            <p>Kullandığımız diğer üçüncü taraf hizmetleri:</p>
            <ul>
              <li>
                <strong>Google Analytics 4:</strong> Trafik analizi (anonim)
              </li>
              <li>
                <strong>Vercel:</strong> Barındırma ve CDN hizmeti (teknik
                loglar)
              </li>
              <li>
                <strong>Google Fonts:</strong> Geist fontlarının yüklenmesi
              </li>
            </ul>

            <h2>5. Veri Kullanım Amaçları</h2>
            <p>Topladığımız veriler yalnızca aşağıdaki amaçlar için kullanılır:</p>
            <ul>
              <li>Sitenin teknik olarak çalıştırılması</li>
              <li>Kullanıcı deneyimini iyileştirmek için analitik</li>
              <li>Reklam gelirleri aracılığıyla ücretsiz hizmet sürdürülmesi</li>
              <li>Güvenlik ve kötüye kullanımın önlenmesi</li>
            </ul>
            <p>
              Verileriniz <strong>satılmaz, kiralanmaz veya pazarlama amaçlı
              üçüncü taraflara aktarılmaz</strong>.
            </p>

            <h2>6. Veri Saklama Süreleri</h2>
            <ul>
              <li>Analitik veriler: 14 ay (GA4 varsayılanı)</li>
              <li>Sunucu erişim logları: 30 gün</li>
              <li>İletişim e-postaları: 2 yıl (yasal gereklilikler dışında)</li>
            </ul>

            <h2>7. KVKK Haklarınız</h2>
            <p>
              KVKK madde 11 kapsamında, Lale Dijital&apos;e başvurarak aşağıdaki
              haklarınızı kullanabilirsiniz:
            </p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bilgi talep etme</li>
              <li>İşlenme amacını öğrenme</li>
              <li>Yurt içi/yurt dışı aktarılan üçüncü kişileri bilme</li>
              <li>Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Silinmesini veya yok edilmesini isteme</li>
              <li>İtiraz etme</li>
              <li>Zarara uğraması halinde tazminat talep etme</li>
            </ul>
            <p>
              Başvurularınızı{" "}
              <a href="mailto:info@laledijital.com">info@laledijital.com</a>{" "}
              adresine yapabilirsiniz. Başvurular en geç <strong>30 gün
              içinde</strong> sonuçlandırılır.
            </p>

            <h2>8. Çocukların Gizliliği</h2>
            <p>
              Sitemiz 13 yaş altındaki çocuklara yönelik değildir. Bilerek
              çocuklardan veri toplamayız. Bir çocuğun kişisel verisinin
              tarafımıza iletildiğini düşünüyorsanız lütfen bize bildirin.
            </p>

            <h2>9. Politika Güncellemeleri</h2>
            <p>
              Bu politikayı zaman zaman güncelleyebiliriz. Güncellemeler bu
              sayfada yayımlanır ve önemli değişikliklerde &quot;Son güncelleme&quot;
              tarihi değiştirilir. Devamlı kullanım, güncel politikayı kabul
              ettiğiniz anlamına gelir.
            </p>

            <h2>10. İletişim</h2>
            <p>
              Gizlilik ile ilgili her türlü soru ve talebiniz için{" "}
              <Link href="/contact">iletişim sayfamızı</Link> kullanabilir veya{" "}
              <a href="mailto:info@laledijital.com">info@laledijital.com</a>{" "}
              adresine yazabilirsiniz.
            </p>
          </>
        ) : (
          <>
            <h2>1. Data Controller</h2>
            <p>
              This privacy policy applies to <strong>{SITE_NAME}</strong>{" "}
              (toolsflow.net), operated by <strong>Lale Dijital</strong>. Under
              the Turkish Personal Data Protection Law (KVKK) and the EU GDPR,
              the data controller is Lale Dijital.
            </p>
            <ul>
              <li>Company: Lale Dijital</li>
              <li>Email: info@laledijital.com</li>
              <li>Phone: +90 506 397 73 06</li>
            </ul>

            <h2>2. Data We Collect</h2>
            <p>
              Our tools do <strong>not send or store</strong> your personal
              calculation inputs (salary, loan amount, investment, etc.) on our
              servers. All calculations happen client-side in your browser.
            </p>
            <p>
              For site operation and improvement, the following data may be
              collected automatically:
            </p>
            <ul>
              <li>
                <strong>Technical:</strong> IP address, browser type, operating
                system, pages visited, referrer URL, visit duration
              </li>
              <li>
                <strong>Analytics:</strong> Anonymous session data via Google
                Analytics 4
              </li>
              <li>
                <strong>Advertising:</strong> Cookie identifiers used by Google
                AdSense for personalization
              </li>
            </ul>

            <h2>3. Cookies</h2>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga, _ga_*</td>
                  <td>Google Analytics — visitor distinction and session tracking</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>__gads, __gpi</td>
                  <td>Google AdSense — ad personalization and frequency capping</td>
                  <td>13 months</td>
                </tr>
                <tr>
                  <td>IDE, NID</td>
                  <td>Google DoubleClick — ad performance measurement</td>
                  <td>13 months</td>
                </tr>
                <tr>
                  <td>FCNEC, FCCDCF</td>
                  <td>Google Funding Choices — consent management</td>
                  <td>13 months</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Dark/light theme preference (local storage)</td>
                  <td>Persistent</td>
                </tr>
              </tbody>
            </table>
            <p>
              For users in the EU/EEA, advertising and analytics cookies are
              only enabled after consent via the{" "}
              <strong>Google Funding Choices CMP</strong>. You can delete or
              block cookies through your browser settings at any time.
            </p>

            <h2>4. Google AdSense and Third Parties</h2>
            <p>
              We display <strong>Google AdSense</strong> ads to fund the free
              service. Google may use cookies (including the DoubleClick DART
              cookie) to personalize ads based on your interests. Review and
              opt out at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                adssettings.google.com
              </a>
              .
            </p>
            <p>Other third-party services we use:</p>
            <ul>
              <li>
                <strong>Google Analytics 4:</strong> Anonymous traffic analytics
              </li>
              <li>
                <strong>Vercel:</strong> Hosting and CDN (technical logs)
              </li>
              <li>
                <strong>Google Fonts:</strong> Font delivery (Geist)
              </li>
            </ul>

            <h2>5. Purpose of Data Use</h2>
            <ul>
              <li>Technical operation of the site</li>
              <li>Analytics to improve user experience</li>
              <li>Ad revenue to sustain the free service</li>
              <li>Security and abuse prevention</li>
            </ul>
            <p>
              We <strong>do not sell, rent or share your data</strong> with
              third parties for marketing purposes.
            </p>

            <h2>6. Retention</h2>
            <ul>
              <li>Analytics data: 14 months (GA4 default)</li>
              <li>Server access logs: 30 days</li>
              <li>Contact emails: 2 years (except legal obligations)</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>
              Under KVKK Article 11 and GDPR, you may request:
            </p>
            <ul>
              <li>To know whether your data is processed</li>
              <li>Information on purpose and third-party transfers</li>
              <li>Correction of incomplete/inaccurate data</li>
              <li>Deletion or destruction</li>
              <li>Objection to processing</li>
              <li>Compensation for damages</li>
            </ul>
            <p>
              Send requests to{" "}
              <a href="mailto:info@laledijital.com">info@laledijital.com</a>.
              We respond within <strong>30 days</strong>.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              The site is not intended for children under 13. We do not
              knowingly collect data from children. If you believe we have,
              please contact us.
            </p>

            <h2>9. Policy Updates</h2>
            <p>
              We may update this policy. Updates are posted on this page and
              the &quot;Last updated&quot; date is changed for significant
              modifications. Continued use implies acceptance.
            </p>

            <h2>10. Contact</h2>
            <p>
              For any privacy-related questions, use our{" "}
              <Link href="/contact">contact page</Link> or email{" "}
              <a href="mailto:info@laledijital.com">info@laledijital.com</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
