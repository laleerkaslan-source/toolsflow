"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ui/result-card";
import { SEVERANCE_CEILING, STAMP_TAX_RATE } from "@/lib/turkey-tax-data";
import { formatCurrency } from "@/lib/formatters";

export function SeveranceCalculator() {
  const locale = useLocale();
  const isTr = locale === "tr";

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grossSalary, setGrossSalary] = useState("");
  const [extras, setExtras] = useState(""); // ek haklar (yemek, yol vb.)

  const parsed = {
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
    salary: parseFloat(grossSalary.replace(/\./g, "").replace(",", ".")),
    extras: parseFloat(extras.replace(/\./g, "").replace(",", ".")) || 0,
  };

  const isValid =
    parsed.start && parsed.end && parsed.end > parsed.start &&
    !isNaN(parsed.salary) && parsed.salary > 0;

  const result = useMemo(() => {
    if (!isValid || !parsed.start || !parsed.end) return null;

    // Calculate service duration
    const diffMs = parsed.end.getTime() - parsed.start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const remainingDays = totalDays - years * 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays - months * 30;

    // Daily wage = gross salary / 30
    const totalMonthly = parsed.salary + parsed.extras;
    const dailyWage = totalMonthly / 30;

    // Determine ceiling period
    const endYear = parsed.end.getFullYear();
    const endMonth = parsed.end.getMonth() + 1;
    const halfKey = `${endYear}-H${endMonth <= 6 ? 1 : 2}`;
    const ceiling = SEVERANCE_CEILING[halfKey] || Object.values(SEVERANCE_CEILING)[0];

    // Apply ceiling to monthly wage
    const cappedMonthly = Math.min(totalMonthly, ceiling);

    // Severance = (cappedMonthly / 30) * total service days
    const grossSeverance = (cappedMonthly / 30) * totalDays;

    // Stamp tax deduction
    const stampTax = grossSeverance * STAMP_TAX_RATE;
    const netSeverance = grossSeverance - stampTax;

    const isCapped = totalMonthly > ceiling;

    return {
      years, months, days, totalDays,
      totalMonthly,
      ceiling,
      cappedMonthly,
      isCapped,
      grossSeverance,
      stampTax,
      netSeverance,
      halfKey,
    };
  }, [parsed.start?.getTime(), parsed.end?.getTime(), parsed.salary, parsed.extras, isValid]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="start-date" className="block text-sm font-medium">
            {isTr ? "İşe Başlama Tarihi" : "Start Date"}
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="end-date" className="block text-sm font-medium">
            {isTr ? "İşten Ayrılma Tarihi" : "End Date"}
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="sev-gross-salary"
          label={isTr ? "Son Brüt Maaş" : "Last Gross Salary"}
          prefix="₺"
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          value={grossSalary}
          onChange={(e) => setGrossSalary(e.target.value)}
        />
        <Input
          id="sev-extras"
          label={isTr ? "Ek Haklar (Yemek, Yol vb.)" : "Benefits (Food, Transport etc.)"}
          prefix="₺"
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Service Duration */}
          <div className="rounded-xl border border-border bg-muted/30 px-5 py-4">
            <p className="text-sm font-medium text-muted-foreground">
              {isTr ? "Hizmet Süresi" : "Service Duration"}
            </p>
            <p className="mt-1 text-xl font-bold">
              {result.years > 0 && `${result.years} ${isTr ? "yıl" : "yr"} `}
              {result.months > 0 && `${result.months} ${isTr ? "ay" : "mo"} `}
              {result.days > 0 && `${result.days} ${isTr ? "gün" : "day"}`}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({result.totalDays} {isTr ? "gün" : "days"})
              </span>
            </p>
          </div>

          {/* Primary Results */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ResultCard
              label={isTr ? "Brüt Kıdem Tazminatı" : "Gross Severance"}
              value={formatCurrency(result.grossSeverance, locale)}
            />
            <ResultCard
              label={isTr ? "Damga Vergisi" : "Stamp Tax"}
              value={formatCurrency(result.stampTax, locale)}
              sublabel={`%${(STAMP_TAX_RATE * 100).toFixed(3).replace(".", ",")}`}
              variant="warning"
            />
            <ResultCard
              label={isTr ? "Net Kıdem Tazminatı" : "Net Severance"}
              value={formatCurrency(result.netSeverance, locale)}
              variant="success"
              size="lg"
            />
          </div>

          {/* Ceiling Warning */}
          {result.isCapped && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                ⚠️ {isTr
                  ? `Maaşınız kıdem tazminatı tavanını (${formatCurrency(result.ceiling, locale)}) aşıyor. Hesaplama tavan tutarı üzerinden yapıldı.`
                  : `Your salary exceeds the severance pay ceiling (${formatCurrency(result.ceiling, locale)}). Calculation was based on the ceiling amount.`}
              </p>
            </div>
          )}

          {/* Calculation Details */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">
                {isTr ? "Hesaplama Detayları" : "Calculation Details"}
              </h3>
            </div>
            <div className="divide-y divide-border text-sm">
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-muted-foreground">{isTr ? "Brüt Maaş + Ek Haklar" : "Gross Salary + Benefits"}</span>
                <span className="font-medium">{formatCurrency(result.totalMonthly, locale)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-muted-foreground">{isTr ? "Kıdem Tazminatı Tavanı" : "Severance Ceiling"} ({result.halfKey})</span>
                <span className="font-medium">{formatCurrency(result.ceiling, locale)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-muted-foreground">{isTr ? "Hesaplamada Kullanılan" : "Used in Calculation"}</span>
                <span className="font-medium">{formatCurrency(result.cappedMonthly, locale)}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-muted-foreground">{isTr ? "Formül" : "Formula"}</span>
                <span className="font-medium text-xs">
                  ({formatCurrency(result.cappedMonthly, locale)} / 30) × {result.totalDays} {isTr ? "gün" : "days"}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl border border-border bg-muted/20 px-5 py-4 text-xs text-muted-foreground space-y-1">
            <p>
              {isTr
                ? "• Kıdem tazminatı her tam yıl için 30 günlük brüt ücret üzerinden hesaplanır."
                : "• Severance pay is calculated as 30 days gross salary for each full year of service."}
            </p>
            <p>
              {isTr
                ? "• Kıdem tazminatından sadece damga vergisi kesilir, gelir vergisi ve SGK primi kesilmez."
                : "• Only stamp tax is deducted from severance pay. No income tax or SSI premium applies."}
            </p>
            <p>
              {isTr
                ? "• 1 yıldan az çalışma süresi için de orantılı hesaplama yapılır."
                : "• Proportional calculation is applied for service periods less than 1 year."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
