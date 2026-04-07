"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { RotateCcw } from "lucide-react";

interface BmiResult {
  bmi: number;
  category: string;
  color: string;
}

function calcBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (heightCm <= 0 || weightKg <= 0) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return { bmi, ...getCategory(bmi) };
}

function getCategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: "underweight", color: "text-blue-500" };
  if (bmi < 25) return { category: "normal", color: "text-emerald-500" };
  if (bmi < 30) return { category: "overweight", color: "text-amber-500" };
  return { category: "obese", color: "text-red-500" };
}

const categoryLabels: Record<string, Record<string, string>> = {
  tr: {
    underweight: "Zayıf",
    normal: "Normal",
    overweight: "Fazla Kilolu",
    obese: "Obez",
  },
  en: {
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
  },
};

const rangeLabels: Record<string, Record<string, string>> = {
  tr: {
    underweight: "< 18.5",
    normal: "18.5 — 24.9",
    overweight: "25.0 — 29.9",
    obese: "≥ 30.0",
  },
  en: {
    underweight: "< 18.5",
    normal: "18.5 — 24.9",
    overweight: "25.0 — 29.9",
    obese: "≥ 30.0",
  },
};

export function BmiCalculator() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);

  const handleCalculate = () => {
    const r = calcBmi(Number(height), Number(weight));
    setResult(r);
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  const labels = categoryLabels[locale] || categoryLabels.en;
  const ranges = rangeLabels[locale] || rangeLabels.en;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            {locale === "tr" ? "Boy (cm)" : "Height (cm)"}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            min={50}
            max={250}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            {locale === "tr" ? "Kilo (kg)" : "Weight (kg)"}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            min={10}
            max={300}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCalculate}
          disabled={!height || !weight}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("calculate")}
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" />
          {t("reset")}
        </button>
      </div>

      {result && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-center">
            <div className={`text-5xl font-bold ${result.color}`}>
              {result.bmi.toFixed(1)}
            </div>
            <div className={`mt-2 text-lg font-semibold ${result.color}`}>
              {labels[result.category]}
            </div>
          </div>

          {/* BMI Scale */}
          <div className="mt-6">
            <div className="flex h-3 overflow-hidden rounded-full">
              <div className="flex-1 bg-blue-400" />
              <div className="flex-1 bg-emerald-400" />
              <div className="flex-1 bg-amber-400" />
              <div className="flex-1 bg-red-400" />
            </div>
            <div
              className="relative -mt-1"
              style={{
                left: `${Math.min(Math.max(((result.bmi - 15) / 25) * 100, 0), 100)}%`,
              }}
            >
              <div className="inline-block -translate-x-1/2 text-lg">▲</div>
            </div>
          </div>

          {/* Categories Table */}
          <div className="mt-6 space-y-2">
            {(["underweight", "normal", "overweight", "obese"] as const).map(
              (cat) => (
                <div
                  key={cat}
                  className={`flex items-center justify-between rounded-lg px-4 py-2 text-sm ${
                    result.category === cat ? "bg-accent font-medium" : ""
                  }`}
                >
                  <span>{labels[cat]}</span>
                  <span className="text-muted-foreground">{ranges[cat]}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
