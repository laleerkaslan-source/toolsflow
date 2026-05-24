"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const employeeData = [
  { name: "Malulluk-Yaslilik-Olum", value: 9, color: "#3b82f6" },
  { name: "Genel Saglik", value: 5, color: "#22c55e" },
  { name: "Issizlik Sigortasi", value: 1, color: "#f97316" },
];

const employerData = [
  { name: "Sosyal Guvenlik", value: 20.5, color: "#3b82f6" },
  { name: "Issizlik", value: 2, color: "#f97316" },
];

export function SgkBreakdownChart({ locale = "tr" }: { locale?: string }) {
  const isTr = locale === "tr";
  return (
    <figure className="not-prose my-8 rounded-xl border border-border bg-card p-5">
      <figcaption className="mb-3 text-sm font-semibold text-foreground">
        {isTr
          ? "SGK Kesinti Dagilimi — Isci vs Isveren"
          : "SSI Premium Breakdown — Employee vs Employer"}
      </figcaption>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <h4 className="mb-1 text-center text-xs font-medium text-muted-foreground">
            {isTr ? "Isci (%15 toplam)" : "Employee (15% total)"}
          </h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employeeData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={64}
                  paddingAngle={2}
                >
                  {employeeData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => `%${Number(v)}`}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h4 className="mb-1 text-center text-xs font-medium text-muted-foreground">
            {isTr ? "Isveren (%22,5 toplam)" : "Employer (22.5% total)"}
          </h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employerData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={64}
                  paddingAngle={2}
                >
                  {employerData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => `%${Number(v)}`}
                />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {isTr
          ? "Hazine indirimi sartlarini saglayan isverenler %15,5 oraninda oder (5 puan dusum)."
          : "Compliant employers pay 15.5% (5-point treasury discount)."}
      </p>
    </figure>
  );
}
