import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ToolCard } from "@/components/tools/tool-card";
import { AdUnit } from "@/components/ads/ad-unit";
import { WebsiteJsonLd } from "@/components/seo/json-ld";
import { TOOLS } from "@/lib/constants";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <WebsiteJsonLd locale="tr" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {t("home.hero.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, title: "100%", desc: t("common.free") },
              { icon: Shield, title: "100%", desc: t("common.noUpload") },
              { icon: Globe, title: "TR / EN", desc: "Bilingual" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-bold">{f.title}</div>
                  <div className="text-sm text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdUnit slot="homepage-top" format="horizontal" className="my-4" />
      </div>

      {/* Tools Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("home.toolsSection.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("home.toolsSection.subtitle")}
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            {t("home.toolsSection.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              icon={tool.icon}
              name={t(`tools.${tool.id}.name`)}
              description={t(`tools.${tool.id}.shortDesc`)}
              cta={t("tools.useNow")}
            />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            {t("home.toolsSection.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* AI Guides Teaser */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("home.guidesSection.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("home.guidesSection.subtitle")}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              {t("common.loading")} — Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <AdUnit slot="homepage-bottom" format="horizontal" />
      </div>
    </>
  );
}
