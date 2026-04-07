import { useLocale } from "next-intl";
import { Mail } from "lucide-react";
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
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-sm">contact@dijiarac.com</span>
        </div>
      </div>
    </div>
  );
}
