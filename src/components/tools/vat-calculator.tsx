"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ui/result-card";
import { VAT_RATES } from "@/lib/turkey-tax-data";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Mode = "add" | "remove";

interface VatResult {
  baseAmount: number;
  vatAmount: number;
  totalAmount: number;
  rate: number;
}

interface BatchItem {
  id: number;
  amount: string;
}

export function VatCalculator() {
  const locale = useLocale();
  const isTr = locale === "tr";

  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("");
  const [selectedRate, setSelectedRate] = useState(20);
  const [result, setResult] = useState<VatResult | null>(null);

  // Batch mode
  const [batchMode, setBatchMode] = useState(false);
  const [batchItems, setBatchItems] = useState<BatchItem[]>([
    { id: 1, amount: "" },
    { id: 2, amount: "" },
    { id: 3, amount: "" },
  ]);
  const [batchResults, setBatchResults] = useState<VatResult[]>([]);

  function calculate(amt: number, rate: number, m: Mode): VatResult {
    if (m === "add") {
      const vatAmount = amt * (rate / 100);
      return { baseAmount: amt, vatAmount, totalAmount: amt + vatAmount, rate };
    } else {
      const baseAmount = amt / (1 + rate / 100);
      const vatAmount = amt - baseAmount;
      return { baseAmount, vatAmount, totalAmount: amt, rate };
    }
  }

  function handleCalculate() {
    const num = parseFloat(amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(num) || num <= 0) return;
    setResult(calculate(num, selectedRate, mode));
  }

  function handleBatchCalculate() {
    const results: VatResult[] = [];
    for (const item of batchItems) {
      const num = parseFloat(item.amount.replace(/\./g, "").replace(",", "."));
      if (!isNaN(num) && num > 0) {
        results.push(calculate(num, selectedRate, mode));
      }
    }
    setBatchResults(results);
  }

  function addBatchRow() {
    setBatchItems((prev) => [
      ...prev,
      { id: Date.now(), amount: "" },
    ]);
  }

  function removeBatchRow(id: number) {
    if (batchItems.length <= 1) return;
    setBatchItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateBatchItem(id: number, value: string) {
    setBatchItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: value } : item))
    );
  }

  const batchTotal = batchResults.reduce(
    (acc, r) => ({
      baseAmount: acc.baseAmount + r.baseAmount,
      vatAmount: acc.vatAmount + r.vatAmount,
      totalAmount: acc.totalAmount + r.totalAmount,
    }),
    { baseAmount: 0, vatAmount: 0, totalAmount: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => { setMode("add"); setResult(null); setBatchResults([]); }}
          className={cn(
            "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
            mode === "add"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {isTr ? "KDV Ekle" : "Add VAT"}
        </button>
        <button
          onClick={() => { setMode("remove"); setResult(null); setBatchResults([]); }}
          className={cn(
            "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
            mode === "remove"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {isTr ? "KDV Çıkar" : "Remove VAT"}
        </button>
      </div>

      {/* VAT Rate Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {isTr ? "KDV Oranı" : "VAT Rate"}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {VAT_RATES.map((vr) => (
            <button
              key={vr.rate}
              onClick={() => setSelectedRate(vr.rate)}
              className={cn(
                "rounded-lg border px-3 py-3 text-sm transition-all",
                selectedRate === vr.rate
                  ? "border-primary bg-primary/5 text-primary font-semibold shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent"
              )}
            >
              <span className="text-lg font-bold block">%{vr.rate}</span>
              <span className="text-xs mt-0.5 block opacity-70">
                {vr.label[locale as "tr" | "en"]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Batch Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setBatchMode(!batchMode); setResult(null); setBatchResults([]); }}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
            batchMode ? "bg-primary" : "bg-muted-foreground/30"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 rounded-full bg-white transition-transform",
              batchMode ? "translate-x-[18px]" : "translate-x-0.5"
            )}
          />
        </button>
        <span className="text-sm font-medium">
          {isTr ? "Toplu Hesaplama" : "Batch Calculation"}
        </span>
      </div>

      {/* Single Mode */}
      {!batchMode && (
        <div className="space-y-4">
          <Input
            id="vat-amount"
            label={
              mode === "add"
                ? isTr ? "KDV Hariç Tutar" : "Amount (excl. VAT)"
                : isTr ? "KDV Dahil Tutar" : "Amount (incl. VAT)"
            }
            prefix="₺"
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
          />
          <Button onClick={handleCalculate} className="w-full" size="lg">
            {isTr ? "Hesapla" : "Calculate"}
          </Button>

          {result && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <ResultCard
                label={isTr ? "KDV Hariç" : "Excl. VAT"}
                value={formatCurrency(result.baseAmount, locale)}
                variant={mode === "remove" ? "primary" : "default"}
              />
              <ResultCard
                label={`${isTr ? "KDV Tutarı" : "VAT Amount"} (%${result.rate})`}
                value={formatCurrency(result.vatAmount, locale)}
                variant="warning"
              />
              <ResultCard
                label={isTr ? "KDV Dahil" : "Incl. VAT"}
                value={formatCurrency(result.totalAmount, locale)}
                variant={mode === "add" ? "primary" : "default"}
                size="lg"
              />
            </div>
          )}
        </div>
      )}

      {/* Batch Mode */}
      {batchMode && (
        <div className="space-y-4">
          <div className="space-y-2">
            {batchItems.map((item, idx) => (
              <div key={item.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    id={`batch-${item.id}`}
                    label={idx === 0 ? (mode === "add"
                      ? isTr ? "KDV Hariç Tutarlar" : "Amounts (excl. VAT)"
                      : isTr ? "KDV Dahil Tutarlar" : "Amounts (incl. VAT)") : undefined}
                    prefix="₺"
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={item.amount}
                    onChange={(e) => updateBatchItem(item.id, e.target.value)}
                  />
                </div>
                <button
                  onClick={() => removeBatchRow(item.id)}
                  className="mb-0.5 rounded-lg border border-border p-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label={isTr ? "Satırı sil" : "Remove row"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={addBatchRow} size="sm">
              + {isTr ? "Satır Ekle" : "Add Row"}
            </Button>
          </div>

          <Button onClick={handleBatchCalculate} className="w-full" size="lg">
            {isTr ? "Tümünü Hesapla" : "Calculate All"}
          </Button>

          {batchResults.length > 0 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Individual Results */}
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        {isTr ? "KDV Hariç" : "Excl. VAT"}
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        {isTr ? "KDV" : "VAT"}
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">
                        {isTr ? "KDV Dahil" : "Incl. VAT"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchResults.map((r, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5">{formatCurrency(r.baseAmount, locale)}</td>
                        <td className="px-4 py-2.5 text-amber-600 dark:text-amber-400">{formatCurrency(r.vatAmount, locale)}</td>
                        <td className="px-4 py-2.5 font-medium">{formatCurrency(r.totalAmount, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <ResultCard
                  label={isTr ? "Toplam KDV Hariç" : "Total Excl. VAT"}
                  value={formatCurrency(batchTotal.baseAmount, locale)}
                />
                <ResultCard
                  label={isTr ? "Toplam KDV" : "Total VAT"}
                  value={formatCurrency(batchTotal.vatAmount, locale)}
                  variant="warning"
                />
                <ResultCard
                  label={isTr ? "Genel Toplam" : "Grand Total"}
                  value={formatCurrency(batchTotal.totalAmount, locale)}
                  variant="primary"
                  size="lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
