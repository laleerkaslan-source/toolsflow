import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ToolCard } from "@/components/tools/tool-card";
import { AdUnit } from "@/components/ads/ad-unit";
import { WebsiteJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { TOOLS } from "@/lib/constants";
import { BLOG_POSTS } from "./blog/page";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  CalendarCheck,
  Lock,
  ListChecks,
  Calendar,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isTr = locale === "tr";

  const faqItems = [
    { q: t("home.faqSection.q1"), a: t("home.faqSection.a1") },
    { q: t("home.faqSection.q2"), a: t("home.faqSection.a2") },
    { q: t("home.faqSection.q3"), a: t("home.faqSection.a3") },
    { q: t("home.faqSection.q4"), a: t("home.faqSection.a4") },
  ];

  return (
    <>
      <WebsiteJsonLd locale={locale} />
      <FaqJsonLd items={faqItems} />

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
          {TOOLS.slice(0, 8).map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              icon={tool.icon}
              category={tool.category}
              name={t(`tools.${tool.id}.name`)}
              description={t(`tools.${tool.id}.shortDesc`)}
              cta={t("tools.useNow")}
              isNew={tool.isNew}
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

      {/* Why ToolsFlow Section — SEO rich text */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("home.whySection.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
            {t("home.whySection.intro")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: t("home.whySection.feature1Title"),
                desc: t("home.whySection.feature1Desc"),
              },
              {
                icon: Lock,
                title: t("home.whySection.feature2Title"),
                desc: t("home.whySection.feature2Desc"),
              },
              {
                icon: ListChecks,
                title: t("home.whySection.feature3Title"),
                desc: t("home.whySection.feature3Desc"),
              },
            ].map((f, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdUnit slot="homepage-mid" format="horizontal" className="my-4" />
      </div>

      {/* Blog Posts Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("home.guidesSection.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("home.guidesSection.subtitle")}
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            {t("home.guidesSection.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}` as "/"}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {isTr ? post.category.tr : post.category.en}
              </span>
              <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">
                {isTr ? post.title.tr : post.title.en}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {isTr ? post.description.tr : post.description.en}
              </p>
              <span className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString(
                  isTr ? "tr-TR" : "en-US",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section — SEO rich text */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("home.faqSection.title")}
          </h2>
          <div className="mt-8 space-y-4 max-w-3xl">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-border bg-card"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-medium hover:bg-accent/50 transition-colors">
                  {item.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
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
