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

const data = [
  { bracket: "0 - 158K", rate: 15, color: "#22c55e" },
  { bracket: "158K - 330K", rate: 20, color: "#84cc16" },
  { bracket: "330K - 800K", rate: 27, color: "#eab308" },
  { bracket: "800K - 4,3M", rate: 35, color: "#f97316" },
  { bracket: "4,3M+", rate: 40, color: "#ef4444" },
];

export function TaxBracketsChart({ locale = "tr" }: { locale?: string }) {
  const isTr = locale === "tr";
  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-card p-5">
      <figcaption className="mb-3 text-sm font-semibold text-foreground">
        {isTr
          ? "2026 Gelir Vergisi Dilimleri (Ucret)"
          : "2026 Income Tax Brackets (Wage)"}
      </figcaption>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis
              dataKey="bracket"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
            />
            <YAxis
              unit="%"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value) => [`${Number(value)}%`, isTr ? "Vergi orani" : "Tax rate"]}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {isTr
          ? "Kaynak: GIB 2026 yili gelir vergisi tarifesi. Oranlar kumulatif uygulanir; her dilim sadece o dilime giren tutar icin gecerlidir."
          : "Source: 2026 Turkish Revenue Administration. Rates are cumulative; each rate applies only to income within that bracket."}
      </p>
    </figure>
  );
}
