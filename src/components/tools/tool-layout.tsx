import { useTranslations } from "next-intl";
import { AdUnit } from "@/components/ads/ad-unit";
import { BreadcrumbJsonLd, ToolJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";

interface ToolLayoutProps {
  toolId: string;
  locale: string;
  children: React.ReactNode;
  faq?: { q: string; a: string }[];
  guide?: React.ReactNode;
}

export function ToolLayout({ toolId, locale, children, faq, guide }: ToolLayoutProps) {
  const t = useTranslations();
  const toolName = t(`tools.${toolId}.name`);
  const toolDesc = t(`tools.${toolId}.description`);
  const isTr = locale === "tr";

  return (
    <>
      <ToolJsonLd
        name={toolName}
        description={toolDesc}
        url={`${SITE_URL}${isTr ? "/araclar" : "/en/tools"}/${toolId}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t("nav.home"), url: "/" },
          { name: t("tools.title"), url: isTr ? "/araclar" : "/en/tools" },
          { name: toolName, url: `${isTr ? "/araclar" : "/en/tools"}/${toolId}` },
        ]}
      />
      {faq && <FaqJsonLd items={faq} />}

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{toolName}</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {toolDesc}
            </p>

            <div className="mt-8">{children}</div>

            <AdUnit slot={`${toolId}-mid`} format="horizontal" className="my-8" />

            {guide && (
              <section className="mt-12 prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
                {guide}
              </section>
            )}

            {/* FAQ Section */}
            {faq && faq.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">{t("tools.faq")}</h2>
                <div className="space-y-4">
                  {faq.map((item, i) => (
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
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <AdUnit slot={`${toolId}-sidebar`} format="rectangle" />
            </div>
          </aside>
        </div>

        <AdUnit slot={`${toolId}-bottom`} format="horizontal" className="mt-8" />
      </div>
    </>
  );
}
