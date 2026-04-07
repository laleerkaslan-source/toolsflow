import { useLocale } from "next-intl";
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
      <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        {isTr ? (
          <>
            <p>Son güncelleme: Nisan 2026</p>
            <h2 className="text-lg font-semibold text-foreground">Veri Toplama</h2>
            <p>
              {SITE_NAME} olarak gizliliğinize saygı duyuyoruz. Araçlarımız tarayıcınızda
              çalışır ve kişisel verilerinizi sunucularımıza göndermez.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Çerezler</h2>
            <p>
              Sitemizde Google AdSense reklamları gösterilmektedir. Google, reklamları
              kişiselleştirmek için çerezler kullanabilir. Daha fazla bilgi için
              Google&apos;ın gizlilik politikasını inceleyebilirsiniz.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Analitik</h2>
            <p>
              Sitemizin performansını iyileştirmek için anonim analitik verileri
              toplayabiliriz. Bu veriler kişisel olarak sizi tanımlamaz.
            </p>
            <h2 className="text-lg font-semibold text-foreground">İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız varsa, iletişim sayfamızdan bize
              ulaşabilirsiniz.
            </p>
          </>
        ) : (
          <>
            <p>Last updated: April 2026</p>
            <h2 className="text-lg font-semibold text-foreground">Data Collection</h2>
            <p>
              At {SITE_NAME}, we respect your privacy. Our tools run in your browser and
              do not send your personal data to our servers.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
            <p>
              Our site displays Google AdSense advertisements. Google may use cookies to
              personalize ads. For more information, please review Google&apos;s privacy
              policy.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
            <p>
              We may collect anonymous analytics data to improve site performance. This
              data does not personally identify you.
            </p>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p>
              If you have questions about our privacy policy, please reach out through our
              contact page.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
