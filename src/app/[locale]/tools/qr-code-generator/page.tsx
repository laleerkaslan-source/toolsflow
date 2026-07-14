import { ToolLayout } from "@/components/tools/tool-layout";
import { QrGenerator } from "@/components/tools/qr-generator";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "QR Kod Oluşturucu" : "QR Code Generator",
    description: isTr
      ? "Ücretsiz QR kod oluşturucu. URL, metin veya iletişim bilgilerinizden anında QR kod oluşturun ve PNG olarak indirin."
      : "Free QR code generator. Create QR codes instantly from URLs, text or contact info. Download as PNG.",
    alternates: {
      canonical: isTr ? "/araclar/qr-kod-olusturucu" : "/en/tools/qr-code-generator",
      languages: {
        tr: "/araclar/qr-kod-olusturucu",
        en: "/en/tools/qr-code-generator",
      },
    },
  };
}

export default async function QrCodePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        { q: "QR kod nedir?", a: "QR kod (Quick Response code), akıllı telefonlar tarafından taranabilen iki boyutlu bir barkod türüdür. URL'ler, metin, iletişim bilgileri ve daha fazlasını içerebilir." },
        { q: "Bu araç ücretsiz mi?", a: "Evet, QR kod oluşturucumuz tamamen ücretsiz ve sınırsızdır. Oluşturulan QR kodlar herhangi bir filigran içermez." },
        { q: "QR kodumu özelleştirebilir miyim?", a: "Evet! QR kodunuzun boyutunu, ön plan ve arka plan renklerini değiştirebilirsiniz." },
        { q: "Verilerim güvende mi?", a: "Kesinlikle. Tüm QR kod oluşturma işlemi tarayıcınızda gerçekleşir. Hiçbir veri sunucumuza gönderilmez." },
      ]
    : [
        { q: "What is a QR code?", a: "A QR code (Quick Response code) is a type of two-dimensional barcode that can be scanned by smartphones. It can contain URLs, text, contact information and more." },
        { q: "Is this tool free?", a: "Yes, our QR code generator is completely free and unlimited. Generated QR codes don't contain any watermarks." },
        { q: "Can I customize my QR code?", a: "Yes! You can change the size, foreground color and background color of your QR code." },
        { q: "Is my data safe?", a: "Absolutely. All QR code generation happens in your browser. No data is sent to our server." },
      ];

  const guide = isTr ? (
    <>
      <h2>QR Kod Nedir ve Nasıl Çalışır?</h2>
      <p>
        QR kod (Quick Response — Hızlı Yanıt kodu), 1994 yılında Japon Denso Wave
        şirketi tarafından geliştirilen iki boyutlu bir barkod türüdür. Klasik
        çizgili barkodlar yalnızca yatay yönde veri taşırken, QR kodlar hem yatay
        hem dikey yönde bilgi depolar. Bu sayede çok daha fazla veri
        (URL&apos;ler, metin, iletişim bilgileri, Wi-Fi şifreleri) küçük bir kareye
        sığar. Akıllı telefon kamerası QR kodun içindeki siyah-beyaz desenleri
        okuyarak saniyeler içinde ilgili içeriğe yönlendirir.
      </p>

      <h2>QR Kod Türleri: Statik ve Dinamik</h2>
      <p>
        İki temel QR kod tipi vardır:
      </p>
      <ul>
        <li>
          <strong>Statik QR kod:</strong> Bilgi doğrudan kodun içine gömülüdür.
          Oluşturduktan sonra içeriği değiştirilemez. Bu araç statik QR kod üretir
          — kalıcı bir URL veya metin için idealdir, süresiz çalışır ve üçüncü bir
          servise bağımlı değildir.
        </li>
        <li>
          <strong>Dinamik QR kod:</strong> Kod bir yönlendirme adresine işaret
          eder ve hedef sonradan değiştirilebilir. Tarama istatistikleri sunar
          ancak genellikle ücretli bir servise bağımlıdır; o servis kapanırsa kod
          çalışmaz.
        </li>
      </ul>

      <h2>QR Kodların Kullanım Alanları</h2>
      <ul>
        <li><strong>Restoran menüleri:</strong> Temassız dijital menüye erişim.</li>
        <li><strong>Kartvizitler:</strong> İletişim bilgilerini tek taramayla rehbere ekleme.</li>
        <li><strong>Ödemeler:</strong> Banka ve dijital cüzdan uygulamalarında hızlı ödeme.</li>
        <li><strong>Etkinlik biletleri:</strong> Girişte hızlı doğrulama.</li>
        <li><strong>Wi-Fi paylaşımı:</strong> Şifreyi yazmadan ağa bağlanma.</li>
        <li><strong>Pazarlama:</strong> Afiş, ambalaj ve broşürlerden web sitesine yönlendirme.</li>
      </ul>

      <h2>Hata Düzeltme Seviyesi Nedir?</h2>
      <p>
        QR kodlar, bir kısmı hasar görse (çizik, leke, kısmen kapalı) bile
        okunabilmesi için <strong>hata düzeltme (error correction)</strong> içerir.
        Dört seviye vardır: L (%7), M (%15), Q (%25) ve H (%30). Yüksek seviye,
        kodun daha dayanıklı olmasını sağlar ancak deseni yoğunlaştırır. Ortaya
        logo eklenecekse veya kod zorlu bir yüzeye basılacaksa yüksek seviye
        tercih edilir.
      </p>

      <h2>İyi Bir QR Kod İçin İpuçları</h2>
      <ul>
        <li><strong>Yeterli kontrast:</strong> Koyu desen, açık arka plan üzerinde olmalı. Ters renk (açık desen, koyu zemin) bazı okuyucularda sorun çıkarır.</li>
        <li><strong>Sessiz alan (quiet zone):</strong> Kodun etrafında boş bir çerçeve bırakın; kenara yapışık kodlar okunamayabilir.</li>
        <li><strong>Yeterli boyut:</strong> Baskıda en az 2×2 cm; uzaktan taranacaksa mesafeyle orantılı büyütün.</li>
        <li><strong>Test edin:</strong> Yayınlamadan önce farklı telefonlarla mutlaka tarayıp doğrulayın.</li>
      </ul>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>QR koda dönüştürmek istediğiniz URL veya metni girin.</li>
        <li>Boyut ve renkleri ihtiyacınıza göre özelleştirin.</li>
        <li>Önizlemeyi kontrol edin ve bir telefonla test edin.</li>
        <li>QR kodu yüksek çözünürlüklü PNG olarak indirin.</li>
      </ol>

      <h2>Gizlilik</h2>
      <p>
        Tüm QR kod oluşturma işlemi tamamen tarayıcınızda gerçekleşir. Girdiğiniz
        veriler sunucuya gönderilmez, saklanmaz ve üçüncü taraflarla paylaşılmaz.
        Oluşturulan kodlar filigransızdır ve ticari dahil her amaçla ücretsiz
        kullanılabilir.
      </p>
    </>
  ) : (
    <>
      <h2>What Is a QR Code and How Does It Work?</h2>
      <p>
        A QR code (Quick Response code) is a two-dimensional barcode developed in
        1994 by the Japanese company Denso Wave. While classic striped barcodes
        carry data only horizontally, QR codes store information both horizontally
        and vertically, fitting far more data (URLs, text, contact info, Wi-Fi
        passwords) into a small square. A smartphone camera reads the black-and-
        white pattern and directs you to the content in seconds.
      </p>

      <h2>Types of QR Codes: Static and Dynamic</h2>
      <ul>
        <li><strong>Static QR code:</strong> The information is embedded directly and cannot be changed after creation. This tool generates static QR codes — ideal for a permanent URL or text, working indefinitely with no dependence on a third-party service.</li>
        <li><strong>Dynamic QR code:</strong> Points to a redirect address whose target can be changed later. It offers scan analytics but usually depends on a paid service; if that service shuts down, the code stops working.</li>
      </ul>

      <h2>Common Uses for QR Codes</h2>
      <ul>
        <li><strong>Restaurant menus:</strong> Contactless access to a digital menu.</li>
        <li><strong>Business cards:</strong> Add contact details with a single scan.</li>
        <li><strong>Payments:</strong> Fast payment in banking and wallet apps.</li>
        <li><strong>Event tickets:</strong> Quick verification at entry.</li>
        <li><strong>Wi-Fi sharing:</strong> Connect without typing a password.</li>
        <li><strong>Marketing:</strong> Direct people from posters, packaging and flyers to a website.</li>
      </ul>

      <h2>What Is the Error Correction Level?</h2>
      <p>
        QR codes include <strong>error correction</strong> so they remain readable
        even if partly damaged (scratched, smudged, partially covered). There are
        four levels: L (7%), M (15%), Q (25%) and H (30%). A higher level makes the
        code more robust but denser — preferred when adding a center logo or
        printing on a challenging surface.
      </p>

      <h2>Tips for a Good QR Code</h2>
      <ul>
        <li><strong>Sufficient contrast:</strong> A dark pattern on a light background works best; inverted colors can fail on some scanners.</li>
        <li><strong>Quiet zone:</strong> Leave an empty margin around the code; codes flush to an edge may not scan.</li>
        <li><strong>Adequate size:</strong> At least 2×2 cm in print; scale up for longer scanning distances.</li>
        <li><strong>Test it:</strong> Always scan with different phones before publishing.</li>
      </ul>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Enter the URL or text you want to encode.</li>
        <li>Customize the size and colors as needed.</li>
        <li>Check the preview and test it with a phone.</li>
        <li>Download the QR code as a high-resolution PNG.</li>
      </ol>

      <h2>Privacy</h2>
      <p>
        All QR code generation happens entirely in your browser. The data you
        enter is not sent to a server, stored, or shared with third parties.
        Generated codes are watermark-free and free for any use, including
        commercial.
      </p>
    </>
  );

  return (
    <ToolLayout toolId="qr-code-generator" locale={locale} faq={faq} guide={guide}>
      <QrGenerator />
    </ToolLayout>
  );
}
