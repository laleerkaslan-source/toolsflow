export function formatCurrency(
  amount: number,
  locale: string = "tr",
  currency: string = "TRY"
): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(
  value: number,
  locale: string = "tr",
  decimals: number = 2
): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(
  value: number,
  locale: string = "tr",
  decimals: number = 1
): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

export function formatCompact(value: number, locale: string = "tr"): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
