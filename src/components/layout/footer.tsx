import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tTools = useTranslations("tools");

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("tools")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/salary-calculator" className="hover:text-foreground transition-colors">
                  {tTools("salary-calculator.name")}
                </Link>
              </li>
              <li>
                <Link href="/tools/loan-calculator" className="hover:text-foreground transition-colors">
                  {tTools("loan-calculator.name")}
                </Link>
              </li>
              <li>
                <Link href="/tools/vat-calculator" className="hover:text-foreground transition-colors">
                  {tTools("vat-calculator.name")}
                </Link>
              </li>
              <li>
                <Link href="/tools/severance-calculator" className="hover:text-foreground transition-colors">
                  {tTools("severance-calculator.name")}
                </Link>
              </li>
              <li>
                <Link href="/tools/investment-calculator" className="hover:text-foreground transition-colors">
                  {tTools("investment-calculator.name")}
                </Link>
              </li>
              <li>
                <Link href="/tools/currency-converter" className="hover:text-foreground transition-colors">
                  {tTools("currency-converter.name")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("guides")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/ai-guide" className="hover:text-foreground transition-colors">
                  AI Rehber
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("company")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Lale Dijital
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("legal")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t("copyright")}
          </p>
          <p className="flex items-center gap-1">
            {t("madeWith")} <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
