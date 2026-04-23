import { useLocale } from "next-intl";
import { Mail, Phone, Building2, Clock, MapPin } from "lucide-react";
import { ContactForm } from "@/components/layout/contact-form";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    title: isTr ? "İletişim" : "Contact",
    description: isTr
      ? "Lale Dijital ile iletişime geçin. Sorularınız, geri bildirimleriniz ve iş birliği talepleriniz için e-posta, telefon veya iletişim formu."
      : "Contact Lale Dijital. Email, phone or contact form for questions, feedback and partnerships.",
    alternates: {
      canonical: isTr ? "/iletisim" : "/en/contact",
      languages: {
        tr: "/iletisim",
        en: "/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">
        {isTr ? "İletişim" : "Contact"}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {isTr
          ? "Sorularınız, geri bildirimleriniz, içerik düzeltme talepleri veya iş birliği önerileri için bize ulaşın."
          : "Get in touch for questions, feedback, content corrections or partnership proposals."}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {isTr ? "İletişim Bilgileri" : "Contact Details"}
          </h2>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Lale Dijital</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isTr
                    ? "Dijital yayıncılık ve yazılım geliştirme"
                    : "Digital publishing and software development"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {isTr ? "E-posta" : "Email"}
                </p>
                <a
                  href="mailto:info@laledijital.com"
                  className="mt-0.5 block text-sm font-medium hover:text-primary transition-colors"
                >
                  info@laledijital.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {isTr ? "Telefon" : "Phone"}
                </p>
                <a
                  href="tel:+905063977306"
                  className="mt-0.5 block text-sm font-medium hover:text-primary transition-colors"
                >
                  +90 506 397 73 06
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {isTr ? "Konum" : "Location"}
                </p>
                <p className="mt-0.5 text-sm">
                  {isTr ? "İstanbul, Türkiye" : "Istanbul, Turkey"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {isTr ? "Yanıt Süresi" : "Response Time"}
                </p>
                <p className="mt-0.5 text-sm">
                  {isTr
                    ? "Hafta içi 09:00 - 18:00 — genellikle 2 iş günü"
                    : "Weekdays 09:00 - 18:00 — typically 2 business days"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            {isTr ? "Bize Yazın" : "Send a Message"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isTr
              ? "Aşağıdaki formu doldurun; e-posta adresinize yanıt vereceğiz."
              : "Fill in the form below and we&apos;ll reply by email."}
          </p>
          <div className="mt-4">
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
