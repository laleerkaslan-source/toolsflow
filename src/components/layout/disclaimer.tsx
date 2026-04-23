import { AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface DisclaimerProps {
  locale: string;
  variant?: "tool" | "blog";
}

export function Disclaimer({ locale, variant = "tool" }: DisclaimerProps) {
  const isTr = locale === "tr";

  const text = isTr
    ? variant === "tool"
      ? "Bu araç yalnızca bilgilendirme amaçlıdır ve profesyonel muhasebe, hukuk veya finans danışmanlığı yerine geçmez. Sonuçlar tahminidir; önemli kararlar için SMMM veya yetkili danışmana başvurun."
      : "Bu içerik bilgilendirme amaçlıdır; yasal, mali veya vergi danışmanlığı niteliği taşımaz. Güncel mevzuat için resmi kaynakları (Resmî Gazete, GİB, SGK) takip edin."
    : variant === "tool"
    ? "This tool is for informational purposes only and does not constitute professional accounting, legal or financial advice. Results are estimates; consult a certified advisor for important decisions."
    : "This content is for informational purposes only and does not constitute legal, financial or tax advice. For current regulations, consult official sources (Official Gazette, GİB, SSI).";

  return (
    <div className="mt-8 flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" />
      <p className="leading-relaxed">
        <strong className="text-foreground">
          {isTr ? "Sorumluluk Reddi: " : "Disclaimer: "}
        </strong>
        {text}{" "}
        <Link href="/terms" className="text-primary hover:underline">
          {isTr ? "Kullanım Şartları" : "Terms of Service"}
        </Link>
        .
      </p>
    </div>
  );
}
