import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/lib/theme-provider";
import { SITE_NAME, SITE_URL, ADSENSE_CLIENT_ID } from "@/lib/constants";
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
      ? "Ücretsiz online araçlar. Maaş hesaplayıcı, kredi hesaplayıcı, KDV hesaplayıcı, kıdem tazminatı, yatırım getiri hesaplayıcı ve daha fazlası."
      : "Free online tools. Salary calculator, loan calculator, VAT calculator, severance pay, investment return calculator and more.",
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
      locale: isTr ? "tr_TR" : "en_US",
      url: isTr ? SITE_URL : `${SITE_URL}/en`,
      title: `${SITE_NAME} — ${isTr ? "Ücretsiz Online Araçlar" : "Free Online Tools"}`,
      description: isTr
        ? "Maaş hesaplayıcı, kredi hesaplayıcı, KDV hesaplayıcı ve daha fazlası. Tamamen ücretsiz."
        : "Salary calculator, loan calculator, VAT calculator and more. Completely free.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — ${isTr ? "Ücretsiz Online Araçlar" : "Free Online Tools"}`,
      description: isTr
        ? "Maaş hesaplayıcı, kredi hesaplayıcı, KDV hesaplayıcı ve daha fazlası."
        : "Salary calculator, loan calculator, VAT calculator and more.",
    },
    verification: {
      google: "google7f4a58544c1a9296",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
