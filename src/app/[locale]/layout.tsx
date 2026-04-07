import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: {
      default: `${SITE_NAME} — ${isTr ? "Ücretsiz Online Araçlar & AI Rehberleri" : "Free Online Tools & AI Guides"}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: isTr
      ? "Ücretsiz online araçlar ve AI rehberleri. QR kod oluşturucu, resim sıkıştırma, döviz çevirici ve daha fazlası."
      : "Free online tools and AI guides. QR code generator, image compressor, currency converter and more.",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: isTr ? "/" : "/en",
      languages: {
        tr: "/",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
