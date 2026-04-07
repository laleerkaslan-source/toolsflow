import { useLocale } from "next-intl";
import { Mail, Phone, Building2 } from "lucide-react";
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
  };
}

export default function ContactPage() {
  const locale = useLocale();
  const isTr = locale === "tr";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">
        {isTr ? "İletişim" : "Contact"}
      </h1>
      <div className="mt-8 space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {isTr
            ? "Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşabilirsiniz."
            : "Feel free to reach out with any questions, suggestions or feedback."}
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Lale Dijital</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <Phone className="h-5 w-5 text-primary" />
            <a href="tel:+905063977306" className="text-sm hover:text-primary transition-colors">
              +90 506 397 73 06
            </a>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:info@laledijital.com" className="text-sm hover:text-primary transition-colors">
              info@laledijital.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
