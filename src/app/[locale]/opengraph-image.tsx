import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const runtime = "edge";
export const alt = "ToolsFlow — Free Online Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isTr = locale === "tr";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e3a5f 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a4731 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 900,
              color: "white",
            }}
          >
            T
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {SITE_NAME}
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          {isTr
            ? "Ücretsiz Online Araçlar — Maaş, Kredi, KDV, Kıdem Tazminatı Hesaplayıcı"
            : "Free Online Tools — Salary, Loan, VAT, Severance Calculator"}
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {["Finans", "Hesaplayıcı", "Ücretsiz"].map((tag) => (
            <span
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                color: "#60a5fa",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
