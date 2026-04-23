import { AdUnit } from "@/components/ads/ad-unit";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS } from "@/app/[locale]/blog/page";
import { Disclaimer } from "@/components/layout/disclaimer";
import { AuthorBio } from "@/components/blog/author-bio";

interface BlogLayoutProps {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  locale: string;
  children: React.ReactNode;
  relatedTool?: { href: string; label: string };
  faq?: { q: string; a: string }[];
}

export function BlogLayout({
  slug,
  title,
  description,
  datePublished,
  locale,
  children,
  relatedTool,
  faq,
}: BlogLayoutProps) {
  const isTr = locale === "tr";
  const url = `${SITE_URL}${isTr ? `/blog/${slug}` : `/en/blog/${slug}`}`;
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        title={title}
        description={description}
        url={url}
        datePublished={datePublished}
        author="Lale Dijital"
        locale={locale}
      />
      <BreadcrumbJsonLd
        items={[
          { name: isTr ? "Ana Sayfa" : "Home", url: "/" },
          { name: "Blog", url: isTr ? "/blog" : "/en/blog" },
          { name: title, url: isTr ? `/blog/${slug}` : `/en/blog/${slug}` },
        ]}
      />
      {faq && <FaqJsonLd items={faq} />}

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                {description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={datePublished}>
                  {new Date(datePublished).toLocaleDateString(
                    isTr ? "tr-TR" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </time>
                <span>Lale Dijital</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {children}
            </div>

            <Disclaimer locale={locale} variant="blog" />

            <AuthorBio locale={locale} />

            {relatedTool && (
              <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-lg font-semibold">
                  {isTr
                    ? "Hemen Hesapla"
                    : "Calculate Now"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isTr
                    ? "Ücretsiz online aracımızı kullanarak hemen hesaplama yapın."
                    : "Use our free online tool to calculate instantly."}
                </p>
                <Link
                  href={relatedTool.href as "/"}
                  className="mt-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {relatedTool.label}
                </Link>
              </div>
            )}

            <AdUnit
              slot="blog-mid"
              format="horizontal"
              className="my-8"
            />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">
                  {isTr ? "Ilgili Yazilar" : "Related Posts"}
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {relatedPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}` as "/"}
                      className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {isTr ? p.category.tr : p.category.en}
                      </span>
                      <h3 className="mt-2 text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {isTr ? p.title.tr : p.title.en}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            {faq && faq.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">
                  {isTr ? "Sik Sorulan Sorular" : "Frequently Asked Questions"}
                </h2>
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
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <AdUnit slot="blog-sidebar" format="rectangle" />
            </div>
          </aside>
        </div>

        <AdUnit slot="blog-bottom" format="horizontal" className="mt-8" />
      </div>
    </>
  );
}
