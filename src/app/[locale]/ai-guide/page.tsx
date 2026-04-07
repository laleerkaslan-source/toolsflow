import { useTranslations } from "next-intl";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Bot } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "AI Rehberleri" : "AI Guides",
    description: isTr
      ? "Yapay zeka araçları hakkında detaylı incelemeler, karşılaştırmalar ve kullanım rehberleri."
      : "Detailed reviews, comparisons and usage guides about AI tools.",
    alternates: {
      languages: {
        tr: "/ai-rehber",
        en: "/en/ai-guide",
      },
    },
  };
}

export default function GuidesPage() {
  const t = useTranslations();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("nav.home"), url: "/" },
          { name: t("guides.title"), url: "/ai-rehber" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold sm:text-4xl">{t("guides.title")}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {t("guides.description")}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-16 text-center">
          <Bot className="mb-4 h-16 w-16 text-muted-foreground/40" />
          <h2 className="text-xl font-semibold text-muted-foreground">
            Coming Soon
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {t("guides.description")}
          </p>
        </div>
      </div>
    </>
  );
}
