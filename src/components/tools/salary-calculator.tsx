"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ui/result-card";
import {
  TAX_YEARS,
  type TaxYear,
  calculateNetSalary,
  SGK_RATES,
  STAMP_TAX_RATE,
  MINIMUM_WAGE,
} from "@/lib/turkey-tax-data";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function SalaryCalculator() {
  const locale = useLocale();
  const isTr = locale === "tr";

  const [grossSalary, setGrossSalary] = useState("");
  const [year, setYear] = useState<TaxYear>(2026);
  const [showMonthly, setShowMonthly] = useState(false);

  const parsed = parseFloat(grossSalary.replace(/\./g, "").replace(",", "."));
  const isValid = !isNaN(parsed) && parsed > 0;

  // Calculate single month result (January — no cumulative)
  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateNetSalary(parsed, year, 0, true);
  }, [parsed, year, isValid]);

  // Calculate 12-month breakdown
  const monthlyBreakdown = useMemo(() => {
    if (!isValid) return [];
    const months = [];
    let cumulative = 0;
    for (let i = 0; i < 12; i++) {
      const m = calculateNetSalary(parsed, year, cumulative, true);
      months.push(m);
      cumulative = m.newCumulativeIncome;
    }
    return months;
  }, [parsed, year, isValid]);

  const annualTotals = useMemo(() => {
    if (monthlyBreakdown.length === 0) return null;
    return {
      grossSalary: monthlyBreakdown.reduce((s, m) => s + m.grossSalary, 0),
      netSalary: monthlyBreakdown.reduce((s, m) => s + m.netSalary, 0),
      incomeTax: monthlyBreakdown.reduce((s, m) => s + m.incomeTax, 0),
      sgkEmployee: monthlyBreakdown.reduce((s, m) => s + m.sgkEmployee, 0),
      unemploymentEmployee: monthlyBreakdown.reduce((s, m) => s + m.unemploymentEmployee, 0),
      stampTax: monthlyBreakdown.reduce((s, m) => s + m.stampTax, 0),
      minWageExemption: monthlyBreakdown.reduce((s, m) => s + m.minWageExemption, 0),
      totalDeductions: monthlyBreakdown.reduce((s, m) => s + m.totalDeductions, 0),
      totalEmployerCost: monthlyBreakdown.reduce((s, m) => s + m.totalEmployerCost, 0),
    };
  }, [monthlyBreakdown]);

  const monthNames = isTr
    ? ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="space-y-6">
      {/* Year Selection */}
      <div className="flex gap-2">
        {TAX_YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              year === y
                ? "border-primary bg-primary/5 text-primary shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            )}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Gross Salary Input */}
      <Input
        id="gross-salary"
        label={isTr ? "Brüt Maaş (Aylık)" : "Gross Salary (Monthly)"}
        prefix="₺"
        type="text"
        inputMode="decimal"
        placeholder={isTr ? "Brüt maaşınızı girin" : "Enter gross salary"}
        value={grossSalary}
        onChange={(e) => setGrossSalary(e.target.value)}
      />

      {/* Quick Amounts */}
      <div className="flex flex-wrap gap-2">
        {[MINIMUM_WAGE[year], 40000, 60000, 80000, 100000].map((amt) => (
          <button
            key={amt}
            onClick={() => setGrossSalary(amt.toString())}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {amt === MINIMUM_WAGE[year]
              ? isTr ? "Asgari Ücret" : "Min. Wage"
              : `₺${amt.toLocaleString("tr-TR")}`}
          </button>
        ))}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Primary Results */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ResultCard
              label={isTr ? "Brüt Maaş" : "Gross Salary"}
              value={formatCurrency(result.grossSalary, locale)}
            />
            <ResultCard
              label={isTr ? "Net Maaş" : "Net Salary"}
              value={formatCurrency(result.netSalary, locale)}
              variant="success"
              size="lg"
            />
            <ResultCard
              label={isTr ? "İşveren Maliyeti" : "Employer Cost"}
              value={formatCurrency(result.totalEmployerCost, locale)}
              variant="danger"
            />
          </div>

          {/* Deduction Breakdown */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">
                {isTr ? "Kesinti Detayları (Ocak)" : "Deduction Details (January)"}
              </h3>
            </div>
            <div className="divide-y divide-border">
              <DeductionRow
                label={isTr ? "SGK İşçi Primi" : "SSI Employee Premium"}
                sublabel={formatPercent(SGK_RATES.employee.premium * 100, locale, 0)}
                value={formatCurrency(result.sgkEmployee, locale)}
              />
              <DeductionRow
                label={isTr ? "İşsizlik Sigortası" : "Unemployment Insurance"}
                sublabel={formatPercent(SGK_RATES.employee.unemployment * 100, locale, 0)}
                value={formatCurrency(result.unemploymentEmployee, locale)}
              />
              <DeductionRow
                label={isTr ? "Gelir Vergisi" : "Income Tax"}
                sublabel={isTr ? "Kümülatif matrah bazlı" : "Progressive brackets"}
                value={formatCurrency(result.incomeTax, locale)}
              />
              <DeductionRow
                label={isTr ? "Damga Vergisi" : "Stamp Tax"}
                sublabel={`%${(STAMP_TAX_RATE * 100).toFixed(3).replace(".", ",")}`}
                value={formatCurrency(result.stampTax, locale)}
              />
              {result.minWageExemption > 0 && (
                <DeductionRow
                  label={isTr ? "Asgari Ücret İstisnası" : "Min. Wage Exemption"}
                  sublabel={isTr ? "Vergi indirimi" : "Tax relief"}
                  value={`-${formatCurrency(result.minWageExemption, locale)}`}
                  isPositive
                />
              )}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                <span className="text-sm font-semibold">
                  {isTr ? "Toplam Kesinti" : "Total Deductions"}
                </span>
                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(result.totalDeductions, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div className="space-y-2">
            <p className="text-sm font-medium">{isTr ? "Maaş Dağılımı" : "Salary Breakdown"}</p>
            <div className="flex h-6 w-full overflow-hidden rounded-full">
              <div
                className="bg-emerald-500 transition-all"
                style={{ width: `${(result.netSalary / result.grossSalary) * 100}%` }}
                title={isTr ? "Net Maaş" : "Net Salary"}
              />
              <div
                className="bg-blue-500 transition-all"
                style={{ width: `${(result.sgkEmployee / result.grossSalary) * 100}%` }}
                title="SGK"
              />
              <div
                className="bg-amber-500 transition-all"
                style={{ width: `${(result.incomeTax / result.grossSalary) * 100}%` }}
                title={isTr ? "Gelir Vergisi" : "Income Tax"}
              />
              <div
                className="bg-red-400 transition-all"
                style={{ width: `${((result.stampTax + result.unemploymentEmployee) / result.grossSalary) * 100}%` }}
                title={isTr ? "Diğer" : "Other"}
              />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {isTr ? "Net" : "Net"} ({((result.netSalary / result.grossSalary) * 100).toFixed(1)}%)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> SGK ({((result.sgkEmployee / result.grossSalary) * 100).toFixed(1)}%)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {isTr ? "Gelir V." : "Income T."} ({((result.incomeTax / result.grossSalary) * 100).toFixed(1)}%)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /> {isTr ? "Diğer" : "Other"}</span>
            </div>
          </div>

          {/* Monthly Breakdown Toggle */}
          <div>
            <Button
              variant="outline"
              onClick={() => setShowMonthly(!showMonthly)}
              className="w-full"
            >
              {showMonthly
                ? isTr ? "Aylık Tabloyu Gizle" : "Hide Monthly Table"
                : isTr ? "12 Aylık Tabloyu Göster" : "Show 12-Month Table"}
            </Button>

            {showMonthly && monthlyBreakdown.length > 0 && (
              <div className="mt-4 rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium">{isTr ? "Ay" : "Month"}</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Brüt" : "Gross"}</th>
                      <th className="px-3 py-2 text-right font-medium">SGK</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Gelir V." : "Inc. Tax"}</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Net" : "Net"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyBreakdown.map((m, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-3 py-2 font-medium">{monthNames[i]}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(m.grossSalary, locale)}</td>
                        <td className="px-3 py-2 text-right text-blue-600 dark:text-blue-400">{formatCurrency(m.sgkEmployee + m.unemploymentEmployee, locale)}</td>
                        <td className="px-3 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(m.incomeTax, locale)}</td>
                        <td className="px-3 py-2 text-right font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(m.netSalary, locale)}</td>
                      </tr>
                    ))}
                    {annualTotals && (
                      <tr className="bg-muted/50 font-semibold">
                        <td className="px-3 py-2">{isTr ? "Yıllık" : "Annual"}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(annualTotals.grossSalary, locale)}</td>
                        <td className="px-3 py-2 text-right text-blue-600 dark:text-blue-400">{formatCurrency(annualTotals.sgkEmployee + annualTotals.unemploymentEmployee, locale)}</td>
                        <td className="px-3 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(annualTotals.incomeTax, locale)}</td>
                        <td className="px-3 py-2 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(annualTotals.netSalary, locale)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DeductionRow({
  label,
  sublabel,
  value,
  isPositive,
}: {
  label: string;
  sublabel: string;
  value: string;
  isPositive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          isPositive ? "text-emerald-600 dark:text-emerald-400" : ""
        )}
      >
        {value}
      </span>
    </div>
  );
}
