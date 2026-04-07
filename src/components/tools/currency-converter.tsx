"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeftRight, RefreshCw } from "lucide-react";

const POPULAR_CURRENCIES = [
  "TRY", "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD",
  "CNY", "INR", "BRL", "KRW", "MXN", "RUB", "SAR", "AED",
];

const CURRENCY_NAMES: Record<string, Record<string, string>> = {
  tr: {
    TRY: "Türk Lirası", USD: "Amerikan Doları", EUR: "Euro", GBP: "İngiliz Sterlini",
    JPY: "Japon Yeni", CHF: "İsviçre Frangı", CAD: "Kanada Doları", AUD: "Avustralya Doları",
    CNY: "Çin Yuanı", INR: "Hint Rupisi", BRL: "Brezilya Reali", KRW: "Güney Kore Wonu",
    MXN: "Meksika Pesosu", RUB: "Rus Rublesi", SAR: "Suudi Riyali", AED: "BAE Dirhemi",
  },
  en: {
    TRY: "Turkish Lira", USD: "US Dollar", EUR: "Euro", GBP: "British Pound",
    JPY: "Japanese Yen", CHF: "Swiss Franc", CAD: "Canadian Dollar", AUD: "Australian Dollar",
    CNY: "Chinese Yuan", INR: "Indian Rupee", BRL: "Brazilian Real", KRW: "South Korean Won",
    MXN: "Mexican Peso", RUB: "Russian Ruble", SAR: "Saudi Riyal", AED: "UAE Dirham",
  },
};

export function CurrencyConverter() {
  const t = useTranslations("common");
  const locale = useLocale();
  const names = CURRENCY_NAMES[locale] || CURRENCY_NAMES.en;

  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TRY");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?from=${from}&to=${to}`
      );
      const data = await res.json();
      setRate(data.rates[to]);
      setLastUpdate(data.date);
    } catch {
      setRate(null);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const result = rate && amount ? (Number(amount) * rate).toFixed(2) : null;

  return (
    <div className="space-y-6">
      {/* Amount Input */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          {locale === "tr" ? "Miktar" : "Amount"}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={0}
          step="any"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-lg font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Currency Selectors */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium">
            {locale === "tr" ? "Kaynak" : "From"}
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {POPULAR_CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c} — {names[c] || c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={swap}
          className="mt-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
          aria-label="Swap currencies"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium">
            {locale === "tr" ? "Hedef" : "To"}
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {POPULAR_CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c} — {names[c] || c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      {loading ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      ) : result ? (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {amount} {from} =
            </p>
            <p className="mt-1 text-4xl font-bold text-primary">
              {result} {to}
            </p>
            {rate && (
              <p className="mt-3 text-xs text-muted-foreground">
                1 {from} = {rate.toFixed(4)} {to}
                {lastUpdate && (
                  <>
                    {" "}
                    · {locale === "tr" ? "Güncelleme" : "Updated"}: {lastUpdate}
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      ) : null}

      {from === to && (
        <p className="text-sm text-muted-foreground text-center">
          {locale === "tr"
            ? "Lütfen farklı para birimleri seçin."
            : "Please select different currencies."}
        </p>
      )}
    </div>
  );
}
