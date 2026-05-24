"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Tavan: 44.764,27 TL/yil. Brut 50K, 80K, 120K karsilastirmasi.
const ceiling = 44764.27;

const data = [1, 3, 5, 10, 15, 20].map((year) => {
  const brut50 = Math.min(50000, ceiling) * year;
  const brut80 = Math.min(80000, ceiling) * year;
  const brut120 = Math.min(120000, ceiling) * year;
  return {
    year: `${year} yil`,
    brut50: Math.round(brut50),
    brut80: Math.round(brut80),
    brut120: Math.round(brut120),
  };
});

const formatTL = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return String(v);
};

export function SeveranceTenureChart({ locale = "tr" }: { locale?: string }) {
  const isTr = locale === "tr";
  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-card p-5">
      <figcaption className="mb-3 text-sm font-semibold text-foreground">
        {isTr
          ? "Kidem Suresine Gore Tazminat Tutari (2026 Tavan: 44.764,27 TL)"
          : "Severance by Tenure (2026 Ceiling: 44,764.27 TL/yr)"}
      </figcaption>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
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
            <Bar dataKey="brut50" name={isTr ? "50K Brut" : "50K Gross"} radius={[4, 4, 0, 0]}>
              {data.map((_, idx) => (
                <Cell key={idx} fill="#3b82f6" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {isTr
          ? "Brut maas 44.764,27 TL altinda kalan calisanlar icin tavan etkisi yoktur. Tavan uzerindeki maaslar bu seviyede sabitlenir."
          : "Workers earning under 44,764.27 TL are not capped. Higher salaries are capped at the ceiling per year."}
      </p>
    </figure>
  );
}
