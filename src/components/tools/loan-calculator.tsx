"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ui/result-card";
import { KKDF_RATE, BSMV_RATE } from "@/lib/turkey-tax-data";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  kkdfBsmv: number;
  remaining: number;
}

export function LoanCalculator() {
  const locale = useLocale();
  const isTr = locale === "tr";

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [showTable, setShowTable] = useState(false);

  const parsed = {
    amount: parseFloat(loanAmount.replace(/\./g, "").replace(",", ".")),
    rate: parseFloat(interestRate.replace(",", ".")),
    months: parseInt(term),
  };
  const isValid =
    !isNaN(parsed.amount) && parsed.amount > 0 &&
    !isNaN(parsed.rate) && parsed.rate > 0 &&
    !isNaN(parsed.months) && parsed.months > 0 && parsed.months <= 120;

  const schedule = useMemo((): AmortizationRow[] => {
    if (!isValid) return [];
    const { amount, rate, months } = parsed;

    // Monthly interest rate with KKDF and BSMV
    const monthlyRate = rate / 100;
    const effectiveRate = monthlyRate * (1 + KKDF_RATE + BSMV_RATE);

    // Monthly payment (annuity formula)
    const payment =
      (amount * effectiveRate * Math.pow(1 + effectiveRate, months)) /
      (Math.pow(1 + effectiveRate, months) - 1);

    const rows: AmortizationRow[] = [];
    let remaining = amount;

    for (let i = 1; i <= months; i++) {
      const interestPortion = remaining * monthlyRate;
      const kkdfBsmv = interestPortion * (KKDF_RATE + BSMV_RATE);
      const principal = payment - interestPortion - kkdfBsmv;
      remaining = Math.max(0, remaining - principal);

      rows.push({
        month: i,
        payment,
        principal,
        interest: interestPortion,
        kkdfBsmv,
        remaining,
      });
    }
    return rows;
  }, [parsed.amount, parsed.rate, parsed.months, isValid]);

  const totals = useMemo(() => {
    if (schedule.length === 0) return null;
    return {
      totalPayment: schedule.reduce((s, r) => s + r.payment, 0),
      totalInterest: schedule.reduce((s, r) => s + r.interest, 0),
      totalKkdfBsmv: schedule.reduce((s, r) => s + r.kkdfBsmv, 0),
      totalCost: schedule.reduce((s, r) => s + r.interest + r.kkdfBsmv, 0),
    };
  }, [schedule]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          id="loan-amount"
          label={isTr ? "Kredi Tutarı" : "Loan Amount"}
          prefix="₺"
          type="text"
          inputMode="decimal"
          placeholder="100.000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <Input
          id="interest-rate"
          label={isTr ? "Aylık Faiz Oranı" : "Monthly Interest Rate"}
          suffix="%"
          type="text"
          inputMode="decimal"
          placeholder="2,99"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <Input
          id="loan-term"
          label={isTr ? "Vade (Ay)" : "Term (Months)"}
          suffix={isTr ? "ay" : "mo"}
          type="number"
          inputMode="numeric"
          placeholder="36"
          min={1}
          max={120}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      {/* Quick Term Buttons */}
      <div className="flex flex-wrap gap-2">
        {[12, 24, 36, 48, 60].map((m) => (
          <button
            key={m}
            onClick={() => setTerm(m.toString())}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              term === m.toString()
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {m} {isTr ? "ay" : "mo"}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {isTr
          ? `KKDF: %${(KKDF_RATE * 100).toFixed(0)} + BSMV: %${(BSMV_RATE * 100).toFixed(0)} otomatik olarak hesaplamaya dahildir.`
          : `KKDF: ${(KKDF_RATE * 100).toFixed(0)}% + BSMV: ${(BSMV_RATE * 100).toFixed(0)}% are automatically included in the calculation.`}
      </p>

      {/* Results */}
      {totals && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              label={isTr ? "Aylık Taksit" : "Monthly Payment"}
              value={formatCurrency(schedule[0].payment, locale)}
              variant="primary"
              size="lg"
            />
            <ResultCard
              label={isTr ? "Toplam Ödeme" : "Total Payment"}
              value={formatCurrency(totals.totalPayment, locale)}
            />
            <ResultCard
              label={isTr ? "Toplam Faiz" : "Total Interest"}
              value={formatCurrency(totals.totalInterest, locale)}
              variant="warning"
            />
            <ResultCard
              label={isTr ? "Toplam Maliyet (Faiz+KKDF+BSMV)" : "Total Cost (Interest+KKDF+BSMV)"}
              value={formatCurrency(totals.totalCost, locale)}
              variant="danger"
            />
          </div>

          {/* Cost Breakdown Bar */}
          <div className="space-y-2">
            <p className="text-sm font-medium">{isTr ? "Ödeme Dağılımı" : "Payment Breakdown"}</p>
            <div className="flex h-6 w-full overflow-hidden rounded-full">
              <div
                className="bg-emerald-500"
                style={{ width: `${(parsed.amount / totals.totalPayment) * 100}%` }}
              />
              <div
                className="bg-amber-500"
                style={{ width: `${(totals.totalInterest / totals.totalPayment) * 100}%` }}
              />
              <div
                className="bg-red-400"
                style={{ width: `${(totals.totalKkdfBsmv / totals.totalPayment) * 100}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {isTr ? "Anapara" : "Principal"} ({((parsed.amount / totals.totalPayment) * 100).toFixed(1)}%)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {isTr ? "Faiz" : "Interest"} ({((totals.totalInterest / totals.totalPayment) * 100).toFixed(1)}%)</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /> KKDF+BSMV ({((totals.totalKkdfBsmv / totals.totalPayment) * 100).toFixed(1)}%)</span>
            </div>
          </div>

          {/* Amortization Table */}
          <div>
            <Button
              variant="outline"
              onClick={() => setShowTable(!showTable)}
              className="w-full"
            >
              {showTable
                ? isTr ? "Amortisman Tablosunu Gizle" : "Hide Amortization Table"
                : isTr ? "Amortisman Tablosunu Göster" : "Show Amortization Table"}
            </Button>

            {showTable && (
              <div className="mt-4 rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium">#</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Taksit" : "Payment"}</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Anapara" : "Principal"}</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Faiz" : "Interest"}</th>
                      <th className="px-3 py-2 text-right font-medium">KKDF+BSMV</th>
                      <th className="px-3 py-2 text-right font-medium">{isTr ? "Kalan" : "Remaining"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.month} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-3 py-2 font-medium">{row.month}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(row.payment, locale)}</td>
                        <td className="px-3 py-2 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(row.principal, locale)}</td>
                        <td className="px-3 py-2 text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.interest, locale)}</td>
                        <td className="px-3 py-2 text-right text-red-500">{formatCurrency(row.kkdfBsmv, locale)}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(row.remaining, locale)}</td>
                      </tr>
                    ))}
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
