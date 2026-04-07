import { useTranslations } from "next-intl";
import { ToolCard } from "@/components/tools/tool-card";
import { AdUnit } from "@/components/ads/ad-unit";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { TOOLS } from "@/lib/constants";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "Ücretsiz Online Araçlar" : "Free Online Tools",
    description: isTr
      ? "Ücretsiz online araçlar: QR kod oluşturucu, resim sıkıştırma, VKİ hesaplayıcı, döviz çevirici ve daha fazlası."
      : "Free online tools: QR code generator, image compressor, BMI calculator, currency converter and more.",
    alternates: {
      languages: {
        tr: "/araclar",
        en: "/en/tools",
      },
    },
  };
}

export default function ToolsPage() {
  const t = useTranslations();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("nav.home"), url: "/" },
          { name: t("tools.title"), url: "/araclar" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold sm:text-4xl">{t("tools.title")}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {t("tools.description")}
          </p>
        </div>

        <AdUnit slot="tools-top" format="horizontal" className="mb-8" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              icon={tool.icon}
              name={t(`tools.${tool.id}.name`)}
              description={t(`tools.${tool.id}.description`)}
              cta={t("tools.useNow")}
            />
          ))}
        </div>

        <AdUnit slot="tools-bottom" format="horizontal" className="mt-8" />
      </div>
    </>
  );
}
