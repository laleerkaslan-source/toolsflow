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

  return (
    <ToolLayout toolId="image-compressor" locale={locale} faq={faq}>
      <ImageCompressor />
    </ToolLayout>
  );
}
