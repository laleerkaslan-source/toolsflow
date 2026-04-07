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

  return (
    <ToolLayout toolId="qr-code-generator" locale={locale} faq={faq}>
      <QrGenerator />
    </ToolLayout>
  );
}
