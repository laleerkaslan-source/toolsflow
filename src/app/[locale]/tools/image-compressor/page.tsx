import { ToolLayout } from "@/components/tools/tool-layout";
import { ImageCompressor } from "@/components/tools/image-compressor";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Resim Sıkıştırma" : "Image Compressor",
    description: isTr
      ? "Ücretsiz resim sıkıştırma aracı. Resimlerinizi kaliteden ödün vermeden küçültün. JPEG, PNG ve WebP desteklenir."
      : "Free image compressor tool. Reduce image file sizes without losing quality. JPEG, PNG and WebP supported.",
    alternates: {
      canonical: isTr ? "/araclar/resim-sikistirma" : "/en/tools/image-compressor",
      languages: {
        tr: "/araclar/resim-sikistirma",
        en: "/en/tools/image-compressor",
      },
    },
  };
}

export default async function ImageCompressorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  const faq = isTr
    ? [
        { q: "Resim sıkıştırma kaliteyi düşürür mü?", a: "Kalite ayarına bağlıdır. %70-80 kalite seviyesinde, çoğu resimde gözle görülür bir fark olmadan boyutu önemli ölçüde küçültebilirsiniz." },
        { q: "Hangi formatları destekliyorsunuz?", a: "JPEG, PNG ve WebP formatlarındaki resimleri sıkıştırabilirsiniz. Çıktı formatı olarak WebP veya JPEG seçebilirsiniz." },
        { q: "Resimlerim sunucuya yükleniyor mu?", a: "Hayır! Tüm sıkıştırma işlemi tarayıcınızda gerçekleşir. Resimleriniz asla sunucumuza gönderilmez." },
        { q: "WebP nedir?", a: "WebP, Google tarafından geliştirilen modern bir resim formatıdır. JPEG'e göre %25-35 daha küçük dosya boyutu sağlarken aynı kaliteyi korur." },
      ]
    : [
        { q: "Does image compression reduce quality?", a: "It depends on the quality setting. At 70-80% quality, you can significantly reduce file size with no visible difference for most images." },
        { q: "What formats do you support?", a: "You can compress images in JPEG, PNG and WebP formats. You can choose WebP or JPEG as the output format." },
        { q: "Are my images uploaded to a server?", a: "No! All compression happens in your browser. Your images are never sent to our server." },
        { q: "What is WebP?", a: "WebP is a modern image format developed by Google. It provides 25-35% smaller file sizes compared to JPEG while maintaining the same quality." },
      ];

  const guide = isTr ? (
    <>
      <h2>Resim Sıkıştırma Nedir ve Nasıl Çalışır?</h2>
      <p>
        Resim sıkıştırma, bir görüntü dosyasının boyutunu (kilobayt/megabayt)
        azaltarak daha az yer kaplamasını ve daha hızlı yüklenmesini sağlayan
        işlemdir. Sıkıştırma, görüntüdeki gereksiz veya insan gözünün fark
        edemeyeceği verileri elerken görsel kaliteyi mümkün olduğunca korumaya
        çalışır. Bir fotoğrafın 4 MB&apos;tan 400 KB&apos;a inmesi, %90 boyut
        tasarrufu anlamına gelir ve web sayfası hızından e-posta eklerine kadar
        her yerde fark yaratır.
      </p>

      <h2>Kayıplı ve Kayıpsız Sıkıştırma</h2>
      <p>
        İki temel sıkıştırma yöntemi vardır:
      </p>
      <ul>
        <li>
          <strong>Kayıplı (lossy) sıkıştırma:</strong> JPEG ve WebP&apos;de
          kullanılır. Bir miktar görüntü verisi kalıcı olarak atılır. Doğru kalite
          seviyesinde (genellikle %70-85) fark neredeyse görünmezken dosya boyutu
          dramatik biçimde düşer. Fotoğraflar için idealdir.
        </li>
        <li>
          <strong>Kayıpsız (lossless) sıkıştırma:</strong> PNG&apos;de kullanılır.
          Hiçbir veri kaybolmaz, görüntü birebir korunur; ancak boyut tasarrufu
          daha sınırlıdır. Logolar, ekran görüntüleri ve keskin kenarlı grafikler
          için uygundur.
        </li>
      </ul>

      <h2>Hangi Formatı Seçmelisiniz?</h2>
      <table>
        <thead>
          <tr>
            <th>Format</th>
            <th>En İyi Kullanım</th>
            <th>Özellik</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>JPEG</td><td>Fotoğraflar</td><td>Küçük boyut, geniş uyumluluk</td></tr>
          <tr><td>PNG</td><td>Logo, grafik, şeffaf arka plan</td><td>Kayıpsız, şeffaflık desteği</td></tr>
          <tr><td>WebP</td><td>Web görselleri</td><td>JPEG&apos;e göre %25-35 daha küçük</td></tr>
        </tbody>
      </table>
      <p>
        WebP, Google tarafından geliştirilen modern bir formattır ve aynı kalitede
        JPEG&apos;e göre belirgin biçimde daha küçük dosyalar üretir. Modern tüm
        tarayıcılar tarafından desteklenir; web siteleri için önerilen seçimdir.
      </p>

      <h2>Neden Resim Sıkıştırma Önemli? (Web Performansı ve SEO)</h2>
      <p>
        Görseller genellikle bir web sayfasının en ağır bileşenidir. Büyük resimler
        sayfa yükleme süresini uzatır, bu da hem kullanıcı deneyimini hem de arama
        motoru sıralamalarını olumsuz etkiler. Google, sayfa hızını (Core Web
        Vitals) bir sıralama sinyali olarak kullanır. Optimize edilmiş görseller
        özellikle mobil ve yavaş bağlantılarda büyük fark yaratır. Ayrıca daha
        küçük dosyalar daha az veri tüketir — sınırlı mobil paketler için önemlidir.
      </p>

      <h2>Aracı Nasıl Kullanırsınız?</h2>
      <ol>
        <li>Sıkıştırmak istediğiniz resmi seçin veya sürükleyip bırakın.</li>
        <li>Kalite seviyesini ayarlayın (%70-80 çoğu durum için idealdir).</li>
        <li>Çıktı formatını seçin (WebP veya JPEG).</li>
        <li>Sıkıştırılmış resmi indirin ve boyut tasarrufunu görün.</li>
      </ol>

      <h2>Gizlilik: Resimleriniz Tarayıcınızda Kalır</h2>
      <p>
        Bu araçta tüm sıkıştırma işlemi tamamen <strong>sizin tarayıcınızda</strong>
        (istemci tarafında) gerçekleşir. Resimleriniz hiçbir zaman sunucuya
        yüklenmez veya saklanmaz. Bu, hassas belge, kimlik fotoğrafı veya kişisel
        görselleri işlerken tam gizlilik sağlar. İnternet bağlantınız yavaş olsa
        bile yükleme beklemeden anında sonuç alırsınız.
      </p>

      <h2>Sık Yapılan Hatalar</h2>
      <ul>
        <li><strong>PNG&apos;yi fotoğraf için kullanmak:</strong> Fotoğrafı PNG kaydetmek gereksiz büyük dosya oluşturur; fotoğraflarda JPEG/WebP tercih edin.</li>
        <li><strong>Aşırı sıkıştırma:</strong> Kaliteyi %50&apos;nin altına düşürmek görünür bozulmalara (artefakt) yol açar.</li>
        <li><strong>Gereksiz büyük boyut:</strong> 4000px genişliğinde bir resmi 800px&apos;lik bir alanda göstermek boşa veri harcar; önce boyutu küçültün.</li>
      </ul>
    </>
  ) : (
    <>
      <h2>What Is Image Compression and How Does It Work?</h2>
      <p>
        Image compression reduces a file&apos;s size (in KB/MB) so it takes up less
        space and loads faster. Compression removes redundant data — or detail the
        human eye barely notices — while preserving visual quality as much as
        possible. Shrinking a photo from 4 MB to 400 KB is a 90% saving, making a
        difference everywhere from web page speed to email attachments.
      </p>

      <h2>Lossy vs. Lossless Compression</h2>
      <ul>
        <li><strong>Lossy compression:</strong> Used in JPEG and WebP. Some image data is permanently discarded. At the right quality (usually 70-85%), the difference is nearly invisible while the file shrinks dramatically. Ideal for photos.</li>
        <li><strong>Lossless compression:</strong> Used in PNG. No data is lost and the image is preserved exactly, but savings are more limited. Best for logos, screenshots and sharp-edged graphics.</li>
      </ul>

      <h2>Which Format Should You Choose?</h2>
      <table>
        <thead>
          <tr><th>Format</th><th>Best For</th><th>Feature</th></tr>
        </thead>
        <tbody>
          <tr><td>JPEG</td><td>Photos</td><td>Small size, broad compatibility</td></tr>
          <tr><td>PNG</td><td>Logos, graphics, transparency</td><td>Lossless, transparency support</td></tr>
          <tr><td>WebP</td><td>Web images</td><td>25-35% smaller than JPEG</td></tr>
        </tbody>
      </table>
      <p>
        WebP is a modern format developed by Google that produces noticeably
        smaller files than JPEG at the same quality. It is supported by all modern
        browsers and is the recommended choice for websites.
      </p>

      <h2>Why Image Compression Matters (Web Performance and SEO)</h2>
      <p>
        Images are often the heaviest part of a web page. Large images slow page
        loads, hurting both user experience and search rankings. Google uses page
        speed (Core Web Vitals) as a ranking signal. Optimized images make a big
        difference on mobile and slow connections, and smaller files use less data
        — important for limited mobile plans.
      </p>

      <h2>How to Use This Tool</h2>
      <ol>
        <li>Select or drag and drop the image you want to compress.</li>
        <li>Adjust the quality level (70-80% is ideal for most cases).</li>
        <li>Choose the output format (WebP or JPEG).</li>
        <li>Download the compressed image and see the size savings.</li>
      </ol>

      <h2>Privacy: Your Images Stay in Your Browser</h2>
      <p>
        All compression here happens entirely in <strong>your browser</strong>
        (client-side). Your images are never uploaded to or stored on a server.
        This gives you full privacy when handling sensitive documents, ID photos
        or personal images, and delivers instant results even on a slow connection.
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li><strong>Using PNG for photos:</strong> Saving a photo as PNG creates a needlessly large file; prefer JPEG/WebP for photos.</li>
        <li><strong>Over-compressing:</strong> Dropping quality below 50% causes visible artifacts.</li>
        <li><strong>Unnecessary dimensions:</strong> Displaying a 4000px image in an 800px slot wastes data; resize first.</li>
      </ul>
    </>
  );

  return (
    <ToolLayout toolId="image-compressor" locale={locale} faq={faq} guide={guide}>
      <ImageCompressor />
    </ToolLayout>
  );
}
