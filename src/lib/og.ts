import { SITE_URL } from "./constants";

interface OgImageOptions {
  title: string;
  category?: string;
  type?: "page" | "blog" | "tool";
  locale?: string;
}

export function ogImageUrl({
  title,
  category,
  type = "page",
  locale = "tr",
}: OgImageOptions): string {
  const params = new URLSearchParams({ title, type, locale });
  if (category) params.set("category", category);
  return `${SITE_URL}/og?${params.toString()}`;
}

interface SocialMetadataOptions extends OgImageOptions {
  description: string;
  url: string;
}

export function socialMetadata(opts: SocialMetadataOptions) {
  const image = ogImageUrl(opts);
  return {
    openGraph: {
      type: "article" as const,
      title: opts.title,
      description: opts.description,
      url: opts.url,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}
