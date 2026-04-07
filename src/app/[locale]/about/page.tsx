import { useTranslations, useLocale } from "next-intl";
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
    title: isTr ? "Hakkımızda" : "About Us",
    description: isTr
      ? `${SITE_NAME} hakkında bilgi edinin. Ücretsiz online araçlar ve AI rehberleri sunan platformumuz hakkında.`
      : `Learn about ${SITE_NAME}. Our platform providing free online tools and AI guides.`,
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
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        {isTr ? (
          <>
            <p>
              <strong className="text-foreground">{SITE_NAME}</strong>, günlük dijital
              ihtiyaçlarınız için ücretsiz online araçlar ve yapay zeka rehberleri sunan
              bir platformdur.
            </p>
            <p>
              Amacımız, herkesin kolayca erişebileceği, hızlı ve güvenli araçlar
              sunmaktır. Tüm araçlarımız tarayıcınızda çalışır — verileriniz asla
              sunucularımıza gönderilmez.
            </p>
            <p>
              QR kod oluşturucu, resim sıkıştırma, VKİ hesaplayıcı ve döviz çevirici
              gibi araçlarımızın yanı sıra, yapay zeka dünyasındaki en son gelişmeleri
              takip edebileceğiniz rehberler de sunuyoruz.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong className="text-foreground">{SITE_NAME}</strong> is a platform
              providing free online tools and AI guides for your daily digital needs.
            </p>
            <p>
              Our mission is to provide fast, secure, and easily accessible tools for
              everyone. All our tools run in your browser — your data is never sent to
              our servers.
            </p>
            <p>
              Along with tools like QR code generator, image compressor, BMI calculator,
              and currency converter, we also offer guides to help you stay up to date
              with the latest developments in the AI world.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
