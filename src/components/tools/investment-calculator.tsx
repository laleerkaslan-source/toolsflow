"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ui/result-card";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface Scenario {
  label: string;
  rate: number;
  finalValue: number;
  totalContributed: number;
  totalReturn: number;
  inflationAdjusted: number;
}

export function InvestmentCalculator() {
  const locale = useLocale();
  const isTr = locale === "tr";

  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("10");
  const [years, setYears] = useState("10");
  const [inflation, setInflation] = useState("20");

  const parsed = {
    initial: parseFloat(initialAmount.replace(/\./g, "").replace(",", ".")) || 0,
    monthly: parseFloat(monthlyContribution.replace(/\./g, "").replace(",", ".")) || 0,
    rate: parseFloat(annualReturn.replace(",", ".")) || 0,
    years: parseInt(years) || 0,
    inflation: parseFloat(inflation.replace(",", ".")) || 0,
  };

  const isValid = (parsed.initial > 0 || parsed.monthly > 0) && parsed.rate > 0 && parsed.years > 0;

  function calculateScenario(initial: number, monthly: number, annualRate: number, yrs: number, inflationRate: number): Scenario {
    const monthlyRate = annualRate / 100 / 12;
    const months = yrs * 12;

    // Future value = initial * (1+r)^n + monthly * [((1+r)^n - 1) / r]
    let finalValue: number;
    if (monthlyRate === 0) {
      finalValue = initial + monthly * months;
    } else {
      finalValue =
        initial * Math.pow(1 + monthlyRate, months) +
        monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }

    const totalContributed = initial + monthly * months;
    const totalReturn = finalValue - totalContributed;

    // Inflation-adjusted value
    const inflationAdjusted = finalValue / Math.pow(1 + inflationRate / 100, yrs);

    return {
      label: `%${annualRate}`,
      rate: annualRate,
      finalValue,
      totalContributed,
      totalReturn,
      inflationAdjusted,
    };
  }

  const scenarios = useMemo((): Scenario[] => {
    if (!isValid) return [];
    const rates = [
      { rate: Math.max(5, parsed.rate - 5), label: isTr ? "Düşük" : "Low" },
      { rate: parsed.rate, label: isTr ? "Orta" : "Medium" },
      { rate: parsed.rate + 5, label: isTr ? "Yüksek" : "High" },
    ];
    return rates.map((r) => ({
      ...calculateScenario(parsed.initial, parsed.monthly, r.rate, parsed.years, parsed.inflation),
      label: `${r.label} (%${r.rate})`,
    }));
  }, [parsed.initial, parsed.monthly, parsed.rate, parsed.years, parsed.inflation, isValid, isTr]);

  const mainResult = scenarios[1] || null; // middle scenario

  // Year-by-year data for simple chart
  const yearlyData = useMemo(() => {
    if (!isValid) return [];
    const data = [];
    const monthlyRate = parsed.rate / 100 / 12;
    let balance = parsed.initial;
    let totalContributed = parsed.initial;

    for (let y = 0; y <= parsed.years; y++) {
      data.push({
        year: y,
        balance: Math.round(balance),
        contributed: Math.round(totalContributed),
        inflationAdjusted: Math.round(balance / Math.pow(1 + parsed.inflation / 100, y)),
      });
      // Calculate next year
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + parsed.monthly;
        totalContributed += parsed.monthly;
      }
    }
    return data;
  }, [parsed.initial, parsed.monthly, parsed.rate, parsed.years, parsed.inflation, isValid]);

  const maxBalance = yearlyData.length > 0 ? Math.max(...yearlyData.map((d) => d.balance)) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="initial-amount"
          label={isTr ? "Başlangıç Tutarı" : "Initial Amount"}
          prefix="₺"
          type="text"
          inputMode="decimal"
          placeholder="50.000"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
        />
        <Input
          id="monthly-contribution"
          label={isTr ? "Aylık Katkı" : "Monthly Contribution"}
          prefix="₺"
          type="text"
          inputMode="decimal"
          placeholder="5.000"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          id="annual-return"
          label={isTr ? "Yıllık Getiri Oranı" : "Annual Return Rate"}
          suffix="%"
          type="text"
          inputMode="decimal"
          placeholder="10"
          value={annualReturn}
          onChange={(e) => setAnnualReturn(e.target.value)}
        />
        <Input
          id="investment-years"
          label={isTr ? "Süre (Yıl)" : "Duration (Years)"}
          suffix={isTr ? "yıl" : "yr"}
          type="number"
          inputMode="numeric"
          placeholder="10"
          min={1}
          max={50}
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <Input
          id="inflation-rate"
          label={isTr ? "Yıllık Enflasyon" : "Annual Inflation"}
          suffix="%"
          type="text"
          inputMode="decimal"
          placeholder="20"
          value={inflation}
          onChange={(e) => setInflation(e.target.value)}
        />
      </div>

      {/* Quick Year Buttons */}
      <div className="flex flex-wrap gap-2">
        {[5, 10, 15, 20, 30].map((y) => (
          <button
            key={y}
            onClick={() => setYears(y.toString())}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              years === y.toString()
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {y} {isTr ? "yıl" : "yr"}
          </button>
        ))}
      </div>

      {/* Results */}
      {mainResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Primary Results */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              label={isTr ? "Toplam Yatırılan" : "Total Invested"}
              value={formatCurrency(mainResult.totalContributed, locale)}
            />
            <ResultCard
              label={isTr ? "Toplam Getiri" : "Total Return"}
              value={formatCurrency(mainResult.totalReturn, locale)}
              variant="success"
            />
            <ResultCard
              label={isTr ? "Nihai Değer" : "Final Value"}
              value={formatCurrency(mainResult.finalValue, locale)}
              variant="primary"
              size="lg"
            />
            <ResultCard
              label={isTr ? "Enflasyon Düzeltmeli" : "Inflation Adjusted"}
              value={formatCurrency(mainResult.inflationAdjusted, locale)}
              sublabel={isTr ? "Bugünkü alım gücü" : "Today's purchasing power"}
              variant="warning"
            />
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3">
            <p className="text-sm font-medium">{isTr ? "Yıllık Büyüme" : "Growth Over Time"}</p>
            <div className="space-y-1.5">
              {yearlyData
                .filter((_, i) => i % Math.max(1, Math.floor(parsed.years / 10)) === 0 || i === yearlyData.length - 1)
                .map((d) => (
                  <div key={d.year} className="flex items-center gap-2 text-xs">
                    <span className="w-8 text-right text-muted-foreground">{d.year}</span>
                    <div className="flex-1 flex h-5 rounded-sm overflow-hidden bg-muted/50">
                      <div
                        className="bg-blue-500/60 transition-all"
                        style={{ width: `${(d.contributed / maxBalance) * 100}%` }}
                      />
                      <div
                        className="bg-emerald-500 transition-all"
                        style={{ width: `${((d.balance - d.contributed) / maxBalance) * 100}%` }}
                      />
                    </div>
                    <span className="w-24 text-right font-medium">{formatCurrency(d.balance, locale)}</span>
                  </div>
                ))}
            </div>
            <div className="flex gap-x-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-blue-500/60" /> {isTr ? "Yatırılan" : "Invested"}</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> {isTr ? "Getiri" : "Returns"}</span>
            </div>
          </div>

          {/* Scenario Comparison */}
          <div className="space-y-3">
            <p className="text-sm font-medium">{isTr ? "Senaryo Karşılaştırması" : "Scenario Comparison"}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {scenarios.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl border p-4 text-center",
                    i === 1
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  )}
                >
                  <p className="text-xs font-medium text-muted-foreground uppercase">{s.label}</p>
                  <p className={cn(
                    "mt-2 text-lg font-bold",
                    i === 1 ? "text-primary" : ""
                  )}>
                    {formatCurrency(s.finalValue, locale)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isTr ? "Getiri" : "Return"}: {formatCurrency(s.totalReturn, locale)}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {isTr ? "Reel" : "Real"}: {formatCurrency(s.inflationAdjusted, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
