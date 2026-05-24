"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// 100.000 TL anapara, %40 yillik faiz, 10 yil
const data = Array.from({ length: 11 }, (_, year) => {
  const simple = 100000 * (1 + 0.4 * year);
  const compoundYearly = 100000 * Math.pow(1.4, year);
  const compoundMonthly = 100000 * Math.pow(1 + 0.4 / 12, 12 * year);
  return {
    year: `Yil ${year}`,
    basit: Math.round(simple),
    bilesik: Math.round(compoundYearly),
    aylikBilesik: Math.round(compoundMonthly),
  };
});

const formatTL = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return String(v);
};

export function CompoundInterestChart({ locale = "tr" }: { locale?: string }) {
  const isTr = locale === "tr";
  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-card p-5">
      <figcaption className="mb-3 text-sm font-semibold text-foreground">
        {isTr
          ? "100.000 TL Ana Para, %40 Yillik Getiri — Basit vs Bilesik"
          : "100,000 TL Principal at 40% Annual — Simple vs Compound"}
      </figcaption>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="grSimple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grComp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grMonthly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis
              dataKey="year"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatTL}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value) => `${Number(value).toLocaleString("tr-TR")} TL`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="basit"
              name={isTr ? "Basit faiz" : "Simple"}
              stroke="#94a3b8"
              fill="url(#grSimple)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="bilesik"
              name={isTr ? "Bilesik (yillik)" : "Compound (yearly)"}
              stroke="#3b82f6"
              fill="url(#grComp)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="aylikBilesik"
              name={isTr ? "Bilesik (aylik)" : "Compound (monthly)"}
              stroke="#22c55e"
              fill="url(#grMonthly)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {isTr
          ? "Bilesik faiz uzun vadede ustel buyume saglar. 10 yil sonunda fark 5-10 katina cikabilir."
          : "Compound interest produces exponential growth. After 10 years the difference can be 5-10×."}
      </p>
    </figure>
  );
}
