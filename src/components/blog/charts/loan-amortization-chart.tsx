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

// 500.000 TL kredi, 60 ay, %3 aylik faiz — amortisman
function buildAmortization(principal: number, monthlyRate: number, months: number) {
  const r = monthlyRate;
  const m = principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const data = [];
  let balance = principal;
  for (let month = 1; month <= months; month++) {
    const interest = balance * r;
    const principalPaid = m - interest;
    balance -= principalPaid;
    if (month % 6 === 0 || month === 1 || month === months) {
      data.push({
        month: `${month}. ay`,
        anapara: Math.round(principalPaid),
        faiz: Math.round(interest),
        kalan: Math.round(Math.max(balance, 0)),
      });
    }
  }
  return data;
}

const data = buildAmortization(500000, 0.03, 60);

const formatTL = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return String(v);
};

export function LoanAmortizationChart({ locale = "tr" }: { locale?: string }) {
  const isTr = locale === "tr";
  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-card p-5">
      <figcaption className="mb-3 text-sm font-semibold text-foreground">
        {isTr
          ? "500.000 TL Kredi, %3 Aylik Faiz, 60 Ay — Taksitin Yapisi"
          : "500,000 TL Loan, 3% Monthly, 60 Months — Payment Composition"}
      </figcaption>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }} stackOffset="none">
            <defs>
              <linearGradient id="grAnapara" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="grFaiz" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis
              dataKey="month"
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
              stackId="1"
              dataKey="faiz"
              name={isTr ? "Faiz" : "Interest"}
              stroke="#ef4444"
              fill="url(#grFaiz)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              stackId="1"
              dataKey="anapara"
              name={isTr ? "Anapara" : "Principal"}
              stroke="#22c55e"
              fill="url(#grAnapara)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {isTr
          ? "Anuite metoduyla aylik taksit sabit kalir; ancak ilk aylarda faiz payi yuksek, son aylarda anapara payi yuksektir."
          : "With annuity method monthly payment stays constant; interest is heavy early, principal heavy later."}
      </p>
    </figure>
  );
}
